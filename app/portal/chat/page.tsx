"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { TopBar } from "@/components/topbar";
import { Panel } from "@/components/ui";

export default function PortalChatPage() {
  return (
    <div className="shell portal-shell">
      <Navigation />
      <div className="main">
        <TopBar />
        <main className="portal-content">
          <section className="portal-hero panel">
            <div>
              <div className="portal-kicker">Support Console</div>
              <h1>Client Support</h1>
              <p>
                This space is reserved for audit questions, delivery support, and post-report clarification.
              </p>
            </div>
            <Link className="button secondary" href="/portal">
              Back To Portal
            </Link>
          </section>

          <section className="portal-grid portal-grid-single">
            <Panel title="Secure Messages">
              <div className="portal-empty portal-empty-large">
                <p>Secure messaging is reserved for active audit engagements.</p>
                <p style={{ marginTop: "0.75rem", fontSize: "0.75rem" }}>
                  For support during your audit, reply directly to your onboarding email or contact your assigned Sovereign X analyst.
                  All inquiries receive a response within one business day.
                </p>
              </div>
            </Panel>
          </section>
        </main>
      </div>
    </div>
  );
}
