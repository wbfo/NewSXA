import * as admin from "firebase-admin";
import { logger } from "@/lib/server/logger";

const hasFirebaseAdminCredentials =
  Boolean(process.env.FIREBASE_PROJECT_ID) &&
  process.env.FIREBASE_CLIENT_EMAIL && 
  !process.env.FIREBASE_CLIENT_EMAIL.includes("REPLACE_WITH") &&
  process.env.FIREBASE_PRIVATE_KEY && 
  !process.env.FIREBASE_PRIVATE_KEY.includes("REPLACE_WITH");

if (!admin.apps.length && hasFirebaseAdminCredentials) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  } catch (error) {
    logger.error({ err: error }, "Firebase Admin SDK initialization failed");
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;
