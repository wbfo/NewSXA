import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatMessage } from "@/lib/domain/types";
import { POST as telegramRoute } from "@/app/api/telegram/hermes/route";

vi.mock("@/lib/hermes/hermes-gateway", () => ({
  getHermesAdapter: () => ({
    sendMessage: async ({ message }: { message: string }) => ({
      reply: {
        id: "telegram-reply-1",
        role: "assistant",
        content: `HERMES_TELEGRAM_OK: ${message}`,
        createdAt: new Date().toISOString(),
      } satisfies ChatMessage,
    }),
  }),
}));

describe("telegram hermes webhook", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    process.env.TELEGRAM_WEBHOOK_SECRET = "test-secret";
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_ALLOWED_CHAT_IDS = "12345";
    globalThis.fetch = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })) as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    delete process.env.TELEGRAM_WEBHOOK_SECRET;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_ALLOWED_CHAT_IDS;
    vi.restoreAllMocks();
  });

  it("rejects requests without the Telegram webhook secret", async () => {
    const response = await telegramRoute(new Request("http://localhost/api/telegram/hermes", {
      method: "POST",
      body: JSON.stringify({ message: { chat: { id: 12345 }, text: "hello" } }),
      headers: { "Content-Type": "application/json" },
    }));

    expect(response.status).toBe(403);
  });

  it("sends Hermes replies back to allowed Telegram chats", async () => {
    const response = await telegramRoute(new Request("http://localhost/api/telegram/hermes", {
      method: "POST",
      body: JSON.stringify({
        update_id: 1,
        message: {
          message_id: 10,
          chat: { id: 12345, type: "private" },
          from: { id: 777, username: "operator" },
          text: "status check",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-telegram-bot-api-secret-token": "test-secret",
      },
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest-token/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("HERMES_TELEGRAM_OK: status check"),
      }),
    );
  });
});

