import { jsonResponse } from "@/lib/api/responses";
import { getServerAuth } from "@/lib/auth/server-auth";
import { addKnowledgeAsset, listKnowledgeAssets } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";
import { ingestUploadedFile } from "@/lib/uploads/ingest";

function isUploadFile(value: FormDataEntryValue | null | undefined): value is File {
  return Boolean(
    value &&
    typeof value === "object" &&
    "arrayBuffer" in value &&
    "name" in value &&
    "size" in value
  );
}

export async function GET() {
  const { isAdmin } = await getServerAuth();
  if (!isAdmin) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  return jsonResponse({ assets: await listKnowledgeAssets() });
}

export async function POST(request: Request) {
  const { user, isAdmin } = await getServerAuth();
  if (!isAdmin || !user) {
    return jsonResponse({ error: "Unauthorized" }, { status: 403 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const prompt = formData?.get("prompt");

  if (!isUploadFile(file)) {
    return jsonResponse({ error: "Upload requires a file field." }, { status: 400 });
  }

  try {
    const asset = await ingestUploadedFile({
      file,
      uploadedBy: user.email ?? user.uid,
      prompt: typeof prompt === "string" ? prompt : undefined,
    });
    await addKnowledgeAsset(asset);
    return jsonResponse({ asset }, { status: 201 });
  } catch (error) {
    logger.error({ error }, "Vault upload failed");
    return jsonResponse({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
  }
}
