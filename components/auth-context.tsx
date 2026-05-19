"use client";

import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAllowedEmail, isEmailAdmin } from "@/lib/constants/auth";

type AuthUser = {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
};

const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  sameSite: "strict" as const,
  path: "/",
  secure: typeof window !== "undefined" && window.location.protocol === "https:",
};

const AUTH_COOKIE_NAMES = [
  "sx-session-email",
  "sx-session-uid",
  "sx-session-role",
  "firebase-token",
  "sx-user-email",
  "sx-user-uid",
  "sx-auth-role",
];

const DEV_BYPASS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DEV_BYPASS === "true";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isBypass =
    DEV_BYPASS_ENABLED &&
    typeof window !== "undefined" &&
    (Cookies.get("sx-session-role") === "dev" || Cookies.get("firebase-token") === "dev.bypass.token");

  function clearSession() {
    AUTH_COOKIE_NAMES.forEach((name) => {
      Cookies.remove(name);
      Cookies.remove(name, { path: "/" });
    });
    setUser(null);
    setIsAdmin(false);
  }

  function applySession(email: string, role: "admin" | "client" | "dev") {
    const normalizedEmail = email.trim().toLowerCase();
    const resolvedRole = role === "dev" ? "admin" : role;
    const uid = normalizedEmail;
    Cookies.set("sx-session-email", normalizedEmail, AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-session-uid", uid, AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-session-role", role, AUTH_COOKIE_OPTIONS);
    // Legacy compatibility for any stale code paths during rollout.
    Cookies.set("sx-user-email", normalizedEmail, AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-user-uid", uid, AUTH_COOKIE_OPTIONS);
    Cookies.set("sx-auth-role", resolvedRole, AUTH_COOKIE_OPTIONS);
    Cookies.set("firebase-token", `local-session:${normalizedEmail}`, AUTH_COOKIE_OPTIONS);
    const nextUser: AuthUser = {
      uid,
      email: normalizedEmail,
      displayName: normalizedEmail,
    };
    setUser(nextUser);
    setIsAdmin(role === "dev" ? true : isEmailAdmin(normalizedEmail));
  }

  async function login(email: string) {
    setError(null);
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Enter an email address to continue.");
      return;
    }
    if (!isAllowedEmail(normalizedEmail)) {
      setError("That email is not approved for access yet.");
      return;
    }
    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        setError(payload?.error || "Unable to create session.");
        return;
      }

      const role: "admin" | "client" = payload?.role === "admin" ? "admin" : "client";
      startTransition(() => {
        applySession(normalizedEmail, role);
      });
      window.location.href = role === "admin" ? "/admin" : "/portal";
    } catch {
      setError("Unable to reach the sign-in service.");
    }
  }

  async function logout() {
    const wasBypass = Cookies.get("sx-session-role") === "dev";
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Even if the server call fails, we still clear local cookies and leave.
    }
    clearSession();
    if (wasBypass) {
      window.location.href = "/";
      return;
    }
    router.replace("/");
    router.refresh();
  }

  function devBypass() {
    if (!DEV_BYPASS_ENABLED) return;
    startTransition(() => {
      applySession("sxabfcg@gmail.com", "dev");
    });
    window.location.href = "/admin";
  }

  function devBypassClient() {
    if (!DEV_BYPASS_ENABLED) return;
    startTransition(() => {
      applySession("preview-client@dev.local", "dev");
      Cookies.set("sx-session-role", "client", AUTH_COOKIE_OPTIONS);
      Cookies.set("sx-auth-role", "client", AUTH_COOKIE_OPTIONS);
    });
    window.location.href = "/portal";
  }

  useEffect(() => {
    const storedEmail = Cookies.get("sx-session-email") || Cookies.get("sx-user-email");
    const storedRole = Cookies.get("sx-session-role") || Cookies.get("sx-auth-role");
    const storedUid = Cookies.get("sx-session-uid") || Cookies.get("sx-user-uid");

    if (storedEmail && isAllowedEmail(storedEmail)) {
      startTransition(() => {
        setUser({
          uid: storedUid || storedEmail,
          email: storedEmail,
          displayName: storedEmail,
        });
        setIsAdmin(storedRole === "admin" || isEmailAdmin(storedEmail));
        setLoading(false);
      });
    } else if (DEV_BYPASS_ENABLED && storedRole === "dev" && storedEmail) {
      startTransition(() => {
        setUser({
          uid: storedUid || storedEmail,
          email: storedEmail,
          displayName: storedEmail,
        });
        setIsAdmin(true);
        setLoading(false);
      });
    } else {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (loading || user) return;
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) {
      const hasSession = Boolean(Cookies.get("sx-session-email") || Cookies.get("sx-user-email"));
      if (!hasSession) {
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
