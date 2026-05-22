"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SovereignSnippet } from "@/components/sovereign-snippet";
import { StandardAuditExample } from "@/components/standard-audit-example";

export function SamplesClient() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sx-theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("sx-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div className="sx-intake theme-wrap font-mono min-h-screen">
      {/* ── Ambient Background Orbs ── */}
      <div className="pm-page-bg" aria-hidden="true">
        <div className="pm-orb pm-orb-neon-blue" />
        <div className="pm-orb pm-orb-neon-amber" />
        <div className="pm-orb pm-orb-neon-purple" />
      </div>

      <main style={{ backgroundColor: "#060606", minHeight: "100vh", color: "#D0C8B8" }}>
        
        {/* ── NAVIGATION HEADER ── */}
        <header className="nav">
          <div className="nav-inner">
            <Link href="/intake" className="nav-brand" aria-label="Sovereign X Audits">
              <span className="sx-seal-mini">SX</span>
              <span className="nav-brand-text">
                <span className="name">Sovereign X Audits</span>
                <span className="sub">BlackFur Capital Group LLC</span>
              </span>
            </Link>

            <div className="nav-links">
              <Link href="/intake#hero">Home</Link>
              <Link href="/intake#services">Services</Link>
              <Link href="/samples" className="active" style={{ color: "#C8A96E" }}>Sample Reports</Link>
              <Link href="/intake#featured">Featured</Link>
              <Link href="/intake#intake">Intake</Link>
            </div>

            <div className="nav-spacer" />

            <div className="nav-actions">
              <button className="btn btn-quiet" type="button" onClick={toggleTheme}>
                {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
              </button>
            </div>

            <button
              className="nav-hamburger"
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div className="nav-mobile-menu">
              <Link href="/intake#hero"     onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/intake#services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link href="/samples"         onClick={() => setMenuOpen(false)} style={{ color: "#C8A96E" }}>Sample Reports</Link>
              <Link href="/intake#featured" onClick={() => setMenuOpen(false)}>Featured</Link>
              <Link href="/intake#intake"   onClick={() => setMenuOpen(false)}>Intake</Link>
              <button
                className="btn btn-quiet nav-mobile-theme"
                type="button"
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
              >
                {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
              </button>
            </div>
          )}

          <div className="pm-nav-glow" aria-hidden="true" />
        </header>

        {/* ── PAGE CONTENT CONTAINER ── */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px", paddingTop: "12px" }}>
          
          {/* SECTION 1 — PAGE HEADER */}
          <header className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0px", paddingBottom: "40px" }}>
            <p
              style={{ color: "#C8A96E", letterSpacing: "4px" }}
              className="font-mono text-xs uppercase mb-4"
            >
              Sample Intelligence Reports · Sovereign X Audits
            </p>

            <h1
              style={{ color: "#D0C8B8", fontFamily: "var(--font-display)" }}
              className="text-4xl md:text-5xl mb-6 text-white font-serif"
            >
              This is what you receive.
            </h1>

            <p
              style={{ color: "#777", maxWidth: "560px", fontSize: "15px", lineHeight: "1.6" }}
              className="mx-auto mb-10"
            >
              Every Sovereign X Audit delivers verified intelligence with dollar figures attached. 
              No filler. No generic recommendations. Below is a sample snippet and a sample standard 
              audit — both based on real research, anonymized for this page.
            </p>

            {/* Two anchor links to jump to each section */}
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="#snippet"
                style={{
                  border: "1px solid rgba(200, 169, 110, 0.2)",
                  color: "#C8A96E",
                  textDecoration: "none",
                }}
                className="font-mono text-xs tracking-widest uppercase px-6 py-3 hover:border-[#C8A96E] transition-colors"
              >
                The Snippet ↓
              </a>
              <a
                href="#standard-audit"
                style={{
                  background: "#C8A96E",
                  color: "#060606",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                className="font-mono text-xs tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Standard Audit Example ↓
              </a>
            </div>
          </header>

          {/* SECTION 2 — THE SNIPPET */}
          <section id="snippet" style={{ marginBottom: "96px", paddingTop: "40px" }}>
            {/* Section label */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <span
                  style={{ color: "#C8A96E", letterSpacing: "4px" }}
                  className="font-mono text-xs uppercase"
                >
                  01 / The Snippet
                </span>
                <div
                  style={{
                    background: "rgba(200, 169, 110, 0.15)",
                    color: "#C8A96E",
                    fontFamily: "monospace",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    border: "1px solid rgba(200, 169, 110, 0.2)"
                  }}
                >
                  Free · Sent Before Any Purchase
                </div>
              </div>
              <h2
                style={{ color: "#D0C8B8", fontFamily: "var(--font-display)" }}
                className="text-2xl mb-3 text-white font-serif"
              >
                What you receive before you pay a dollar.
              </h2>
              <p style={{ color: "#777", maxWidth: "600px", fontSize: "14px", lineHeight: "1.6" }}>
                Before any client commits, we send a free one-page partial disclosure — 3 verified 
                findings from a real intelligence review of their business. No pitch. No pressure. 
                Just what we found.
              </p>
            </div>

            {/* The existing SovereignSnippet component */}
            <div style={{ overflowX: "auto" }} className="glass-premium p-6 rounded-md">
              <SovereignSnippet />
            </div>
          </section>

          {/* SECTION 3 — DIVIDER */}
          <div style={{ position: "relative", marginTop: "80px", marginBottom: "80px" }}>
            {/* Gold horizontal rule */}
            <div
              style={{
                background: "#C8A96E",
                height: "1px",
                opacity: 0.2,
              }}
            />
            
            {/* Center label */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  background: "#060606",
                  color: "#555",
                  padding: "0 20px",
                  letterSpacing: "4px"
                }}
                className="font-mono text-xs uppercase"
              >
                The Full Report
              </span>
            </div>
          </div>

          {/* SECTION 4 — STANDARD AUDIT EXAMPLE */}
          <section id="standard-audit" style={{ marginBottom: "96px", paddingTop: "40px" }}>
            {/* Section label */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <span
                  style={{ color: "#C8A96E", letterSpacing: "4px" }}
                  className="font-mono text-xs uppercase"
                >
                  02 / Standard Audit
                </span>
                <div
                  style={{
                    background: "rgba(200, 169, 110, 0.15)",
                    color: "#C8A96E",
                    fontFamily: "monospace",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    border: "1px solid rgba(200, 169, 110, 0.2)"
                  }}
                >
                  $500 Promo · 21 Sections · 72hr Delivery
                </div>
              </div>
              <h2
                style={{ color: "#D0C8B8", fontFamily: "var(--font-display)" }}
                className="text-2xl mb-3 text-white font-serif"
              >
                The complete intelligence report.
              </h2>
              <p style={{ color: "#777", maxWidth: "600px", fontSize: "14px", lineHeight: "1.6" }}>
                Below is a redacted excerpt from a real Sovereign X Digital Audit — Standard tier. 
                Client details anonymized. Every finding, dollar figure, and section structure is 
                representative of what gets delivered.
              </p>
            </div>

            {/* The audit example component */}
            <div style={{ overflowX: "auto" }}>
              <StandardAuditExample />
            </div>
          </section>

          {/* SECTION 5 — BOTTOM CTA */}
          <section
            style={{
              borderColor: "#141414",
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              textAlign: "center",
              paddingTop: "80px",
              paddingBottom: "80px",
            }}
          >
            <p
              style={{ color: "#C8A96E", letterSpacing: "4px" }}
              className="font-mono text-xs uppercase mb-6"
            >
              Ready to see what we find in your business?
            </p>

            <h2
              style={{ color: "#D0C8B8", fontFamily: "var(--font-display)" }}
              className="text-2xl mb-4 text-white font-serif"
            >
              Your findings are waiting.
            </h2>

            <p
              style={{ color: "#777", fontSize: "14px", lineHeight: "1.6" }}
              className="text-sm mb-10 max-w-md mx-auto"
            >
              Every audit starts with intelligence first. No pitch. No pressure. Just what the data shows.
            </p>

            <div
              style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}
            >
              <Link
                href="/intake"
                style={{
                  background: "#C8A96E",
                  color: "#060606",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                className="font-mono text-sm tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity"
              >
                Get Your Audit →
              </Link>
              <Link
                href="/intake"
                style={{
                  border: "1px solid rgba(200, 169, 110, 0.2)",
                  color: "#C8A96E",
                  textDecoration: "none",
                }}
                className="font-mono text-sm tracking-widest uppercase px-10 py-4 hover:border-[#C8A96E] transition-colors"
              >
                Start With a Free Snippet
              </Link>
            </div>
          </section>

        </div>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="wrap">
            <div className="footer-grid">
              <div className="footer-col">
                <h5>Sovereign X Audits</h5>
                <p>BlackFur Capital Group LLC</p>
                <p>Executive intake, premium audit briefs, and a command center queue that stays easy to operate.</p>
              </div>
              <div className="footer-col">
                <h5>Quick links</h5>
                <Link href="/login">Client Login</Link>
                <Link href="/intake#services">Services</Link>
                <Link href="/intake#intake">Intake</Link>
                <a href="https://aicouncilconductor.com" target="_blank" rel="noreferrer">AI Council Conductor</a>
              </div>
              <div className="footer-col">
                <h5>Support</h5>
                <p>Orders flow into the command center automatically. Light and dark mode are both supported.</p>
                <p>Promo resets monthly. All submissions stay visible to the operator in the shared queue.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Sovereign X Audits · sxaudits.com</span>
              <span>
                <Link href="/intake#hero">Top</Link>
                <Link href="/intake#intake">Intake</Link>
                <Link href="/login" className="footer-admin-link">Admin</Link>
              </span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
