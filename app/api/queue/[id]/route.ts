import { jsonResponse } from "@/lib/api/responses";
import { removeQueueItem } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  try {
    await removeQueueItem(id);
    logger.info({ id }, "Queue item dismissed");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to dismiss queue item");
    return jsonResponse({ error: "Failed to dismiss queue item." }, { status: 500 });
  }
}
