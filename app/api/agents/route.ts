import { jsonResponse } from "@/lib/api/responses";
import { listAgents } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";

export async function GET() {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  return jsonResponse(await listAgents());
}
