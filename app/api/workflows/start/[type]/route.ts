import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import type { WorkflowType } from "@/lib/domain/types";
import { getHermesAdapter } from "@/lib/hermes/hermes-gateway";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

const VALID_WORKFLOW_TYPES: WorkflowType[] = [
  "trigger-audit",
  "dispatch-research",
  "run-verification",
  "compile-report",
  "request-approval",
  "trigger-outreach"
];

const startWorkflowSchema = z.object({
  accountName: z.string().max(200).optional(),
  auditType: z.string().max(100).optional(),
  socialHandle: z.string().max(200).optional(),
  websiteUrl: z.string().max(300).optional(),
  city: z.string().max(120).optional(),
  category: z.string().max(120).optional(),
  phone: z.string().max(60).optional()
});

export async function POST(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const { type } = await params;

  if (!VALID_WORKFLOW_TYPES.includes(type as WorkflowType)) {
    return jsonResponse({ error: `Unknown workflow type: ${type}` }, { status: 400 });
  }

  const raw = await request.json().catch(() => ({}));
  const parsed = startWorkflowSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid start-workflow request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const body = parsed.data;
  try {
    logger.info({ workflowType: type, accountName: body.accountName }, "Workflow start requested");
    const workflow = await getHermesAdapter().startWorkflow({
      workflowType: type as WorkflowType,
      requestedBy: "operator",
      accountName: body.accountName,
      auditType: body.auditType,
      socialHandle: body.socialHandle,
      websiteUrl: body.websiteUrl,
      city: body.city,
      category: body.category,
      phone: body.phone
    });
    return jsonResponse({ workflow });
  } catch (error) {
    logger.error({ error, workflowType: type }, "Workflow start failed");
    return jsonResponse({ error: error instanceof Error ? error.message : "Hermes workflow failed." }, { status: 503 });
  }
}
