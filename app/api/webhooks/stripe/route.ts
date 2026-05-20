import Stripe from "stripe";
import { updateOrder } from "@/lib/server/store";
import { createClientFolder } from "@/lib/google/drive";
import { sendOrderConfirmationEmail } from "@/lib/email/send";
import { logger } from "@/lib/server/logger";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    logger.error("Stripe env vars missing in webhook handler");
    return new Response("Webhook not configured", { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    logger.warn({ err }, "Stripe webhook signature verification failed");
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      logger.warn({ sessionId: session.id }, "checkout.session.completed missing orderId in metadata");
      return new Response("OK", { status: 200 });
    }

    const patch: Record<string, unknown> = {
      paymentStatus: "PAID",
      stripeSessionId: session.id,
      paidAt: new Date().toISOString(),
    };

    try {
      await updateOrder(orderId, patch);
      logger.info({ orderId, sessionId: session.id }, "Order marked as PAID");
    } catch (err) {
      logger.error({ err, orderId }, "Failed to update order payment status");
      // Still return 200 so Stripe does not retry indefinitely
      return new Response("OK", { status: 200 });
    }

    // Create Google Drive folder and send confirmation email after payment
    const customerName = session.metadata?.customerName ?? "";
    const businessName = session.metadata?.businessName ?? "";
    const serviceType = session.metadata?.packageName ?? "";
    const clientEmail = session.customer_email ?? "";

    try {
      const driveData = await createClientFolder(businessName, serviceType);
      await updateOrder(orderId, {
        driveRootFolderId: driveData.rootFolderId,
        driveIntakeFolderId: driveData.intakeFolderId,
        drivePhotosFolderId: driveData.photosFolderId,
        driveDeliverablesFolderId: driveData.deliverablesFolderId,
        driveCorrespondenceFolderId: driveData.correspondenceFolderId,
        driveUploadLink: driveData.uploadLink,
        driveFolderLink: driveData.folderLink,
      });

      if (clientEmail) {
        await sendOrderConfirmationEmail({
          clientName: customerName,
          clientEmail,
          serviceType,
          orderId,
          uploadLink: driveData.uploadLink,
        });
      }

      logger.info({ orderId }, "Post-payment Drive + email completed");
    } catch (err) {
      logger.warn({ err, orderId }, "Post-payment Drive/email step failed (non-fatal)");
    }
  }

  return new Response("OK", { status: 200 });
}
