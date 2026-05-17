import { z } from "zod";
import { jsonResponse } from "@/lib/api/responses";
import { updateOrderStatus } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";
import { logger } from "@/lib/server/logger";
import type { OrderStatus } from "@/lib/domain/types";

const patchOrderSchema = z.object({
  status: z.enum(["NEW", "REVIEWING", "CONTACTED", "IN PROGRESS", "COMPLETE"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const raw = await request.json().catch(() => null);
  const parsed = patchOrderSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid request body", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await updateOrderStatus(id, parsed.data.status as OrderStatus);
    logger.info({ orderId: id, status: parsed.data.status }, "Order status updated");
    return jsonResponse({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to update order status");
    return jsonResponse({ error: "Failed to update order." }, { status: 500 });
  }
}
