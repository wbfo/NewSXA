import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getHermesAdapter } from "@/lib/hermes/hermes-gateway";
import { logger } from "@/lib/server/logger";
import { getTelegramAllowedChatIds, isTelegramWebhookAuthorized } from "@/lib/telegram/config";
import { sendTelegramMessage } from "@/lib/telegram/client";

const telegramUpdateSchema = z.object({
  update_id: z.number().optional(),
  message: z.object({
    message_id: z.number().optional(),
    text: z.string().optional(),
    chat: z.object({
      id: z.number(),
      type: z.string().optional(),
    }),
    from: z.object({
      id: z.number().optional(),
      username: z.string().optional(),
      first_name: z.string().optional(),
    }).optional(),
  }).optional(),
});

function isAllowedChat(chatId: number) {
  const allowed = getTelegramAllowedChatIds();
  if (!allowed) return true;
  return allowed.has(String(chatId));
}

export async function POST(request: Request) {
  if (!isTelegramWebhookAuthorized(request)) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = telegramUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid Telegram webhook payload");
    return jsonResponse({ ok: true });
  }

  const message = parsed.data.message;
  const chatId = message?.chat.id;
  const text = message?.text?.trim();

  if (!chatId || !text) {
    return jsonResponse({ ok: true });
  }

  if (!isAllowedChat(chatId)) {
    logger.warn({ chatId }, "Telegram chat rejected by allowlist");
    return jsonResponse({ ok: true });
  }

  try {
    const requester = message.from?.username
      ? `telegram:${message.from.username}`
      : `telegram:${message.from?.id ?? chatId}`;

    const result = await getHermesAdapter().sendMessage({
      message: text,
      requestedBy: requester,
    });

    await sendTelegramMessage({
      chatId,
      text: result.reply.content,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error({ errorMessage, error }, "Telegram Hermes webhook failed");

    await sendTelegramMessage({
      chatId,
      text: `Hermes could not complete that request: ${errorMessage}`,
    }).catch((sendError) => {
      logger.error({ sendError }, "Telegram failure response could not be sent");
    });

    return jsonResponse({ ok: true });
  }
}

export function GET() {
  return jsonResponse({ ok: true, service: "telegram-hermes" });
}

