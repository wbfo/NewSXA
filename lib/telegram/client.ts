interface SendTelegramMessageInput {
  chatId: number | string;
  text: string;
}

const MAX_TELEGRAM_MESSAGE_LENGTH = 4096;

function truncateTelegramMessage(text: string) {
  if (text.length <= MAX_TELEGRAM_MESSAGE_LENGTH) return text;
  return `${text.slice(0, MAX_TELEGRAM_MESSAGE_LENGTH - 24)}\n\n[Reply truncated]`;
}

export async function sendTelegramMessage({ chatId, text }: SendTelegramMessageInput) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: truncateTelegramMessage(text),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

interface TelegramFileResponse {
  ok: boolean;
  result?: {
    file_id: string;
    file_unique_id?: string;
    file_size?: number;
    file_path?: string;
  };
  description?: string;
}

export interface DownloadedTelegramFile {
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
  bytes: ArrayBuffer;
}

export async function downloadTelegramFile(input: {
  fileId: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
}): Promise<DownloadedTelegramFile> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const metadataResponse = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(input.fileId)}`);
  if (!metadataResponse.ok) {
    throw new Error(`Telegram getFile failed: ${metadataResponse.status}`);
  }

  const metadata = (await metadataResponse.json()) as TelegramFileResponse;
  if (!metadata.ok || !metadata.result?.file_path) {
    throw new Error(`Telegram getFile failed: ${metadata.description ?? "missing file_path"}`);
  }

  const fileResponse = await fetch(`https://api.telegram.org/file/bot${token}/${metadata.result.file_path}`);
  if (!fileResponse.ok) {
    throw new Error(`Telegram file download failed: ${fileResponse.status}`);
  }

  const fileName = input.fileName ?? metadata.result.file_path.split("/").pop() ?? input.fileId;
  const mimeType = input.mimeType ?? fileResponse.headers.get("content-type") ?? "application/octet-stream";
  const bytes = await fileResponse.arrayBuffer();

  return {
    fileId: input.fileId,
    fileName,
    mimeType,
    size: input.size ?? metadata.result.file_size ?? bytes.byteLength,
    bytes,
  };
}
