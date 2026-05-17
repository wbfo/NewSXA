import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getHermesAdapter } from "@/lib/hermes/hermes-gateway";
import { logger } from "@/lib/server/logger";
import { getServerAuth } from "@/lib/auth/server-auth";

const chatSchema = z.object({
  message: z.string().max(32000, "message must be 32000 characters or fewer").optional(),
  attachments: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string()
  })).optional()
}).refine(data => (data.message && data.message.trim().length > 0) || (data.attachments && data.attachments.length > 0), {
  message: "message or attachments is required"
});

export async function POST(request: Request) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const raw = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid chat request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const { message, attachments } = parsed.data;
  try {
    logger.info({ messageLength: message?.length ?? 0, attachmentsCount: attachments?.length ?? 0 }, "Hermes chat message received");
    const result = await getHermesAdapter().sendMessage({ message: message || "", requestedBy: "operator", attachments });
    return jsonResponse(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error({ errorMessage, errorStack, error }, "Hermes chat failed");
    return jsonResponse({ error: errorMessage }, { status: 503 });
  }
}
