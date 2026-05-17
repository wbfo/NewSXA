import { subscribeToEvents } from "@/lib/server/event-bus";
import { getServerAuth } from "@/lib/auth/server-auth";
import { getClientIp, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

// Max concurrent SSE connections per IP
const MAX_CONNECTIONS_PER_IP = 5;

export async function GET(request: Request) {
  // Only admins may subscribe to the internal event stream.
  // The stream broadcasts all AgentEvents, including payloads that contain
  // other clients' names, company names, and package details — it must
  // never be accessible to client-role users.
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Limit concurrent SSE connections per IP to prevent resource exhaustion
  const ip = getClientIp(request);
  const rl = rateLimit(`sse:${ip}`, { limit: MAX_CONNECTIONS_PER_IP, windowMs: 60_000 });
  if (!rl.ok) {
    return new Response(JSON.stringify({ error: "Too many connections" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }
  let heartbeat: ReturnType<typeof setInterval> | null = null;
  let unsubscribe: (() => void) | null = null;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const safeSend = (payload: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          closed = true;
        }
      };

      safeSend({ type: "connected" });

      unsubscribe = subscribeToEvents((event) => {
        safeSend(event);
      });

      heartbeat = setInterval(() => {
        safeSend({ type: "heartbeat", at: new Date().toISOString() });
      }, 15000);
    },

    cancel() {
      // Called by the runtime when the client disconnects.
      closed = true;
      if (heartbeat !== null) {
        clearInterval(heartbeat);
        heartbeat = null;
      }
      if (unsubscribe !== null) {
        unsubscribe();
        unsubscribe = null;
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
