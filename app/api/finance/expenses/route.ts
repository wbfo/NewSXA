import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getServerAuth } from "@/lib/auth/server-auth";
import { addExpense, listExpenses } from "@/lib/server/store";
import { buildFinanceSummary } from "@/lib/finance/calculations";
import { logger } from "@/lib/server/logger";
import type { BusinessExpense } from "@/lib/domain/types";

const expenseSchema = z.object({
  name: z.string().min(1).max(160),
  vendor: z.string().max(160).optional(),
  category: z.enum(["AI_TOOLS", "HOSTING", "SOFTWARE", "MARKETING", "CONTRACTOR", "ADMIN", "TAX_LEGAL", "OPERATIONS", "OTHER"]),
  amount: z.number().min(0),
  billingCycle: z.enum(["monthly", "yearly", "weekly", "one-time"]),
  nextDueDate: z.string().max(40).optional(),
  paymentMethod: z.string().max(120).optional(),
  status: z.enum(["active", "paused", "cancelled", "overdue", "paid"]).default("active"),
  decision: z.enum(["keep", "review", "cancel"]).default("review"),
  owner: z.string().max(120).optional(),
  useCase: z.string().max(240).optional(),
  notes: z.string().max(1000).optional(),
  receiptUrl: z.string().max(500).optional(),
  relatedVaultAssetId: z.string().max(120).optional(),
});

export async function GET() {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const { expenses, budget, monthlyReceived } = await listExpenses();
  return jsonResponse({
    expenses,
    budget,
    summary: buildFinanceSummary(expenses, budget, monthlyReceived),
  });
}

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = expenseSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid expense request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const now = new Date().toISOString();
  const expense: BusinessExpense = {
    id: `EXP-${crypto.randomUUID()}`,
    name: parsed.data.name,
    vendor: parsed.data.vendor ?? parsed.data.name,
    category: parsed.data.category,
    amount: parsed.data.amount,
    billingCycle: parsed.data.billingCycle,
    nextDueDate: parsed.data.nextDueDate,
    paymentMethod: parsed.data.paymentMethod,
    status: parsed.data.status,
    decision: parsed.data.decision,
    owner: parsed.data.owner,
    useCase: parsed.data.useCase,
    notes: parsed.data.notes,
    receiptUrl: parsed.data.receiptUrl,
    relatedVaultAssetId: parsed.data.relatedVaultAssetId,
    createdAt: now,
    updatedAt: now,
  };

  await addExpense(expense);
  return jsonResponse({ expense }, { status: 201 });
}

