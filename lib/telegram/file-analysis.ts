import { Buffer } from "node:buffer";
import type { DownloadedTelegramFile } from "@/lib/telegram/client";

export interface TelegramAttachmentSummary {
  name: string;
  size: number;
  type: string;
  analysis: string;
}

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(mimeType: string) {
  return mimeType.startsWith("image/");
}

function arrayBufferToBase64(bytes: ArrayBuffer) {
  return Buffer.from(bytes).toString("base64");
}

async function analyzeImageWithOpenAI(file: DownloadedTelegramFile, prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !isImage(file.mimeType)) return null;

  const model = process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini";
  const dataUrl = `data:${file.mimeType};base64,${arrayBufferToBase64(file.bytes)}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: [
                "Analyze this Telegram image for Hermes.",
                "Describe the visible content, important text, interface state, errors, and anything operationally relevant.",
                `User caption/context: ${prompt || "No caption provided."}`,
              ].join("\n"),
            },
            {
              type: "image_url",
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
      max_tokens: 700,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`OpenAI vision analysis failed: ${response.status} ${body}`);
  }

  const payload = await response.json() as {
    choices?: { message?: { content?: string } }[];
  };
  return payload.choices?.[0]?.message?.content?.trim() || null;
}

export async function summarizeTelegramFile(file: DownloadedTelegramFile, prompt: string): Promise<TelegramAttachmentSummary> {
  const base = `${file.fileName} (${file.mimeType}, ${formatBytes(file.size)})`;

  let analysis: string;
  if (isImage(file.mimeType)) {
    const visionSummary = await analyzeImageWithOpenAI(file, prompt);
    analysis = visionSummary
      ? `Vision analysis for ${base}:\n${visionSummary}`
      : [
          `Image received: ${base}.`,
          "No vision provider is configured, so Hermes can see the image metadata but not the pixels yet.",
          "Set OPENAI_API_KEY to enable image understanding.",
        ].join("\n");
  } else {
    analysis = [
      `File received: ${base}.`,
      "This file was downloaded from Telegram and attached as context metadata.",
      "Detailed file parsing is not enabled for this MIME type yet.",
    ].join("\n");
  }

  return {
    name: file.fileName,
    size: file.size,
    type: file.mimeType,
    analysis,
  };
}
