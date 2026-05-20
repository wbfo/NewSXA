import { google } from "googleapis";
import { Readable } from "node:stream";

type DriveFile = {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
  size?: string | null;
  createdTime?: string | null;
  webViewLink?: string | null;
  webContentLink?: string | null;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function getDriveClient() {
  const auth = new google.auth.OAuth2(
    requireEnv("GOOGLE_CLIENT_ID"),
    requireEnv("GOOGLE_CLIENT_SECRET"),
    requireEnv("GOOGLE_REDIRECT_URI")
  );

  auth.setCredentials({
    refresh_token: requireEnv("GOOGLE_REFRESH_TOKEN"),
  });

  return google.drive({ version: "v3", auth });
}

function getRootFolderId() {
  return requireEnv("GOOGLE_DRIVE_ROOT_FOLDER_ID");
}

function sanitizeFolderName(name: string) {
  return name
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

async function createFolder(name: string, parentId: string) {
  const drive = getDriveClient();
  const response = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    },
    fields: "id, webViewLink",
  });

  if (!response.data.id) {
    throw new Error(`Failed to create Google Drive folder: ${name}`);
  }

  return {
    id: response.data.id,
    webViewLink: response.data.webViewLink ?? "",
  };
}

export async function createClientFolder(clientName: string, serviceType: string) {
  const date = new Date().toISOString().slice(0, 7);
  const folderName = sanitizeFolderName(`${clientName} — ${serviceType} — ${date}`);
  const rootParentId = getRootFolderId();

  const rootFolder = await createFolder(folderName, rootParentId);
  const intakeFolder = await createFolder("Intake", rootFolder.id);
  const photosFolder = await createFolder("Submitted Photos", rootFolder.id);
  const deliverablesFolder = await createFolder("Deliverables", rootFolder.id);
  const correspondenceFolder = await createFolder("Correspondence", rootFolder.id);

  const drive = getDriveClient();
  await drive.permissions.create({
    fileId: photosFolder.id,
    requestBody: {
      role: "writer",
      type: "anyone",
    },
  });

  const photosMetadata = await drive.files.get({
    fileId: photosFolder.id,
    fields: "id, webViewLink",
  });

  return {
    rootFolderId: rootFolder.id,
    intakeFolderId: intakeFolder.id,
    photosFolderId: photosFolder.id,
    deliverablesFolderId: deliverablesFolder.id,
    correspondenceFolderId: correspondenceFolder.id,
    uploadLink: photosMetadata.data.webViewLink ?? photosFolder.webViewLink,
    folderLink: rootFolder.webViewLink,
  };
}

export async function listFolderContents(folderId: string) {
  const drive = getDriveClient();
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, size, createdTime, webViewLink, webContentLink)",
    orderBy: "createdTime desc",
  });

  return (response.data.files ?? []) as DriveFile[];
}

export async function uploadDeliverable(
  folderId: string,
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
) {
  const drive = getDriveClient();
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(fileBuffer),
    },
    fields: "id, webViewLink",
  });

  if (!response.data.id) {
    throw new Error(`Failed to upload Google Drive deliverable: ${fileName}`);
  }

  return {
    fileId: response.data.id,
    fileLink: response.data.webViewLink ?? "",
  };
}

export async function shareFile(fileId: string): Promise<void> {
  const drive = getDriveClient();
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
}
