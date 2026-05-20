"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

type AuthMode = "sign-in" | "request-access";

export default function LoginPage() {
  const { user, login, loading, isAdmin, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<AuthMode>("sign-in");

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
        <h1>Private Portal</h1>
        <p className="auth-copy">
          Invite-only access for approved admin and client emails.
        </p>

        <div className="auth-mode-switch" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "sign-in"}
            className={mode === "sign-in" ? "auth-mode-tab active" : "auth-mode-tab"}
            onClick={() => setMode("sign-in")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "request-access"}
            className={mode === "request-access" ? "auth-mode-tab active" : "auth-mode-tab"}
            onClick={() => setMode("request-access")}
          >
            Request access
          </button>
        </div>

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

        {mode === "sign-in" ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void login(email);
            }}
            style={{ display: "grid", gap: "0.75rem" }}
          >
            <label className="auth-label" htmlFor="email">
              Email address
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
              Sign in
            </button>
          </form>
        ) : (
          <div className="auth-request-card">
            <p className="auth-copy" style={{ marginBottom: "0.75rem" }}>
              This workspace is invite-only. Ask the administrator to add your email to the approved list, then return here to sign in.
            </p>
            <Link className="auth-submit-button" href="/intake" style={{ textAlign: "center" }}>
              Start Intake
            </Link>
          </div>
        )}

        <div className="auth-actions">
          <Link href="/intake">← Back to Intake</Link>
        </div>

        <p className="auth-footnote">Authorized access only. BlackFur Capital Group LLC.</p>
      </section>
    </main>
  );
}
