import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Digital Business Audit — Sovereign X Audits" },
  description:
    "A 21-section digital intelligence report that shows businesses exactly where their online presence is broken, what it's costing them, and what to fix first. Delivered in 72 hours.",
  alternates: { canonical: "https://sxaudits.com/digital-audit" },
  openGraph: {
    title: "Digital Business Audit — Sovereign X Audits",
    description: "A 21-section digital intelligence report. Revenue leaks identified. Dollar figures attached. Delivered in 72 hours.",
    url: "https://sxaudits.com/digital-audit",
    siteName: "Sovereign X Audits",
    type: "website",
  },
};

const SECTIONS = [
  "Technical performance scores",
  "Mobile performance analysis",
  "Website conversion audit",
  "Brand identity consistency",
  "NAP consistency across directories",
  "Social media infrastructure",
  "AI search & GEO visibility",
  "Reputation management",
  "Revenue leaks with dollar figures",
  "AI readiness & voice agent opportunity",
  "Competitive context",
  "Priority roadmap",
];

const TIERS = [
  {
    name: "Standard",
    promo: "$500",
    reg: "$750",
    desc: "21-section report. 72-hour delivery. Revenue leaks identified. Dollar figures attached.",
  },
  {
    name: "Deep",
    promo: "$1,500",
    reg: "$2,000",
    desc: "Standard plus full technical data, AI QA, competitive scoring, and ROI calculations.",
  },
  {
    name: "Deep + Intake",
    promo: "$2,000",
    reg: "$2,500",
    desc: "Deep plus structured intake sessions. Dollar figures go from estimated to exact.",
  },
];

export default function DigitalAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Sovereign X Digital Audit
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Business Is Losing Revenue.<br />
          We&apos;ll Show You Exactly Where.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 640 }}>
          The Sovereign X Digital Audit is a 21-section intelligence report that surfaces every revenue leak,
          digital gap, and missed opportunity in your business — with dollar figures attached to every finding.
          Delivered to your Google Drive in 72 hours.
        </p>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#d3ad64", marginBottom: "1rem" }}>What The Audit Covers</h2>
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem", marginBottom: "3rem", padding: 0, listStyle: "none" }}>
          {SECTIONS.map((item) => (
            <li key={item} style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#b0a592", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#d3ad64" }}>✦</span> {item}
            </li>
          ))}
        </ul>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#d3ad64", marginBottom: "1.5rem" }}>Pricing</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {TIERS.map((tier) => (
            <div key={tier.name} style={{ border: "1px solid rgba(211,173,100,0.2)", padding: "1.5rem", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "0.75rem" }}>{tier.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: "2rem", color: "#d3ad64", marginBottom: "0.25rem" }}>{tier.promo}</div>
              <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#7d766a", marginBottom: "1rem" }}>reg. {tier.reg}</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#b0a592", lineHeight: 1.6 }}>{tier.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "Georgia, serif", color: "#7d766a", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Best for: law firms, dental practices, med spas, real estate offices, CPAs, and any business where reputation equals revenue.
        </p>

        <a
          href="/intake"
          style={{
            display: "inline-block", background: "#d3ad64", color: "#020617",
            padding: "1rem 2rem", fontFamily: "monospace", fontSize: "0.8rem",
            letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Start Your Digital Audit →
        </a>
      </section>
    </main>
  );
}
