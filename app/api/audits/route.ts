import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getHermesAdapter } from "@/lib/hermes/hermes-gateway";
import { listAudits } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";

const createAuditSchema = z.object({
  accountName: z.string().min(1, "accountName is required").max(200),
  auditType: z.enum(["Digital Standard", "Digital Deep", "X Image Audit", "Voice Agent"]),
  socialHandle: z.string().max(200).optional(),
  websiteUrl: z.string().max(300).optional(),
  city: z.string().max(120).optional(),
  category: z.string().max(120).optional(),
  phone: z.string().max(60).optional()
});

export async function GET() {
  const { user, isAdmin } = await getServerAuth();
  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const allAudits = await listAudits();

  if (isAdmin) {
    return jsonResponse(allAudits);
  }

  // Clients see only their own audits (matched by clientId = uid or email)
  const clientAudits = allAudits.filter(
    a => a.clientId === user.uid || a.clientId === user.email
  );
  return jsonResponse(clientAudits);
}

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = createAuditSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid audit request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const body = parsed.data;
  try {
    logger.info({ accountName: body.accountName, auditType: body.auditType }, "Audit workflow requested");
    const workflow = await getHermesAdapter().startWorkflow({
      workflowType: "trigger-audit",
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
    logger.error({ error }, "Audit workflow failed");
    return jsonResponse({ error: error instanceof Error ? error.message : "Hermes workflow failed." }, { status: 503 });
  }
}
