import { jsonResponse } from "@/lib/api/responses";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";
import { runResearchAgent } from "@/lib/agents/runner";

function isCronAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${cronSecret}`;
}

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  const cronOk =
    request.headers.get("x-cron-secret") === process.env.CRON_SECRET;
  if (!isAdmin && !cronOk) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await runResearchAgent();
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Research scan failed");
    return jsonResponse({ error: "Research scan failed." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await runResearchAgent();
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Research scan failed (cron)");
    return jsonResponse({ error: "Research scan failed." }, { status: 500 });
  }
}
