import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getServerAuth } from "@/lib/auth/server-auth";
import { removeExpense, updateExpense } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";

const patchExpenseSchema = z.object({
  name: z.string().min(1).max(160).optional(),
  vendor: z.string().max(160).optional(),
  category: z.enum(["AI_TOOLS", "HOSTING", "SOFTWARE", "MARKETING", "CONTRACTOR", "ADMIN", "TAX_LEGAL", "OPERATIONS", "OTHER"]).optional(),
  amount: z.number().min(0).optional(),
  billingCycle: z.enum(["monthly", "yearly", "weekly", "one-time"]).optional(),
  nextDueDate: z.string().max(40).optional(),
  paymentMethod: z.string().max(120).optional(),
  status: z.enum(["active", "paused", "cancelled", "overdue", "paid"]).optional(),
  decision: z.enum(["keep", "review", "cancel"]).optional(),
  owner: z.string().max(120).optional(),
  useCase: z.string().max(240).optional(),
  notes: z.string().max(1000).optional(),
  receiptUrl: z.string().max(500).optional(),
  relatedVaultAssetId: z.string().max(120).optional(),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = patchExpenseSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid expense patch body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await context.params;
  await updateExpense(id, parsed.data);
  return jsonResponse({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await context.params;
  await removeExpense(id);
  return jsonResponse({ ok: true });
}

