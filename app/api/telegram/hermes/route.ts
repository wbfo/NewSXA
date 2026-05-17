import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { getHermesAdapter } from "@/lib/hermes/hermes-gateway";
import { logger } from "@/lib/server/logger";
import { getTelegramAllowedChatIds, isTelegramWebhookAuthorized } from "@/lib/telegram/config";
import { downloadTelegramFile, sendTelegramMessage } from "@/lib/telegram/client";
import { summarizeTelegramFile } from "@/lib/telegram/file-analysis";
import {
  extractPreferredAddress,
  getTelegramChatPreference,
  setTelegramPreferredAddress,
} from "@/lib/telegram/preferences";

const telegramPhotoSchema = z.object({
  file_id: z.string(),
  file_unique_id: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  file_size: z.number().optional(),
});

const telegramUpdateSchema = z.object({
  update_id: z.number().optional(),
  message: z.object({
    message_id: z.number().optional(),
    text: z.string().optional(),
    caption: z.string().optional(),
    photo: z.array(telegramPhotoSchema).optional(),
    document: z.object({
      file_id: z.string(),
      file_unique_id: z.string().optional(),
      file_name: z.string().optional(),
      mime_type: z.string().optional(),
      file_size: z.number().optional(),
    }).optional(),
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

function getLargestPhoto(photos: z.infer<typeof telegramPhotoSchema>[] | undefined) {
  if (!photos?.length) return null;
  return [...photos].sort((a, b) => (b.file_size ?? 0) - (a.file_size ?? 0))[0];
}

async function buildTelegramAttachmentSummaries(message: NonNullable<z.infer<typeof telegramUpdateSchema>["message"]>, prompt: string) {
  const files = [];
  const largestPhoto = getLargestPhoto(message.photo);

  if (largestPhoto) {
    files.push(downloadTelegramFile({
      fileId: largestPhoto.file_id,
      fileName: `telegram-photo-${largestPhoto.file_unique_id ?? largestPhoto.file_id}.jpg`,
      mimeType: "image/jpeg",
      size: largestPhoto.file_size,
    }));
  }

  if (message.document) {
    files.push(downloadTelegramFile({
      fileId: message.document.file_id,
      fileName: message.document.file_name,
      mimeType: message.document.mime_type,
      size: message.document.file_size,
    }));
  }

  const downloaded = await Promise.all(files);
  return Promise.all(downloaded.map((file) => summarizeTelegramFile(file, prompt)));
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
  const text = (message?.text ?? message?.caption ?? "").trim();
  const hasAttachment = Boolean(message?.photo?.length || message?.document);

  if (!chatId || (!text && !hasAttachment)) {
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
    const preferredAddress = extractPreferredAddress(text);

    if (preferredAddress && !hasAttachment) {
      await setTelegramPreferredAddress(chatId, preferredAddress);
      await sendTelegramMessage({
        chatId,
        text: `Understood, ${preferredAddress}. I’ll refer to you that way moving forward.`,
      });
      return jsonResponse({ ok: true });
    }

    const preference = await getTelegramChatPreference(chatId);
    const attachmentSummaries = await buildTelegramAttachmentSummaries(message, text);
    const attachmentContext = attachmentSummaries.length > 0
      ? [
          "TELEGRAM ATTACHMENTS:",
          ...attachmentSummaries.map((attachment, index) => [
            `Attachment ${index + 1}: ${attachment.name}`,
            `Type: ${attachment.type}`,
            `Size: ${attachment.size}`,
            attachment.analysis,
          ].join("\n")),
        ].join("\n\n")
      : "";

    const messageForHermes = preference?.preferredAddress
      ? [
          `Ola's preferred form of address in this Telegram chat is "${preference.preferredAddress}".`,
          `Use that address naturally when speaking directly to her.`,
          ``,
          attachmentContext,
          attachmentContext ? `` : "",
          text,
        ].join("\n")
      : [attachmentContext, text].filter(Boolean).join("\n\n");

    const result = await getHermesAdapter().sendMessage({
      message: messageForHermes,
      requestedBy: requester,
      source: "telegram",
      attachments: attachmentSummaries.map((attachment) => ({
        name: attachment.name,
        size: attachment.size,
        type: attachment.type,
      })),
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
