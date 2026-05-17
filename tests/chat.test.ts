import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatMessage } from "@/lib/domain/types";
import { POST as chatRoute } from "@/app/api/hermes/chat/route";
import { resetStore } from "@/lib/server/store";

// Next.js cookies() cannot run outside a request scope in vitest.
// Mock server auth so API route handlers work in the test environment.
vi.mock("@/lib/auth/server-auth", () => ({
  getServerAuth: async () => ({
    user: { uid: "test-uid", email: "test@test.com" },
    isAdmin: true,
  }),
  requireAdmin: async () => ({
    user: { uid: "test-uid", email: "test@test.com" },
    isAdmin: true,
  }),
  requireAuth: async () => ({
    user: { uid: "test-uid", email: "test@test.com" },
    isAdmin: true,
  }),
}));

vi.mock("@/lib/hermes/hermes-gateway", () => ({
  getHermesAdapter: () => ({
    sendMessage: async () => ({
      reply: {
        id: "reply-1",
        role: "assistant",
        content: "TEST_CHAT_OK",
        createdAt: new Date().toISOString()
      } satisfies ChatMessage
    })
  })
}));

describe("hermes chat integration", () => {
  beforeEach(async () => {
    await resetStore();
  });

  it("returns a structured Hermes chat response", async () => {
    const request = new Request("http://localhost/api/hermes/chat", {
      method: "POST",
      body: JSON.stringify({ message: "Reply with exactly TEST_CHAT_OK" }),
      headers: { "Content-Type": "application/json" }
    });
    const response = await chatRoute(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.reply.content).toBe("TEST_CHAT_OK");
  });
});
