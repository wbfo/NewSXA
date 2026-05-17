/**
 * Server-side authentication helpers.
 *
 * SESSION COOKIE SECURITY NOTE:
 * The Firebase ID token is stored in the `firebase-token` cookie set by the
 * client-side AuthProvider (auth-context.tsx) using js-cookie. Because the
 * Firebase Client SDK must access this token from JavaScript to refresh it
 * every 55 minutes, the cookie CANNOT be marked HttpOnly. This is a known
 * trade-off with Firebase Client SDK authentication:
 *   - HttpOnly cookies require the server to issue the cookie (e.g., via
 *     Firebase Admin `createSessionCookie()`), which demands a permanent
 *     server session endpoint and complicates token refresh.
 *   - The current design is standard practice for Firebase web apps and is
 *     mitigated by: strict SameSite, Secure flag on HTTPS, and CSP headers.
 * If HttpOnly cookies are required in the future, migrate to Firebase Admin
 * session cookies (https://firebase.google.com/docs/auth/admin/manage-cookies).
 */
import { adminAuth } from "@/lib/firebase/admin-config";
import { cookies } from "next/headers";
import { isEmailAdmin } from "@/lib/constants/auth";
import { redirect } from "next/navigation";
import { logger } from "@/lib/server/logger";

const DEV_BYPASS_ENABLED =
  process.env.NODE_ENV !== "production" &&
  process.env.SX_ENABLE_DEV_BYPASS === "true";

export interface ServerAuthSession {
  user: {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
  } | null;
  isAdmin: boolean;
}

/**
 * Retrieves the current session on the server (Server Components / API Routes).
 */
export async function getServerAuth(): Promise<ServerAuthSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase-token")?.value;

  if (!token) {
    return { user: null, isAdmin: false };
  }

  // Support offline dev bypass even if adminAuth is initialized (e.g. if env vars
  // are present but the developer is offline).
  const isDevToken = DEV_BYPASS_ENABLED &&
                    (token === "dev.bypass.token" || token === "dev-bypass-token");

  if (isDevToken) {
    const uid = cookieStore.get("sx-user-uid")?.value;
    const email = cookieStore.get("sx-user-email")?.value;

    if (uid && email) {
      return {
        user: { uid, email },
        isAdmin: isEmailAdmin(email),
      };
    }
  }

  if (!adminAuth) {
    // Firebase Admin SDK is not initialised (missing service-account env vars).
    // In development only, fall back to trusting the sx-user-* cookies set by
    // the client-side AuthProvider so the app stays usable without a full
    // service-account setup.  This fallback is NEVER active in production.
    if (process.env.NODE_ENV === "production") {
      return { user: null, isAdmin: false };
    }

    const uid = cookieStore.get("sx-user-uid")?.value;
    const email = cookieStore.get("sx-user-email")?.value;

    if (!uid || !email) {
      return { user: null, isAdmin: false };
    }

    return {
      user: { uid, email },
      isAdmin: isEmailAdmin(email),
    };
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const isAdmin = isEmailAdmin(decodedToken.email);
    
    return {
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
      },
      isAdmin,
    };
  } catch (error) {
    logger.error({ err: error }, "Server auth: token verification failed");

    // In development mode, if verification fails (likely due to being offline),
    // we fall back to trusting the sx-user-* cookies if they exist.
    if (DEV_BYPASS_ENABLED) {
      const uid = cookieStore.get("sx-user-uid")?.value;
      const email = cookieStore.get("sx-user-email")?.value;
      if (uid && email) {
        logger.warn({ uid }, "Dev mode: falling back to session cookies (offline?)");
        return {
          user: { uid, email },
          isAdmin: isEmailAdmin(email),
        };
      }
    }

    return { user: null, isAdmin: false };
  }
}

/**
 * Enforces admin access. Redirects or returns null if not an admin.
 */
export async function requireAdmin() {
  const session = await getServerAuth();
  if (!session.user) {
    redirect("/login");
  }
  if (!session.isAdmin) {
    redirect("/portal");
  }
  return session;
}

/**
 * Enforces authenticated access.
 */
export async function requireAuth() {
  const session = await getServerAuth();
  if (!session.user) {
    redirect("/login");
  }
  return session;
}
