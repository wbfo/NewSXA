import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { addAssetToAudit } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";
import type { DeliverableAsset } from "@/lib/domain/types";

const createAssetSchema = z.object({
  name: z.string().min(1, "name is required").max(200),
  type: z.string().min(1, "type is required").max(100),
  driveLink: z.string().max(500).default(""),
  version: z.string().max(20).default("1.0"),
  status: z.enum(["Generated", "Internal Review", "Ready", "Sent"]).default("Internal Review"),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id: auditId } = await params;
  const raw = await request.json().catch(() => null);
  const parsed = createAssetSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const asset: DeliverableAsset = {
    id: `A-${crypto.randomUUID()}`,
    ...parsed.data,
  };

  try {
    await addAssetToAudit(auditId, asset);
    logger.info({ auditId, assetId: asset.id, name: asset.name }, "Asset added to audit");
    return jsonResponse({ asset });
  } catch (error) {
    logger.error({ error }, "Failed to add asset");
    return jsonResponse({ error: "Failed to add asset." }, { status: 500 });
  }
}
