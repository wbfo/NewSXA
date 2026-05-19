import { listFolderContents } from "@/lib/google/drive";
import { getOrder, updateOrder } from "@/lib/server/store";

export async function checkClientUploads(orderId: string) {
  const order = await getOrder(orderId);

  if (!order?.drivePhotosFolderId) {
    return {
      status: "no_folder",
      message: "Drive folder not yet created for this order.",
    };
  }

  const files = await listFolderContents(order.drivePhotosFolderId);

  return {
    status: files.length > 0 ? "files_present" : "awaiting_upload",
    fileCount: files.length,
    files: files.map((file) => ({
      name: file.name ?? "Untitled file",
      type: file.mimeType ?? "application/octet-stream",
      uploadedAt: file.createdTime ?? "",
      viewLink: file.webViewLink ?? "",
    })),
    uploadLink: order.driveUploadLink ?? "",
    folderLink: order.driveFolderLink ?? "",
    message: files.length > 0
      ? `Client has uploaded ${files.length} file(s). Ready for analysis.`
      : "Client has not yet uploaded. Upload link has been sent or is available in the order record.",
  };
}

export async function deliverAuditReport(
  orderId: string,
  reportBuffer: Buffer,
  reportName: string
) {
  const order = await getOrder(orderId);

  if (!order?.driveDeliverablesFolderId) {
    throw new Error(`No deliverables folder found for order ${orderId}`);
  }

  const { uploadDeliverable, shareFile } = await import("@/lib/google/drive");
  const { fileId, fileLink } = await uploadDeliverable(
    order.driveDeliverablesFolderId,
    reportName,
    reportBuffer,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

  await shareFile(fileId);

  await updateOrder(orderId, {
    driveDeliveryLink: fileLink,
    status: "COMPLETE",
  });

  return {
    fileId,
    fileLink,
    message: `Report delivered. Client link: ${fileLink}`,
  };
}

export async function buildDriveContext(orderIds: string[]) {
  const segments: string[] = [];

  for (const orderId of orderIds.slice(0, 5)) {
    const order = await getOrder(orderId);
    if (!order?.drivePhotosFolderId) continue;

    const files = await listFolderContents(order.drivePhotosFolderId).catch(() => []);
    if (!files.length) continue;

    segments.push([
      `ORDER ${order.id}: ${order.businessName}`,
      `Upload link: ${order.driveUploadLink ?? "Unavailable"}`,
      `Folder link: ${order.driveFolderLink ?? "Unavailable"}`,
      ...files.slice(0, 8).map((file, index) => [
        `File ${index + 1}: ${file.name ?? "Untitled file"}`,
        `Type: ${file.mimeType ?? "application/octet-stream"}`,
        `Size: ${file.size ?? "Unknown"}`,
        `Uploaded: ${file.createdTime ?? "Unknown"}`,
      ].join("\n")),
    ].join("\n"));
  }

  if (!segments.length) {
    return "";
  }

  return [
    "COMMAND CENTER DRIVE CONTEXT:",
    "These are Google Drive uploads tied to recent orders.",
    ...segments,
  ].join("\n\n");
}

