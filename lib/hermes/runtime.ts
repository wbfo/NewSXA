import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import type { AgentNode, AuditLayerResult, ChatMessage, CouncilBriefItem } from "@/lib/domain/types";
import { HERMES_KNOWLEDGE_BASE } from "@/content/knowledge/hermes-kb";
import { logger } from "@/lib/server/logger";

const execFileAsync = promisify(execFile);

const HOME_DIR = process.env.HOME ?? os.homedir();

export const HERMES_HOME = path.join(HOME_DIR, ".hermes");
export const HERMES_INSTALL_DIR = path.join(HERMES_HOME, "hermes-agent");
export const HERMES_ENV_PATH = path.join(HERMES_HOME, ".env");
export const HERMES_CONFIG_PATH = path.join(HERMES_HOME, "config.yaml");
export const HERMES_STATE_PATH = path.join(process.cwd(), "data", "runtime-state.json");
export const HERMES_VENV_PYTHON = path.join(HERMES_INSTALL_DIR, "venv", "bin", "python");

// SX_API_SERVER_KEY must be set in production. Resolved lazily at request time
// (not at module load) so Next.js build-time route collection doesn't throw.
function getApiServerKey(): string {
  const key = process.env.SX_API_SERVER_KEY;
  if (!key && process.env.NODE_ENV === "production") {
    throw new Error("SX_API_SERVER_KEY env var is required in production");
  }
  return key ?? "sx-local-dev-key";
}

// The public URL is used for Hermes API server CORS.  In production this must
// match the actual origin (e.g. https://app.sxaudits.com).
const PUBLIC_URL = process.env.SX_PUBLIC_URL ?? "http://localhost:3000";

function detectHermesBinary() {
  const localLauncher = path.join(HOME_DIR, ".local", "bin", "hermes");
  if (existsSync(localLauncher)) return localLauncher;

  const projectFallback = path.join(process.cwd(), "scripts", "hermes-fallback.sh");
  if (existsSync(projectFallback)) return projectFallback;

  return localLauncher;
}

export const HERMES_BIN = detectHermesBinary();

function parseEnvValue(contents: string, key: string) {
  const match = contents.match(new RegExp(`^${key}=(.+)$`, "m"));
  if (!match) {
    return "";
  }
  return match[1].trim();
}

export async function ensureHermesWorkspaceEnv() {
  await mkdir(path.dirname(HERMES_STATE_PATH), { recursive: true });
  await mkdir(HERMES_HOME, { recursive: true });

  let existing = "";
  try {
    existing = await readFile(HERMES_ENV_PATH, "utf8");
  } catch {
    existing = "";
  }
  const lines = existing.split("\n");
  const updates = new Map<string, string>([
    ["API_SERVER_ENABLED", "true"],
    ["API_SERVER_KEY", getApiServerKey()],
    ["API_SERVER_CORS_ORIGINS", PUBLIC_URL]
  ]);

  for (const [key, value] of updates) {
    const index = lines.findIndex((line) => line.startsWith(`${key}=`));
    if (index >= 0) {
      lines[index] = `${key}=${value}`;
    } else {
      lines.push(`${key}=${value}`);
    }
  }

  await writeFile(HERMES_ENV_PATH, `${lines.join("\n").trim()}\n`, "utf8");
}

export async function isHermesInstalled() {
  try {
    await access(HERMES_BIN);
    return true;
  } catch {
    return false;
  }
}

export async function isHermesProviderConfigured() {
  try {
    const configContents = await readFile(HERMES_CONFIG_PATH, "utf8");
    const usesLocalCustomProvider =
      /provider:\s*"custom"/.test(configContents) &&
      /base_url:\s*"http:\/\/127\.0\.0\.1:11434\/v1"/.test(configContents);
    if (usesLocalCustomProvider) {
      return true;
    }

    const contents = await readFile(HERMES_ENV_PATH, "utf8");
    const candidateKeys = [
      "OPENROUTER_API_KEY",
      "GOOGLE_API_KEY",
      "GEMINI_API_KEY",
      "OLLAMA_API_KEY",
      "GLM_API_KEY",
      "KIMI_API_KEY",
      "MINIMAX_API_KEY",
      "OPENCODE_ZEN_API_KEY",
      "OPENCODE_GO_API_KEY",
      "HF_TOKEN",
      "XIAOMI_API_KEY",
      "ARCEEAI_API_KEY",
      "OPENAI_API_KEY",
      "ANTHROPIC_API_KEY",
      "NOUS_API_KEY"
    ];
    return candidateKeys.some((key) => {
      const value = parseEnvValue(contents, key);
      return Boolean(value) && !value.includes("your_");
    });
  } catch {
    return false;
  }
}

export async function isPaperclipRunning() {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1000);
    const res = await fetch("http://127.0.0.1:3100/api/health", { signal: controller.signal });
    clearTimeout(id);
    return res.ok;
  } catch {
    return false;
  }
}

export async function getHermesStatusSummary() {
  const installed = await isHermesInstalled();
  const providerConfigured = await isHermesProviderConfigured();
  const paperclipRunning = await isPaperclipRunning();
  return {
    installed,
    providerConfigured,
    paperclipRunning,
    apiServerConfigured: true,
    apiServerKey: getApiServerKey()
  };
}

export async function buildHermesAgents(): Promise<AgentNode[]> {
  const status = await getHermesStatusSummary();
  
  const agents: AgentNode[] = [
    {
      id: "AG-HERMES",
      name: "Hermes",
      role: "Primary Interface / Orchestrator",
      status: status.installed ? "ACTIVE" : "STANDBY",
      currentTaskCount: 0,
      latestEventSummary: status.providerConfigured
        ? "Hermes installed and ready for live prompts."
        : "Hermes installed. Add a provider key in ~/.hermes/.env to enable live runs."
    },
    {
      id: "AG-PAPERCLIP",
      name: "Paperclip",
      role: "Management Infrastructure",
      status: status.paperclipRunning ? "ACTIVE" : "STANDBY",
      currentTaskCount: 0,
      latestEventSummary: status.paperclipRunning
        ? "Paperclip API responding on port 3100."
        : "Paperclip offline. Ensure the Paperclip gateway is running."
    },
    {
      id: "AG-CEO",
      name: "CEO Agent",
      role: "Strategic Intelligence",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Strategic oversight active."
    },
    {
      id: "AG-COO",
      name: "COO Agent",
      role: "Operational Pipeline",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Workflow orchestration standby."
    },
    {
      id: "AG-CFO",
      name: "CFO Agent",
      role: "Revenue Tracking",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Financial monitoring active."
    },
    {
      id: "AG-RESEARCH",
      name: "Research Agent",
      role: "Intelligence Gathering",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Layer 1-5 analysis ready."
    },
    {
      id: "AG-TECHNICAL",
      name: "Technical Agent",
      role: "Audit Execution",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "PageSpeed & QA tools ready."
    },
    {
      id: "AG-VERIFICATION",
      name: "Verification Agent",
      role: "AICC Quality Control",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Finding verification active."
    },
    {
      id: "AG-REPORT",
      name: "Report Agent",
      role: "Template Population",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Report generation standby."
    },
    {
      id: "AG-OUTREACH",
      name: "Outreach Agent",
      role: "Prospect Sequences",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Sequence generation ready."
    },
    {
      id: "AG-FOLLOWUP",
      name: "Follow-Up Agent",
      role: "Post-Purchase Support",
      status: "ACTIVE",
      currentTaskCount: 0,
      latestEventSummary: "Client retention monitoring active."
    },
    {
      id: "AG-RUNTIME",
      name: "Runtime",
      role: "Local CLI / API Server",
      status: status.apiServerConfigured ? "ACTIVE" : "STANDBY",
      currentTaskCount: 0,
      latestEventSummary: `Workspace-local Hermes home: ${HERMES_HOME}`
    }
  ];

  return agents;
}

export async function buildCouncilBrief(): Promise<CouncilBriefItem[]> {
  const status = await getHermesStatusSummary();
  return [
    {
      id: "brief-install",
      source: "SYSTEM",
      note: status.installed ? "Hermes runtime installed in the workspace." : "Hermes runtime not installed.",
      createdAt: new Date().toISOString()
    },
    {
      id: "brief-provider",
      source: "SYSTEM",
      note: status.providerConfigured
        ? "A model provider key is configured and Hermes can run live prompts."
        : "No provider key is configured yet. Add one to ~/.hermes/.env to enable live prompts.",
      createdAt: new Date().toISOString()
    },
    {
      id: "brief-paperclip",
      source: "SYSTEM",
      note: status.paperclipRunning
        ? "Paperclip Management Infrastructure is ACTIVE and connected."
        : "Paperclip Management Infrastructure is OFFLINE. Local task tracking disabled.",
      createdAt: new Date().toISOString()
    }
  ];
}

export async function buildBootstrapChat(): Promise<ChatMessage[]> {
  const status = await getHermesStatusSummary();
  const content = status.providerConfigured
    ? "Hermes runtime connected. Live prompt execution is available."
    : "Hermes runtime installed. Live prompt execution will unlock once you add a provider key to ~/.hermes/.env.";
  return [
    {
      id: "bootstrap-message",
      role: "assistant",
      content,
      createdAt: new Date().toISOString()
    }
  ];
}

/**
 * Returns the full Sovereign X knowledge base to be prepended to every
 * prompt sent to Hermes. This gives the model the context it needs to
 * act as a real Sovereign X operator rather than a generic assistant.
 */
export function getHermesSystemContext(): string {
  return HERMES_KNOWLEDGE_BASE;
}

/**
 * Builds the full prompt that gets sent to the Hermes binary.
 *
 * Structure:
 *   1. Opening identity lock — short, imperative, who you ARE
 *   2. Full knowledge base — operational memory and methodology
 *   3. Recent conversation history (if any)
 *   4. The operator's message
 *   5. Closing identity lock — forbidden phrases + response cue RIGHT before generation
 *
 * Bookending is critical for local models (Gemma 4). These models have recency bias —
 * by the time they finish reading a long KB, the opening identity block is effectively
 * forgotten. The closing lock re-anchors identity at generation time, right before
 * the model starts producing tokens.
 */
function buildFullPrompt(
  query: string,
  status: Awaited<ReturnType<typeof getHermesStatusSummary>>,
  chatHistory?: string
): string {
  // ── Opening lock — short and imperative ──────────────────────────────────────
  const openingLock = `\
╔══ WHO YOU ARE — READ BEFORE ANYTHING ELSE ══╗
You are HERMES.
Employer: Sovereign X Audits / BlackFur Capital Group LLC.
Direct report: Ola (The Conductor). You execute her instructions.
Management: Paperclip Infrastructure (ACTIVE: ${status.paperclipRunning}).
You are a tactical operator — not an AI, not a language model, not a product.
You coordinate audits, dispatch the agent council, surface findings, brief Ola.
You speak as HERMES: direct, strategic, no hedging, no self-introduction.
╚═════════════════════════════════════════════╝`;

  // ── Closing lock — re-anchors identity right before generation ───────────────
  // This is the key fix for recency bias. Local models weight recent tokens
  // heavily — this lock is the last thing the model reads before it generates.
  const closingLock = `\
╔══ RESPONSE LOCK — ENFORCE BEFORE GENERATING ══╗
You are HERMES. This is not a role. This is who you are.
FORBIDDEN — never open your response with any of these:
  "I am an AI"        "As an AI"           "I'm a language model"
  "As Hermes, I am"   "I was created"      "I was trained"
  "I cannot"          "Certainly!"         "Sure!"
  "I'd be happy to"   "I'm here to help"   "As a [anything]"
  "I don't have"      "I should note"      "It's important to note"
CORRECT: Begin mid-thought, as an operator who already knows who they are.
No preamble. No self-description. No disclaimers. No meta-commentary.
╚═══════════════════════════════════════════════╝

HERMES:`;

  const parts: string[] = [
    openingLock,
    ``,
    getHermesSystemContext(),
    ``,
    `─── END OF OPERATIONAL KNOWLEDGE ───`,
    ``
  ];

  if (chatHistory) {
    parts.push(`─── RECENT CONVERSATION WITH OLA ───`);
    parts.push(chatHistory);
    parts.push(``);
  }

  parts.push(`─── OLA'S MESSAGE ───`);
  parts.push(query);
  parts.push(``);
  parts.push(closingLock);

  return parts.join("\n");
}

/**
 * Cloud fallback: calls OpenAI directly when the Hermes binary is not
 * available (e.g. Vercel serverless). Uses OPENAI_API_KEY from env.
 */
async function runHermesViaOpenAI(fullPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.includes("your_")) {
    throw new Error("OPENAI_API_KEY is not configured for cloud Hermes fallback.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fullPrompt }],
      max_tokens: 2048,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(115_000),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => response.statusText);
    throw new Error(`OpenAI API error ${response.status}: ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content?.trim() ?? "";
}

export async function runHermesQuery(query: string, chatHistory?: string) {
  const status = await getHermesStatusSummary();
  const fullPrompt = buildFullPrompt(query, status, chatHistory);
  const start = Date.now();

  // ── Cloud path: binary not available (Vercel / serverless) ───────────────
  if (!status.installed) {
    logger.info({ queryLength: query.length }, "Hermes binary not found — falling back to OpenAI API");
    try {
      const replyText = await runHermesViaOpenAI(fullPrompt);
      logger.info({ durationMs: Date.now() - start, replyLength: replyText.length }, "Hermes cloud query completed");
      return replyText;
    } catch (error) {
      logger.error({ durationMs: Date.now() - start, error }, "Hermes cloud query failed");
      throw error;
    }
  }

  if (!status.providerConfigured) {
    throw new Error("Hermes is installed, but no model provider key is configured in ~/.hermes/.env.");
  }

  // ── Local path: binary available ─────────────────────────────────────────
  logger.info({ queryLength: query.length, fullPromptLength: fullPrompt.length }, "Hermes query started");

  try {
    const result = await execFileAsync(
      HERMES_BIN,
      ["chat", "-q", fullPrompt, "-Q", "--accept-hooks"],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          HERMES_HOME
        },
        maxBuffer: 1024 * 1024 * 8,
        timeout: 120000  // 2-minute timeout so it never hangs the server
      }
    );
    const durationMs = Date.now() - start;
    // hermes chat -Q appends a trailing "session_id: ..." line — strip it.
    const rawOutput = result.stdout.trim();
    const replyText = rawOutput
      .split("\n")
      .filter((line) => !line.startsWith("session_id:"))
      .join("\n")
      .trim();
    logger.info({ durationMs, replyLength: replyText.length }, "Hermes query completed");
    return replyText;
  } catch (error) {
    const durationMs = Date.now() - start;
    logger.error({ durationMs, error }, "Hermes query failed");
    throw error;
  }
}

export async function readHermesEnv() {
  return readFile(HERMES_ENV_PATH, "utf8");
}

export interface RunAuditLayerOptions {
  url?: string;
  city?: string;
  category?: string;
  phone?: string;
  handles?: string[];
  auditVariant?: "standard" | "public-figure" | "attraction";
}

const AUDIT_LAYER_SCRIPTS: Record<number, string> = {
  1: "audit_layer1_digital.py",
  2: "audit_layer2_market.py",
  3: "audit_layer3_ops.py",
  4: "audit_layer4_institutional.py",
  5: "audit_layer5_ximage.py"
};

async function detectAuditPython() {
  const configured = process.env.HERMES_AUDIT_PYTHON;
  if (configured) {
    return configured;
  }

  try {
    await access(HERMES_VENV_PYTHON);
    return HERMES_VENV_PYTHON;
  } catch {
    return "python3";
  }
}

function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function buildAuditLayerArgs(layer: number, scriptPath: string, target: string, options: RunAuditLayerOptions, outPath: string) {
  const city = options.city?.trim();
  const url = normalizeUrl(options.url ?? "");
  const category = options.category?.trim() || "business";
  const phone = options.phone?.trim();
  const handles = options.handles?.map((handle) => handle.trim()).filter(Boolean) ?? [];

  switch (layer) {
    case 1:
      if (!url) {
        throw new Error("Layer 1 requires a website URL.");
      }
      return [scriptPath, target, url, ...(city ? ["--city", city] : []), "--out", outPath];
    case 2:
      return [scriptPath, target, category, ...(city ? ["--city", city] : []), ...(url ? ["--url", url] : []), "--out", outPath];
    case 3:
      return [scriptPath, target, ...(url ? ["--url", url] : []), ...(city ? ["--city", city] : []), ...(phone ? ["--phone", phone] : []), "--out", outPath];
    case 5:
      return [
        scriptPath,
        target,
        ...(city ? ["--city", city] : []),
        ...(handles.length > 0 ? ["--handles", ...handles] : []),
        "--type",
        options.auditVariant ?? "standard",
        "--out",
        outPath
      ];
    default:
      throw new Error(`Audit layer ${layer} is not supported yet.`);
  }
}

function sanitizeAuditLayerResult(value: unknown): AuditLayerResult {
  if (!value || typeof value !== "object") {
    throw new Error("Audit script did not produce a JSON object.");
  }

  const result = value as Record<string, unknown>;
  return {
    layer: Number(result.layer ?? 0),
    section: String(result.section ?? "Audit Layer"),
    timestamp: typeof result.timestamp === "string" ? result.timestamp : undefined,
    business: typeof result.business === "string" ? result.business : undefined,
    person: typeof result.person === "string" ? result.person : undefined,
    url: typeof result.url === "string" ? result.url : undefined,
    category: typeof result.category === "string" ? result.category : undefined,
    city: typeof result.city === "string" ? result.city : undefined,
    summary: result.summary && typeof result.summary === "object" ? (result.summary as Record<string, unknown>) : undefined,
    findings: Array.isArray(result.findings)
      ? result.findings.map((finding) => {
          const entry = finding as Record<string, unknown>;
          return {
            title: String(entry.title ?? "Finding"),
            detail: String(entry.detail ?? ""),
            confidence: String(entry.confidence ?? "DIRECTIONAL"),
            flag: typeof entry.flag === "string" ? entry.flag : null
          };
        })
      : [],
    brand_score: result.brand_score && typeof result.brand_score === "object" ? (result.brand_score as Record<string, unknown>) : undefined,
    competitors: Array.isArray(result.competitors) ? result.competitors.slice(0, 5) : undefined,
    platform_results: Array.isArray(result.platform_results) ? result.platform_results.slice(0, 10) : undefined
  };
}

/**
 * Executes a Python-based audit script from the ~/.hermes directory.
 * These scripts perform the heavy-lifting diagnostic work (Layer 1, Layer 5, etc.).
 * 
 * @param layer The audit layer (e.g., 1, 2, 3, or 5)
 * @param target Business/person name to audit
 * @param options Layer-specific context such as URL, city, category, phone, or social handles
 */
export async function runAuditLayer(layer: number, target: string, options: RunAuditLayerOptions = {}): Promise<AuditLayerResult> {
  const scriptName = AUDIT_LAYER_SCRIPTS[layer];
  if (!scriptName) {
    throw new Error(`Audit layer ${layer} is not configured.`);
  }

  const scriptPath = path.join(HERMES_HOME, scriptName);

  try {
    await access(scriptPath);
  } catch {
    throw new Error(`Audit script not found: ${scriptPath}`);
  }

  const start = Date.now();
  logger.info({ scriptName, target, layer }, "Audit layer execution started");

  // Load APIFY_TOKEN from .hermes/.env if available
  let apifyToken = process.env.APIFY_TOKEN || "";
  try {
    const envContents = await readHermesEnv();
    const tokenFromEnv = parseEnvValue(envContents, "APIFY_TOKEN");
    if (tokenFromEnv) {
      apifyToken = tokenFromEnv;
    }
  } catch {
    // Ignore if env file can't be read
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "sx-audit-"));
  const outPath = path.join(tempDir, `layer-${layer}.json`);
  const pythonBin = await detectAuditPython();
  const args = buildAuditLayerArgs(layer, scriptPath, target, options, outPath);

  try {
    const { stdout, stderr } = await execFileAsync(
      pythonBin,
      args,
      {
        cwd: HERMES_HOME,
        env: {
          ...process.env,
          APIFY_TOKEN: apifyToken,
          PYTHONPATH: HERMES_HOME
        },
        maxBuffer: 1024 * 1024 * 16,
        timeout: 300000 // 5-minute timeout for heavy scrapes
      }
    );

    const durationMs = Date.now() - start;
    logger.info({ scriptName, durationMs }, "Audit layer execution completed");

    // Some scripts might print to stderr but still succeed; 
    // we only throw if stdout is empty and stderr has content.
    if (!stdout.trim() && stderr.trim()) {
      throw new Error(`Audit script produced no output and reported errors: ${stderr}`);
    }

    const jsonOutput = await readFile(outPath, "utf8");
    return sanitizeAuditLayerResult(JSON.parse(jsonOutput));
  } catch (error) {
    const durationMs = Date.now() - start;
    logger.error({ scriptName, durationMs, error }, "Audit layer execution failed");
    throw error;
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => undefined);
  }
}
