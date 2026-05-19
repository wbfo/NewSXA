/**
 * Server-side authentication helpers.
 *
 * The app now uses a simple email allowlist session for admin/client access.
 * The login form stores the selected email in cookies and the server checks
 * that the email belongs to an approved account before granting access.
 */
import { cookies } from "next/headers";
import { isAllowedEmail, isEmailAdmin } from "@/lib/constants/auth";
import { redirect } from "next/navigation";

const DEV_BYPASS_ENABLED = process.env.SX_ENABLE_DEV_BYPASS === "true";

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
  const email = (
    cookieStore.get("sx-session-email")?.value ||
    cookieStore.get("sx-user-email")?.value ||
    ""
  ).toLowerCase();
  const uid = cookieStore.get("sx-session-uid")?.value || cookieStore.get("sx-user-uid")?.value || email;
  const role = cookieStore.get("sx-session-role")?.value || cookieStore.get("sx-auth-role")?.value;

  if (!email) {
    return { user: null, isAdmin: false };
  }

  if (!isAllowedEmail(email) && !(DEV_BYPASS_ENABLED && role === "dev")) {
    return { user: null, isAdmin: false };
  }

  return {
    user: {
      uid,
      email,
      displayName: email,
    },
    isAdmin: isEmailAdmin(email),
  };
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
