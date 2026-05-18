import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getServerAuth } from "@/lib/auth/server-auth";
import { updateFinanceBudget } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";

const budgetPatchSchema = z.object({
  monthlyRevenueTarget: z.number().min(0).optional(),
  monthlyExpenseLimit: z.number().min(0).optional(),
  cashOnHand: z.number().min(0).optional(),
  taxReservePercent: z.number().min(0).max(100).optional(),
});

export async function PATCH(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = budgetPatchSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid finance budget patch body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  await updateFinanceBudget(parsed.data);
  return jsonResponse({ ok: true });
}

