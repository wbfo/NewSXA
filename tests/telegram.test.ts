import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatMessage } from "@/lib/domain/types";
import { POST as telegramRoute } from "@/app/api/telegram/hermes/route";
import { resetStore } from "@/lib/server/store";
import { resetTelegramPreferencesForTests } from "@/lib/telegram/preferences";

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

  beforeEach(async () => {
    process.env.TELEGRAM_WEBHOOK_SECRET = "test-secret";
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_ALLOWED_CHAT_IDS = "12345";
    await resetTelegramPreferencesForTests();
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
    await resetStore();
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

  it("stores and acknowledges preferred address instructions directly", async () => {
    const response = await telegramRoute(new Request("http://localhost/api/telegram/hermes", {
      method: "POST",
      body: JSON.stringify({
        update_id: 2,
        message: {
          message_id: 11,
          chat: { id: 12345, type: "private" },
          from: { id: 777, username: "operator" },
          text: "Moving forward, refer to me as the honored one.",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-telegram-bot-api-secret-token": "test-secret",
      },
    }));

    expect(response.status).toBe(200);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest-token/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("Understood, the honored one."),
      }),
    );
  });

  it("downloads Telegram photos and forwards attachment context into Hermes", async () => {
    await resetStore();
    globalThis.fetch = vi.fn(async (url) => {
      const target = String(url);
      if (target.includes("/getFile")) {
        return new Response(JSON.stringify({
          ok: true,
          result: {
            file_id: "photo-file-id",
            file_path: "photos/file_1.jpg",
            file_size: 128,
          },
        }), { status: 200 });
      }

      if (target.includes("/file/bot")) {
        return new Response(new Uint8Array([1, 2, 3]), {
          status: 200,
          headers: { "content-type": "image/jpeg" },
        });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    const response = await telegramRoute(new Request("http://localhost/api/telegram/hermes", {
      method: "POST",
      body: JSON.stringify({
        update_id: 3,
        message: {
          message_id: 12,
          chat: { id: 12345, type: "private" },
          from: { id: 777, username: "operator" },
          caption: "What do you see here?",
          photo: [
            {
              file_id: "photo-file-id",
              file_unique_id: "photo-unique-id",
              width: 1200,
              height: 800,
              file_size: 128,
            },
          ],
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-telegram-bot-api-secret-token": "test-secret",
      },
    }));

    expect(response.status).toBe(200);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest-token/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("Image received: telegram-photo-photo-unique-id.jpg"),
      }),
    );
  });

  it("extracts text file contents and forwards them into Hermes", async () => {
    await resetStore();
    globalThis.fetch = vi.fn(async (url) => {
      const target = String(url);
      if (target.includes("/getFile")) {
        return new Response(JSON.stringify({
          ok: true,
          result: {
            file_id: "document-file-id",
            file_path: "documents/notes.txt",
            file_size: 32,
          },
        }), { status: 200 });
      }

      if (target.includes("/file/bot")) {
        return new Response("Line one\nLine two", {
          status: 200,
          headers: { "content-type": "text/plain" },
        });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    const response = await telegramRoute(new Request("http://localhost/api/telegram/hermes", {
      method: "POST",
      body: JSON.stringify({
        update_id: 4,
        message: {
          message_id: 13,
          chat: { id: 12345, type: "private" },
          from: { id: 777, username: "operator" },
          caption: "Summarize this file.",
          document: {
            file_id: "document-file-id",
            file_unique_id: "document-unique-id",
            file_name: "notes.txt",
            mime_type: "text/plain",
            file_size: 32,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-telegram-bot-api-secret-token": "test-secret",
      },
    }));

    expect(response.status).toBe(200);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest-token/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("Line one\\nLine two"),
      }),
    );
  });
});
