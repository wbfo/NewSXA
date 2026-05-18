import type { Audit, AuditLayerResult, ChatMessage, WorkflowRun, WorkflowStep, WorkflowType } from "@/lib/domain/types";
import type { HermesGatewayAdapter, StartWorkflowInput } from "@/lib/hermes/adapter";
import { ensureHermesWorkspaceEnv, runAuditLayer, runHermesQuery } from "@/lib/hermes/runtime";
import {
  addAudit,
  appendChatMessage,
  emitDomainEvent,
  listExpenses,
  listKnowledgeAssets,
  listWorkflowRuns,
  readDashboard,
  removeQueueItem,
  replaceWorkflowRun,
  updateAudit
} from "@/lib/server/store";
import { buildFinanceSummary, getMonthlyExpenseAmount } from "@/lib/finance/calculations";

/** Number of prior chat turns to include as context with every query. */
const CHAT_HISTORY_TURNS = 20;
const TELEGRAM_CHAT_HISTORY_TURNS = 8;

/** Formats the last N chat messages into a plain-text conversation block. */
function buildChatHistoryContext(messages: ChatMessage[], turns = CHAT_HISTORY_TURNS): string {
  return messages
    .filter((m) => !m.content.includes("TELEGRAM_BOT_MESSAGE:"))
    .slice(-turns)
    .map((m) => `${m.role === "user" ? "OPERATOR" : "HERMES"}: ${m.content}`)
    .join("\n");
}

function buildHermesMessagePrompt(input: {
  message: string;
  source?: "dashboard" | "telegram";
}) {
  if (input.source !== "telegram") {
    return input.message;
  }

  return [
    "TELEGRAM MESSAGE FROM OLA",
    "",
    "Treat the message below as the highest-priority current operator instruction.",
    "Respond directly to what Ola just said. Do not reset to a generic help greeting.",
    "If Ola gives a standing preference, name, correction, or instruction, acknowledge it and use it moving forward.",
    "If Ola is frustrated, answer the substance of the correction first.",
    "",
    "LATEST TELEGRAM MESSAGE:",
    input.message,
  ].join("\n");
}

function buildVaultContext(assets: Awaited<ReturnType<typeof listKnowledgeAssets>>) {
  const recentAssets = assets.slice(0, 8);
  if (recentAssets.length === 0) return "";

  return [
    "COMMAND CENTER VAULT CONTEXT:",
    "These are files/images Ola deliberately dumped into the Command Center for Hermes to use as working context.",
    ...recentAssets.map((asset, index) => [
      `Vault item ${index + 1}: ${asset.name}`,
      `Type: ${asset.mimeType}`,
      `Size: ${asset.size} bytes`,
      `Status: ${asset.status}`,
      `Uploaded: ${asset.uploadedAt}`,
      asset.summary,
    ].join("\n")),
  ].join("\n\n");
}

function buildFinanceContext(finance: Awaited<ReturnType<typeof listExpenses>>) {
  if (finance.expenses.length === 0) return "";

  const summary = buildFinanceSummary(finance.expenses, finance.budget, finance.monthlyReceived);
  const reviewItems = finance.expenses
    .filter((expense) => expense.decision !== "keep" || expense.status === "overdue")
    .slice(0, 8);

  return [
    "COMMAND CENTER FINANCE CONTEXT:",
    `Monthly revenue received: $${finance.monthlyReceived.toLocaleString()}`,
    `Monthly burn: $${Math.round(summary.monthlyBurn).toLocaleString()}`,
    `After expenses: $${Math.round(summary.afterExpenses).toLocaleString()}`,
    `Annualized burn: $${Math.round(summary.annualBurn).toLocaleString()}`,
    `Cash on hand: $${finance.budget.cashOnHand.toLocaleString()}`,
    `Expense ceiling: $${finance.budget.monthlyExpenseLimit.toLocaleString()}/mo`,
    reviewItems.length > 0 ? "Expenses needing review:" : "No expenses currently marked for review/cancel.",
    ...reviewItems.map((expense) => [
      `- ${expense.name} (${expense.vendor})`,
      `  Status: ${expense.status}; decision: ${expense.decision}; cycle: ${expense.billingCycle}`,
      `  Amount: $${expense.amount}; monthly equivalent: $${Math.round(getMonthlyExpenseAmount(expense))}`,
      expense.nextDueDate ? `  Next due: ${expense.nextDueDate}` : "",
      expense.useCase ? `  Use case: ${expense.useCase}` : "",
    ].filter(Boolean).join("\n")),
  ].join("\n");
}

function quoteWorkflowType(type: WorkflowType) {
  switch (type) {
    case "trigger-audit":
      return "Create an initial audit brief and next-step plan";
    case "dispatch-research":
      return "Dispatch research instructions and summarize the plan";
    case "run-verification":
      return "Run verification framing and list what must be checked";
    case "compile-report":
      return "Compile report outline and delivery steps";
    case "request-approval":
      return "Summarize what needs operator approval";
    case "trigger-outreach":
      return "Draft outreach guidance for the current prospect";
    default:
      return "Handle the requested workflow";
  }
}

/** Promo prices from the pricing sheet — used as the commercial value on creation. */
const AUDIT_PROMO_VALUE: Record<string, number> = {
  "Digital Standard": 500,
  "Digital Deep": 1500,
  "X Image Audit": 350,
  "Voice Agent": 1500
};

function getCommercialValue(auditType: string): number {
  return AUDIT_PROMO_VALUE[auditType] ?? 500;
}

function createAuditFromWorkflow(input: StartWorkflowInput): Audit {
  const auditType = (input.auditType as Audit["auditType"]) ?? "Digital Standard";
  return {
    id: `A-${crypto.randomUUID()}`,
    accountName: input.accountName ?? "Untitled Account",
    auditType,
    currentStage: "Queued for diagnostics",
    progress: 0,
    assignedAgent: "Hermes",
    status: "QUEUED",
    priority: "HIGH",
    commercialValue: getCommercialValue(auditType),
    websiteUrl: input.websiteUrl,
    location: input.city,
    category: input.category,
    phone: input.phone,
    socialHandle: input.socialHandle
  };
}

function createWorkflowRun(input: StartWorkflowInput, auditId?: string): WorkflowRun {
  return {
    id: `W-${crypto.randomUUID()}`,
    workflowType: input.workflowType,
    requestedBy: input.requestedBy,
    status: "running",
    currentStep: "Hermes Query",
    relatedAuditId: auditId,
    outputReferences: auditId ? [auditId] : [],
    stepHistory: [
      {
        id: crypto.randomUUID(),
        label: "Create local record",
        status: "completed",
        detail: "Audit and workflow record created in the workspace store."
      },
      {
        id: crypto.randomUUID(),
        label: "Hermes Query",
        status: "running",
        detail: "Waiting for the real Hermes runtime to answer."
      }
    ]
  };
}

function parseHandles(input?: string) {
  if (!input) {
    return [];
  }
  return input
    .split(/[,\s]+/)
    .map((handle) => handle.trim())
    .filter(Boolean);
}

function getAuditLayerPlan(auditType: Audit["auditType"]) {
  switch (auditType) {
    case "Digital Standard":
      return [1];
    case "Digital Deep":
      return [1, 2, 3];
    case "X Image Audit":
      return [5];
    default:
      return [];
  }
}

function layerLabel(layer: number) {
  switch (layer) {
    case 1:
      return "Layer 1 — Digital Surface";
    case 2:
      return "Layer 2 — Market Intelligence";
    case 3:
      return "Layer 3 — Operational Signals";
    case 5:
      return "Layer 5 — X Image";
    default:
      return `Layer ${layer}`;
  }
}

function summarizeLayerResult(result: AuditLayerResult) {
  const summary = result.summary
    ? Object.entries(result.summary)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join(" | ")
    : "No summary returned";
  const topFindings = result.findings
    .slice(0, 5)
    .map((finding) => `- [${finding.confidence}${finding.flag ? `/${finding.flag}` : ""}] ${finding.title}: ${finding.detail}`)
    .join("\n");

  return [`${result.section}`, `Summary: ${summary}`, topFindings].filter(Boolean).join("\n");
}

function summarizeAllFindings(results: AuditLayerResult[]) {
  if (results.length === 0) {
    return "";
  }

  return results.map(summarizeLayerResult).join("\n\n");
}

async function queryHermes(prompt: string, chatHistory?: string) {
  await ensureHermesWorkspaceEnv();
  return runHermesQuery(prompt, chatHistory);
}

class RealHermesAdapter implements HermesGatewayAdapter {
  async sendMessage(input: {
    message: string;
    requestedBy: string;
    source?: "dashboard" | "telegram";
    attachments?: { name: string; size: number; type: string }[];
  }) {
    let finalMessageContent = input.message;
    if (input.attachments && input.attachments.length > 0) {
      const attachmentsText = input.attachments.map(a => `[Attached file: ${a.name} (${Math.round(a.size/1024)}KB)]`).join("\n");
      finalMessageContent = finalMessageContent ? `${finalMessageContent}\n\n${attachmentsText}` : attachmentsText;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: finalMessageContent,
      createdAt: new Date().toISOString()
    };
    await appendChatMessage(userMessage);

    // Build conversation context from recent history (excluding the message just appended).
    const dashboard = await readDashboard();
    const priorMessages = dashboard.chat.filter((m) => m.id !== userMessage.id);
    const chatHistoryTurns = input.source === "telegram" ? TELEGRAM_CHAT_HISTORY_TURNS : CHAT_HISTORY_TURNS;
    const chatHistory = priorMessages.length > 0 ? buildChatHistoryContext(priorMessages, chatHistoryTurns) : undefined;

    const [vaultAssets, finance] = await Promise.all([listKnowledgeAssets(), listExpenses()]);
    const vaultContext = buildVaultContext(vaultAssets);
    const financeContext = buildFinanceContext(finance);
    const promptContent = [vaultContext, financeContext, finalMessageContent].filter(Boolean).join("\n\n");

    const replyText = await queryHermes(
      buildHermesMessagePrompt({ message: promptContent, source: input.source }),
      chatHistory
    );
    const reply: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: replyText,
      createdAt: new Date().toISOString()
    };
    await appendChatMessage(reply);
    await emitDomainEvent("Hermes", "chat.message", "Hermes answered a live prompt.", []);

    return { reply };
  }

  async startWorkflow(input: StartWorkflowInput) {
    const audit = createAuditFromWorkflow(input);
    const workflowRun = createWorkflowRun(input, audit.id);
    await addAudit(audit, workflowRun);
    await emitDomainEvent("Hermes", "workflow.started", `Requested ${input.workflowType} for ${audit.accountName}.`, [audit.id, workflowRun.id]);

    const diagnosticResults: AuditLayerResult[] = [];
    const layerPlan = input.workflowType === "trigger-audit" ? getAuditLayerPlan(audit.auditType) : [];

    if (layerPlan.length > 0) {
      const initialHermesStep = workflowRun.stepHistory.find((step) => step.label === "Hermes Query");
      if (initialHermesStep) {
        initialHermesStep.status = "queued";
        initialHermesStep.detail = "Waiting for audit diagnostics to finish.";
      }

      for (const [index, layer] of layerPlan.entries()) {
        const diagnosticStep: WorkflowStep = {
          id: crypto.randomUUID(),
          label: layerLabel(layer),
          status: "running",
          detail: `Executing ${layerLabel(layer)} Python audit script.`
        };

        workflowRun.currentStep = diagnosticStep.label;
        workflowRun.stepHistory.splice(workflowRun.stepHistory.length - 1, 0, diagnosticStep);
        await replaceWorkflowRun(workflowRun);
        await updateAudit(audit.id, (current) => ({
          ...current,
          currentStage: diagnosticStep.label,
          progress: Math.min(70, 15 + Math.round((index / Math.max(layerPlan.length, 1)) * 45)),
          assignedAgent: layer === 5 ? "Research Agent" : "Technical Agent",
          status: "IN PROGRESS"
        }));
        await emitDomainEvent("Hermes", "workflow.step", `${diagnosticStep.label} started for ${audit.accountName}.`, [audit.id, workflowRun.id]);

        try {
          const result = await runAuditLayer(layer, audit.accountName, {
            url: input.websiteUrl,
            city: input.city,
            category: input.category,
            phone: input.phone,
            handles: parseHandles(input.socialHandle),
            auditVariant: "standard"
          });

          diagnosticResults.push(result);
          diagnosticStep.status = "completed";
          diagnosticStep.detail = summarizeLayerResult(result);
          await updateAudit(audit.id, (current) => ({
            ...current,
            findings: diagnosticResults,
            diagnosticSummary: summarizeAllFindings(diagnosticResults),
            progress: Math.min(78, 25 + Math.round(((index + 1) / layerPlan.length) * 45))
          }));
          await emitDomainEvent("Hermes", "workflow.step", `${diagnosticStep.label} completed for ${audit.accountName}.`, [audit.id, workflowRun.id]);
        } catch (error) {
          diagnosticStep.status = "completed";
          diagnosticStep.detail = `Diagnostic not completed: ${error instanceof Error ? error.message : "Unknown audit script failure"}. Hermes briefing will continue with available context.`;
          await emitDomainEvent("Hermes", "workflow.step", `${diagnosticStep.label} did not complete for ${audit.accountName}.`, [audit.id, workflowRun.id]);
        }
      }

      workflowRun.currentStep = "Hermes Query";
      const briefingHermesStep = workflowRun.stepHistory.find((step) => step.label === "Hermes Query");
      if (briefingHermesStep) {
        briefingHermesStep.status = "running";
        briefingHermesStep.detail = diagnosticResults.length > 0
          ? "Briefing Hermes with captured audit findings."
          : "Briefing Hermes without captured diagnostics.";
      }
      await replaceWorkflowRun(workflowRun);
      await updateAudit(audit.id, (current) => ({
        ...current,
        currentStage: "Hermes Briefing",
        progress: diagnosticResults.length > 0 ? 82 : 45,
        findings: diagnosticResults,
        diagnosticSummary: summarizeAllFindings(diagnosticResults)
      }));

      if (diagnosticResults.length > 0) {
        await appendChatMessage({
          id: crypto.randomUUID(),
          role: "assistant",
          content: `[Audit Diagnostic Capture]\n${audit.accountName}\n${summarizeAllFindings(diagnosticResults)}`,
          createdAt: new Date().toISOString()
        });
      }
    }

    const auditFindings = summarizeAllFindings(diagnosticResults);

    const prompt = [
      `[Workflow Request]`,
      `Type: ${quoteWorkflowType(input.workflowType)}`,
      `Account: ${audit.accountName}`,
      `Audit type: ${audit.auditType}`,
      input.websiteUrl ? `Website URL: ${input.websiteUrl}` : "",
      input.city ? `City: ${input.city}` : "",
      input.category ? `Category: ${input.category}` : "",
      input.phone ? `Phone: ${input.phone}` : "",
      input.socialHandle ? `Social handle(s): ${input.socialHandle}` : "",
      auditFindings ? `\n[DIAGNOSTIC FINDINGS — INCORPORATE THESE]\n${auditFindings}\n` : "",
      `Instructions: ${auditFindings ? "Use the findings above to provide a data-backed brief for Ola. " : ""}Return a concise operator-facing update with next steps only.`
    ].filter(Boolean).join("\n");

    const hermesReply = await queryHermes(prompt);
    
    await updateAudit(audit.id, (current) => ({
      ...current,
      currentStage: "Hermes responded",
      progress: 100,
      status: "READY",
      assignedAgent: "Hermes"
    }));

    const completedRun: WorkflowRun = {
      ...workflowRun,
      status: "completed",
      currentStep: "Completed",
      stepHistory: workflowRun.stepHistory.map((step) => {
        if (step.label === "Hermes Query") {
          return { ...step, status: "completed", detail: hermesReply };
        }
        return step;
      })
    };

    await replaceWorkflowRun(completedRun);
    await appendChatMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      content: hermesReply,
      createdAt: new Date().toISOString()
    });
    await emitDomainEvent("Hermes", "workflow.completed", `Hermes completed ${input.workflowType} for ${audit.accountName}.`, [audit.id, workflowRun.id]);
    return completedRun;
  }

  async approveWorkflow(input: { workflowId: string }) {
    const dashboard = await readDashboard();
    const existing = dashboard.workflowRuns.find((run) => run.id === input.workflowId);
    if (!existing) {
      return null;
    }

    const approved: WorkflowRun = {
      ...existing,
      status: "completed",
      currentStep: "Completed",
      stepHistory: existing.stepHistory.map((step) =>
        step.status === "awaiting_approval" ? { ...step, status: "completed" } : step
      )
    };
    await replaceWorkflowRun(approved);
    if (existing.relatedAuditId) {
      await updateAudit(existing.relatedAuditId, (audit) => ({
        ...audit,
        currentStage: "Approved",
        progress: 100,
        status: "READY"
      }));
      await removeQueueItem(`approval-${existing.relatedAuditId}`);
    }
    await emitDomainEvent("Hermes", "workflow.approved", `Operator approved workflow ${input.workflowId}.`, [input.workflowId]);
    return approved;
  }

  async fetchActiveRuns() {
    return listWorkflowRuns();
  }
}

declare global {
   
  var __sx_hermes_gateway_v3__: RealHermesAdapter | undefined;
}

export function getHermesAdapter() {
  if (!globalThis.__sx_hermes_gateway_v3__) {
    globalThis.__sx_hermes_gateway_v3__ = new RealHermesAdapter();
  }
  return globalThis.__sx_hermes_gateway_v3__;
}
