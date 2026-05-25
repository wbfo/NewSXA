"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, startTransition } from "react";
import { useAuth } from "@/components/auth-context";

const dashboardNav = [
  { id: "command", label: "Command", icon: "⬡" },
  { id: "vault", label: "Vault", icon: "▥" },
  { id: "audits", label: "Audits", icon: "◈" },
  { id: "assets", label: "Deliverables", icon: "▤" },
  { id: "orders", label: "Orders", icon: "▣" },
  { id: "pipeline", label: "Pipeline", icon: "◇" },
  { id: "agents", label: "Agents", icon: "◉" },
  { id: "finance", label: "Finance", icon: "$" },
  { id: "revenue", label: "Revenue", icon: "◆" },
  { id: "prospects", label: "Prospects", icon: "◎" },
  { id: "chat", label: "Chat", icon: "◌" },
  { id: "inbox", label: "Agent Inbox", icon: "✉" }
];

const toolkitNav = [
  { id: "offer-pricing", label: "Offer & Pricing", icon: "§" },
  { id: "research", label: "Research", icon: "🔍" },
  { id: "qa-prompts", label: "AI QA Prompts", icon: "⚡" },
  { id: "outreach", label: "Outreach", icon: "✉" },
  { id: "objections", label: "Objections", icon: "🛡" },
  { id: "impact-matrix", label: "Impact Matrix", icon: "📊" },
  { id: "roi-calculator", label: "ROI Calculator", icon: "🧮" },
  { id: "linkedin", label: "LinkedIn", icon: "in" }
];

export function Navigation({ activeSection }: { activeSection?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const section = activeSection ?? "command";
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    try {
      const storage = typeof window !== "undefined" ? window.localStorage : undefined;
      const stored = typeof storage?.getItem === "function" ? storage.getItem("sx-nav-collapsed") : null;
      // startTransition: non-urgent init from localStorage — avoids cascading renders
      startTransition(() => {
        setMounted(true);
        if (stored === "true") setIsCollapsed(true);
      });
    } catch {
      // Keep the sidebar expanded if browser storage is unavailable.
      startTransition(() => setMounted(true));
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    try {
      const storage = typeof window !== "undefined" ? window.localStorage : undefined;
      if (typeof storage?.setItem === "function") {
        storage.setItem("sx-nav-collapsed", String(newState));
      }
    } catch {
      // The UI state still updates even when persistence is blocked.
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
    router.refresh();
  };

  // If not mounted or no user, show minimal or nothing
  if (!mounted || !user) return null;

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button 
        className="collapse-toggle" 
        onClick={toggleCollapse} 
        title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
        style={{
          transform: `rotate(${isCollapsed ? 180 : 0}deg)`,
          transition: "transform 0.3s ease"
        }}
      >
        <span>◀</span>
      </button>

      <div className="brand-block">
        <div className="brand-emblem">
          <span className="brand-emblem-inner">SX</span>
        </div>
        <div className="brand-info">
          <div className="brand-name">Sovereign X</div>
          <div className="brand-tag">{isAdmin ? "Admin Command" : "Client Portal"}</div>
        </div>
      </div>

      <div className="nav-group">
        <div className="nav-group-label">General</div>
        {isAdmin ? (
          <Link className="nav-link" data-active={pathname === "/admin" ? "true" : "false"} href="/admin">
            <span>⌂</span>
            <span className="nav-link-label">Command Center</span>
          </Link>
        ) : (
          <Link className="nav-link" data-active={pathname === "/portal" ? "true" : "false"} href="/portal">
            <span>⌂</span>
            <span className="nav-link-label">Portal Home</span>
          </Link>
        )}
        {!isAdmin && (
          <Link className="nav-link" data-active={pathname === "/portal/chat" ? "true" : "false"} href="/portal/chat">
            <span>✦</span>
            <span className="nav-link-label">Support Console</span>
          </Link>
        )}
      </div>

      {isAdmin && (
        <>
          <div className="nav-group">
            <div className="nav-group-label">Intelligence</div>
            {dashboardNav.map((item) => (
              <Link key={item.id} className="nav-link" data-active={pathname === "/admin" && section === item.id ? "true" : "false"} href={`/admin?section=${item.id}`}>
                <span>{item.icon}</span>
                <span className="nav-link-label">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="nav-group">
            <div className="nav-group-label">Knowledge</div>
            {["audit-protocol", "structuralism", "protocols", "glossary"].map((id) => (
              <Link key={id} className="nav-link" data-active={pathname === "/admin" && section === id ? "true" : "false"} href={`/admin?section=${id}`}>
                <span>⟡</span>
                <span className="nav-link-label">{id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</span>
              </Link>
            ))}
          </div>

          <div className="nav-group">
            <div className="nav-group-label">Toolkit</div>
            {toolkitNav.map((item) => (
              <Link key={item.id} className="nav-link" data-active={pathname === "/admin" && section === item.id ? "true" : "false"} href={`/admin?section=${item.id}`}>
                <span>{item.icon ?? "▸"}</span>
                <span className="nav-link-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="nav-account">
        <div className="nav-account-user">
          {user.photoURL ? (
            <Image src={user.photoURL} alt="" width={28} height={28} className="nav-avatar" />
          ) : (
            <div className="nav-avatar nav-avatar-fallback">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="nav-account-email brand-info">
            {user.email}
          </div>
        </div>
        <button 
          onClick={() => void handleLogout()}
          className="nav-link nav-logout"
        >
          <span>⏻</span>
          <span className="nav-link-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
