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

