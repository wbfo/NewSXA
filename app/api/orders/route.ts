import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { addOrder, listOrders } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";
import { rateLimit, getClientIp } from "@/lib/server/rate-limit";

const createOrderSchema = z.object({
  customerName: z.string().min(1, "customerName is required").max(200),
  businessName: z.string().min(1, "businessName is required").max(200),
  email: z.string().email().max(200),
  phone: z.string().max(100).default(""),
  packageName: z.string().min(1, "packageName is required").max(120),
  serviceType: z.string().min(1, "serviceType is required").max(120),
  budget: z.string().max(100).default(""),
  notes: z.string().max(2000).default(""),
  source: z.string().max(120).default("Landing Page"),
  status: z.enum(["NEW", "REVIEWING", "CONTACTED", "IN PROGRESS", "COMPLETE"]).default("NEW")
});

export async function GET() {
  const { user, isAdmin } = await getServerAuth();
  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const allOrders = await listOrders();

  if (isAdmin) {
    return jsonResponse(allOrders);
  }

  // If client, return only their orders (matched by email)
  const clientEmail = (user.email || "").toLowerCase();
  const orders = allOrders.filter(o => o.email?.toLowerCase() === clientEmail);
  return jsonResponse(orders);
}

export async function POST(request: Request) {
  // Rate-limit the public intake endpoint: 5 submissions per IP per minute
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    logger.warn({ ip }, "Order intake rate limit exceeded");
    return jsonResponse({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(raw);
  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, "Invalid order request body");
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const order = {
    id: `O-${crypto.randomUUID()}`,
    submittedAt: new Date().toISOString(),
    ...parsed.data
  };

  try {
    await addOrder(order);
    logger.info({ orderId: order.id, businessName: order.businessName }, "Order created");
    return jsonResponse({ order });
  } catch (error) {
    logger.error({ error }, "Failed to add order");
    return jsonResponse({ error: "Failed to add order." }, { status: 500 });
  }
}
