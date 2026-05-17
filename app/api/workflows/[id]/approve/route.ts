import { jsonResponse } from "@/lib/api/responses";
import { getHermesAdapter } from "@/lib/hermes/hermes-gateway";
import { getServerAuth } from "@/lib/auth/server-auth";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const workflow = await getHermesAdapter().approveWorkflow({ workflowId: id });
  if (!workflow) {
    return jsonResponse({ error: "Workflow not found" }, { status: 404 });
  }
  return jsonResponse({ workflow });
}
