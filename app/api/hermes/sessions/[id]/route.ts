import { jsonResponse } from "@/lib/api/responses";
import { logger } from "@/lib/server/logger";
import { HERMES_BIN, HERMES_HOME } from "@/lib/hermes/runtime";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { getServerAuth } from "@/lib/auth/server-auth";

const execFileAsync = promisify(execFile);

export interface HermesMessage {
  id: number;
  session_id: string;
  role: string;
  content: string;
  timestamp: number;
  finish_reason: string | null;
}

/**
 * GET /api/hermes/sessions/[id]
 *
 * Returns the full message log for a specific Hermes session.
 * Exports via `hermes sessions export - --session-id <id>` which outputs JSONL.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;

  if (!/^\d{8}_\d{6}_[a-f0-9]+$/.test(id)) {
    return jsonResponse({ error: "Invalid session ID format" }, { status: 400 });
  }

  try {
    const result = await execFileAsync(
      HERMES_BIN,
      ["sessions", "export", "-", "--session-id", id],
      {
        env: { ...process.env, HERMES_HOME },
        maxBuffer: 1024 * 1024 * 16, // 16 MB — sessions can be large
        timeout: 30000,
      }
    );

    // Output is a single JSON object with session metadata + `messages` array
    const line = result.stdout.trim();
    const messages: HermesMessage[] = [];

    try {
      const parsed = JSON.parse(line) as {
        messages?: HermesMessage[];
        id?: string;
        title?: string;
        message_count?: number;
      };
      if (Array.isArray(parsed.messages)) {
        messages.push(...parsed.messages);
      }
    } catch {
      // If it fails as single object, try line-by-line JSONL fallback
      for (const l of line.split("\n").filter(Boolean)) {
        try {
          const obj = JSON.parse(l) as HermesMessage;
          if (obj.role) messages.push(obj);
        } catch { /* skip */ }
      }
    }

    logger.info({ sessionId: id, messageCount: messages.length }, "Hermes session exported");
    return jsonResponse({ sessionId: id, messages, total: messages.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error({ sessionId: id, error: msg }, "Failed to export Hermes session");
    return jsonResponse({ error: msg }, { status: 503 });
  }
}
