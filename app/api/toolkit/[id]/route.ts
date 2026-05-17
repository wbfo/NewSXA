import { jsonResponse } from "@/lib/api/responses";
import { getToolkitDocument } from "@/lib/server/store";
import { getServerAuth } from "@/lib/auth/server-auth";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const document = getToolkitDocument(id);
  if (!document) {
    return jsonResponse({ error: "Not found" }, { status: 404 });
  }
  return jsonResponse(document);
}
