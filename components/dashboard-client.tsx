"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { BusinessExpense, ChatMessage, DashboardPayload, ExpenseCategory, ExpenseCycle, ExpenseDecision, ExpenseStatus, FinanceBudget, QueueItem, ReportItem, WorkflowRun } from "@/lib/domain/types";
import { Navigation } from "@/components/navigation";
import { TopBar } from "@/components/topbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Badge, Panel, ProgressBar } from "@/components/ui";
import { ToolkitSectionView } from "@/components/toolkit-views";
import { formatDisplayTime } from "@/lib/utils/time";
import { buildFinanceSummary, getMonthlyExpenseAmount } from "@/lib/finance/calculations";
import { ChatBubble } from "@/components/chat-bubble";

async function fetchDashboard() {
  const response = await fetch("/api/dashboard", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }
  return (await response.json()) as DashboardPayload;
}

const FOLLOW_UP_REFERENCE_TIME = Date.now();

function useDashboard(initialData: DashboardPayload) {
  const [dashboard, setDashboard] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const stream = new EventSource("/api/events/stream");
    stream.onmessage = () => {
      setConnectionError(false);
      void fetchDashboard().then(setDashboard).catch(() => undefined);
    };
    stream.onerror = () => {
      setConnectionError(true);
    };

    return () => stream.close();
  }, []);

  const triggerAudit = async (payload: {
    accountName: string;
    auditType: string;
    socialHandle: string;
    websiteUrl: string;
    city: string;
    category: string;
    phone: string;
  }) => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Audit request failed.");
      }
      setDashboard(await fetchDashboard());
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Audit request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const approveWorkflow = async (workflowId: string) => {
    await fetch(`/api/workflows/${workflowId}/approve`, { method: "POST" });
    setDashboard(await fetchDashboard());
  };

  const addProspect = async (payload: {
    name: string;
    contactPoints: string;
    serviceInterest: string;
    play: string;
    priority: string;
    estimatedValue: string;
  }) => {
    const response = await fetch("/api/prospects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to add prospect.");
    }
    setDashboard(await fetchDashboard());
  };

  const addPipelineItem = async (payload: {
    prospectName: string;
    stage: string;
    value: number;
    temperature: string;
    offerType: string;
  }) => {
    const response = await fetch("/api/pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to add deal.");
    }
    setDashboard(await fetchDashboard());
  };

  const updateRevenue = async (patch: { monthlyReceived?: number; survivalTarget?: number }) => {
    const response = await fetch("/api/revenue", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to update revenue.");
    }
    setDashboard(await fetchDashboard());
  };

  const addExpense = async (payload: {
    name: string;
    vendor: string;
    category: ExpenseCategory;
    amount: number;
    billingCycle: ExpenseCycle;
    nextDueDate?: string;
    paymentMethod?: string;
    status: ExpenseStatus;
    decision: ExpenseDecision;
    owner?: string;
    useCase?: string;
    notes?: string;
    receiptUrl?: string;
    relatedVaultAssetId?: string;
  }) => {
    const response = await fetch("/api/finance/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to add expense.");
    }
    setDashboard(await fetchDashboard());
  };

  const updateExpense = async (expenseId: string, patch: Partial<BusinessExpense>) => {
    const response = await fetch(`/api/finance/expenses/${expenseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to update expense.");
    }
    setDashboard(await fetchDashboard());
  };

  const deleteExpense = async (expenseId: string) => {
    const response = await fetch(`/api/finance/expenses/${expenseId}`, { method: "DELETE" });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to remove expense.");
    }
    setDashboard(await fetchDashboard());
  };

  const updateFinanceBudget = async (patch: Partial<FinanceBudget>) => {
    const response = await fetch("/api/finance/budget", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to update finance budget.");
    }
    setDashboard(await fetchDashboard());
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    setDashboard(await fetchDashboard());
  };

  const addAsset = async (auditId: string, payload: { name: string; type: string; driveLink: string; version: string }) => {
    const response = await fetch(`/api/audits/${auditId}/assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error ?? "Failed to add asset.");
    setDashboard(await fetchDashboard());
  };

  const updateAsset = async (auditId: string, assetId: string, status: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === "Sent") patch.sentAt = new Date().toISOString();
    await fetch(`/api/audits/${auditId}/assets/${assetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    setDashboard(await fetchDashboard());
  };

  const uploadVaultFile = async (payload: { file: File; prompt: string }) => {
    const formData = new FormData();
    formData.append("file", payload.file);
    if (payload.prompt.trim()) {
      formData.append("prompt", payload.prompt.trim());
    }

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      throw new Error(body.error ?? "Upload failed.");
    }
    setDashboard(await fetchDashboard());
  };

  const deletePipelineItem = async (id: string) => {
    await fetch(`/api/pipeline/${id}`, { method: "DELETE" });
    setDashboard(await fetchDashboard());
  };

  const deleteProspect = async (id: string) => {
    await fetch(`/api/prospects/${id}`, { method: "DELETE" });
    setDashboard(await fetchDashboard());
  };

  const dismissQueueItem = async (id: string) => {
    await fetch(`/api/queue/${id}`, { method: "DELETE" });
    setDashboard(await fetchDashboard());
  };

  const markReportRead = async (reportId: string) => {
    await fetch(`/api/reports/${reportId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "READ" }),
    });
    setDashboard(await fetchDashboard());
  };

  const dismissReport = async (reportId: string) => {
    await fetch(`/api/reports/${reportId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "ARCHIVED" }),
    });
    setDashboard(await fetchDashboard());
  };

  const approveReportItem = async (reportId: string, itemId: string) => {
    await fetch(`/api/reports/${reportId}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" }),
    });
    setDashboard(await fetchDashboard());
  };

  const dismissReportItem = async (reportId: string, itemId: string) => {
    await fetch(`/api/reports/${reportId}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "DISMISSED" }),
    });
    setDashboard(await fetchDashboard());
  };

  const runOutreach = async () => {
    await fetch("/api/agents/outreach/run", { method: "POST" });
    setDashboard(await fetchDashboard());
  };

  const runCfo = async () => {
    await fetch("/api/agents/cfo/run", { method: "POST" });
    setDashboard(await fetchDashboard());
  };

  const runFollowup = async () => {
    await fetch("/api/agents/followup/run", { method: "POST" });
    setDashboard(await fetchDashboard());
  };

  const runResearch = async () => {
    await fetch("/api/agents/research/run", { method: "POST" });
    setDashboard(await fetchDashboard());
  };

  const refreshDashboard = async () => {
    try {
      const data = await fetchDashboard();
      setDashboard(data);
    } catch {
      // ignore
    }
  };

  return { dashboard, triggerAudit, approveWorkflow, addProspect, addPipelineItem, updateRevenue, addExpense, updateExpense, deleteExpense, updateFinanceBudget, updateOrderStatus, addAsset, updateAsset, uploadVaultFile, deletePipelineItem, deleteProspect, dismissQueueItem, markReportRead, dismissReport, approveReportItem, dismissReportItem, runOutreach, runCfo, runFollowup, runResearch, refreshDashboard, isSubmitting, error, connectionError };
}

function toneForQueue(item: QueueItem) {
  if (item.urgency === "urgent") {
    return "red";
  }
  if (item.type === "CONTENT") {
    return "purple";
  }
  return "orange";
}

function toneForOrderStatus(status: string): "default" | "green" | "red" | "orange" | "teal" | "purple" {
  switch (status) {
    case "COMPLETE":
      return "green";
    case "IN PROGRESS":
    case "REVIEWING":
      return "teal";
    case "CONTACTED":
      return "orange";
    case "NEW":
    default:
      return "red";
  }
}

function formatActivityLabel(eventType: string) {
  switch (eventType) {
    case "workflow.started":
      return "Workflow started";
    case "workflow.step":
      return "Workflow step";
    case "workflow.awaiting_approval":
      return "Awaiting approval";
    case "workflow.approved":
      return "Workflow approved";
    case "workflow.completed":
      return "Workflow completed";
    case "chat.message":
      return "Hermes replied";
    case "agent.status":
      return "Agent update";
    case "intake.submitted":
      return "Intake submitted";
    case "vault.ingested":
      return "Vault ingested";
    case "finance.updated":
      return "Finance updated";
    default:
      return "Activity";
  }
}

function RecentActivityRail({ dashboard }: { dashboard: DashboardPayload }) {
  const items =
    dashboard.events.length > 0
      ? dashboard.events.slice(0, 6).map((event) => ({
          id: event.id,
          title: formatActivityLabel(event.eventType),
          body: event.payloadSummary,
          time: formatDisplayTime(event.timestamp)
        }))
      : dashboard.councilBrief.slice(0, 6).map((brief) => ({
          id: brief.id,
          title: brief.source,
          body: brief.note,
          time: formatDisplayTime(brief.createdAt)
        }));

  return (
    <Panel title="Recent Activity">
      <div className="stack">
        {items.map((item) => (
          <div key={item.id} className="activity-item">
            <div className="activity-dot" />
            <div>
              <div className="activity-title">{item.title}</div>
              <div className="activity-body">{item.body}</div>
            </div>
            <div className="activity-time">{item.time}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function IntelligenceFeedRail({ dashboard }: { dashboard: DashboardPayload }) {
  const callsToAction = [
    `Survival target ${dashboard.summary.monthlyReceived.toLocaleString()} / ${dashboard.summary.survivalTarget.toLocaleString()}`,
    `${dashboard.agents.filter((agent) => agent.status === "ACTIVE").length} active agents`,
    `${dashboard.queue.filter((item) => item.urgency === "urgent").length} urgent actions`
  ];

  return (
    <Panel title="Intelligence Feed">
      <div className="stack">
        {dashboard.councilBrief.map((item) => (
          <div key={item.id} className="list-card feed-card">
            <div className="split-row" style={{ marginBottom: 8 }}>
              <strong>{item.source}</strong>
              <span className="muted">{formatDisplayTime(item.createdAt)}</span>
            </div>
            <div style={{ lineHeight: 1.7 }}>{item.note}</div>
          </div>
        ))}
        <div className="feed-footer">
          {callsToAction.map((item, index) => (
            <div key={`${item}-${index}`} className="feed-chip">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function CommandView({ dashboard, onDismissQueueItem }: { dashboard: DashboardPayload; onDismissQueueItem: (id: string) => Promise<void> }) {
  const summary = dashboard.summary;
  const stillNeeded = Math.max(0, summary.survivalTarget - summary.monthlyReceived);
  const progress = Math.round((summary.monthlyReceived / summary.survivalTarget) * 100);
  const topAudits = dashboard.audits.slice(0, 4);
  const hotPipeline = dashboard.pipeline.filter((item) => item.temperature === "hot").slice(0, 4);
  const latestOrders = dashboard.orders.slice(0, 4);
  const newOrders = dashboard.orders.filter((order) => order.status === "NEW").length;

  const followUpItems = useMemo(() => {
    return dashboard.audits
      .flatMap(a => (a.assets || []).map(asset => ({ audit: a, asset })))
      .filter(({ asset }) => asset.status === "Sent" && asset.sentAt && (FOLLOW_UP_REFERENCE_TIME - new Date(asset.sentAt).getTime()) > 3 * 24 * 60 * 60 * 1000 && !asset.followUpTriggered)
      .map(({ audit, asset }) => ({
        id: `followup-${asset.id}`,
        type: "FOLLOW-UP",
        urgency: "urgent" as const,
        requiredAction: `Follow up on ${asset.name} for ${audit.accountName}`,
        canDismiss: false as const,
      }));
  }, [dashboard.audits]);

  const combinedQueue = [
    ...followUpItems,
    ...dashboard.queue.map(i => ({ ...i, canDismiss: true as const })),
  ];

  return (
    <div className="command-grid">
      <Panel title={`Monthly Survival Target — ${summary.month}`} aside={<Link href="?section=revenue" className="panel-link">View survival breakdown →</Link>}>
        <div className="survival-hero">
          <div>
            <div className="survival-value">
              ${summary.monthlyReceived.toLocaleString()} <span>/ ${summary.survivalTarget.toLocaleString()}</span>
            </div>
            <div className="survival-label">Received</div>
            <div className="mono-subtle" style={{ marginTop: 12 }}>
              ${stillNeeded.toLocaleString()} remaining to survive this month
            </div>
          </div>
          <div className="survival-shield">
            <div className="survival-shield-ring" />
            <div className="survival-shield-icon">⌁</div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="split-row" style={{ marginBottom: 8 }}>
            <span className="mono-subtle">Monthly progress toward survival target</span>
            <span className="mono-subtle">{progress}%</span>
          </div>
          <ProgressBar value={progress} color={progress >= 100 ? "var(--green)" : "var(--gold)"} />
        </div>
        <div className="mini-stat-grid">
          <div className="mini-stat">
            <div className="mono-subtle">Daily target</div>
            <div>${(summary.survivalTarget / 30).toFixed(0)}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">Weekly target</div>
            <div>${(summary.survivalTarget / 4.3).toFixed(0)}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">Promo slots</div>
            <div>{summary.slotsTotal - summary.slotsUsed}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">System</div>
            <div>Active</div>
          </div>
        </div>
      </Panel>

      <Panel title="Audits In Progress" aside={<Link href="?section=audits" className="panel-link">View all audits →</Link>}>
        <div className="stack">
          {topAudits.length > 0 ? (
            topAudits.map((audit) => (
              <div key={audit.id} className="audit-row">
                <div className="audit-main">
                  <div className="audit-name">{audit.accountName}</div>
                  <div className="mono-subtle">
                    {audit.auditType} · {audit.currentStage} · ↳ {audit.assignedAgent}
                  </div>
                </div>
                <div className="audit-side">
                  <div className="audit-value">${audit.commercialValue.toLocaleString()}</div>
                  <Badge label={audit.status} tone={audit.status === "PENDING APPROVAL" ? "orange" : "green"} />
                </div>
                <div className="audit-progress">
                  <ProgressBar value={audit.progress} color={audit.status === "PENDING APPROVAL" ? "var(--orange)" : "var(--gold)"} />
                  <span className="mono-subtle">{audit.progress}%</span>
                </div>
              </div>
            ))
          ) : (
            <div className="mono-subtle">No audits yet. Trigger one from the Audits section.</div>
          )}
        </div>
      </Panel>

      <Panel title="Pipeline Overview" aside={<Link href="?section=pipeline" className="panel-link">View pipeline →</Link>}>
        <div className="pipeline-overview">
          <div className="pipeline-summary">
            <div className="pipeline-ring">
              <div className="pipeline-ring-inner">
                <div className="pipeline-ring-value">{dashboard.pipeline.length}</div>
                <div className="pipeline-ring-label">total prospects</div>
              </div>
            </div>
            <div className="pipeline-kpis">
              <div className="mini-stat">
                <div className="mono-subtle">Hot prospects</div>
                <div>{dashboard.pipeline.filter((item) => item.temperature === "hot").length}</div>
              </div>
              <div className="mini-stat">
                <div className="mono-subtle">Pipeline value</div>
                <div>${dashboard.pipeline.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</div>
              </div>
              <div className="mini-stat">
                <div className="mono-subtle">Conversion</div>
                <div>{dashboard.pipeline.length > 0 ? Math.round((dashboard.pipeline.filter((item) => item.temperature === "hot").length / dashboard.pipeline.length) * 100) : 0}%</div>
              </div>
            </div>
          </div>
          <div className="pipeline-list">
            {hotPipeline.length > 0 ? (
              hotPipeline.map((item) => (
                <div key={item.id} className="pipeline-item">
                  <div>
                    <div className="pipeline-name">{item.prospectName}</div>
                    <div className="mono-subtle">{item.offerType}</div>
                  </div>
                  <div className="pipeline-meta">
                    <Badge label={item.stage} tone={item.temperature === "hot" ? "red" : "orange"} />
                    <span className="pipeline-value">${item.value.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="mono-subtle">No hot pipeline items yet.</div>
            )}
          </div>
        </div>
      </Panel>

      <Panel title="Live Agent Council" aside={<Link href="?section=agents" className="panel-link">All agents →</Link>}>
        <div className="stack">
          {dashboard.agents.map((agent) => (
            <div key={agent.id} className="agent-row">
              <div className="agent-dot" data-active={agent.status === "ACTIVE" ? "true" : "false"} />
              <div className="agent-main">
                <div className="agent-name">{agent.name}</div>
                <div className="mono-subtle">{agent.role}</div>
              </div>
              <div className="agent-side">
                <Badge label={agent.status} tone={agent.status === "ACTIVE" ? "green" : "default"} />
                <div className="muted">{agent.latestEventSummary}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="System Intelligence">
        <div className="system-strip">
          <div className="system-block">
            <div className="system-icon">◉</div>
            <div>
              <div className="system-title">System Intelligence</div>
              <div className="muted">All systems optimized. Agents operating within normal parameters.</div>
            </div>
          </div>
          <div className="system-block">
            <div className="system-icon">◎</div>
            <div>
              <div className="system-title">Mission Priority</div>
              <div className="muted">May 2026 survival target. Focus: high-value audits &amp; conversions.</div>
            </div>
          </div>
          <div className="system-block">
            <div className="system-icon">✦</div>
            <div>
              <div className="system-title">Next Strategic Action</div>
              <div className="muted">Follow up with hot prospects and tighten conversion paths.</div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Needs Your Attention">
        <div className="stack">
          {combinedQueue.length > 0 ? (
            combinedQueue.slice(0, 4).map((item) => (
              <div key={item.id} className="attention-row">
                <div className="attention-main">
                  <span className="attention-dot" data-urgent={item.urgency === "urgent" ? "true" : "false"} />
                  <div className="attention-text">{item.requiredAction}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <Badge label={item.type} tone={toneForQueue(item as QueueItem) as "red"} />
                  {item.canDismiss && (
                    <button
                      className="button secondary"
                      style={{ fontSize: 11, padding: "3px 8px" }}
                      onClick={() => void onDismissQueueItem(item.id)}
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="mono-subtle">No urgent items right now.</div>
          )}
        </div>
      </Panel>

      <Panel title="Incoming Orders" aside={<Link href="?section=orders" className="panel-link">Open intake →</Link>}>
        <div className="stack">
          <div className="mini-stat-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
            <div className="mini-stat">
              <div className="mono-subtle">Orders</div>
              <div>{dashboard.orders.length}</div>
            </div>
            <div className="mini-stat">
              <div className="mono-subtle">New</div>
              <div>{newOrders}</div>
            </div>
            <div className="mini-stat">
              <div className="mono-subtle">Reviewed</div>
              <div>{dashboard.orders.filter((order) => order.status !== "NEW").length}</div>
            </div>
          </div>
          {latestOrders.length > 0 ? (
            latestOrders.map((order) => (
              <div key={order.id} className="list-card">
                <div className="split-row" style={{ marginBottom: 8 }}>
                  <div>
                    <div>{order.businessName}</div>
                    <div className="mono-subtle">
                      {order.customerName} · {order.packageName}
                    </div>
                  </div>
                  <Badge label={order.status} tone={toneForOrderStatus(order.status)} />
                </div>
                <div className="mono-subtle" style={{ marginBottom: 8 }}>
                  {order.email}{order.phone ? ` · ${order.phone}` : ""}
                </div>
                <div style={{ lineHeight: 1.7 }}>{order.notes || "No notes provided."}</div>
              </div>
            ))
          ) : (
            <div className="mono-subtle">No orders yet. Publish the intake page to start collecting submissions.</div>
          )}
        </div>
      </Panel>
    </div>
  );
}

function AssetsView({ dashboard, onUpdateAsset }: { dashboard: DashboardPayload; onUpdateAsset: (auditId: string, assetId: string, status: string) => Promise<void> }) {
  const allAssets = dashboard.audits.flatMap(a =>
    (a.assets || []).map(asset => ({ ...asset, auditId: a.id, auditName: a.accountName, location: a.location, project: a.projectName }))
  );

  return (
    <div className="section-grid">
      <Panel title="Deliverables & Assets">
        <div className="stack">
          {allAssets.length > 0 ? allAssets.map(asset => (
            <div key={asset.id} className="list-card">
              <div className="split-row">
                <div>
                  <div style={{ fontSize: 15 }}>{asset.name}</div>
                  <div className="mono-subtle">{asset.type} · {asset.auditName} {asset.project ? `/ ${asset.project}` : ""} {asset.location ? `(${asset.location})` : ""}</div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <Badge label={asset.status} tone={asset.status === "Sent" ? "green" : asset.status === "Ready" ? "teal" : asset.status === "Internal Review" ? "orange" : "default"} />
                  {asset.status === "Internal Review" && (
                    <button
                      className="button secondary"
                      style={{ fontSize: 12, padding: "4px 8px" }}
                      onClick={() => void onUpdateAsset(asset.auditId, asset.id, "Ready")}
                    >
                      Approve for Delivery
                    </button>
                  )}
                  {asset.status === "Ready" && (
                    <button
                      className="button"
                      style={{ fontSize: 12, padding: "4px 8px" }}
                      onClick={() => void onUpdateAsset(asset.auditId, asset.id, "Sent")}
                    >
                      Mark as Sent
                    </button>
                  )}
                </div>
              </div>
              <div className="split-row" style={{ marginTop: 10 }}>
                <div className="mono-subtle">Version: {asset.version}</div>
                {asset.driveLink ? (
                  <a href={asset.driveLink} target="_blank" rel="noreferrer" className="panel-link">View in Drive ↗</a>
                ) : (
                  <span className="muted">No drive link yet</span>
                )}
              </div>
            </div>
          )) : (
            <div className="mono-subtle">No deliverables yet. Add one from the Audits section.</div>
          )}
        </div>
      </Panel>
    </div>
  );
}

function formatAssetBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function VaultUploadForm({ onUpload }: { onUpload: (payload: { file: File; prompt: string }) => Promise<void> }) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        if (!file || submitting) return;
        setSubmitting(true);
        setError("");
        void onUpload({ file, prompt })
          .then(() => {
            setFile(null);
            setPrompt("");
            const input = event.currentTarget.querySelector<HTMLInputElement>("input[type=file]");
            if (input) input.value = "";
          })
          .catch((caughtError) => setError(caughtError instanceof Error ? caughtError.message : "Upload failed."))
          .finally(() => setSubmitting(false));
      }}
    >
      <input
        className="input"
        type="file"
        accept="image/*,.txt,.md,.markdown,.csv,.json,.jsonl,.log,.xml,.yaml,.yml,.pdf,.doc,.docx,.xls,.xlsx"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
      <textarea
        className="input"
        rows={3}
        placeholder="Optional instruction for Hermes about this upload"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        style={{ resize: "vertical" }}
      />
      {file ? (
        <div className="mono-subtle">
          Selected: {file.name} · {formatAssetBytes(file.size)}
        </div>
      ) : null}
      {error ? <div className="mono-subtle" style={{ color: "var(--red)" }}>{error}</div> : null}
      <button className="button" type="submit" disabled={!file || submitting}>
        {submitting ? "Ingesting…" : "Add to Vault"}
      </button>
    </form>
  );
}

function VaultView({ dashboard, onUpload }: { dashboard: DashboardPayload; onUpload: (payload: { file: File; prompt: string }) => Promise<void> }) {
  const readyCount = dashboard.knowledgeAssets.filter((asset) => asset.status === "READY").length;
  const limitedCount = dashboard.knowledgeAssets.filter((asset) => asset.status === "LIMITED").length;

  return (
    <div className="section-grid">
      <Panel title="Hermes Vault">
        <div className="mini-stat-grid" style={{ marginBottom: 16 }}>
          <div className="mini-stat">
            <div className="mono-subtle">Items</div>
            <div>{dashboard.knowledgeAssets.length}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">Readable</div>
            <div style={{ color: "var(--green)" }}>{readyCount}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">Limited</div>
            <div style={{ color: limitedCount > 0 ? "var(--orange)" : undefined }}>{limitedCount}</div>
          </div>
        </div>

        <div className="stack">
          {dashboard.knowledgeAssets.length === 0 ? (
            <div className="mono-subtle">No vault items yet. Add files below and Hermes will receive their extracted context in chat.</div>
          ) : (
            dashboard.knowledgeAssets.map((asset) => (
              <div key={asset.id} className="list-card">
                <div className="split-row" style={{ marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15 }}>{asset.name}</div>
                    <div className="mono-subtle">
                      {asset.mimeType} · {formatAssetBytes(asset.size)} · {formatDisplayTime(asset.uploadedAt)}
                    </div>
                  </div>
                  <Badge label={asset.status} tone={asset.status === "READY" ? "green" : asset.status === "LIMITED" ? "orange" : "red"} />
                </div>
                <div className="mono-subtle" style={{ marginBottom: 8 }}>Stored for Hermes context as {asset.id}</div>
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.65, maxHeight: 220, overflow: "auto" }}>
                  {asset.summary}
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>

      <Panel title="Drop Files Into Context">
        <VaultUploadForm onUpload={onUpload} />
      </Panel>
    </div>
  );
}

function AddAssetForm({ audits, onAdd }: {
  audits: DashboardPayload["audits"];
  onAdd: (auditId: string, payload: { name: string; type: string; driveLink: string; version: string }) => Promise<void>;
}) {
  const [auditId, setAuditId] = useState(audits[0]?.id ?? "");
  const [name, setName] = useState("");
  const [type, setType] = useState("Report");
  const [driveLink, setDriveLink] = useState("");
  const [version, setVersion] = useState("1.0");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        void onAdd(auditId, { name, type, driveLink, version })
          .then(() => { setName(""); setDriveLink(""); setVersion("1.0"); })
          .finally(() => setSubmitting(false));
      }}
    >
      <select className="select" value={auditId} onChange={(e) => setAuditId(e.target.value)} required>
        {audits.map(a => <option key={a.id} value={a.id}>{a.accountName}</option>)}
      </select>
      <input className="input" placeholder="Asset name *" value={name} onChange={(e) => setName(e.target.value)} required />
      <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
        <option>Report</option>
        <option>Proposal</option>
        <option>Presentation</option>
        <option>Video</option>
        <option>Copy</option>
        <option>Design</option>
        <option>Other</option>
      </select>
      <input className="input" placeholder="Version (e.g. 1.0)" value={version} onChange={(e) => setVersion(e.target.value)} />
      <input className="input" placeholder="Drive link (optional)" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} />
      <button className="button" type="submit" disabled={submitting || !auditId}>
        {submitting ? "Adding…" : "Add Deliverable"}
      </button>
    </form>
  );
}

function AuditsView({
  dashboard,
  onCreateAudit,
  onAddAsset,
  isSubmitting,
  onApproveWorkflow
}: {
  dashboard: DashboardPayload;
  onCreateAudit: (payload: {
    accountName: string;
    auditType: string;
    socialHandle: string;
    websiteUrl: string;
    city: string;
    category: string;
    phone: string;
  }) => Promise<void>;
  onAddAsset: (auditId: string, payload: { name: string; type: string; driveLink: string; version: string }) => Promise<void>;
  isSubmitting: boolean;
  onApproveWorkflow: (workflowId: string) => Promise<void>;
}) {
  return (
    <div className="section-grid">

      <Panel title="Audits In Progress">
        <div className="stack">
          {dashboard.audits.length === 0 ? (
            <div className="mono-subtle">No audits yet. Trigger one below.</div>
          ) : (
            dashboard.audits.map((audit) => (
              <div key={audit.id} className="list-card">
                <div className="split-row" style={{ marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15 }}>{audit.accountName}</div>
                    <div className="mono-subtle">
                      {audit.auditType} · {audit.currentStage} · ↳ {audit.assignedAgent}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "var(--gold)" }}>${audit.commercialValue.toLocaleString()}</div>
                    <div className="muted">{audit.status}</div>
                  </div>
                </div>
                <div className="split-row" style={{ gap: 10 }}>
                  <ProgressBar value={audit.progress} color={audit.status === "PENDING APPROVAL" ? "var(--orange)" : "var(--gold)"} />
                  <span className="mono-subtle">{audit.progress}%</span>
                </div>
                {(audit.assets ?? []).length > 0 && (
                  <div style={{ marginTop: 12, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                    <div className="mono-subtle" style={{ marginBottom: 6 }}>Deliverables</div>
                    <div className="stack">
                      {(audit.assets ?? []).map(asset => (
                        <div key={asset.id} className="split-row">
                          <div>
                            <span style={{ fontSize: 13 }}>{asset.name}</span>
                            <span className="muted" style={{ marginLeft: 8 }}>{asset.type}</span>
                          </div>
                          <Badge label={asset.status} tone={asset.status === "Sent" ? "green" : asset.status === "Ready" ? "teal" : "orange"} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Panel>

      <Panel title="Trigger New Audit">
        <AuditTriggerForm onCreateAudit={onCreateAudit} isSubmitting={isSubmitting} />
      </Panel>

      <Panel title="Add Deliverable">
        {dashboard.audits.length === 0 ? (
          <div className="mono-subtle">Trigger an audit first to add deliverables.</div>
        ) : (
          <AddAssetForm audits={dashboard.audits} onAdd={onAddAsset} />
        )}
      </Panel>

      <Panel title="Workflow Approvals">
        <div className="stack">
          {dashboard.workflowRuns
            .filter((run) => run.status === "awaiting_approval")
            .map((run) => (
              <div key={run.id} className="list-card">
                <div className="split-row" style={{ marginBottom: 8 }}>
                  <div>
                    <div>{run.id}</div>
                    <div className="mono-subtle">{run.currentStep}</div>
                  </div>
                  <button className="button" type="button" onClick={() => void onApproveWorkflow(run.id)}>
                    Approve
                  </button>
                </div>
                {run.stepHistory.map((step) => (
                  <div key={step.id} className="mono-subtle" style={{ marginTop: 4 }}>
                    {step.label} — {step.status}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </Panel>
    </div>
  );
}

function AuditTriggerForm({
  onCreateAudit,
  isSubmitting
}: {
  onCreateAudit: (payload: {
    accountName: string;
    auditType: string;
    socialHandle: string;
    websiteUrl: string;
    city: string;
    category: string;
    phone: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}) {
  const [accountName, setAccountName] = useState("");
  const [auditType, setAuditType] = useState("Digital Standard");
  const [socialHandle, setSocialHandle] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        void onCreateAudit({ accountName, auditType, socialHandle, websiteUrl, city, category, phone });
        setAccountName("");
        setSocialHandle("");
        setWebsiteUrl("");
        setCity("");
        setCategory("");
        setPhone("");
      }}
    >
      <input className="input" placeholder="Name / Business" value={accountName} onChange={(event) => setAccountName(event.target.value)} required />
      <input className="input" placeholder="Website URL (required for Digital)" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} />
      <select className="select" value={auditType} onChange={(event) => setAuditType(event.target.value)}>
        <option>Digital Standard</option>
        <option>Digital Deep</option>
        <option>X Image Audit</option>
        <option>Voice Agent</option>
      </select>
      <input className="input" placeholder="Category (e.g. dental practice)" value={category} onChange={(event) => setCategory(event.target.value)} />
      <input className="input" placeholder="City (optional)" value={city} onChange={(event) => setCity(event.target.value)} />
      <input className="input" placeholder="Phone (optional)" value={phone} onChange={(event) => setPhone(event.target.value)} />
      <input className="input" placeholder="@handle (optional)" value={socialHandle} onChange={(event) => setSocialHandle(event.target.value)} />
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Working" : "Trigger"}
      </button>
    </form>
  );
}

function AddDealForm({ onAdd }: { onAdd: (p: { prospectName: string; stage: string; value: number; temperature: string; offerType: string }) => Promise<void> }) {
  const [prospectName, setProspectName] = useState("");
  const [stage, setStage] = useState("Outreach");
  const [value, setValue] = useState("");
  const [temperature, setTemperature] = useState("warm");
  const [offerType, setOfferType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        void onAdd({ prospectName, stage, value: Number(value) || 0, temperature, offerType })
          .then(() => { setProspectName(""); setValue(""); setOfferType(""); setStage("Outreach"); })
          .finally(() => setSubmitting(false));
      }}
    >
      <input className="input" placeholder="Prospect name *" value={prospectName} onChange={(e) => setProspectName(e.target.value)} required />
      <input className="input" placeholder="Stage (e.g. Outreach, Proposal, Closing)" value={stage} onChange={(e) => setStage(e.target.value)} required />
      <input className="input" placeholder="Deal value ($)" type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} required />
      <input className="input" placeholder="Offer type (e.g. Digital Deep)" value={offerType} onChange={(e) => setOfferType(e.target.value)} />
      <select className="select" value={temperature} onChange={(e) => setTemperature(e.target.value)}>
        <option value="hot">Hot</option>
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
      </select>
      <button className="button" type="submit" disabled={submitting}>{submitting ? "Adding…" : "Add Deal"}</button>
    </form>
  );
}

function PipelineView({ dashboard, onAddDeal, onDeleteItem }: { dashboard: DashboardPayload; onAddDeal: (p: { prospectName: string; stage: string; value: number; temperature: string; offerType: string }) => Promise<void>; onDeleteItem: (id: string) => Promise<void> }) {
  const total = dashboard.pipeline.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="section-grid">
      <Panel title="Pipeline Summary">
        <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          <div className="stat-card">
            <div className="mono-subtle">Total Pipeline</div>
            <div style={{ fontSize: 26, color: "var(--gold)", marginTop: 6 }}>${total.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Hot Prospects</div>
            <div style={{ fontSize: 26, color: "var(--red)", marginTop: 6 }}>
              {dashboard.pipeline.filter((item) => item.temperature === "hot").length}
            </div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Active Deals</div>
            <div style={{ fontSize: 26, color: "var(--teal)", marginTop: 6 }}>{dashboard.pipeline.length}</div>
          </div>
        </div>
      </Panel>

      <Panel title="Active Pipeline">
        <div className="table">
          <div className="table-head">
            <div className="table-cell">Prospect</div>
            <div className="table-cell">Stage</div>
            <div className="table-cell">Value</div>
            <div className="table-cell">Days</div>
            <div className="table-cell" />
          </div>
          {dashboard.pipeline.length === 0 ? (
            <div className="mono-subtle" style={{ padding: "12px 8px" }}>No deals yet — add one below.</div>
          ) : (
            dashboard.pipeline.map((item) => (
              <div key={item.id} className="table-row">
                <div className="table-cell">
                  <div>{item.prospectName}</div>
                  <div className="mono-subtle">{item.offerType}</div>
                </div>
                <div className="table-cell">{item.stage}</div>
                <div className="table-cell">${item.value.toLocaleString()}</div>
                <div className="table-cell">{item.ageInDays}d</div>
                <div className="table-cell">
                  <button
                    className="button secondary"
                    style={{ fontSize: 11, padding: "3px 8px" }}
                    onClick={() => void onDeleteItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>

      <Panel title="Add Deal">
        <AddDealForm onAdd={onAddDeal} />
      </Panel>
    </div>
  );
}

const AGENT_META: Record<string, {
  description: string;
  capabilities: string[];
  action?: { label: string; href?: string; trigger?: "outreach" | "cfo" | "followup" | "research" };
}> = {
  "AG-HERMES": {
    description: "Your primary interface. Hermes routes tasks across the entire agent council, maintains context across sessions, and responds to your direct prompts via the chat interface.",
    capabilities: ["Task routing", "Council orchestration", "Live chat", "Workflow initiation"],
    action: { label: "Open Chat", href: "?section=chat" },
  },
  "AG-PAPERCLIP": {
    description: "Management infrastructure layer. Handles billing operations, admin-level oversight, and serves as the gateway for external service integrations. Requires the Paperclip gateway to be running on port 3100.",
    capabilities: ["Billing management", "Admin ops", "Gateway routing", "External integrations"],
  },
  "AG-CEO": {
    description: "Strategic intelligence layer. Sets mission priorities, defines plays, and ensures every agent action aligns with your business goals and monthly survival targets.",
    capabilities: ["Priority setting", "Play definition", "Mission alignment", "Strategic briefings"],
  },
  "AG-COO": {
    description: "Operational pipeline manager. Coordinates workflow execution, manages inter-agent handoffs, and ensures audit pipelines run end-to-end without gaps.",
    capabilities: ["Workflow execution", "Agent handoffs", "Pipeline management", "Bottleneck detection"],
  },
  "AG-CFO": {
    description: "Revenue and financial tracking. Monitors survival targets, flags revenue gaps, and tracks payment milestones against your monthly goals.",
    capabilities: ["Revenue monitoring", "Survival target tracking", "Payment flags", "Financial reporting"],
    action: { label: "Run CFO Report", trigger: "cfo" },
  },
  "AG-RESEARCH": {
    description: "Intelligence gathering across 5 analysis layers. Runs prospect research, competitive analysis, and industry signal detection before any outreach or audit begins.",
    capabilities: ["Layer 1-5 analysis", "Prospect research", "Competitive intelligence", "Industry signals"],
    action: { label: "Run Research Scan", trigger: "research" },
  },
  "AG-TECHNICAL": {
    description: "Audit execution engine. Runs PageSpeed Insights, QA tool sweeps, technical SEO checks, and accessibility scans as part of every digital audit.",
    capabilities: ["PageSpeed analysis", "Technical SEO", "QA sweeps", "Accessibility checks"],
  },
  "AG-VERIFICATION": {
    description: "AICC quality control. Cross-validates every audit finding against the AICC standard before they appear in client reports — nothing ships unverified.",
    capabilities: ["Finding validation", "AICC compliance", "Quality gates", "Error flagging"],
  },
  "AG-REPORT": {
    description: "Report generation engine. Populates structured templates with verified audit data and produces client-ready deliverables automatically.",
    capabilities: ["Template population", "Report generation", "Deliverable packaging", "Client formatting"],
  },
  "AG-OUTREACH": {
    description: "Prospect discovery and sequence generation. Scans for local businesses, PR opportunities, collab leads, and social signals — then files findings directly to your Agent Inbox for review.",
    capabilities: ["Prospect scanning", "PR opportunity detection", "Collab lead finding", "Social signal monitoring"],
    action: { label: "Run Outreach Scan", trigger: "outreach" },
  },
  "AG-FOLLOWUP": {
    description: "Post-purchase client retention. Monitors sent deliverables, flags clients due for follow-up, and manages the post-audit communication sequence to protect relationships.",
    capabilities: ["Follow-up monitoring", "Client retention", "Deliverable tracking", "Communication sequences"],
    action: { label: "Check Follow-Ups", trigger: "followup" },
  },
  "AG-RUNTIME": {
    description: "The local CLI and API server that powers all agent execution. When running, it exposes a local endpoint for Hermes to receive and dispatch tasks across the council.",
    capabilities: ["CLI execution", "API server", "Task dispatch", "Agent runtime"],
  },
};

function AgentsView({
  dashboard,
  onRunOutreach,
  onRunCfo,
  onRunFollowup,
  onRunResearch,
}: {
  dashboard: DashboardPayload;
  onRunOutreach: () => Promise<void>;
  onRunCfo: () => Promise<void>;
  onRunFollowup: () => Promise<void>;
  onRunResearch: () => Promise<void>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [runningTrigger, setRunningTrigger] = useState<string | null>(null);

  return (
    <div className="section-grid">
      <Panel title="Agent Council — Live Status">
        <div className="stack">
          {dashboard.agents.map((agent) => {
            const meta = AGENT_META[agent.id];
            const isExpanded = expanded === agent.id;
            return (
              <div key={agent.id} className="list-card" style={{ cursor: "pointer" }}>
                <div
                  className="split-row"
                  onClick={() => setExpanded(isExpanded ? null : agent.id)}
                  style={{ userSelect: "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      className="agent-dot"
                      data-active={agent.status === "ACTIVE" ? "true" : "false"}
                      style={{ flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontSize: 15 }}>{agent.name}</div>
                      <div className="mono-subtle">{agent.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <Badge label={agent.status} tone={agent.status === "ACTIVE" ? "green" : "default"} />
                    <span className="mono-subtle" style={{ fontSize: 16, opacity: 0.5 }}>{isExpanded ? "▲" : "▼"}</span>
                  </div>
                </div>

                <div className="mono-subtle" style={{ marginTop: 8, paddingLeft: 26 }}>
                  {agent.latestEventSummary}
                </div>

                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", paddingLeft: 26 }}>
                    {meta ? (
                      <>
                        <div style={{ lineHeight: 1.7, marginBottom: 12 }}>{meta.description}</div>
                        <div style={{ marginBottom: 12 }}>
                          <div className="mono-subtle" style={{ marginBottom: 6 }}>Capabilities</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {meta.capabilities.map(cap => (
                              <span key={cap} className="feed-chip">{cap}</span>
                            ))}
                          </div>
                        </div>
                        <div className="split-row">
                          <span className="mono-subtle">{agent.currentTaskCount} active task(s)</span>
                          {meta.action && (
                            meta.action.href ? (
                              <a href={meta.action.href} className="button secondary" style={{ fontSize: 12, padding: "4px 10px" }}>
                                {meta.action.label}
                              </a>
                            ) : meta.action.trigger ? (
                              <button
                                className="button secondary"
                                style={{ fontSize: 12, padding: "4px 10px" }}
                                disabled={runningTrigger === meta.action.trigger}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const trigger = meta.action!.trigger!;
                                  setRunningTrigger(trigger);
                                  const handler =
                                    trigger === "outreach" ? onRunOutreach :
                                    trigger === "cfo" ? onRunCfo :
                                    trigger === "followup" ? onRunFollowup :
                                    trigger === "research" ? onRunResearch :
                                    onRunOutreach;
                                  void handler().finally(() => setRunningTrigger(null));
                                }}
                              >
                                {runningTrigger === meta.action.trigger ? "Running…" : meta.action.label}
                              </button>
                            ) : null
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="mono-subtle">{agent.currentTaskCount} active task(s)</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function RevenueUpdateForm({ current, onUpdate }: { current: { monthlyReceived: number; survivalTarget: number }; onUpdate: (p: { monthlyReceived?: number; survivalTarget?: number }) => Promise<void> }) {
  const [received, setReceived] = useState(String(current.monthlyReceived));
  const [target, setTarget] = useState(String(current.survivalTarget));
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        void onUpdate({
          monthlyReceived: Number(received) || 0,
          survivalTarget: Number(target) || 3000
        }).finally(() => setSubmitting(false));
      }}
    >
      <div>
        <div className="mono-subtle" style={{ marginBottom: 6 }}>Monthly Received ($)</div>
        <input className="input" type="number" min="0" value={received} onChange={(e) => setReceived(e.target.value)} required />
      </div>
      <div>
        <div className="mono-subtle" style={{ marginBottom: 6 }}>Survival Target ($)</div>
        <input className="input" type="number" min="1" value={target} onChange={(e) => setTarget(e.target.value)} required />
      </div>
      <button className="button" type="submit" disabled={submitting}>{submitting ? "Saving…" : "Update"}</button>
    </form>
  );
}

function RevenueView({ dashboard, onUpdateRevenue }: { dashboard: DashboardPayload; onUpdateRevenue: (p: { monthlyReceived?: number; survivalTarget?: number }) => Promise<void> }) {
  const progress = Math.round((dashboard.summary.monthlyReceived / dashboard.summary.survivalTarget) * 100);
  const totalPipeline = dashboard.pipeline.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="section-grid">
      <Panel title="Revenue Snapshot">
        <div className="stat-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <div className="stat-card">
            <div className="mono-subtle">Received</div>
            <div style={{ fontSize: 28, color: "var(--green)", marginTop: 6 }}>${dashboard.summary.monthlyReceived.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Active Pipeline</div>
            <div style={{ fontSize: 28, color: "var(--gold)", marginTop: 6 }}>${totalPipeline.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Survival Target</div>
            <div style={{ fontSize: 28, color: "var(--red)", marginTop: 6 }}>${dashboard.summary.survivalTarget.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Promo Slots Left</div>
            <div style={{ fontSize: 28, color: "var(--orange)", marginTop: 6 }}>{dashboard.summary.slotsTotal - dashboard.summary.slotsUsed}</div>
          </div>
        </div>
      </Panel>

      <Panel title="Monthly Survival Progress">
        <div className="split-row" style={{ marginBottom: 10 }}>
          <span>
            ${dashboard.summary.monthlyReceived.toLocaleString()} of ${dashboard.summary.survivalTarget.toLocaleString()}
          </span>
          <span className="mono-subtle">{progress}%</span>
        </div>
        <ProgressBar value={progress} color={progress >= 100 ? "var(--green)" : "var(--orange)"} />
      </Panel>

      <Panel title="Update Revenue">
        <RevenueUpdateForm
          current={{ monthlyReceived: dashboard.summary.monthlyReceived, survivalTarget: dashboard.summary.survivalTarget }}
          onUpdate={onUpdateRevenue}
        />
      </Panel>
    </div>
  );
}

const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "AI_TOOLS", label: "AI / Tools" },
  { value: "HOSTING", label: "Hosting" },
  { value: "SOFTWARE", label: "Software" },
  { value: "MARKETING", label: "Marketing" },
  { value: "CONTRACTOR", label: "Contractor" },
  { value: "ADMIN", label: "Admin" },
  { value: "TAX_LEGAL", label: "Tax / Legal" },
  { value: "OPERATIONS", label: "Operations" },
  { value: "OTHER", label: "Other" },
];

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

function expenseStatusTone(status: ExpenseStatus): "default" | "green" | "red" | "orange" | "teal" | "purple" {
  switch (status) {
    case "active":
    case "paid":
      return "green";
    case "overdue":
      return "red";
    case "paused":
      return "orange";
    case "cancelled":
      return "default";
    default:
      return "teal";
  }
}

function decisionTone(decision: ExpenseDecision): "default" | "green" | "red" | "orange" | "teal" | "purple" {
  if (decision === "keep") return "green";
  if (decision === "cancel") return "red";
  return "orange";
}

function ExpenseForm({ onAdd, vaultAssets }: {
  onAdd: (payload: {
    name: string;
    vendor: string;
    category: ExpenseCategory;
    amount: number;
    billingCycle: ExpenseCycle;
    nextDueDate?: string;
    paymentMethod?: string;
    status: ExpenseStatus;
    decision: ExpenseDecision;
    owner?: string;
    useCase?: string;
    notes?: string;
    receiptUrl?: string;
    relatedVaultAssetId?: string;
  }) => Promise<void>;
  vaultAssets: DashboardPayload["knowledgeAssets"];
}) {
  const [name, setName] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("SOFTWARE");
  const [amount, setAmount] = useState("");
  const [billingCycle, setBillingCycle] = useState<ExpenseCycle>("monthly");
  const [nextDueDate, setNextDueDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [decision, setDecision] = useState<ExpenseDecision>("review");
  const [useCase, setUseCase] = useState("");
  const [notes, setNotes] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [relatedVaultAssetId, setRelatedVaultAssetId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      className="form-grid finance-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        setError("");
        void onAdd({
          name,
          vendor: vendor || name,
          category,
          amount: Number(amount) || 0,
          billingCycle,
          nextDueDate: nextDueDate || undefined,
          paymentMethod: paymentMethod || undefined,
          status: "active",
          decision,
          useCase: useCase || undefined,
          notes: notes || undefined,
          receiptUrl: receiptUrl || undefined,
          relatedVaultAssetId: relatedVaultAssetId || undefined,
        })
          .then(() => {
            setName("");
            setVendor("");
            setAmount("");
            setNextDueDate("");
            setPaymentMethod("");
            setUseCase("");
            setNotes("");
            setReceiptUrl("");
            setRelatedVaultAssetId("");
          })
          .catch((caughtError) => setError(caughtError instanceof Error ? caughtError.message : "Failed to add expense."))
          .finally(() => setSubmitting(false));
      }}
    >
      <input className="input" placeholder="Expense / subscription name *" value={name} onChange={(event) => setName(event.target.value)} required />
      <input className="input" placeholder="Vendor" value={vendor} onChange={(event) => setVendor(event.target.value)} />
      <input className="input" placeholder="Amount *" type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} required />
      <select className="select" value={billingCycle} onChange={(event) => setBillingCycle(event.target.value as ExpenseCycle)}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="weekly">Weekly</option>
        <option value="one-time">One-time</option>
      </select>
      <select className="select" value={category} onChange={(event) => setCategory(event.target.value as ExpenseCategory)}>
        {EXPENSE_CATEGORIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      <input className="input" type="date" value={nextDueDate} onChange={(event) => setNextDueDate(event.target.value)} />
      <input className="input" placeholder="Payment method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} />
      <select className="select" value={decision} onChange={(event) => setDecision(event.target.value as ExpenseDecision)}>
        <option value="keep">Keep</option>
        <option value="review">Review</option>
        <option value="cancel">Cancel</option>
      </select>
      <input className="input" placeholder="Use case / why it exists" value={useCase} onChange={(event) => setUseCase(event.target.value)} />
      <input className="input" placeholder="Receipt or billing URL" value={receiptUrl} onChange={(event) => setReceiptUrl(event.target.value)} />
      <select className="select" value={relatedVaultAssetId} onChange={(event) => setRelatedVaultAssetId(event.target.value)}>
        <option value="">No vault receipt</option>
        {vaultAssets.map((asset) => <option key={asset.id} value={asset.id}>{asset.name}</option>)}
      </select>
      <textarea className="input" rows={2} placeholder="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} style={{ resize: "vertical" }} />
      {error ? <div className="mono-subtle" style={{ color: "var(--red)" }}>{error}</div> : null}
      <button className="button" type="submit" disabled={submitting || !name || !amount}>{submitting ? "Adding…" : "Add Expense"}</button>
    </form>
  );
}

function FinanceBudgetForm({ budget, onUpdate }: { budget: FinanceBudget; onUpdate: (patch: Partial<FinanceBudget>) => Promise<void> }) {
  const [monthlyRevenueTarget, setMonthlyRevenueTarget] = useState(String(budget.monthlyRevenueTarget));
  const [monthlyExpenseLimit, setMonthlyExpenseLimit] = useState(String(budget.monthlyExpenseLimit));
  const [cashOnHand, setCashOnHand] = useState(String(budget.cashOnHand));
  const [taxReservePercent, setTaxReservePercent] = useState(String(budget.taxReservePercent));
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        void onUpdate({
          monthlyRevenueTarget: Number(monthlyRevenueTarget) || 0,
          monthlyExpenseLimit: Number(monthlyExpenseLimit) || 0,
          cashOnHand: Number(cashOnHand) || 0,
          taxReservePercent: Number(taxReservePercent) || 0,
        }).finally(() => setSubmitting(false));
      }}
    >
      <input className="input" type="number" min="0" value={monthlyRevenueTarget} onChange={(event) => setMonthlyRevenueTarget(event.target.value)} placeholder="Revenue target" />
      <input className="input" type="number" min="0" value={monthlyExpenseLimit} onChange={(event) => setMonthlyExpenseLimit(event.target.value)} placeholder="Expense ceiling" />
      <input className="input" type="number" min="0" value={cashOnHand} onChange={(event) => setCashOnHand(event.target.value)} placeholder="Cash on hand" />
      <input className="input" type="number" min="0" max="100" value={taxReservePercent} onChange={(event) => setTaxReservePercent(event.target.value)} placeholder="Tax reserve %" />
      <button className="button" type="submit" disabled={submitting}>{submitting ? "Saving…" : "Update Budget"}</button>
    </form>
  );
}

function FinanceView({
  dashboard,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onUpdateBudget,
}: {
  dashboard: DashboardPayload;
  onAddExpense: (payload: {
    name: string;
    vendor: string;
    category: ExpenseCategory;
    amount: number;
    billingCycle: ExpenseCycle;
    nextDueDate?: string;
    paymentMethod?: string;
    status: ExpenseStatus;
    decision: ExpenseDecision;
    owner?: string;
    useCase?: string;
    notes?: string;
    receiptUrl?: string;
    relatedVaultAssetId?: string;
  }) => Promise<void>;
  onUpdateExpense: (expenseId: string, patch: Partial<BusinessExpense>) => Promise<void>;
  onDeleteExpense: (expenseId: string) => Promise<void>;
  onUpdateBudget: (patch: Partial<FinanceBudget>) => Promise<void>;
}) {
  const summary = buildFinanceSummary(dashboard.expenses, dashboard.financeBudget, dashboard.summary.monthlyReceived);
  const monthlyLimitProgress = dashboard.financeBudget.monthlyExpenseLimit > 0
    ? Math.round((summary.monthlyBurn / dashboard.financeBudget.monthlyExpenseLimit) * 100)
    : 0;
  const groupedByCategory = EXPENSE_CATEGORIES
    .map((category) => ({
      ...category,
      total: dashboard.expenses
        .filter((expense) => expense.category === category.value)
        .reduce((sum, expense) => sum + getMonthlyExpenseAmount(expense), 0),
    }))
    .filter((category) => category.total > 0);

  return (
    <div className="section-grid">
      <Panel title="Finance Command">
        <div className="stat-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
          <div className="stat-card">
            <div className="mono-subtle">Monthly Burn</div>
            <div style={{ fontSize: 28, color: "var(--red)", marginTop: 6 }}>{formatCurrency(summary.monthlyBurn)}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">After Expenses</div>
            <div style={{ fontSize: 28, color: summary.afterExpenses >= 0 ? "var(--green)" : "var(--red)", marginTop: 6 }}>{formatCurrency(summary.afterExpenses)}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Annualized Burn</div>
            <div style={{ fontSize: 28, color: "var(--orange)", marginTop: 6 }}>{formatCurrency(summary.annualBurn)}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Runway</div>
            <div style={{ fontSize: 28, color: "var(--teal)", marginTop: 6 }}>
              {summary.runwayMonths === null ? "∞" : `${summary.runwayMonths.toFixed(1)} mo`}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="split-row" style={{ marginBottom: 8 }}>
            <span className="mono-subtle">Expense ceiling usage</span>
            <span className="mono-subtle">{monthlyLimitProgress}%</span>
          </div>
          <ProgressBar value={monthlyLimitProgress} color={monthlyLimitProgress > 100 ? "var(--red)" : "var(--gold)"} />
        </div>
      </Panel>

      <Panel title="Budget Settings">
        <FinanceBudgetForm budget={dashboard.financeBudget} onUpdate={onUpdateBudget} />
      </Panel>

      <Panel title="Expense Ledger">
        <div className="stack">
          {dashboard.expenses.length === 0 ? (
            <div className="mono-subtle">No expenses yet. Add subscriptions, tools, contractors, hosting, and other costs below.</div>
          ) : (
            dashboard.expenses.map((expense) => (
              <div key={expense.id} className="list-card">
                <div className="split-row" style={{ alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15 }}>{expense.name}</div>
                    <div className="mono-subtle">
                      {expense.vendor} · {EXPENSE_CATEGORIES.find((category) => category.value === expense.category)?.label ?? expense.category} · {expense.billingCycle}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "var(--gold)" }}>{formatCurrency(expense.amount)}</div>
                    <div className="mono-subtle">{formatCurrency(getMonthlyExpenseAmount(expense))}/mo equiv.</div>
                  </div>
                </div>
                <div className="split-row" style={{ marginBottom: 10, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Badge label={expense.status} tone={expenseStatusTone(expense.status)} />
                    <Badge label={expense.decision} tone={decisionTone(expense.decision)} />
                    {expense.nextDueDate ? <Badge label={`due ${expense.nextDueDate}`} tone="teal" /> : null}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {(["keep", "review", "cancel"] as ExpenseDecision[]).map((decision) => (
                      <button
                        key={decision}
                        className={expense.decision === decision ? "button" : "button secondary"}
                        style={{ fontSize: 10, padding: "3px 7px" }}
                        disabled={expense.decision === decision}
                        onClick={() => void onUpdateExpense(expense.id, { decision })}
                      >
                        {decision}
                      </button>
                    ))}
                    <button className="button secondary" style={{ fontSize: 10, padding: "3px 7px" }} onClick={() => void onUpdateExpense(expense.id, { status: expense.status === "paused" ? "active" : "paused" })}>
                      {expense.status === "paused" ? "Resume" : "Pause"}
                    </button>
                    <button className="button secondary" style={{ fontSize: 10, padding: "3px 7px" }} onClick={() => void onUpdateExpense(expense.id, { status: "cancelled", decision: "cancel" })}>
                      Cancel
                    </button>
                    <button className="button secondary" style={{ fontSize: 10, padding: "3px 7px" }} onClick={() => void onDeleteExpense(expense.id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mono-subtle">{expense.paymentMethod || "No payment method"}{expense.receiptUrl ? " · receipt linked" : ""}{expense.relatedVaultAssetId ? ` · vault ${expense.relatedVaultAssetId}` : ""}</div>
                {expense.useCase ? <div style={{ marginTop: 8, lineHeight: 1.6 }}>{expense.useCase}</div> : null}
                {expense.notes ? <div className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>{expense.notes}</div> : null}
              </div>
            ))
          )}
        </div>
      </Panel>

      <Panel title="Category Burn">
        <div className="stack">
          {groupedByCategory.length === 0 ? (
            <div className="mono-subtle">Category totals will appear once expenses are added.</div>
          ) : groupedByCategory.map((category) => (
            <div key={category.value} className="split-row">
              <span>{category.label}</span>
              <span style={{ color: "var(--gold)" }}>{formatCurrency(category.total)}/mo</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Add Expense">
        <ExpenseForm onAdd={onAddExpense} vaultAssets={dashboard.knowledgeAssets} />
      </Panel>
    </div>
  );
}

function AddProspectForm({ onAdd }: { onAdd: (p: { name: string; contactPoints: string; serviceInterest: string; play: string; priority: string; estimatedValue: string }) => Promise<void> }) {
  const [name, setName] = useState("");
  const [contactPoints, setContactPoints] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [play, setPlay] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="form-grid"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        void onAdd({ name, contactPoints, serviceInterest, play, priority, estimatedValue })
          .then(() => { setName(""); setContactPoints(""); setServiceInterest(""); setPlay(""); setEstimatedValue(""); })
          .finally(() => setSubmitting(false));
      }}
    >
      <input className="input" placeholder="Name / Business *" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="input" placeholder="Contact (email, phone, handle)" value={contactPoints} onChange={(e) => setContactPoints(e.target.value)} />
      <input className="input" placeholder="Service interest" value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value)} />
      <input className="input" placeholder="Estimated value (e.g. $500)" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} />
      <select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="CRITICAL">CRITICAL</option>
        <option value="IMMEDIATE">IMMEDIATE</option>
        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>
      </select>
      <textarea className="input" placeholder="Play — what's the move?" value={play} onChange={(e) => setPlay(e.target.value)} rows={2} style={{ resize: "vertical" }} />
      <button className="button" type="submit" disabled={submitting}>{submitting ? "Adding…" : "Add Prospect"}</button>
    </form>
  );
}

function ProspectsView({ dashboard, onAddProspect, onDeleteProspect }: { dashboard: DashboardPayload; onAddProspect: (p: { name: string; contactPoints: string; serviceInterest: string; play: string; priority: string; estimatedValue: string }) => Promise<void>; onDeleteProspect: (id: string) => Promise<void> }) {
  return (
    <div className="section-grid">
      <Panel title="Priority Prospects">
        <div className="stack">
          {dashboard.prospects.length === 0 ? (
            <div className="mono-subtle" style={{ padding: "12px 0" }}>No prospects yet — add one below.</div>
          ) : (
            dashboard.prospects.map((prospect) => (
              <div key={prospect.id} className="list-card">
                <div className="split-row">
                  <div>
                    <div>{prospect.name}</div>
                    <div className="mono-subtle">{prospect.serviceInterest}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "var(--gold)" }}>{prospect.estimatedValue}</div>
                    <div className="muted">{prospect.priority}</div>
                  </div>
                </div>
                <div className="mono-subtle" style={{ marginTop: 8 }}>{prospect.contactPoints}</div>
                <div style={{ marginTop: 10, lineHeight: 1.7 }}>{prospect.play}</div>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="button secondary"
                    style={{ fontSize: 12, padding: "4px 10px" }}
                    onClick={() => void onDeleteProspect(prospect.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>
      <Panel title="Add Prospect">
        <AddProspectForm onAdd={onAddProspect} />
      </Panel>
    </div>
  );
}

const ORDER_STATUSES = ["NEW", "REVIEWING", "CONTACTED", "IN PROGRESS", "COMPLETE"] as const;

function OrdersView({ dashboard, onUpdateOrderStatus }: { dashboard: DashboardPayload; onUpdateOrderStatus: (orderId: string, status: string) => Promise<void> }) {
  const statusCounts = dashboard.orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="section-grid">
      <Panel title="Order Intake Summary" aside={<a href="/intake" target="_blank" rel="noreferrer" className="panel-link">Publish intake page ↗</a>}>
        <div className="stat-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
          <div className="stat-card">
            <div className="mono-subtle">Total Orders</div>
            <div style={{ fontSize: 28, color: "var(--gold)", marginTop: 6 }}>{dashboard.orders.length}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">New</div>
            <div style={{ fontSize: 28, color: "var(--red)", marginTop: 6 }}>{statusCounts.NEW ?? 0}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">Reviewing</div>
            <div style={{ fontSize: 28, color: "var(--teal)", marginTop: 6 }}>{statusCounts.REVIEWING ?? 0}</div>
          </div>
          <div className="stat-card">
            <div className="mono-subtle">In Progress</div>
            <div style={{ fontSize: 28, color: "var(--green)", marginTop: 6 }}>{statusCounts["IN PROGRESS"] ?? 0}</div>
          </div>
        </div>
      </Panel>

      <Panel title="Recent Orders">
        <div className="stack">
          {dashboard.orders.length === 0 ? (
            <div className="mono-subtle">No orders yet. Use the intake page to create the first one.</div>
          ) : (
            dashboard.orders.map((order) => (
              <div key={order.id} className="list-card">
                <div className="split-row" style={{ marginBottom: 10 }}>
                  <div>
                    <div>{order.businessName}</div>
                    <div className="mono-subtle">
                      {order.customerName} · {order.packageName}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge label={order.status} tone={toneForOrderStatus(order.status)} />
                    <div className="mono-subtle" style={{ marginTop: 8 }}>
                      {formatDisplayTime(order.submittedAt)}
                    </div>
                  </div>
                </div>
                <div className="mono-subtle" style={{ marginBottom: 8 }}>
                  {order.email}{order.phone ? ` · ${order.phone}` : ""} · {order.source}
                </div>
                <div className="split-row">
                  <div className="muted">{order.serviceType}</div>
                  <div style={{ color: "var(--gold)" }}>{order.budget || "No budget provided"}</div>
                </div>
                {(order.driveUploadLink || order.driveFolderLink || order.driveDeliveryLink) && (
                  <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                    {order.driveUploadLink ? (
                      <a href={order.driveUploadLink} target="_blank" rel="noreferrer" className="panel-link">Client upload link ↗</a>
                    ) : null}
                    {order.driveFolderLink ? (
                      <a href={order.driveFolderLink} target="_blank" rel="noreferrer" className="panel-link">Drive folder ↗</a>
                    ) : null}
                    {order.driveDeliveryLink ? (
                      <a href={order.driveDeliveryLink} target="_blank" rel="noreferrer" className="panel-link">Delivered report ↗</a>
                    ) : null}
                  </div>
                )}
                <div style={{ marginTop: 10, lineHeight: 1.7 }}>{order.notes || "No additional notes."}</div>
                <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s}
                      className={order.status === s ? "button" : "button secondary"}
                      style={{ fontSize: 11, padding: "3px 8px" }}
                      disabled={order.status === s}
                      onClick={() => void onUpdateOrderStatus(order.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>
    </div>
  );
}

function WorkflowRail({ runs, onApproveWorkflow }: { runs: WorkflowRun[]; onApproveWorkflow: (workflowId: string) => Promise<void> }) {
  return (
    <Panel title="Workflow Runs">
      <div className="stack">
        {runs.map((run) => (
          <div key={run.id} className="list-card">
            <div className="split-row">
              <div>
                <div>{run.workflowType}</div>
                <div className="mono-subtle">
                  {run.id} · {run.status}
                </div>
              </div>
              {run.status === "awaiting_approval" ? (
                <button className="button secondary" type="button" onClick={() => void onApproveWorkflow(run.id)}>
                  Approve
                </button>
              ) : null}
            </div>
            <div style={{ marginTop: 10 }}>
              {run.stepHistory.map((step) => (
                <div key={step.id} className="mono-subtle" style={{ marginBottom: 8 }}>
                  <div className="split-row">
                    <span>{step.label} — {step.status}</span>
                    {step.status === "running" && <span className="loader-dots">...</span>}
                  </div>
                  {step.status === "running" && (
                    <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4, lineHeight: 1.4 }}>
                      {step.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ChatView({ dashboard }: { dashboard: DashboardPayload }) {
  const [messages, setMessages] = useState(dashboard.chat);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const bottomRef = useState<HTMLDivElement | null>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg = {
      id: `local-${Date.now()}`,
      role: "user" as const,
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setChatError("");

    try {
      const res = await fetch("/api/hermes/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json() as { reply?: ChatMessage | string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Hermes did not respond.");
      if (data.reply) {
        const replyText = typeof data.reply === "object" ? data.reply.content : data.reply;
        setMessages(prev => [
          ...prev,
          {
            id: typeof data.reply === "object" ? data.reply.id : `hermes-${Date.now()}`,
            role: "assistant" as const,
            content: replyText,
            createdAt: typeof data.reply === "object" ? data.reply.createdAt : new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      setChatError(err instanceof Error ? err.message : "Failed to reach Hermes.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="section-grid">
      <Panel title="Hermes — Direct Line">
        <div style={{ display: "flex", flexDirection: "column", height: "60vh", minHeight: 400 }}>
          <div
            ref={el => { if (el) bottomRef[1](el); }}
            style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}
          >
            <div className="stack">
              {messages.length === 0 && (
                <div className="mono-subtle" style={{ padding: "24px 0", textAlign: "center" }}>
                  No messages yet. Send something to Hermes.
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="chat-message"
                  data-role={msg.role}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: msg.role === "user" ? "var(--gold)" : "var(--surface)",
                    color: msg.role === "user" ? "var(--bg)" : undefined,
                    border: msg.role === "assistant" ? "1px solid var(--border)" : undefined,
                    lineHeight: 1.6,
                  }}
                >
                  <div
                    className="mono-subtle"
                    style={{ marginBottom: 4, fontSize: 10, opacity: 0.7, color: msg.role === "user" ? "var(--bg)" : undefined }}
                  >
                    {msg.role === "user" ? "You" : "Hermes"} · {formatDisplayTime(msg.createdAt)}
                  </div>
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                </div>
              ))}
              {sending && (
                <div
                  className="chat-message"
                  data-role="assistant"
                  style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, alignSelf: "flex-start" }}
                >
                  <div className="mono-subtle" style={{ fontSize: 10, opacity: 0.7, marginBottom: 4 }}>Hermes</div>
                  <span className="loader-dots">Thinking…</span>
                </div>
              )}
            </div>
          </div>

          {chatError && (
            <div className="mono-subtle" style={{ color: "var(--red)", marginBottom: 8 }}>{chatError}</div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <textarea
              className="input"
              placeholder="Message Hermes…"
              value={input}
              rows={2}
              style={{ flex: 1, resize: "none" }}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
            />
            <button
              className="button"
              style={{ alignSelf: "flex-end", padding: "10px 20px" }}
              disabled={sending || !input.trim()}
              onClick={() => void send()}
            >
              {sending ? "…" : "Send"}
            </button>
          </div>
          <div className="mono-subtle" style={{ marginTop: 6, fontSize: 11 }}>
            Enter to send · Shift+Enter for new line
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ChatRail({ dashboard }: { dashboard: DashboardPayload }) {
  return (
    <Panel title="Hermes Snapshot">
      <div className="chat-log">
        {dashboard.chat.slice(-4).map((message) => (
          <div key={message.id} className="chat-message" data-role={message.role}>
            <div className="mono-subtle" style={{ marginBottom: 6 }}>
              {message.role}
            </div>
            {message.content}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ReportItemBadge({ type }: { type: ReportItem["type"] }) {
  const map: Record<ReportItem["type"], { label: string; tone: "green" | "red" | "orange" | "teal" | "purple" | "default" }> = {
    PROSPECT: { label: "Prospect", tone: "orange" },
    PR_OPPORTUNITY: { label: "PR", tone: "purple" },
    COLLAB_LEAD: { label: "Collab", tone: "teal" },
    SOCIAL_SIGNAL: { label: "Signal", tone: "green" },
    BRAND_AMPLIFIER: { label: "Amplifier", tone: "red" },
  };
  const { label, tone } = map[type] ?? { label: type, tone: "default" };
  return <Badge label={label} tone={tone} />;
}

function InboxView({
  dashboard,
  onMarkRead,
  onDismissReport,
  onApproveItem,
  onDismissItem,
  onRunOutreach,
}: {
  dashboard: DashboardPayload;
  onMarkRead: (reportId: string) => Promise<void>;
  onDismissReport: (reportId: string) => Promise<void>;
  onApproveItem: (reportId: string, itemId: string) => Promise<void>;
  onDismissItem: (reportId: string, itemId: string) => Promise<void>;
  onRunOutreach: () => Promise<void>;
}) {
  const [runningOutreach, setRunningOutreach] = useState(false);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const unread = dashboard.reports.filter(r => r.status === "UNREAD");
  const active = dashboard.reports.filter(r => r.status !== "ARCHIVED" && r.status !== "DISMISSED");
  const archived = dashboard.reports.filter(r => r.status === "ARCHIVED" || r.status === "DISMISSED");

  return (
    <div className="section-grid">
      <Panel title="Agent Inbox" aside={
        <button
          className="button secondary"
          style={{ fontSize: 12, padding: "4px 10px" }}
          disabled={runningOutreach}
          onClick={() => {
            setRunningOutreach(true);
            void onRunOutreach().finally(() => setRunningOutreach(false));
          }}
        >
          {runningOutreach ? "Scanning…" : "Run Outreach Scan"}
        </button>
      }>
        <div className="mini-stat-grid" style={{ marginBottom: 16 }}>
          <div className="mini-stat">
            <div className="mono-subtle">Unread</div>
            <div style={{ color: unread.length > 0 ? "var(--red)" : undefined }}>{unread.length}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">Active</div>
            <div>{active.length}</div>
          </div>
          <div className="mini-stat">
            <div className="mono-subtle">Archived</div>
            <div>{archived.length}</div>
          </div>
        </div>

        <div className="stack">
          {active.length === 0 ? (
            <div className="mono-subtle">Inbox clear. Run an outreach scan to generate leads.</div>
          ) : (
            active.map(report => (
              <div key={report.id} className="list-card" style={{ borderLeft: report.status === "UNREAD" ? "3px solid var(--gold)" : undefined }}>
                <div className="split-row" style={{ marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15 }}>{report.title}</div>
                    <div className="mono-subtle">{report.agentName} · {formatDisplayTime(report.createdAt)}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "flex-start" }}>
                    {report.status === "UNREAD" && (
                      <button
                        className="button secondary"
                        style={{ fontSize: 11, padding: "3px 8px" }}
                        onClick={() => {
                          void onMarkRead(report.id);
                          setExpandedReport(report.id);
                        }}
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      className="button secondary"
                      style={{ fontSize: 11, padding: "3px 8px" }}
                      onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                    >
                      {expandedReport === report.id ? "Collapse" : "Expand"}
                    </button>
                    <button
                      className="button secondary"
                      style={{ fontSize: 11, padding: "3px 8px" }}
                      onClick={() => void onDismissReport(report.id)}
                    >
                      Archive
                    </button>
                  </div>
                </div>

                <div className="mono-subtle" style={{ marginBottom: 8 }}>{report.summary}</div>

                {report.requiresApproval && report.items.filter(i => i.status === "PENDING").length > 0 && (
                  <div style={{ marginBottom: 8 }}>
                    <Badge label={`${report.items.filter(i => i.status === "PENDING").length} items need review`} tone="orange" />
                  </div>
                )}

                {expandedReport === report.id && (
                  <div style={{ marginTop: 12, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                    {report.body && <div style={{ lineHeight: 1.7, marginBottom: 12 }}>{report.body}</div>}
                    {report.items.length > 0 && (
                      <div className="stack">
                        {report.items.map(item => (
                          <div key={item.id} className="list-card" style={{ opacity: item.status !== "PENDING" ? 0.5 : 1 }}>
                            <div className="split-row" style={{ marginBottom: 6 }}>
                              <div>
                                <ReportItemBadge type={item.type} />
                                <div style={{ marginTop: 6, fontSize: 14 }}>{item.title}</div>
                              </div>
                              {item.status === "PENDING" && (
                                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                  <button
                                    className="button"
                                    style={{ fontSize: 11, padding: "3px 8px" }}
                                    onClick={() => void onApproveItem(report.id, item.id)}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className="button secondary"
                                    style={{ fontSize: 11, padding: "3px 8px" }}
                                    onClick={() => void onDismissItem(report.id, item.id)}
                                  >
                                    Skip
                                  </button>
                                </div>
                              )}
                              {item.status !== "PENDING" && (
                                <Badge label={item.status} tone={item.status === "APPROVED" ? "green" : "default"} />
                              )}
                            </div>
                            <div className="mono-subtle">{item.description}</div>
                            {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="panel-link" style={{ marginTop: 6, display: "inline-block" }}>View ↗</a>}
                            {item.handle && <div className="mono-subtle" style={{ marginTop: 4 }}>{item.handle}</div>}
                            {item.estimatedValue && <div style={{ marginTop: 4, color: "var(--gold)", fontSize: 13 }}>{item.estimatedValue}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Panel>
    </div>
  );
}

export function DashboardClient({ initialData, section }: { initialData: DashboardPayload; section: string }) {
  const { dashboard, triggerAudit, approveWorkflow, addProspect, addPipelineItem, updateRevenue, addExpense, updateExpense, deleteExpense, updateFinanceBudget, updateOrderStatus, addAsset, updateAsset, uploadVaultFile, deletePipelineItem, deleteProspect, dismissQueueItem, markReportRead, dismissReport, approveReportItem, dismissReportItem, runOutreach, runCfo, runFollowup, runResearch, refreshDashboard, isSubmitting, error, connectionError } = useDashboard(initialData);
  const toolkitDocument = dashboard.toolkit.find((item) => item.id === section);

  const mainView = (() => {
    switch (section) {
      case "vault":
        return <VaultView dashboard={dashboard} onUpload={uploadVaultFile} />;
      case "assets":
        return <AssetsView dashboard={dashboard} onUpdateAsset={updateAsset} />;
      case "audits":
        return <AuditsView dashboard={dashboard} onCreateAudit={triggerAudit} onAddAsset={addAsset} isSubmitting={isSubmitting} onApproveWorkflow={approveWorkflow} />;
      case "orders":
        return <OrdersView dashboard={dashboard} onUpdateOrderStatus={updateOrderStatus} />;
      case "pipeline":
        return <PipelineView dashboard={dashboard} onAddDeal={addPipelineItem} onDeleteItem={deletePipelineItem} />;
      case "chat":
        return <ChatView dashboard={dashboard} />;
      case "agents":
        return <AgentsView dashboard={dashboard} onRunOutreach={runOutreach} onRunCfo={runCfo} onRunFollowup={runFollowup} onRunResearch={runResearch} />;
      case "finance":
        return <FinanceView dashboard={dashboard} onAddExpense={addExpense} onUpdateExpense={updateExpense} onDeleteExpense={deleteExpense} onUpdateBudget={updateFinanceBudget} />;
      case "revenue":
        return <RevenueView dashboard={dashboard} onUpdateRevenue={updateRevenue} />;
      case "prospects":
        return <ProspectsView dashboard={dashboard} onAddProspect={addProspect} onDeleteProspect={deleteProspect} />;
      case "audit-protocol":
      case "structuralism":
      case "protocols":
      case "glossary":
        return <ToolkitSectionView document={dashboard.knowledge.find((item) => item.id === section)} />;
      case "offer-pricing":
      case "research":
      case "qa-prompts":
      case "outreach":
      case "objections":
      case "impact-matrix":
      case "roi-calculator":
      case "linkedin":
        return <ToolkitSectionView document={toolkitDocument} />;
      case "inbox":
        return <InboxView dashboard={dashboard} onMarkRead={markReportRead} onDismissReport={dismissReport} onApproveItem={approveReportItem} onDismissItem={dismissReportItem} onRunOutreach={runOutreach} />;
      case "command":
      default:
        return <CommandView dashboard={dashboard} onDismissQueueItem={dismissQueueItem} />;
    }
  })();

  return (
    <ThemeProvider>
      <div className="shell">
        <Navigation activeSection={section} />
        <div className="main">
          <TopBar dashboard={dashboard} />
          <div className="content-grid">
            <main className="section-grid">
              {connectionError ? (
                <Panel title="Connection Status">
                  <div className="list-card" style={{ borderLeft: "3px solid var(--orange)" }}>
                    Live event stream disconnected — data may be stale. The page will resume updating automatically.
                  </div>
                </Panel>
              ) : null}
              {error ? (
                <Panel title="Hermes Status">
                  <div className="list-card" style={{ borderLeft: "3px solid var(--orange)" }}>
                    {error}
                  </div>
                </Panel>
              ) : null}
              {mainView}
            </main>
            <aside className="right-rail">
              {section === "command" ? (
                <>
                  <RecentActivityRail dashboard={dashboard} />
                  <IntelligenceFeedRail dashboard={dashboard} />
                </>
              ) : (
                <>
                  <WorkflowRail runs={dashboard.workflowRuns} onApproveWorkflow={approveWorkflow} />
                  <ChatRail dashboard={dashboard} />
                </>
              )}
            </aside>
          </div>
        </div>
      </div>
      <ChatBubble dashboard={dashboard} refreshDashboard={refreshDashboard} />
    </ThemeProvider>
  );
}
