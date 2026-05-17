import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { listPipeline, addPipelineItem } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";
import { getServerAuth } from "@/lib/auth/server-auth";

const createPipelineItemSchema = z.object({
  prospectName: z.string().min(1, "prospectName is required").max(200),
  stage: z.string().min(1, "stage is required").max(100),
  ageInDays: z.number().int().min(0).default(0),
  temperature: z.enum(["hot", "warm", "cool"]).default("warm"),
  value: z.number().min(0),
  offerType: z.string().max(100).default(""),
  relatedProspectId: z.string().default("")
});

export async function GET() {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  return jsonResponse(await listPipeline());
}

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  const raw = await request.json().catch(() => null);
  const parsed = createPipelineItemSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid pipeline item request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const item = {
    id: `D-${crypto.randomUUID()}`,
    ...parsed.data
  };

  try {
    await addPipelineItem(item);
    logger.info({ pipelineId: item.id, prospectName: item.prospectName }, "Pipeline item created");
    return jsonResponse({ item });
  } catch (error) {
    logger.error({ error }, "Failed to add pipeline item");
    return jsonResponse({ error: "Failed to add pipeline item." }, { status: 500 });
  }
}
