"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

export default function LoginPage() {
  const { user, login, loading, isAdmin, error, devBypass, devBypassClient } = useAuth();
  const router = useRouter();
  const showDevBypass =
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_ENABLE_DEV_BYPASS === "true";

  useEffect(() => {
    if (!user || loading) return;

    if (isAdmin) {
      router.replace("/admin");
      return;
    }

    const checkUser = async () => {
      try {
        const [auditsRes, ordersRes] = await Promise.all([
          fetch("/api/audits", { cache: "no-store" }),
          fetch("/api/orders", { cache: "no-store" }),
        ]);

        const audits = auditsRes.ok ? ((await auditsRes.json()) as unknown[]) : [];
        const orders = ordersRes.ok ? ((await ordersRes.json()) as unknown[]) : [];

        const isKnown = audits.length > 0 || orders.length > 0;
        router.replace(isKnown ? "/portal" : "/access-denied");
      } catch {
        router.replace("/access-denied");
      }
    };

    void checkUser();
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card auth-card-compact">
          <div className="auth-seal">SX</div>
          <div className="auth-kicker">Secure Session</div>
          <h1>{user ? "Opening Access" : "Initializing Access"}</h1>
          <p className="auth-copy">
            {user
              ? "Your Google session is active. Routing you to the correct Sovereign X workspace."
              : "Verifying browser session and preparing Google authentication."}
          </p>
          <div className="auth-loading-bar" />
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-grid-mark" aria-hidden="true" />
        <div className="auth-seal">SX</div>
        <div className="auth-kicker">Sovereign X Audits</div>
        <h1>Client Portal</h1>
        <p className="auth-copy">
          Sign in with the Google account associated with your audit engagement to access your private portal.
        </p>

        {error && (
          <div className="auth-error">
            <span className="error-icon">×</span>
            <div className="error-text">
              <strong>Authentication Failure</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="auth-divider" />

        <button className="auth-google-button" onClick={() => void login()} type="button">
          <span className="google-mark" aria-hidden="true">G</span>
          Continue With Google
        </button>

        <div className="auth-actions">
          <Link href="/intake">← Back to Intake</Link>
        </div>

        <p className="auth-footnote">Authorized access only. BlackFur Capital Group LLC.</p>

        {showDevBypass && (
          <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.75rem", textAlign: "center" }}>
              Dev Only — Not visible in production
            </p>
            <button
              className="auth-google-button secondary"
              onClick={devBypass}
              type="button"
              style={{ opacity: 0.5, fontSize: "11px", marginBottom: "0.5rem" }}
            >
              <span className="google-mark" aria-hidden="true">🛠️</span>
              Admin Workstation
            </button>
            <button
              className="auth-google-button secondary"
              onClick={devBypassClient}
              type="button"
              style={{ opacity: 0.5, fontSize: "11px" }}
            >
              <span className="google-mark" aria-hidden="true">👤</span>
              Preview Client Portal
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
