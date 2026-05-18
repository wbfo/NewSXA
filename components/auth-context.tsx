"use client";

import React, { createContext, useContext, useEffect, useState, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { isEmailAdmin } from "@/lib/constants/auth";
import Cookies from "js-cookie";

const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  sameSite: "strict" as const,
  path: "/",
  // secure: true is enforced by the browser in production (HTTPS).
  // js-cookie passes this flag through to document.cookie.
  secure: typeof window !== "undefined" && window.location.protocol === "https:",
};
const AUTH_COOKIE_NAMES = ["firebase-token", "sx-user-email", "sx-user-uid", "sx-auth-role"];
const DEV_BYPASS_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_DEV_BYPASS === "true";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  error: string | null;
  devBypass: () => void;
  devBypassClient: () => void;
  isDevBypass: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  isAdmin: false,
  error: null,
  devBypass: () => {},
  devBypassClient: () => {},
  isDevBypass: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Computed once at render time — safe to use outside the useEffect
  const isBypass = DEV_BYPASS_ENABLED &&
    typeof window !== "undefined" &&
    (Cookies.get("firebase-token") === "dev.bypass.token" || Cookies.get("firebase-token") === "dev-bypass-token");

  function clearSession() {
    AUTH_COOKIE_NAMES.forEach((name) => {
      Cookies.remove(name);
      Cookies.remove(name, { path: "/" });
    });
    setUser(null);
    setIsAdmin(false);
  }

  async function login() {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Login Error:", err);
      let message = err.message || "An unexpected error occurred during login.";
      if (err.code === "auth/internal-error" || message.includes("internal-error")) {
        message = "Configuration Error: Ensure 'localhost' is an Authorized Domain in Firebase Console and your API Key restrictions in Google Cloud Console allow this origin.";
      } else if (err.code === "auth/popup-closed-by-user") {
        message = "Login cancelled. Please complete the Google sign-in process to continue.";
      }
      setError(message);
    }
  }

  async function logout() {
    const wasBypass = Cookies.get("sx-user-uid") === "dev-bypass-uid";
    clearSession();
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error", err);
    }
    if (wasBypass) {
      window.location.href = "/";
    }
  }

  function devBypass() {
    if (!DEV_BYPASS_ENABLED) return;
    // Uses the first ADMIN_EMAILS entry at build time (NEXT_PUBLIC_ prefix required
    // for client access). Falls back to a safe placeholder that won't match any real
    // account — configure NEXT_PUBLIC_DEV_ADMIN_EMAIL in .env.local if needed.
    const adminEmail = process.env.NEXT_PUBLIC_DEV_ADMIN_EMAIL ?? "dev-admin@dev.local";
    Cookies.set("firebase-token", "dev.bypass.token", AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-user-email", adminEmail, AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-user-uid", "dev-bypass-uid", AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-auth-role", "admin", AUTH_COOKIE_OPTIONS);
    window.location.href = "/admin";
  }

  function devBypassClient() {
    if (!DEV_BYPASS_ENABLED) return;
    Cookies.set("firebase-token", "dev.bypass.token", AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-user-email", "preview-client@dev.local", AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-user-uid", "dev-bypass-client-uid", AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-auth-role", "client", AUTH_COOKIE_OPTIONS);
    window.location.href = "/portal";
  }

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval> | null = null;
    const devUid = DEV_BYPASS_ENABLED ? Cookies.get("sx-user-uid") : null;

    async function persistSession(firebaseUser: import("firebase/auth").User) {
      const token = await firebaseUser.getIdToken();
      const normalizedEmail = firebaseUser.email?.toLowerCase() || "";
      const adminUser = isEmailAdmin(normalizedEmail);
      Cookies.set("firebase-token", token, AUTH_COOKIE_OPTIONS);
      Cookies.set("sx-user-email", normalizedEmail, AUTH_COOKIE_OPTIONS);
      Cookies.set("sx-user-uid", firebaseUser.uid, AUTH_COOKIE_OPTIONS);
      Cookies.set("sx-auth-role", adminUser ? "admin" : "client", AUTH_COOKIE_OPTIONS);
      setUser(firebaseUser);
      setIsAdmin(adminUser);
      return adminUser;
    }

    if (isBypass) {
      const devEmail = Cookies.get("sx-user-email") || "dev-admin@dev.local";
      const devRole = Cookies.get("sx-auth-role");
      const resolvedUid = devUid || "dev-bypass-uid";
      // startTransition: batched non-urgent auth state init from cookies
      startTransition(() => {
        setUser({ uid: resolvedUid, email: devEmail } as User);
        setIsAdmin(devRole === "admin");
        setLoading(false);
      });
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Re-evaluate bypass status directly from cookies to avoid closure stale state
      const currentBypass = DEV_BYPASS_ENABLED &&
        (Cookies.get("firebase-token") === "dev.bypass.token" ||
          Cookies.get("firebase-token") === "dev-bypass-token");

      if (currentBypass) {
        setLoading(false);
        return;
      }

      try {
        if (firebaseUser) {
          setLoading(true);
        }

        if (refreshInterval) {
          clearInterval(refreshInterval);
          refreshInterval = null;
        }

        if (firebaseUser) {
          await persistSession(firebaseUser);
          refreshInterval = setInterval(async () => {
            try {
              await persistSession(firebaseUser);
            } catch {
              clearSession();
            }
          }, 55 * 60 * 1000);
        } else {
          clearSession();
        }
      } catch (error) {
        console.error("Auth session persistence failed:", error);
        clearSession();
      } finally {
        setLoading(false);
      }
    });

    // Safety timeout: Never stay in loading state for more than 8 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => {
      unsubscribe();
      clearTimeout(loadingTimeout);
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [isBypass]);

  useEffect(() => {
    if (loading || user) return;
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) {
      const isDevBypass = DEV_BYPASS_ENABLED && Cookies.get("sx-user-uid");
      if (!isDevBypass) {
        router.replace("/");
        router.refresh();
      }
    }
  }, [loading, pathname, router, user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, error, devBypass, devBypassClient, isDevBypass: isBypass }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
