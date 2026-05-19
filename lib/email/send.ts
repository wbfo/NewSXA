import nodemailer from "nodemailer";
import { logger } from "@/lib/server/logger";

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    return null;
  }

  return {
    host,
    port: Number(port),
    user,
    pass,
    from,
    secure: process.env.SMTP_SECURE === "true",
  };
}

export async function sendOrderConfirmationEmail(input: {
  clientName: string;
  clientEmail: string;
  serviceType: string;
  orderId: string;
  uploadLink: string;
}) {
  const config = getMailConfig();
  if (!config) {
    logger.warn({ orderId: input.orderId }, "SMTP not configured; skipping confirmation email");
    return { sent: false as const };
  }

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transport.sendMail({
    from: config.from,
    to: input.clientEmail,
    subject: `Your ${input.serviceType} — next steps`,
    html: `
      <div style="font-family: Courier New, monospace; background: #060606; color: #D0C8B8; padding: 40px; max-width: 640px;">
        <p style="color: #C8A96E; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 24px;">
          Sovereign X Audits · BlackFur Capital Group LLC
        </p>
        <h1 style="color: #D0C8B8; font-size: 22px; font-weight: normal; margin-bottom: 24px;">
          You&apos;re confirmed, ${input.clientName}.
        </h1>
        <p style="margin-bottom: 24px;">
          Your ${input.serviceType} has been received and your slot is confirmed.
        </p>
        <p style="color: #C8A96E; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
          01 — Upload your files
        </p>
        <p style="margin-bottom: 16px;">
          Use the link below to upload your required materials.
        </p>
        <a href="${input.uploadLink}" style="display: inline-block; background: #C8A96E; color: #060606; padding: 12px 28px; text-decoration: none; font-weight: bold; font-size: 13px; margin-bottom: 16px;">
          Upload Your Files →
        </a>
        <p style="font-size: 11px; color: #555; margin-bottom: 24px;">
          Required: full body front in natural light, full body side, face close-up in natural light, and 3 current outfit photos.
        </p>
        <p style="color: #C8A96E; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
          02 — Audit begins
        </p>
        <p style="margin-bottom: 24px;">
          Once your files are received your audit enters the pipeline immediately.
        </p>
        <p style="color: #C8A96E; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
          03 — Delivery in 72 hours
        </p>
        <p>
          Your completed audit will be delivered to your Google Drive within 72 hours of intake completion.
        </p>
      </div>
    `,
  });

  logger.info({ orderId: input.orderId, clientEmail: input.clientEmail }, "Order confirmation email sent");
  return { sent: true as const };
}

