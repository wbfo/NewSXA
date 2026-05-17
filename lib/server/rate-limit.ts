/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * KNOWN LIMITATION: The counter store lives in process memory.
 *   - Single-instance deployments: works correctly.
 *   - Multi-instance / serverless deployments: each instance maintains its own
 *     counter, so the effective rate limit is `limit × number_of_instances`.
 *     Replace `store` with a shared atomic counter (Redis / Upstash) before
 *     deploying behind a load balancer.
 *   - Process restarts reset all counters (no persistence across restarts).
 *
 * Usage:
 *   const result = rateLimit(ip, { limit: 5, windowMs: 60_000 });
 *   if (!result.ok) return jsonResponse({ error: "Too Many Requests" }, { status: 429 });
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

/** Prune expired entries every 5 minutes to avoid unbounded growth. */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 5 * 60 * 1_000);

interface RateLimitOptions {
  /** Max requests per window. Default: 10 */
  limit?: number;
  /** Window size in milliseconds. Default: 60 000 (1 minute) */
  windowMs?: number;
}

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  { limit = 10, windowMs = 60_000 }: RateLimitOptions = {}
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    // New window
    const newEntry: Entry = { count: 1, resetAt: now + windowMs };
    store.set(key, newEntry);
    return { ok: true, remaining: limit - 1, resetAt: newEntry.resetAt };
  }

  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  return { ok: entry.count <= limit, remaining, resetAt: entry.resetAt };
}

/** Extract a best-effort client IP from a Next.js Request. */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
