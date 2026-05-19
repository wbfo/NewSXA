import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Audit for Dental Practices — Sovereign X Audits",
  description:
    "A 21-section digital intelligence report for dental practices. Find out where your online presence is losing new patients and what each gap is costing you monthly.",
  alternates: { canonical: "https://sxaudits.com/digital-audit/dental" },
};

export default function DentalAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Digital Audit · Dental Practices
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Dental Practice Is Missing New Patients Online.<br />
          We&apos;ll Show You Exactly Where.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
          A 21-section digital intelligence report for dental practices — general, cosmetic, pediatric,
          and specialty. See where you rank in local search, what your reviews are actually saying,
          and what it&apos;s costing you every month. Delivered in 72 hours.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Most dental practices are losing new patients to practices with better Google Business Profiles,
          more recent reviews, and faster-loading websites. The Sovereign X Digital Audit surfaces every one
          of these gaps with dollar figures attached — so you know exactly what to fix and why it matters.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "3rem" }}>
          The audit covers: local SEO health, Google Business Profile, review management, website performance,
          mobile experience, booking flow conversion, competitor mapping, AI search visibility,
          voice agent opportunity assessment, and a full priority roadmap.
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
            Start Your Dental Practice Audit →
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
