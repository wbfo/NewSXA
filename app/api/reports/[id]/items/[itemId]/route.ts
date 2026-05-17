import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { updateReportItem } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

const patchItemSchema = z.object({
  status: z.enum(["APPROVED", "DISMISSED"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id: reportId, itemId } = await params;
  const raw = await request.json().catch(() => null);
  const parsed = patchItemSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await updateReportItem(reportId, itemId, { status: parsed.data.status });
    logger.info({ reportId, itemId, status: parsed.data.status }, "Report item actioned");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to update report item");
    return jsonResponse({ error: "Failed to update report item." }, { status: 500 });
  }
}
