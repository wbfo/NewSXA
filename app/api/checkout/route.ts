import Stripe from "stripe";
import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { addOrder } from "@/lib/server/store";
import { rateLimit, getClientIp } from "@/lib/server/rate-limit";
import { logger } from "@/lib/server/logger";

const TIER_PRICES: Record<string, number> = {
  "Digital Standard": 50000,   // $500.00
  "Digital Deep":    150000,   // $1,500.00
  "X Image Audit":    35000,   // $350.00
  "Voice Agent":      75000,   // $750.00
};

const checkoutSchema = z.object({
  customerName: z.string().min(1).max(200),
  businessName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(100).default(""),
  packageName: z.string().min(1).max(120),
  serviceType: z.string().min(1).max(120),
  budget: z.string().max(100).default(""),
  notes: z.string().max(2000).default(""),
  source: z.string().max(120).default("Landing Page"),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(ip, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return jsonResponse({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    logger.error("STRIPE_SECRET_KEY is not set");
    return jsonResponse({ error: "Payment system is not configured." }, { status: 503 });
  }

  const data = parsed.data;
  const amountCents = TIER_PRICES[data.packageName] ?? 50000;
  const orderId = `O-${crypto.randomUUID()}`;

  // Save order immediately so it exists when the webhook fires
  const order = {
    id: orderId,
    submittedAt: new Date().toISOString(),
    ...data,
    status: "NEW" as const,
    paymentStatus: "PENDING" as const,
    amountCents,
  };

  try {
    await addOrder(order);
  } catch (err) {
    logger.error({ err }, "Failed to persist order before Stripe session");
    return jsonResponse({ error: "Failed to create order." }, { status: 500 });
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });
  const baseUrl = process.env.SX_PUBLIC_URL ?? "https://sxaudits.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: data.packageName,
              description: `${data.serviceType} — Sovereign X Audits`,
            },
          },
        },
      ],
      metadata: {
        orderId,
        customerName: data.customerName,
        businessName: data.businessName,
        packageName: data.packageName,
      },
      success_url: `${baseUrl}/intake/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/intake#intake`,
    });

    logger.info({ orderId, sessionId: session.id }, "Stripe checkout session created");
    return jsonResponse({ url: session.url });
  } catch (err) {
    logger.error({ err, orderId }, "Stripe session creation failed");
    return jsonResponse({ error: "Payment session could not be created. Please try again." }, { status: 502 });
  }
}
