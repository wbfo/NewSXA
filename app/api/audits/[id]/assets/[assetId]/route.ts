import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { updateAuditAsset } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

const patchAssetSchema = z.object({
  status: z.enum(["Generated", "Internal Review", "Ready", "Sent"]),
  sentAt: z.string().optional(),
  driveLink: z.string().max(500).optional(),
  followUpTriggered: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; assetId: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id: auditId, assetId } = await params;
  const raw = await request.json().catch(() => null);
  const parsed = patchAssetSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await updateAuditAsset(auditId, assetId, parsed.data);
    logger.info({ auditId, assetId, status: parsed.data.status }, "Asset status updated");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to update asset");
    return jsonResponse({ error: "Failed to update asset." }, { status: 500 });
  }
}
