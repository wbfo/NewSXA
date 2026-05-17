import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { removePipelineItem, updatePipelineItem } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

const patchPipelineSchema = z.object({
  stage: z.string().max(100).optional(),
  temperature: z.enum(["hot", "warm", "cool"]).optional(),
  value: z.number().min(0).optional(),
  ageInDays: z.number().int().min(0).optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const raw = await request.json().catch(() => null);
  const parsed = patchPipelineSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await updatePipelineItem(id, parsed.data);
    logger.info({ id, patch: parsed.data }, "Pipeline item updated");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to update pipeline item");
    return jsonResponse({ error: "Failed to update pipeline item." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  try {
    await removePipelineItem(id);
    logger.info({ id }, "Pipeline item deleted");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to delete pipeline item");
    return jsonResponse({ error: "Failed to delete pipeline item." }, { status: 500 });
  }
}
