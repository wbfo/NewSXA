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
});
