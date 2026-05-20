import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Audit for Med Spas — Sovereign X Audits",
  description:
    "A 21-section digital intelligence report for med spas and aesthetic practices. Find every gap in your online presence and attach dollar figures to each missed booking.",
  alternates: { canonical: "https://sxaudits.com/digital-audit/med-spa" },
};

export default function MedSpaAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Digital Audit · Med Spas
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Med Spa&apos;s Online Presence<br />
          Is Costing You Bookings.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
          A 21-section digital intelligence report for med spas, aesthetic clinics, and wellness practices.
          We find every friction point between a potential client searching for your services and them
          booking with you — and tell you exactly what each gap is costing you monthly.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Med spas compete on trust, aesthetics, and convenience. If your online presence doesn&apos;t reflect
          the premium experience you deliver in person, you&apos;re losing clients before they ever walk through
          the door. The Sovereign X Digital Audit gives you a complete picture — and a clear action plan.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "3rem" }}>
          The audit covers: Google Business Profile, local search ranking, website conversion analysis,
          Instagram and social media audit, review management, booking flow friction, competitor analysis,
          AI search visibility, brand consistency review, and a full revenue-impact priority roadmap.
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
            Start Your Med Spa Audit →
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
