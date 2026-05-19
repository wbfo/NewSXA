"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

export default function AccessDeniedPage() {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
    router.refresh();
  };

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [loading, user, isAdmin, router]);

  if (loading || (user && isAdmin)) {
    return (
      <main className="auth-page">
        <div className="auth-card auth-card-compact">
          <div className="auth-seal">SX</div>
          <div className="auth-kicker">Secure Session</div>
          <h1>Opening Command</h1>
          <p className="auth-copy">Your admin identity is verified. Routing you back to the command center.</p>
          <div className="auth-loading-bar" />
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-wide">
        <div className="auth-grid-mark" aria-hidden="true" />
        <div className="auth-alert">!</div>
        <div className="auth-kicker auth-kicker-red">Pending Review</div>
        <h1>Access Restricted</h1>
        <p className="auth-copy">
          This email is not attached to an active client audit or an approved admin account yet.
        </p>

        <div className="auth-status-list">
          <div>
            <span>Status</span>
            <strong>No active portal assignment</strong>
          </div>
          <div>
            <span>Next Step</span>
            <strong>Submit an intake or ask for access approval</strong>
          </div>
        </div>

        <div className="auth-button-row">
          <Link className="button" href="/intake">
            Get Your Audit
          </Link>
          <button className="button secondary" onClick={() => void handleLogout()} type="button">
            Disconnect Session
          </button>
        </div>

        <p className="auth-footnote">BlackFur Capital Group LLC • Security infrastructure active</p>
      </section>
    </main>
  );
}
