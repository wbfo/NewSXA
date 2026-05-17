"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { Navigation } from "@/components/navigation";
import { TopBar } from "@/components/topbar";
import { Badge, Panel, ProgressBar } from "@/components/ui";
import type { Audit, ClientOrder, DeliverableAsset } from "@/lib/domain/types";

function statusTone(status: Audit["status"]) {
  if (status === "READY") return "green";
  if (status === "PENDING APPROVAL") return "orange";
  if (status === "IN PROGRESS") return "teal";
  return "default";
}

export default function PortalPage() {
  const { user, isAdmin, isDevBypass } = useAuth();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const [auditRes, orderRes] = await Promise.all([
        fetch("/api/audits", { cache: "no-store" }),
        fetch("/api/orders", { cache: "no-store" }),
      ]);

      const auditData = auditRes.ok ? ((await auditRes.json()) as Audit[]) : [];
      const orderData = orderRes.ok ? ((await orderRes.json()) as ClientOrder[]) : [];

      // Non-admin with no audits and no orders has no portal access
      // Dev bypass skips this gate so the empty state can be previewed
      if (!isAdmin && !isDevBypass && auditData.length === 0 && orderData.length === 0) {
        window.location.href = "/access-denied";
        return;
      }

      setAudits(auditData);
      setOrders(orderData);
      setIsInitialLoad(false);
    };

    void loadData();
  }, [user, isAdmin, isDevBypass]);

  const deliverables = useMemo(
    () =>
      audits.flatMap((audit) =>
        (audit.assets || []).map((asset: DeliverableAsset) => ({
          ...asset,
          auditName: audit.accountName
        }))
      ),
    [audits]
  );

  const activeAudit = audits[0];
  const firstName = user?.displayName?.split(" ")[0] || "Client";

  return (
    <div className="shell portal-shell">
      <Navigation />
      <div className="main">
        <TopBar />
        <main className="portal-content">
          <section className="portal-hero panel">
            <div>
              <div className="portal-kicker">Private Client Portal</div>
              <h1>Welcome back, {firstName}</h1>
              <p>
                Track your audit status, review deliverables, and see what Sovereign X needs from you next.
              </p>
            </div>
            <div className="portal-hero-side">
              <div className="metric-label">Session</div>
              <Badge label="Secure" tone="green" />
              <div className="metric-subtle">{user?.email}</div>
            </div>
          </section>

          <section className="portal-grid">
            <Panel title="Audit Status">
              {isInitialLoad ? (
                <div className="portal-empty">Fetching audit records...</div>
              ) : activeAudit ? (
                <div className="portal-audit-focus">
                  <div className="split-row">
                    <div>
                      <div className="portal-card-title">{activeAudit.accountName}</div>
                      <div className="mono-subtle">{activeAudit.auditType} • {activeAudit.currentStage}</div>
                    </div>
                    <Badge label={activeAudit.status} tone={statusTone(activeAudit.status)} />
                  </div>
                  <div className="portal-progress-row">
                    <ProgressBar value={activeAudit.progress} color="var(--gold)" />
                    <span>{activeAudit.progress}%</span>
                  </div>
                  <div className="portal-timeline">
                    <div data-active="true">
                      <span>01</span>
                      <strong>Intake received</strong>
                    </div>
                    <div data-active={activeAudit.progress >= 30 ? "true" : "false"}>
                      <span>02</span>
                      <strong>Audit in progress</strong>
                    </div>
                    <div data-active={activeAudit.progress >= 80 ? "true" : "false"}>
                      <span>03</span>
                      <strong>Review and delivery</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="portal-empty">
                  {orders.length > 0
                    ? "Your intake has been received. Your audit will appear here once our team begins work."
                    : "No active audits are attached to this account yet."}
                </div>
              )}
            </Panel>

            {orders.length > 0 && !activeAudit && (
              <Panel title="Your Intake Submission">
                <div className="stack">
                  {orders.map((order) => (
                    <div key={order.id} className="portal-deliverable">
                      <div>
                        <div className="portal-card-title">{order.businessName}</div>
                        <div className="mono-subtle">{order.packageName} • Submitted {new Date(order.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                      </div>
                      <Badge label={order.status} tone={order.status === "NEW" ? "orange" : order.status === "REVIEWING" ? "teal" : "green"} />
                    </div>
                  ))}
                </div>
                <p className="portal-empty" style={{ marginTop: "1rem" }}>
                  Our team reviews all submissions within 24 hours and will reach out to confirm your engagement.
                </p>
              </Panel>
            )}

            <Panel title="Deliverables">
              {deliverables.length > 0 ? (
                <div className="stack">
                  {deliverables.map((asset) => (
                    <div key={asset.id} className="portal-deliverable">
                      <div>
                        <div className="portal-card-title">{asset.name}</div>
                        <div className="mono-subtle">{asset.auditName} • v{asset.version}</div>
                      </div>
                      <Badge label={asset.status} tone={asset.status === "Sent" ? "green" : "orange"} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="portal-empty">Deliverables will appear here when they are ready.</div>
              )}
            </Panel>

            <Panel title="Next Steps">
              <div className="portal-next-steps">
                <div>
                  <span>01</span>
                  <p>Watch your audit status move through research, verification, and final delivery.</p>
                </div>
                <div>
                  <span>02</span>
                  <p>If Sovereign X needs screenshots, logins, or clarification, the request will show here.</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Use the support console if you need help interpreting a finding after delivery.</p>
                </div>
              </div>
              <Link className="button secondary portal-chat-link" href="/portal/chat">
                Open Support Console
              </Link>
            </Panel>
          </section>
        </main>
      </div>
    </div>
  );
}
