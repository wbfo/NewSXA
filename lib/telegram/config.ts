export function getTelegramAllowedChatIds(): Set<string> | null {
  const raw = process.env.TELEGRAM_ALLOWED_CHAT_IDS;
  if (!raw?.trim()) return null;

  const ids = raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return ids.length > 0 ? new Set(ids) : null;
}

export function isTelegramWebhookAuthorized(request: Request): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expected) return false;
  return request.headers.get("x-telegram-bot-api-secret-token") === expected;
}

