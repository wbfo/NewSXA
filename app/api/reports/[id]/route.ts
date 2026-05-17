import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { updateReport } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

const patchReportSchema = z.object({
  status: z.enum(["UNREAD", "READ", "APPROVED", "DISMISSED", "ARCHIVED"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const raw = await request.json().catch(() => null);
  const parsed = patchReportSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const patch: { status: typeof parsed.data.status; readAt?: string; actionedAt?: string } = {
    status: parsed.data.status,
  };
  if (parsed.data.status === "READ" || parsed.data.status === "APPROVED" || parsed.data.status === "DISMISSED" || parsed.data.status === "ARCHIVED") {
    if (parsed.data.status !== "READ") patch.actionedAt = new Date().toISOString();
    patch.readAt = new Date().toISOString();
  }

  try {
    await updateReport(id, patch);
    logger.info({ reportId: id, status: parsed.data.status }, "Report status updated");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to update report");
    return jsonResponse({ error: "Failed to update report." }, { status: 500 });
  }
}
