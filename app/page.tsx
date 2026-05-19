import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://sxaudits.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sxaudits.com/#organization",
      name: "Sovereign X Audits",
      alternateName: "BlackFur Capital Group LLC",
      url: "https://sxaudits.com",
      logo: { "@type": "ImageObject", url: "https://sxaudits.com/logo.png" },
      founder: { "@type": "Person", name: "Ola Olaitan", url: "https://aicouncilconductor.com" },
      contactPoint: { "@type": "ContactPoint", email: "sxabfcg@gmail.com", contactType: "customer service", areaServed: "US" },
      sameAs: ["https://aicouncilconductor.com"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://sxaudits.com/#service",
      name: "Sovereign X Audits",
      description: "Digital intelligence audits, personal brand audits, and voice agent services for businesses and professionals.",
      url: "https://sxaudits.com",
      priceRange: "$350 - $5000",
      areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Audit Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Digital Audit", description: "21-section digital intelligence report identifying revenue leaks, technical gaps, and AI readiness. Delivered in 72 hours." },
            price: "500",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "X Image Audit", description: "18-section personal brand intelligence report for professionals, creatives, and public figures." },
            price: "350",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Voice Agent Services", description: "ElevenLabs-powered voice agents for businesses losing revenue to missed after-hours calls." },
            price: "1500",
            priceCurrency: "USD",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://sxaudits.com/#website",
      url: "https://sxaudits.com",
      name: "Sovereign X Audits",
      publisher: { "@id": "https://sxaudits.com/#organization" },
    },
  ],
};

const S: Record<string, React.CSSProperties> = {
  page:       { background: "#020617", color: "#e7e0d2", fontFamily: "Georgia, 'Source Serif Pro', serif" },
  wrap:       { maxWidth: 960, margin: "0 auto", padding: "0 1.5rem" },
  mono:       { fontFamily: "'IBM Plex Mono', 'SFMono-Regular', Menlo, monospace" },
  eyebrow:    { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase" as const, marginBottom: "1.5rem" },
  h1:         { fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1, fontWeight: 400, color: "#e7e0d2", marginBottom: "1.5rem" },
  h2:         { fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.2, fontWeight: 400, color: "#e7e0d2", marginBottom: "1rem" },
  lead:       { fontSize: "1.1rem", color: "#b0a592", lineHeight: 1.75, maxWidth: 620, marginBottom: "2.5rem" },
  gold:       { color: "#d3ad64" },
  dim:        { color: "#7d766a" },
  btnPrimary: { display: "inline-block", background: "#d3ad64", color: "#020617", padding: "1rem 2.25rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, fontWeight: 700, textDecoration: "none" },
  btnGhost:   { display: "inline-block", border: "1px solid rgba(211,173,100,0.35)", color: "#d3ad64", padding: "1rem 2.25rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, textDecoration: "none" },
  section:    { padding: "6rem 0" },
  card:       { border: "1px solid rgba(255,255,255,0.07)", padding: "2rem", background: "rgba(255,255,255,0.02)" },
  divider:    { border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", margin: "0" },
};

const SERVICES = [
  {
    icon: "◈",
    name: "Sovereign X Digital Audit",
    tagline: "Where is your business bleeding revenue online?",
    desc: "A 21-section intelligence report that examines every point of friction in your digital presence — technical performance, local SEO, conversion gaps, AI search visibility — and attaches a dollar figure to each finding.",
    price: "From $500",
    href: "/digital-audit",
  },
  {
    icon: "◎",
    name: "X Image Audit",
    tagline: "What is your image actually communicating?",
    desc: "An 18-section personal brand intelligence report for professionals, executives, creatives, and public figures. Color, styling, social presence, photography readiness — everything the world sees when they look at you.",
    price: "From $350",
    href: "/image-audit",
  },
  {
    icon: "⬡",
    name: "Voice Agent Services",
    tagline: "Stop losing revenue to missed after-hours calls.",
    desc: "ElevenLabs-powered voice agents that handle calls, capture leads, and route inquiries 24/7. Law firms, dental practices, med spas, and any business where a missed call is a missed client.",
    price: "From $1,500",
    href: "/voice-agents",
  },
];

const AICC_STEPS = [
  { num: "01", title: "Generator",  text: "Creates the first pass from your intake, turning raw inputs into an actionable brief." },
  { num: "02", title: "Critic",     text: "Challenges weak assumptions, catches gaps, and makes every finding defensible." },
  { num: "03", title: "Verifier",   text: "Checks every detail against the source material before the report ships." },
  { num: "04", title: "Refiner",    text: "Shapes findings into something clear, tight, and easy to act on." },
  { num: "05", title: "Specialist", text: "Turns the verified brief into a usable engagement path with the right next action." },
];

const PRICING = [
  {
    category: "Sovereign X Digital Audits",
    rows: [
      { name: "Standard",      price: "$500",        note: "reg. $750" },
      { name: "Deep",          price: "$1,500",      note: "reg. $2,000" },
      { name: "Deep + Intake", price: "$2,000",      note: "reg. $2,500" },
    ],
  },
  {
    category: "X Image Audit",
    rows: [
      { name: "Standard",           price: "$350", note: "reg. $500" },
      { name: "Public Figure Tier", price: "$750", note: "reg. $1,000" },
      { name: "X Attraction Audit", price: "$350", note: "reg. $500" },
    ],
  },
  {
    category: "Voice Agent Services",
    rows: [
      { name: "Starter",   price: "$1,500 setup",      note: "+ $200/mo" },
      { name: "Standard",  price: "$2,500 setup",      note: "+ $350/mo" },
      { name: "Advanced",  price: "$4,000–$5,000 setup", note: "+ $500/mo" },
    ],
  },
];

const INDUSTRIES = [
  "Law Firms", "Dental Practices", "Med Spas", "Medical Practices",
  "Real Estate Offices", "CPAs & Advisory Firms", "Executives & Founders",
  "Creative Professionals", "Artists & Musicians", "Content Creators",
  "Athletes & Public Figures", "Personal Brand Builders",
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={S.page}>

        {/* Nav */}
        <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 50, background: "rgba(2,6,23,0.94)", backdropFilter: "blur(12px)" }}>
          <div style={{ ...S.wrap, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.5rem" }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ ...S.mono, color: "#d3ad64", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em" }}>Sovereign X Audits</span>
              <span style={{ ...S.mono, color: "#7d766a", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase" }}>BlackFur Capital Group LLC</span>
            </a>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <a href="#services" style={{ ...S.mono, color: "#b0a592", fontSize: "0.75rem", textDecoration: "none", letterSpacing: "0.1em" }}>Services</a>
              <a href="#pricing"  style={{ ...S.mono, color: "#b0a592", fontSize: "0.75rem", textDecoration: "none", letterSpacing: "0.1em" }}>Pricing</a>
              <a href="/intake"   style={{ ...S.btnPrimary, padding: "0.6rem 1.25rem" }}>Get Your Audit</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section id="hero" style={{ ...S.section, paddingTop: "8rem", paddingBottom: "8rem" }}>
          <div style={S.wrap}>
            <p style={S.eyebrow}>Sovereign X Audits · BlackFur Capital Group LLC · AICC Verified</p>
            <h1 style={S.h1}>
              Your Presence Is Telling A Story.<br />
              <span style={S.gold}>Is It The Right One?</span>
            </h1>
            <p style={S.lead}>
              We audit your business, your brand, and your image —
              and show you exactly what it&apos;s costing you.
              Delivered in 72 hours. No discovery call required.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/intake"   style={S.btnPrimary}>Get Your Audit →</a>
              <a href="#services" style={S.btnGhost}>See What We Audit ↓</a>
            </div>
            <div style={{ marginTop: "3rem", display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[
                { stat: "72 hrs", label: "Delivery guarantee" },
                { stat: "21",     label: "Sections per digital audit" },
                { stat: "AICC",   label: "Verified methodology" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ ...S.mono, color: "#d3ad64", fontSize: "1.5rem", fontWeight: 700 }}>{item.stat}</div>
                  <div style={{ ...S.mono, color: "#7d766a", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={S.divider} />

        {/* Services */}
        <section id="services" style={S.section}>
          <div style={S.wrap}>
            <p style={S.eyebrow}>Services</p>
            <h2 style={S.h2}>Three ways into the system.</h2>
            <p style={{ ...S.lead, marginBottom: "3rem" }}>
              Each service targets a specific gap — digital presence, personal brand, or after-hours revenue loss.
              Every deliverable is AICC Verified and arrives in your Google Drive in 72 hours.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {SERVICES.map((svc) => (
                <article key={svc.name} style={S.card}>
                  <div style={{ ...S.mono, color: "#d3ad64", fontSize: "1.5rem", marginBottom: "1rem" }}>{svc.icon}</div>
                  <h3 style={{ ...S.mono, color: "#e7e0d2", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{svc.name}</h3>
                  <p style={{ color: "#d3ad64", fontStyle: "italic", fontSize: "0.95rem", marginBottom: "0.75rem" }}>{svc.tagline}</p>
                  <p style={{ color: "#b0a592", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{svc.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ ...S.mono, color: "#d3ad64", fontSize: "0.85rem" }}>{svc.price}</span>
                    <a href={svc.href} style={{ ...S.mono, color: "#7d766a", fontSize: "0.75rem", textDecoration: "none", letterSpacing: "0.1em" }}>Learn more →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <hr style={S.divider} />

        {/* AICC */}
        <section id="aicc" style={S.section}>
          <div style={S.wrap}>
            <p style={S.eyebrow}>AICC Methodology</p>
            <h2 style={S.h2}>Every finding is verified before it reaches you.</h2>
            <p style={{ ...S.lead, marginBottom: "3rem" }}>
              All Sovereign X deliverables pass through the AI Council Conductor five-stage verification process.
              No unsupported claims. No generic recommendations. Every finding is checked, challenged, and confirmed.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(165px, 1fr))", gap: "1rem" }}>
              {AICC_STEPS.map((step) => (
                <div key={step.num} style={{ ...S.card, padding: "1.5rem" }}>
                  <div style={{ ...S.mono, color: "#d3ad64", fontSize: "0.7rem", letterSpacing: "0.25em", marginBottom: "0.5rem" }}>{step.num}</div>
                  <div style={{ ...S.mono, color: "#e7e0d2", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{step.title}</div>
                  <p style={{ color: "#b0a592", fontSize: "0.85rem", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
            <p style={{ ...S.mono, color: "#7d766a", fontSize: "0.75rem", marginTop: "2rem", letterSpacing: "0.08em" }}>
              Operated by Ola Olaitan —{" "}
              <a href="https://aicouncilconductor.com" style={{ color: "#d3ad64", textDecoration: "none" }}>aicouncilconductor.com</a>
            </p>
          </div>
        </section>

        <hr style={S.divider} />

        {/* Pricing */}
        <section id="pricing" style={S.section}>
          <div style={S.wrap}>
            <p style={S.eyebrow}>Pricing</p>
            <h2 style={S.h2}>Promotional pricing. No hidden fees.</h2>
            <p style={{ ...S.lead, marginBottom: "3rem" }}>
              All prices listed are current promotional rates. Regular rates shown for reference.
              Payment to BlackFur Capital Group LLC. Delivery via Google Drive within 72 hours of intake completion.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2.5rem", marginBottom: "3rem" }}>
              {PRICING.map((block) => (
                <div key={block.category}>
                  <h3 style={{ ...S.mono, color: "#d3ad64", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(211,173,100,0.2)" }}>{block.category}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {block.rows.map((row) => (
                      <div key={row.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                        <span style={{ color: "#b0a592", fontSize: "0.9rem" }}>{row.name}</span>
                        <span style={{ ...S.mono, fontSize: "0.85rem", whiteSpace: "nowrap" as const }}>
                          <span style={S.gold}>{row.price}</span>{" "}
                          <span style={S.dim}>{row.note}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(211,173,100,0.04)", border: "1px solid rgba(211,173,100,0.15)", padding: "1.5rem", marginBottom: "3rem" }}>
              <p style={{ ...S.mono, color: "#d3ad64", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Referral Program</p>
              <p style={{ color: "#b0a592", fontSize: "0.9rem", lineHeight: 1.65 }}>
                Refer any audit client — receive a <strong style={S.gold}>$100 gift card within 48 hours</strong> of their intake submission.
                Photography and styling referrals earn 10–15% of the gig value.
              </p>
            </div>
            <a href="/intake" style={S.btnPrimary}>Submit Your Intake →</a>
          </div>
        </section>

        <hr style={S.divider} />

        {/* Industries */}
        <section style={{ ...S.section, paddingBottom: "4rem" }}>
          <div style={S.wrap}>
            <p style={S.eyebrow}>Who We Work With</p>
            <h2 style={S.h2}>Built for businesses where reputation equals revenue.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem", marginTop: "2rem" }}>
              {INDUSTRIES.map((industry) => (
                <div key={industry} style={{ ...S.mono, color: "#b0a592", fontSize: "0.8rem", padding: "0.75rem 1rem", border: "1px solid rgba(255,255,255,0.06)", letterSpacing: "0.05em" }}>
                  <span style={{ color: "#d3ad64", marginRight: "0.5rem" }}>✦</span>{industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: "rgba(211,173,100,0.04)", borderTop: "1px solid rgba(211,173,100,0.12)", borderBottom: "1px solid rgba(211,173,100,0.12)", padding: "6rem 0" }}>
          <div style={{ ...S.wrap, textAlign: "center" as const }}>
            <p style={{ ...S.eyebrow, justifyContent: "center", display: "flex" }}>Sovereign X Audits</p>
            <h2 style={{ ...S.h2, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Ready to see what your presence<br />is actually communicating?
            </h2>
            <p style={{ ...S.lead, margin: "0 auto 2.5rem", textAlign: "center" as const }}>
              No discovery call. No back-and-forth. Fill out the intake form and your report
              arrives in 72 hours — with every finding backed by the AICC verification process.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/intake"        style={S.btnPrimary}>Start Your Audit →</a>
              <a href="/digital-audit" style={S.btnGhost}>See All Services</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "3rem 0" }}>
          <div style={{ ...S.wrap, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{ ...S.mono, color: "#d3ad64", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Sovereign X Audits</div>
              <div style={{ ...S.mono, color: "#7d766a", fontSize: "0.75rem" }}>BlackFur Capital Group LLC</div>
              <div style={{ ...S.mono, color: "#7d766a", fontSize: "0.75rem", marginTop: "0.25rem" }}>sxabfcg@gmail.com</div>
            </div>
            <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ ...S.mono, color: "#b0a592", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Services</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="/digital-audit" style={{ color: "#7d766a", fontSize: "0.85rem", textDecoration: "none" }}>Digital Audit</a>
                  <a href="/image-audit"   style={{ color: "#7d766a", fontSize: "0.85rem", textDecoration: "none" }}>Image Audit</a>
                  <a href="/voice-agents"  style={{ color: "#7d766a", fontSize: "0.85rem", textDecoration: "none" }}>Voice Agents</a>
                </div>
              </div>
              <div>
                <div style={{ ...S.mono, color: "#b0a592", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Legal</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="/terms"    style={{ color: "#7d766a", fontSize: "0.85rem", textDecoration: "none" }}>Terms</a>
                  <a href="/privacy"  style={{ color: "#7d766a", fontSize: "0.85rem", textDecoration: "none" }}>Privacy</a>
                  <a href="/security" style={{ color: "#7d766a", fontSize: "0.85rem", textDecoration: "none" }}>Security</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ ...S.wrap, marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ ...S.mono, color: "#7d766a", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
              © {new Date().getFullYear()} BlackFur Capital Group LLC · All rights reserved ·{" "}
              <a href="https://aicouncilconductor.com" style={{ color: "#d3ad64", textDecoration: "none" }}>aicouncilconductor.com</a>
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
