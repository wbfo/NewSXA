import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Audit for Executives — Sovereign X Audits",
  description:
    "An 18-section personal brand intelligence report for executives and business leaders. See exactly what your image is communicating — and align it with the authority you carry.",
  alternates: { canonical: "https://sxaudits.com/image-audit/executives" },
};

export default function ExecutivesImageAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          X Image Audit · Executives
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Image Should Reflect<br />
          The Authority You&apos;ve Built.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
          An 18-section personal brand intelligence report for executives, founders, and senior leaders.
          We audit everything — your LinkedIn presence, your photography, your wardrobe signals, your
          public-facing content — and show you exactly what each element is communicating to the people
          who matter most. Delivered in 72 hours.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          At the executive level, your personal brand is an asset. How you show up online, in photos,
          in meetings, and in public-facing content directly affects how people receive your authority,
          your ideas, and your leadership. The X Image Audit gives you a clear, unsentimental read on
          the gap between how you see yourself and how the world sees you.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "3rem" }}>
          The audit covers: LinkedIn profile analysis, professional photography readiness, wardrobe and
          color alignment, digital footprint review, public presence scoring, speaking and media readiness,
          brand consistency across platforms, and a clear roadmap for alignment.
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
          Start Your Executive Image Audit →
        </a>
      </section>
    </main>
  );
}
