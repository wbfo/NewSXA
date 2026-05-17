import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { addReport } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";
import type { AgentReport } from "@/lib/domain/types";

const reportItemSchema = z.object({
  type: z.enum(["PROSPECT", "PR_OPPORTUNITY", "COLLAB_LEAD", "SOCIAL_SIGNAL", "BRAND_AMPLIFIER"]),
  title: z.string().min(1).max(300),
  description: z.string().max(1000).default(""),
  url: z.string().max(500).optional(),
  handle: z.string().max(100).optional(),
  estimatedValue: z.string().max(50).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

const createReportSchema = z.object({
  agentId: z.string().min(1).max(100),
  agentName: z.string().min(1).max(100),
  reportType: z.enum(["OUTREACH_SCAN", "AUDIT_FINDINGS", "PR_OPPORTUNITIES", "APPROVAL_REQUEST", "STATUS_UPDATE"]),
  title: z.string().min(1).max(300),
  summary: z.string().max(500).default(""),
  body: z.string().max(5000).default(""),
  requiresApproval: z.boolean().default(false),
  items: z.array(reportItemSchema).default([]),
  tags: z.array(z.string().max(50)).default([]),
});

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const raw = await request.json().catch(() => null);
  const parsed = createReportSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const report: AgentReport = {
    id: `R-${crypto.randomUUID()}`,
    status: "UNREAD",
    createdAt: new Date().toISOString(),
    tags: parsed.data.tags,
    items: parsed.data.items.map(item => ({
      id: `RI-${crypto.randomUUID()}`,
      status: "PENDING" as const,
      ...item,
    })),
    agentId: parsed.data.agentId,
    agentName: parsed.data.agentName,
    reportType: parsed.data.reportType,
    title: parsed.data.title,
    summary: parsed.data.summary,
    body: parsed.data.body,
    requiresApproval: parsed.data.requiresApproval,
  };

  try {
    await addReport(report);
    logger.info({ reportId: report.id, agentId: report.agentId }, "Agent report created");
    return jsonResponse({ report });
  } catch (error) {
    logger.error({ error }, "Failed to create report");
    return jsonResponse({ error: "Failed to create report." }, { status: 500 });
  }
}
