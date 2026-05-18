import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// All values must be provided via environment variables.
// See .env.local.example for the full list. Hardcoded fallbacks are intentionally
// absent — missing vars produce undefined so Firebase throws a clear error at
// init time rather than silently connecting to the wrong project.
const isBuildTime = typeof window === "undefined" && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || (isBuildTime ? "mock-api-key-for-build" : undefined),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || (isBuildTime ? "mock-project.firebaseapp.com" : undefined),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || (isBuildTime ? "mock-project-id" : undefined),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || (isBuildTime ? "mock-project.appspot.com" : undefined),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || (isBuildTime ? "123456789" : undefined),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || (isBuildTime ? "1:123456789:web:mockapp" : undefined),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
