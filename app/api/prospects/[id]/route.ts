import { jsonResponse } from "@/lib/api/responses";
import { removeProspect } from "@/lib/server/store";
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
    await removeProspect(id);
    logger.info({ id }, "Prospect deleted");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to delete prospect");
    return jsonResponse({ error: "Failed to delete prospect." }, { status: 500 });
  }
}
