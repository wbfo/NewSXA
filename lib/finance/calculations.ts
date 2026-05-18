import type { BusinessExpense, ExpenseStatus, FinanceBudget } from "@/lib/domain/types";

const ACTIVE_STATUSES = new Set<ExpenseStatus>(["active", "overdue", "paid"]);

export function getMonthlyExpenseAmount(expense: Pick<BusinessExpense, "amount" | "billingCycle" | "status">) {
  if (!ACTIVE_STATUSES.has(expense.status)) return 0;

  switch (expense.billingCycle) {
    case "weekly":
      return expense.amount * 52 / 12;
    case "yearly":
      return expense.amount / 12;
    case "one-time":
      return expense.amount;
    case "monthly":
    default:
      return expense.amount;
  }
}

export function getAnnualExpenseAmount(expense: Pick<BusinessExpense, "amount" | "billingCycle" | "status">) {
  if (!ACTIVE_STATUSES.has(expense.status)) return 0;

  switch (expense.billingCycle) {
    case "weekly":
      return expense.amount * 52;
    case "yearly":
      return expense.amount;
    case "one-time":
      return expense.amount;
    case "monthly":
    default:
      return expense.amount * 12;
  }
}

export function buildFinanceSummary(expenses: BusinessExpense[], budget: FinanceBudget, monthlyReceived: number) {
  const monthlyBurn = expenses.reduce((sum, expense) => sum + getMonthlyExpenseAmount(expense), 0);
  const annualBurn = expenses.reduce((sum, expense) => sum + getAnnualExpenseAmount(expense), 0);
  const activeCount = expenses.filter((expense) => ACTIVE_STATUSES.has(expense.status)).length;
  const reviewCount = expenses.filter((expense) => expense.decision === "review").length;
  const cancelCount = expenses.filter((expense) => expense.decision === "cancel").length;
  const now = Date.now();
  const sevenDaysFromNow = now + 7 * 24 * 60 * 60 * 1000;
  const dueSoonCount = expenses.filter((expense) => {
    if (!expense.nextDueDate || !ACTIVE_STATUSES.has(expense.status)) return false;
    const dueAt = new Date(expense.nextDueDate).getTime();
    return Number.isFinite(dueAt) && dueAt >= now && dueAt <= sevenDaysFromNow;
  }).length;
  const afterExpenses = monthlyReceived - monthlyBurn;
  const runwayMonths = monthlyBurn > 0 ? budget.cashOnHand / monthlyBurn : null;

  return {
    monthlyBurn,
    annualBurn,
    activeCount,
    reviewCount,
    cancelCount,
    dueSoonCount,
    afterExpenses,
    runwayMonths,
  };
}

