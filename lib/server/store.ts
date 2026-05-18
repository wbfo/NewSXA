/**
 * Runtime state store — dual-backend.
 *
 * PRODUCTION (Vercel / serverless):
 *   Uses Upstash Redis when UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   are set. State is stored as a single JSON value at key "sx:runtime-state".
 *   The in-process mutex still prevents concurrent writes within one invocation;
 *   at this operator scale (one user) cross-invocation races are acceptable.
 *
 * LOCAL DEV:
 *   Falls back to the JSON file at data/runtime-state.json when Redis env vars
 *   are absent. No extra setup required.
 *
 * To scale further: replace with a proper relational DB + distributed lock.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { Redis as RedisType } from "@upstash/redis";
import path from "node:path";
import { createEmptyDashboard, seededToolkit } from "@/lib/demo-data/seed";
import type {
  AgentEvent,
  AgentReport,
  Audit,
  ChatMessage,
  ClientOrder,
  DashboardPayload,
  DeliverableAsset,
  BusinessExpense,
  FinanceBudget,
  KnowledgeAsset,
  OrderStatus,
  PipelineItem,
  Prospect,
  QueueItem,
  ReportItem,
  WorkflowRun
} from "@/lib/domain/types";
import { buildBootstrapChat, buildCouncilBrief, buildHermesAgents, HERMES_STATE_PATH } from "@/lib/hermes/runtime";
import { knowledgeContent } from "@/content/knowledge";
import { publishEvent } from "@/lib/server/event-bus";
import { withStoreLock } from "@/lib/server/mutex";
import { logger } from "@/lib/server/logger";

interface PersistedRuntimeState {
  monthlyReceived: number;
  survivalTarget: number;
  slotsUsed: number;
  audits: Audit[];
  pipeline: PipelineItem[];
  prospects: Prospect[];
  orders: ClientOrder[];
  queue: QueueItem[];
  events: AgentEvent[];
  workflowRuns: WorkflowRun[];
  chat: ChatMessage[];
  reports: AgentReport[];
  knowledgeAssets: KnowledgeAsset[];
  expenses: BusinessExpense[];
  financeBudget: FinanceBudget;
  agentLastRun?: Partial<Record<"cfo" | "followup" | "outreach" | "research", string>>;
}

const DEFAULT_FINANCE_BUDGET: FinanceBudget = {
  monthlyRevenueTarget: 3000,
  monthlyExpenseLimit: 750,
  cashOnHand: 0,
  taxReservePercent: 20,
};

const EMPTY_STATE: PersistedRuntimeState = {
  monthlyReceived: 0,
  survivalTarget: 3000,
  slotsUsed: 0,
  audits: [],
  pipeline: [],
  prospects: [],
  orders: [],
  queue: [],
  events: [],
  workflowRuns: [],
  chat: [],
  reports: [],
  knowledgeAssets: [],
  expenses: [],
  financeBudget: DEFAULT_FINANCE_BUDGET,
  agentLastRun: {},
};

function normalizePersistedState(raw: Partial<PersistedRuntimeState> | null | undefined): PersistedRuntimeState {
  return {
    ...EMPTY_STATE,
    ...raw,
    audits: Array.isArray(raw?.audits) ? raw.audits : [],
    pipeline: Array.isArray(raw?.pipeline) ? raw.pipeline : [],
    prospects: Array.isArray(raw?.prospects) ? raw.prospects : [],
    orders: Array.isArray(raw?.orders) ? raw.orders : [],
    queue: Array.isArray(raw?.queue) ? raw.queue : [],
    events: Array.isArray(raw?.events) ? raw.events : [],
    workflowRuns: Array.isArray(raw?.workflowRuns) ? raw.workflowRuns : [],
    chat: Array.isArray(raw?.chat) ? raw.chat : [],
    reports: Array.isArray(raw?.reports) ? raw.reports : [],
    knowledgeAssets: Array.isArray(raw?.knowledgeAssets) ? raw.knowledgeAssets : [],
    expenses: Array.isArray(raw?.expenses) ? raw.expenses : [],
    financeBudget: (raw?.financeBudget && typeof raw.financeBudget === "object")
      ? { ...DEFAULT_FINANCE_BUDGET, ...raw.financeBudget }
      : DEFAULT_FINANCE_BUDGET,
    agentLastRun: (raw?.agentLastRun && typeof raw.agentLastRun === "object") ? raw.agentLastRun : {},
  };
}

// ── Redis backend (Vercel / production) ──────────────────────────────────────

const REDIS_STATE_KEY = "sx:runtime-state";
let _redis: RedisType | null = null;

function shouldUseRedisBackend() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function getRedis(): Promise<RedisType> {
  if (!_redis) {
    const { Redis } = await import("@upstash/redis");
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _redis;
}

// ── File backend (local dev) ──────────────────────────────────────────────────

let _inMemoryFallbackState: PersistedRuntimeState = { ...EMPTY_STATE };

async function ensureStateFile() {
  try {
    await mkdir(path.dirname(HERMES_STATE_PATH), { recursive: true });
    try {
      await readFile(HERMES_STATE_PATH, "utf8");
    } catch {
      logger.info({ path: HERMES_STATE_PATH }, "State file not found — initialising with empty state");
      await writeFile(HERMES_STATE_PATH, `${JSON.stringify(EMPTY_STATE, null, 2)}\n`, "utf8");
    }
  } catch (err) {
    logger.warn({ err, path: HERMES_STATE_PATH }, "Failed to ensure state file in read-only environment. Operating in-memory.");
  }
}

// ── Unified read / write ──────────────────────────────────────────────────────

async function readPersistedState(): Promise<PersistedRuntimeState> {
  if (shouldUseRedisBackend()) {
    try {
      const redis = await getRedis();
      const raw = await redis.get<PersistedRuntimeState>(REDIS_STATE_KEY);
      return normalizePersistedState(raw);
    } catch (err) {
      logger.error({ err }, "Redis read failed — returning empty state");
      return { ...EMPTY_STATE };
    }
  }

  try {
    await ensureStateFile();
    const raw = await readFile(HERMES_STATE_PATH, "utf8");
    if (!raw.trim()) {
      await writePersistedState(EMPTY_STATE);
      return { ...EMPTY_STATE };
    }

    try {
      const parsed = normalizePersistedState(JSON.parse(raw) as Partial<PersistedRuntimeState>);
      _inMemoryFallbackState = parsed;
      return parsed;
    } catch {
      logger.warn({ path: HERMES_STATE_PATH }, "State file was invalid JSON — resetting to empty state");
      await writePersistedState(EMPTY_STATE);
      return { ...EMPTY_STATE };
    }
  } catch (err) {
    logger.warn({ err, path: HERMES_STATE_PATH }, "Read-only filesystem encountered or file read failed — returning in-memory state");
    return _inMemoryFallbackState;
  }
}

async function writePersistedState(state: PersistedRuntimeState) {
  _inMemoryFallbackState = state;

  if (shouldUseRedisBackend()) {
    try {
      const redis = await getRedis();
      await redis.set(REDIS_STATE_KEY, state);
    } catch (err) {
      logger.error({ err }, "Redis write failed");
    }
    return;
  }

  try {
    await writeFile(HERMES_STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  } catch (err) {
    logger.warn({ err, path: HERMES_STATE_PATH }, "Failed to write persisted state in read-only filesystem. Updated in-memory only.");
  }
}

function pushEvent(state: PersistedRuntimeState, event: AgentEvent) {
  state.events = [event, ...state.events].slice(0, 20);
  publishEvent(event);
}

export async function readDashboard(): Promise<DashboardPayload> {
  const [state, agents, councilBrief] = await Promise.all([readPersistedState(), buildHermesAgents(), buildCouncilBrief()]);
  const chat = state.chat.length > 0 ? state.chat : await buildBootstrapChat();
  const dashboard = createEmptyDashboard(agents, councilBrief, chat);

  dashboard.summary.monthlyReceived = state.monthlyReceived;
  dashboard.summary.survivalTarget = state.survivalTarget ?? 3000;
  dashboard.summary.slotsUsed = state.slotsUsed;
  dashboard.summary.activeDeals = state.pipeline.length;
  dashboard.summary.activeAgents = agents.filter((agent) => agent.status === "ACTIVE").length;
  dashboard.audits = state.audits;
  dashboard.pipeline = state.pipeline;
  dashboard.prospects = state.prospects;
  dashboard.orders = state.orders;
  dashboard.queue = state.queue;
  dashboard.events = state.events;
  dashboard.workflowRuns = state.workflowRuns;
  dashboard.chat = chat;
  dashboard.toolkit = seededToolkit.map((item) => ({ ...item }));
  dashboard.knowledge = knowledgeContent.map((item) => ({ ...item }));
  dashboard.reports = state.reports;
  dashboard.knowledgeAssets = state.knowledgeAssets;
  dashboard.expenses = state.expenses;
  dashboard.financeBudget = state.financeBudget;
  return dashboard;
}

export async function listAudits() {
  return (await readPersistedState()).audits;
}

export async function listPipeline() {
  return (await readPersistedState()).pipeline;
}

export async function listAgents() {
  return buildHermesAgents();
}

export async function listQueue() {
  return (await readPersistedState()).queue;
}

export async function listProspects() {
  return (await readPersistedState()).prospects;
}

export async function listOrders() {
  return (await readPersistedState()).orders;
}

export function listToolkit() {
  return seededToolkit.map((item) => ({ ...item }));
}

export function getToolkitDocument(id: string) {
  return seededToolkit.find((doc) => doc.id === id) ?? null;
}

export function listKnowledge() {
  return knowledgeContent.map((item) => ({ ...item }));
}

export function getKnowledgeDocument(id: string) {
  return knowledgeContent.find((doc) => doc.id === id) ?? null;
}

export async function listWorkflowRuns() {
  return (await readPersistedState()).workflowRuns;
}

export async function appendChatMessage(message: ChatMessage) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.chat.push(message);
    await writePersistedState(state);
    logger.debug({ messageId: message.id, role: message.role }, "Chat message appended");
  });
}

export async function listKnowledgeAssets() {
  return (await readPersistedState()).knowledgeAssets;
}

export async function listExpenses() {
  const state = await readPersistedState();
  return {
    expenses: state.expenses,
    budget: state.financeBudget,
    monthlyReceived: state.monthlyReceived,
  };
}

export async function addExpense(expense: BusinessExpense) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.expenses = [expense, ...state.expenses];
    pushEvent(state, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sourceAgent: "Finance",
      eventType: "finance.updated",
      payloadSummary: `${expense.name} added to business expenses.`,
      relatedEntityIds: [expense.id],
    });
    await writePersistedState(state);
    logger.info({ expenseId: expense.id, name: expense.name }, "Expense added");
  });
}

export async function updateExpense(expenseId: string, patch: Partial<BusinessExpense>) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    let updatedName = expenseId;
    state.expenses = state.expenses.map((expense) => {
      if (expense.id !== expenseId) return expense;
      updatedName = patch.name ?? expense.name;
      return { ...expense, ...patch, id: expense.id, createdAt: expense.createdAt, updatedAt: new Date().toISOString() };
    });
    pushEvent(state, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sourceAgent: "Finance",
      eventType: "finance.updated",
      payloadSummary: `${updatedName} expense record updated.`,
      relatedEntityIds: [expenseId],
    });
    await writePersistedState(state);
    logger.info({ expenseId, patch }, "Expense updated");
  });
}

export async function removeExpense(expenseId: string) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.expenses = state.expenses.filter((expense) => expense.id !== expenseId);
    pushEvent(state, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sourceAgent: "Finance",
      eventType: "finance.updated",
      payloadSummary: "Expense removed from business finance ledger.",
      relatedEntityIds: [expenseId],
    });
    await writePersistedState(state);
    logger.info({ expenseId }, "Expense removed");
  });
}

export async function updateFinanceBudget(patch: Partial<FinanceBudget>) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.financeBudget = {
      ...state.financeBudget,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    pushEvent(state, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sourceAgent: "Finance",
      eventType: "finance.updated",
      payloadSummary: "Business finance budget updated.",
      relatedEntityIds: [],
    });
    await writePersistedState(state);
    logger.info({ patch }, "Finance budget updated");
  });
}

export async function addKnowledgeAsset(asset: KnowledgeAsset) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.knowledgeAssets = [asset, ...state.knowledgeAssets].slice(0, 100);
    pushEvent(state, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sourceAgent: "Vault",
      eventType: "vault.ingested",
      payloadSummary: `${asset.name} ingested for Hermes context.`,
      relatedEntityIds: [asset.id],
    });
    await writePersistedState(state);
    logger.info({ assetId: asset.id, name: asset.name, status: asset.status }, "Knowledge asset ingested");
  });
}

export async function addAudit(audit: Audit, workflowRun: WorkflowRun) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.audits = [audit, ...state.audits];
    state.workflowRuns = [workflowRun, ...state.workflowRuns];
    state.slotsUsed += 1;
    await writePersistedState(state);
    logger.info({ auditId: audit.id, workflowId: workflowRun.id, accountName: audit.accountName }, "Audit created");
  });
}

export async function replaceWorkflowRun(workflowRun: WorkflowRun) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.workflowRuns = state.workflowRuns.map((run) => (run.id === workflowRun.id ? workflowRun : run));
    await writePersistedState(state);
    logger.debug({ workflowId: workflowRun.id, status: workflowRun.status }, "Workflow run updated");
  });
}

export async function updateAudit(auditId: string, updater: (audit: Audit) => Audit) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.audits = state.audits.map((audit) => (audit.id === auditId ? updater(audit) : audit));
    await writePersistedState(state);
    logger.debug({ auditId }, "Audit updated");
  });
}

export async function addQueueItem(queueItem: QueueItem) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.queue = [queueItem, ...state.queue];
    await writePersistedState(state);
    logger.info({ queueId: queueItem.id, type: queueItem.type }, "Queue item added");
  });
}

export async function removeQueueItem(queueId: string) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.queue = state.queue.filter((item) => item.id !== queueId);
    await writePersistedState(state);
    logger.debug({ queueId }, "Queue item removed");
  });
}

export async function emitDomainEvent(
  sourceAgent: string,
  eventType: AgentEvent["eventType"],
  payloadSummary: string,
  relatedEntityIds: string[]
) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    const event: AgentEvent = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sourceAgent,
      eventType,
      payloadSummary,
      relatedEntityIds
    };
    pushEvent(state, event);
    await writePersistedState(state);
    logger.info({ eventId: event.id, eventType, sourceAgent }, "Domain event emitted");
  });
}

export async function addProspect(prospect: Prospect) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.prospects = [prospect, ...state.prospects];
    await writePersistedState(state);
    logger.info({ prospectId: prospect.id, name: prospect.name }, "Prospect added");
  });
}

export async function addOrder(order: ClientOrder) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.orders = [order, ...state.orders];
    state.queue = [
      {
        id: `Q-${crypto.randomUUID()}`,
        type: "ORDER REVIEW",
        urgency: "urgent",
        requiredAction: `Review new intake from ${order.customerName} at ${order.businessName}`,
        linkedEntityId: order.id,
        dueAt: order.submittedAt
      },
      ...state.queue
    ];
    const event: AgentEvent = {
      id: crypto.randomUUID(),
      timestamp: order.submittedAt,
      sourceAgent: "Intake",
      eventType: "intake.submitted",
      payloadSummary: `${order.customerName} submitted a ${order.packageName} order for ${order.businessName}`,
      relatedEntityIds: [order.id]
    };
    pushEvent(state, event);
    await writePersistedState(state);
    logger.info({ orderId: order.id, customerName: order.customerName }, "Client order added");
  });
}

export async function addPipelineItem(item: PipelineItem) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.pipeline = [item, ...state.pipeline];
    await writePersistedState(state);
    logger.info({ pipelineId: item.id, prospectName: item.prospectName }, "Pipeline item added");
  });
}

export async function updateRevenue(patch: { monthlyReceived?: number; survivalTarget?: number }) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    if (patch.monthlyReceived !== undefined) state.monthlyReceived = patch.monthlyReceived;
    if (patch.survivalTarget !== undefined) state.survivalTarget = patch.survivalTarget;
    await writePersistedState(state);
    logger.info({ patch }, "Revenue targets updated");
  });
}

export async function resetStore() {
  return withStoreLock(async () => {
    await writePersistedState({ ...EMPTY_STATE });
    logger.warn("Store reset to empty state");
  });
}

// ── Orders ────────────────────────────────────────────────────────────────────

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.orders = state.orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    await writePersistedState(state);
    logger.info({ orderId, status }, "Order status updated");
  });
}

// ── Pipeline ──────────────────────────────────────────────────────────────────

export async function removePipelineItem(id: string) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.pipeline = state.pipeline.filter((item) => item.id !== id);
    await writePersistedState(state);
    logger.debug({ id }, "Pipeline item removed");
  });
}

export async function updatePipelineItem(
  id: string,
  patch: Partial<Pick<PipelineItem, "stage" | "temperature" | "value" | "ageInDays">>
) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.pipeline = state.pipeline.map((item) => (item.id === id ? { ...item, ...patch } : item));
    await writePersistedState(state);
    logger.debug({ id, patch }, "Pipeline item updated");
  });
}

// ── Prospects ─────────────────────────────────────────────────────────────────

export async function removeProspect(id: string) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.prospects = state.prospects.filter((p) => p.id !== id);
    await writePersistedState(state);
    logger.debug({ id }, "Prospect removed");
  });
}

// ── Audit Assets ──────────────────────────────────────────────────────────────

export async function addAssetToAudit(auditId: string, asset: DeliverableAsset) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.audits = state.audits.map((a) => {
      if (a.id !== auditId) return a;
      return { ...a, assets: [...(a.assets ?? []), asset] };
    });
    await writePersistedState(state);
    logger.info({ auditId, assetId: asset.id, name: asset.name }, "Asset added to audit");
  });
}

// ── Reports ───────────────────────────────────────────────────────────────────

export async function getReports(): Promise<AgentReport[]> {
  const state = await readPersistedState();
  return state.reports ?? [];
}

export async function addReport(report: AgentReport): Promise<void> {
  await withStoreLock(async () => {
    const state = await readPersistedState();
    state.reports = [report, ...(state.reports ?? [])];
    await writePersistedState(state);
  });
}

export async function updateReport(
  reportId: string,
  patch: Partial<Pick<AgentReport, "status" | "readAt" | "actionedAt">>
): Promise<void> {
  await withStoreLock(async () => {
    const state = await readPersistedState();
    state.reports = (state.reports ?? []).map(r =>
      r.id === reportId ? { ...r, ...patch } : r
    );
    await writePersistedState(state);
  });
}

export async function updateReportItem(
  reportId: string,
  itemId: string,
  patch: Partial<Pick<ReportItem, "status">>
): Promise<void> {
  await withStoreLock(async () => {
    const state = await readPersistedState();
    state.reports = (state.reports ?? []).map(r => {
      if (r.id !== reportId) return r;
      return {
        ...r,
        items: r.items.map(item =>
          item.id === itemId ? { ...item, ...patch } : item
        ),
      };
    });
    await writePersistedState(state);
  });
}

export async function updateAuditAsset(
  auditId: string,
  assetId: string,
  patch: Partial<DeliverableAsset>
) {
  return withStoreLock(async () => {
    const state = await readPersistedState();
    state.audits = state.audits.map((a) => {
      if (a.id !== auditId) return a;
      return {
        ...a,
        assets: (a.assets ?? []).map((asset) =>
          asset.id === assetId ? { ...asset, ...patch } : asset
        ),
      };
    });
    await writePersistedState(state);
    logger.debug({ auditId, assetId, patch }, "Audit asset updated");
  });
}

// ── Agent Run Tracking ────────────────────────────────────────────────────────

export async function recordAgentRun(agentId: "cfo" | "followup" | "outreach" | "research"): Promise<void> {
  await withStoreLock(async () => {
    const state = await readPersistedState();
    state.agentLastRun = {
      ...(state.agentLastRun ?? {}),
      [agentId]: new Date().toISOString(),
    };
    await writePersistedState(state);
  });
}

export async function getAgentLastRuns(): Promise<Partial<Record<"cfo" | "followup" | "outreach" | "research", string>>> {
  const state = await readPersistedState();
  return state.agentLastRun ?? {};
}
