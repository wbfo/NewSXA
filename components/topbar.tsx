"use client";

import { useEffect, useState, startTransition } from "react";
import type { DashboardPayload } from "@/lib/domain/types";
import { Badge } from "@/components/ui";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/components/auth-context";

export function TopBar({ dashboard }: { dashboard?: DashboardPayload }) {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const activeAgents = (dashboard?.agents || []).filter((agent) => agent.status === "ACTIVE").length;
  const totalOrders = (dashboard?.orders || []).length;
  const newOrders = (dashboard?.orders || []).filter((order) => order.status === "NEW").length;
  const survivalTarget = dashboard?.summary?.survivalTarget || 1;
  const monthlyReceived = dashboard?.summary?.monthlyReceived || 0;
  const progress = Math.round((monthlyReceived / survivalTarget) * 100);
  const approvals = (dashboard?.queue || []).filter((item) => item.type === "APPROVAL").length;
  const remaining = Math.max(0, survivalTarget - monthlyReceived);

  useEffect(() => {
    const updateHeaderState = () => {
      startTransition(() => setIsCompact(window.scrollY > 72));
    };

    startTransition(() => setMounted(true));
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <header className={`topbar ${isCompact ? "topbar-compact" : ""}`}>
      <div className="hero-brand">
        <div className="hero-eyebrow">
          {isAdmin ? "Sovereign X Audits · Survival Systems Active" : "Sovereign X Audits · Client Access Portal"}
        </div>
        <div className="hero-title">
          {isAdmin ? "The Conductor's Command Center" : `Welcome, ${user?.displayName || "Client"}`}
        </div>
        <div className="hero-subtitle">
          <span>BlackFur Capital Group LLC</span>
          <span>•</span>
          <span>{mounted ? (theme === "dark" ? "Night Ops" : "Daylight Ops") : "Command Access"}</span>
        </div>
        {isAdmin && dashboard && (
          <div className="compact-status-row" aria-hidden={!isCompact}>
            <span>{progress}% survival</span>
            <span>{activeAgents} active agents</span>
            <span>{approvals} approval{approvals === 1 ? "" : "s"}</span>
          </div>
        )}
      </div>

      <div className="top-metrics">
        {isAdmin && dashboard ? (
          <>
            <div className="metric-tile">
              <div className="metric-label">AICC Status</div>
              <Badge label="AICC Active" tone="green" />
            </div>
            <div className="metric-tile">
              <div className="metric-label">Survival Progress</div>
              <div className="metric-main">{progress}%</div>
              <div className="metric-subtle">${remaining.toLocaleString()} remaining</div>
            </div>
            <div className="metric-tile">
              <div className="metric-label">Active Agents</div>
              <div className="metric-main">{activeAgents} / {(dashboard?.agents || []).length}</div>
              <div className="metric-subtle">All systems operational</div>
            </div>
            <div className="metric-tile">
              <div className="metric-label">Intake Orders</div>
              <div className="metric-main">{totalOrders}</div>
              <div className="metric-subtle">{newOrders} new</div>
            </div>
          </>
        ) : (
          <div className="metric-tile">
            <div className="metric-label">System Status</div>
            <Badge label="SECURE_CONNECTION" tone="green" />
          </div>
        )}
        <div className="metric-tile metric-accent">
          <div className="metric-label">{isAdmin ? "Conductor" : "Access Tier"}</div>
          <div className="metric-main">{isAdmin ? "BlackFur Capital" : "Platinum Audit"}</div>
          <div className="metric-subtle">{isAdmin ? "Command access" : "Active Client"}</div>
        </div>
        <button className="button secondary theme-toggle" onClick={toggleTheme} type="button">
          {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
        </button>
      </div>
    </header>
  );
}
