import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Personal Brand & Image Audit — Sovereign X Audits" },
  description:
    "An 18-section personal brand intelligence report for professionals, creatives, executives, and public figures. See exactly what your image is communicating — and what it's costing you.",
  alternates: { canonical: "https://sxaudits.com/image-audit" },
  openGraph: {
    title: "Personal Brand & Image Audit — Sovereign X Audits",
    description: "18 sections. Your image, your presence, your gaps — with dollar figures attached. For professionals, creatives, and executives.",
    url: "https://sxaudits.com/image-audit",
    siteName: "Sovereign X Audits",
    type: "website",
  },
};

const SECTIONS = [
  "Color analysis & palette alignment",
  "Social media presence audit",
  "Brand identity consistency",
  "Hair and grooming assessment",
  "Outfit architecture review",
  "Photography readiness",
  "Personal presence score",
  "Public perception mapping",
  "Digital footprint audit",
  "Content alignment review",
  "Competitive positioning",
  "Priority image roadmap",
];

const TIERS = [
  {
    name: "Standard",
    promo: "$350",
    reg: "$500",
    desc: "18-section personal brand intelligence report. 72-hour delivery.",
  },
  {
    name: "Public Figure Tier",
    promo: "$750",
    reg: "$1,000",
    desc: "Standard plus media presence analysis, press-readiness review, and public perception deep-dive.",
  },
  {
    name: "X Attraction Audit",
    promo: "$350",
    reg: "$500",
    desc: "Specialized audit focused on attraction, presence, and social magnetism for personal brand growth.",
  },
];

export default function ImageAuditPage() {
  return (
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          X Image Audit
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Image Is Telling A Story.<br />
          We&apos;ll Show You What It&apos;s Saying.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 640 }}>
          The X Image Audit is an 18-section personal brand intelligence report that examines every element of
          how you present yourself — and shows you exactly what it&apos;s communicating to the world, what&apos;s
          working, and what&apos;s costing you opportunities. Delivered in 72 hours.
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
          Best for: professionals, creatives, executives, artists, content creators, athletes, and public figures.
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
          Start Your Image Audit →
        </a>
      </section>
    </main>
  );
}
