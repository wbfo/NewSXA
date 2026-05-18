import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { KnowledgeAsset } from "@/lib/domain/types";
import { summarizeTelegramFile } from "@/lib/telegram/file-analysis";

// On Vercel the project root is read-only; write to /tmp instead.
const UPLOAD_ROOT = process.env.VERCEL
  ? path.join("/tmp", "sx-uploads")
  : path.join(process.cwd(), "data", "uploads");
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

function sanitizeFileName(name: string) {
  const cleaned = name
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  return cleaned || "upload";
}

function inferStatus(summary: string): KnowledgeAsset["status"] {
  if (/must not claim|not the pixels yet|not enabled|Only files up to/i.test(summary)) {
    return "LIMITED";
  }
  return "READY";
}

export async function ingestUploadedFile(input: {
  file: File;
  uploadedBy: string;
  prompt?: string;
}): Promise<KnowledgeAsset> {
  if (input.file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`Upload is too large. Maximum supported size is ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.`);
  }

  const bytes = await input.file.arrayBuffer();
  const id = `VAULT-${crypto.randomUUID()}`;
  const safeName = sanitizeFileName(input.file.name || id);
  const storedName = `${id}-${safeName}`;
  const storedPath = path.join(UPLOAD_ROOT, storedName);
  const mimeType = input.file.type || "application/octet-stream";

  await mkdir(UPLOAD_ROOT, { recursive: true });
  await writeFile(storedPath, Buffer.from(bytes));

  const summary = await summarizeTelegramFile({
    fileId: id,
    fileName: input.file.name || safeName,
    mimeType,
    size: input.file.size || bytes.byteLength,
    bytes,
  }, input.prompt ?? "");

  return {
    id,
    name: input.file.name || safeName,
    mimeType,
    size: input.file.size || bytes.byteLength,
    uploadedAt: new Date().toISOString(),
    uploadedBy: input.uploadedBy,
    storedPath,
    summary: summary.analysis,
    status: inferStatus(summary.analysis),
  };
}

