import { jsonResponse } from "@/lib/api/responses";
import { logger } from "@/lib/server/logger";
import { HERMES_BIN, HERMES_HOME } from "@/lib/hermes/runtime";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { getServerAuth } from "@/lib/auth/server-auth";

const execFileAsync = promisify(execFile);

export interface HermesSession {
  id: string;
  preview: string;
  lastActive: string;
  source: string;
  messageCount?: number;
}

/**
 * GET /api/hermes/sessions
 *
 * Returns the list of Hermes chat sessions by parsing `hermes sessions list`.
 * Proxies the data that used to live at the Hermes API server (127.0.0.1:9119/sessions),
 * keeping everything accessible from the Next.js dashboard without a separate process.
 *
 * Query params:
 *   ?limit=N  — max sessions to return (default 50)
 *   ?source=  — filter by source (cli, telegram, etc.)
 */
export async function GET(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "50", 10);
  const source = searchParams.get("source") ?? "";

  try {
    const args = ["sessions", "list", "--limit", String(limit)];
    if (source) args.push("--source", source);

    const result = await execFileAsync(HERMES_BIN, args, {
      env: { ...process.env, HERMES_HOME },
      maxBuffer: 1024 * 1024 * 4,
      timeout: 15000,
    });

    const sessions = parseSessionList(result.stdout);
    logger.info({ count: sessions.length }, "Hermes sessions listed");
    return jsonResponse({ sessions, total: sessions.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error({ error: msg }, "Failed to list Hermes sessions");
    return jsonResponse({ error: msg }, { status: 503 });
  }
}

/**
 * GET /api/hermes/sessions/[id]/messages
 * (handled via the [id] dynamic route — see sessions/[id]/route.ts)
 *
 * Here we also support ?id= as a query param for convenience.
 */

// ─── parser ──────────────────────────────────────────────────────────────────

function parseSessionList(raw: string): HermesSession[] {
  const sessions: HermesSession[] = [];
  const lines = raw.split("\n");

  for (const line of lines) {
    // Skip header/separator lines
    if (!line.trim() || line.startsWith("Preview") || line.startsWith("─")) continue;

    // Each data row format (fixed-width columns):
    // <preview (52 chars)>  <last_active (13)>  <source (6)>  <id>
    // We split on 2+ spaces to handle the column layout robustly.
    const parts = line.split(/\s{2,}/);
    if (parts.length < 4) continue;

    const preview = parts[0].replace(/[╔╗╚╝═║]/g, "").trim();
    const lastActive = parts[1]?.trim() ?? "";
    const source = parts[2]?.trim() ?? "cli";
    const id = parts[parts.length - 1]?.trim() ?? "";

    // Validate the ID looks like a Hermes session ID (YYYYMMDD_HHMMSS_XXXXXX)
    if (!/^\d{8}_\d{6}_[a-f0-9]+$/.test(id)) continue;

    sessions.push({ id, preview, lastActive, source });
  }

  return sessions;
}
