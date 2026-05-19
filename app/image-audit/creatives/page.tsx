import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Brand Audit for Creatives — Sovereign X Audits",
  description:
    "An 18-section personal brand intelligence report for artists, creators, and creative professionals. See what your image is communicating and build a presence that works as hard as your work does.",
  alternates: { canonical: "https://sxaudits.com/image-audit/creatives" },
};

export default function CreativesImageAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          X Image Audit · Creatives
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Work Is Strong.<br />
          Your Brand Should Match It.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
          An 18-section personal brand intelligence report for artists, designers, photographers, musicians,
          writers, and creative professionals. We audit your brand presence from the outside — the way clients,
          collaborators, and opportunities see you — and show you exactly what&apos;s working and what needs to
          change. Delivered in 72 hours.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          For creatives, the work and the brand are inseparable. When someone finds you online, they&apos;re
          deciding in seconds whether your presence matches the quality of what you create. The X Image Audit
          gives you an honest, structured look at that first impression — and a clear plan for making it count.
        </p>
        <p style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.7, marginBottom: "3rem" }}>
          The audit covers: portfolio and website presence, social media brand audit, content voice alignment,
          color and aesthetic consistency, photography and visual identity, platform-specific presence review,
          audience perception mapping, and a priority roadmap for brand elevation.
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
          Start Your Creative Brand Audit →
        </a>
      </section>
    </main>
  );
}
