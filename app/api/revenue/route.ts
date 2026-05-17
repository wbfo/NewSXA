import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { updateRevenue } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";
import { getServerAuth } from "@/lib/auth/server-auth";

const revenueSchema = z.object({
  monthlyReceived: z.number().min(0).optional(),
  survivalTarget: z.number().min(1).optional()
}).refine((data) => data.monthlyReceived !== undefined || data.survivalTarget !== undefined, {
  message: "At least one of monthlyReceived or survivalTarget is required"
});

export async function PATCH(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  const raw = await request.json().catch(() => null);
  const parsed = revenueSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid revenue patch body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await updateRevenue(parsed.data);
    logger.info({ patch: parsed.data }, "Revenue updated");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to update revenue");
    return jsonResponse({ error: "Failed to update revenue." }, { status: 500 });
  }
}
