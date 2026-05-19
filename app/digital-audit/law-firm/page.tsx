import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Audit for Law Firms — Sovereign X Audits",
  description:
    "A 21-section digital intelligence report built for law firms. See exactly where your online presence is losing potential clients and what it's costing you in revenue.",
  alternates: { canonical: "https://sxaudits.com/digital-audit/law-firm" },
};

export default function LawFirmAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Digital Audit · Law Firms
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Law Firm&apos;s Digital Presence Is Losing You Clients.<br />
          We&apos;ll Show You Exactly How Many.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
          The Sovereign X Digital Audit for law firms is a 21-section intelligence report that examines
          every point where your online presence breaks down — from Google search visibility to your intake
          page conversion rate — and attaches dollar figures to every finding. Delivered in 72 hours.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Personal injury, family law, criminal defense, and advisory firms live and die by their first impression.
          When a potential client searches for an attorney and finds your competitor instead, that&apos;s revenue gone.
          When they find you but your website doesn&apos;t convert, that&apos;s revenue gone. When your intake form is too
          complicated, that&apos;s revenue gone. We find every one of those gaps and tell you what to fix first.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "3rem" }}>
          The audit covers: Google Business Profile health, local search ranking, website technical performance,
          mobile experience, conversion path analysis, review management, competitor positioning, AI search
          visibility, and a full priority roadmap with revenue impact estimates for each item.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <a
            href="/intake"
            style={{
              display: "inline-block", background: "#d3ad64", color: "#020617",
              padding: "1rem 2rem", fontFamily: "monospace", fontSize: "0.8rem",
              letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Start Your Law Firm Audit →
          </a>
          <a
            href="/digital-audit"
            style={{
              display: "inline-block", border: "1px solid rgba(211,173,100,0.4)", color: "#d3ad64",
              padding: "1rem 2rem", fontFamily: "monospace", fontSize: "0.8rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            See All Pricing ↓
          </a>
        </div>
      </section>
    </main>
  );
}
