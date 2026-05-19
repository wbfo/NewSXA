"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

const DEFAULT_EMAIL = "sxabfcg@gmail.com";

export default function LoginPage() {
  const { user, login, loading, isAdmin, error, devBypass, devBypassClient } = useAuth();
  const router = useRouter();
  const showDevBypass = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_ENABLE_DEV_BYPASS === "true";
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  useEffect(() => {
    if (!user || loading) return;
    router.replace(isAdmin ? "/admin" : "/portal");
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card auth-card-compact">
          <div className="auth-seal">SX</div>
          <div className="auth-kicker">Secure Session</div>
          <h1>{user ? "Opening Access" : "Initializing Access"}</h1>
          <p className="auth-copy">
            {user ? "Your session is active. Routing you to the correct Sovereign X workspace." : "Verifying stored session and preparing access."}
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
          Enter an approved email address to continue. Admin access is currently reserved for the hardcoded operator account.
        </p>

        {error && (
          <div className="auth-error">
            <span className="error-icon">×</span>
            <div className="error-text">
              <strong>Access Blocked</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="auth-divider" />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void login(email);
          }}
          style={{ display: "grid", gap: "0.75rem" }}
        >
          <label className="auth-label" htmlFor="email">
            Approved Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="auth-input"
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com"
          />
          <button className="auth-submit-button" type="submit">
            Continue
          </button>
        </form>

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
              className="auth-submit-button secondary"
              onClick={devBypass}
              type="button"
              style={{ opacity: 0.5, fontSize: "11px", marginBottom: "0.5rem" }}
            >
              <span className="auth-icon" aria-hidden="true">🛠️</span>
              Admin Workstation
            </button>
            <button
              className="auth-submit-button secondary"
              onClick={devBypassClient}
              type="button"
              style={{ opacity: 0.5, fontSize: "11px" }}
            >
              <span className="auth-icon" aria-hidden="true">👤</span>
              Preview Client Portal
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
