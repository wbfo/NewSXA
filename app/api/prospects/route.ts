import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { listProspects, addProspect } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";
import { getServerAuth } from "@/lib/auth/server-auth";

const createProspectSchema = z.object({
  name: z.string().min(1, "name is required").max(200),
  contactPoints: z.string().max(500).default(""),
  serviceInterest: z.string().max(200).default(""),
  play: z.string().max(1000).default(""),
  priority: z.enum(["CRITICAL", "HIGH", "IMMEDIATE", "MEDIUM", "LOW"]).default("HIGH"),
  estimatedValue: z.string().max(100).default(""),
  relatedAuditIds: z.array(z.string()).default([]),
  relatedPipelineIds: z.array(z.string()).default([])
});

export async function GET() {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  return jsonResponse(await listProspects());
}

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  const raw = await request.json().catch(() => null);
  const parsed = createProspectSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid prospect request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const prospect = {
    id: `P-${crypto.randomUUID()}`,
    ...parsed.data
  };

  try {
    await addProspect(prospect);
    logger.info({ prospectId: prospect.id, name: prospect.name }, "Prospect created");
    return jsonResponse({ prospect });
  } catch (error) {
    logger.error({ error }, "Failed to add prospect");
    return jsonResponse({ error: "Failed to add prospect." }, { status: 500 });
  }
}
