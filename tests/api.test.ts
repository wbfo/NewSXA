import { beforeEach, describe, expect, it, vi } from "vitest";
import type { WorkflowRun } from "@/lib/domain/types";

vi.mock("@/lib/hermes/hermes-gateway", () => ({
  getHermesAdapter: () => ({
    startWorkflow: async () =>
      ({
        id: "W-test",
        workflowType: "trigger-audit",
        requestedBy: "operator",
        status: "completed",
        currentStep: "Completed",
        outputReferences: [],
        stepHistory: [],
        relatedAuditId: "A-test"
      }) satisfies WorkflowRun
  })
}));

vi.mock("@/lib/auth/server-auth", () => ({
  getServerAuth: async () => ({
    user: {
      uid: "admin-test",
      email: "oaowbfo@gmail.com"
    },
    isAdmin: true
  })
}));

import { GET as getDashboard } from "@/app/api/dashboard/route";
import { POST as createAudit } from "@/app/api/audits/route";
import { GET as getToolkit } from "@/app/api/toolkit/[id]/route";
import { POST as uploadVaultFile } from "@/app/api/uploads/route";
import { POST as createExpense } from "@/app/api/finance/expenses/route";
import { PATCH as updateBudget } from "@/app/api/finance/budget/route";
import { resetStore } from "@/lib/server/store";

describe("api contracts", () => {
  beforeEach(async () => {
    await resetStore();
  });

  it("returns the dashboard payload", async () => {
    const response = await getDashboard();
    const payload = await response.json();
    expect(typeof payload.summary.month).toBe("string");
    expect(Array.isArray(payload.audits)).toBe(true);
  });

  it("creates audit requests with a structured response", async () => {
    const request = new Request("http://localhost/api/audits", {
      method: "POST",
      body: JSON.stringify({
        accountName: "Workflow Prospect",
        auditType: "Digital Standard"
      }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await createAudit(request);
    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload.workflow.workflowType).toBe("trigger-audit");
  });

  it("returns toolkit documents by id", async () => {
    const response = await getToolkit(new Request("http://localhost"), {
      params: Promise.resolve({ id: "research" })
    });
    const payload = await response.json();
    expect(payload.title).toBe("Research");
  });

  it("ingests text uploads into the Hermes vault", async () => {
    const file = new File(["Vault line one\nVault line two"], "vault-notes.txt", { type: "text/plain" });
    const formData = new FormData();
    formData.set("file", file);

    const response = await uploadVaultFile({
      formData: async () => formData,
    } as Request);
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.asset.name).toBe("vault-notes.txt");
    expect(payload.asset.summary).toContain("Vault line one");
  });

  it("tracks business finance expenses and budget settings", async () => {
    const expenseResponse = await createExpense(new Request("http://localhost/api/finance/expenses", {
      method: "POST",
      body: JSON.stringify({
        name: "OpenAI",
        vendor: "OpenAI",
        category: "AI_TOOLS",
        amount: 50,
        billingCycle: "monthly",
        nextDueDate: "2026-06-01",
        paymentMethod: "Business card",
        decision: "keep",
        useCase: "Hermes image and reasoning provider",
      }),
      headers: { "Content-Type": "application/json" },
    }));
    expect(expenseResponse.status).toBe(201);

    const budgetResponse = await updateBudget(new Request("http://localhost/api/finance/budget", {
      method: "PATCH",
      body: JSON.stringify({
        monthlyRevenueTarget: 5000,
        monthlyExpenseLimit: 1000,
        cashOnHand: 2500,
        taxReservePercent: 20,
      }),
      headers: { "Content-Type": "application/json" },
    }));
    expect(budgetResponse.status).toBe(200);

    const dashboardResponse = await getDashboard();
    const dashboard = await dashboardResponse.json();
    expect(dashboard.expenses).toHaveLength(1);
    expect(dashboard.expenses[0].name).toBe("OpenAI");
    expect(dashboard.financeBudget.monthlyRevenueTarget).toBe(5000);
  });
});
