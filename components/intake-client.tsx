"use client";

import { useEffect, useMemo, useRef, useState, startTransition, type FormEvent } from "react";
import Link from "next/link";
import type { DashboardPayload, ClientOrder } from "@/lib/domain/types";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { formatDisplayTime } from "@/lib/utils/time";

const SERVICE_CARDS = [
  {
    title: "Digital Standard",
    icon: "◈",
    desc: "A clean, structured review of the website, conversion friction, and quick wins.",
    bullets: ["Website & content review", "Conversion leaks", "Clear next-step brief"]
  },
  {
    title: "Digital Deep",
    icon: "✦",
    desc: "A more detailed audit with technical notes, competitive context, and revenue impact.",
    bullets: ["Technical analysis", "Competitive context", "ROI-facing findings"]
  },
  {
    title: "X Image Audit",
    icon: "◎",
    desc: "A premium brand and public-presence review for professionals and creators.",
    bullets: ["Personal brand review", "Public presence audit", "Image alignment"]
  }
];

const FINDINGS = [
  {
    id: "01",
    label: "Visibility leak",
    amount: "$1,250 / month",
    detail: "The audience is arriving, but the page is not converting that attention into orders."
  },
  {
    id: "02",
    label: "Response gap",
    amount: "$650 / month",
    detail: "After-hours leads and slower follow-up can quietly turn into lost opportunities."
  },
  {
    id: "03",
    label: "Conversion friction",
    amount: "$2,000 / month",
    detail: "Decision-making becomes easier when the offer, proof, and next step are clearer."
  }
];

const AUDIENCE = [
  {
    title: "Built for firms",
    items: [
      "Personal injury, family law, and advisory teams that want a more premium first touch.",
      "Dental, med spa, and wellness practices that need a cleaner intake and better signal.",
      "Owners who want the order to feel intentional, not like a generic form submission."
    ]
  },
  {
    title: "Built for people",
    items: [
      "Professionals with a public-facing brand that needs a sharper, more executive presentation.",
      "Operators who want the command center to show each order as a live brief, not a flat record.",
      "Clients who prefer structure, clarity, and a visible next step after they click submit."
    ]
  }
];

const TIER_OPTIONS = [
  {
    id: "Digital Standard",
    name: "Digital Standard",
    serviceType: "Digital Audit",
    pricePromo: "$500 promo",
    priceReg: "$750 regular",
    summary: "Fast, clear, and easy to submit.",
    tags: ["Website review", "Conversion leaks", "Quick wins"],
    selectedTone: "neon-blue"
  },
  {
    id: "Digital Deep",
    name: "Digital Deep",
    serviceType: "Deep Digital Audit",
    pricePromo: "$1,500 promo",
    priceReg: "$2,000 regular",
    summary: "More detail, more signal, more confidence.",
    tags: ["Technical analysis", "Competitive context", "ROI-facing findings"],
    selectedTone: "neon-amber"
  },
  {
    id: "X Image Audit",
    name: "X Image Audit",
    serviceType: "Image Audit",
    pricePromo: "$350 promo",
    priceReg: "$500 regular",
    summary: "Premium brand presentation for public-facing clients.",
    tags: ["Personal brand", "Public presence", "Image alignment"],
    selectedTone: "neon-purple"
  }
];

const AICC_STEPS = [
  {
    num: "01",
    icon: "◈",
    title: "Generator",
    text: "Creates the first pass, gathers the raw inputs, and turns the intake into an actionable brief."
  },
  {
    num: "02",
    icon: "◉",
    title: "Critic",
    text: "Challenges weak assumptions, catches gaps, and makes the intake more defensible before it ships."
  },
  {
    num: "03",
    icon: "✦",
    title: "Verifier",
    text: "Checks the details against the source material and confirms the order is ready for review."
  },
  {
    num: "04",
    icon: "◎",
    title: "Refiner",
    text: "Shapes the order into something clearer, tighter, and easier to act on in the command center."
  },
  {
    num: "05",
    icon: "⬡",
    title: "Specialist",
    text: "Turns the verified brief into a usable engagement path with the right next action."
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Inquiry lands",
    text: "The client fills out the intake form and the order is written into the shared queue."
  },
  {
    num: "02",
    title: "Brief is shaped",
    text: "The order gets a clear package, summary, and service type so the operator knows what to do."
  },
  {
    num: "03",
    title: "Command center updates",
    text: "A live record appears in the dashboard with status, timing, and the latest notes."
  },
  {
    num: "04",
    title: "Delivery begins",
    text: "The order moves into review, follow-up, and completion without the client needing to resend anything."
  }
];

const PRICING_BLOCKS = [
  {
    title: "Sovereign X Digital Audits",
    rows: [
      { name: "Standard Audit", promo: "$500 promo", reg: "$750 regular" },
      { name: "Deep Audit", promo: "$1,500 promo", reg: "$2,000 regular" },
      { name: "Deep + Intake", promo: "$2,000 promo", reg: "$2,500 regular" },
      { name: "Individual / Personal Brand", promo: "$500 promo", reg: "$750 regular" },
      { name: "Bulk 3–4 individuals", promo: "$350/ea", reg: "" },
      { name: "Bulk 5–9 individuals", promo: "$300/ea", reg: "" },
      { name: "Enterprise per location", promo: "$200/location", reg: "+ $2,000 brand audit" }
    ]
  },
  {
    title: "X Image Audit",
    rows: [
      { name: "Standard", promo: "$350 promo", reg: "$500 regular" },
      { name: "Public Figure Tier", promo: "$750 promo", reg: "$1,000 regular" },
      { name: "X Attraction Audit", promo: "$350 promo", reg: "$500 regular" },
      { name: "Follow-Up Re-Audit", promo: "$150–$200", reg: "" },
      { name: "Wardrobe Blueprint Add-On", promo: "Available after any audit", reg: "" }
    ]
  },
  {
    title: "Voice Agent Services",
    rows: [
      { name: "Starter", promo: "$1,500 setup + $200/mo", reg: "" },
      { name: "Standard", promo: "$2,500 setup + $350/mo", reg: "" },
      { name: "Advanced", promo: "$4,000–$5,000 setup + $500/mo", reg: "" },
      { name: "Enterprise", promo: "Custom + custom retainer", reg: "" }
    ]
  }
];

const REFERRALS = [
  { name: "Any audit referral", note: "$100 gift card within 48hrs" },
  { name: "Photography referral", note: "10–15% of gig value" },
  { name: "Styling referral", note: "10–15% of gig value" }
];

async function fetchOrders() {
  const response = await fetch("/api/orders", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load orders");
  }
  return (await response.json()) as DashboardPayload["orders"];
}

function heroSeal() {
  return (
    <svg viewBox="0 0 420 420" aria-hidden="true">
      <defs>
        <radialGradient id="sealGlow" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#0c1a3d" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="210" r="188" fill="url(#sealGlow)" stroke="var(--gold)" strokeWidth="3" />
      <circle cx="210" cy="210" r="168" fill="none" stroke="var(--gold-line)" strokeWidth="1.5" />
      <circle cx="210" cy="210" r="132" fill="none" stroke="rgba(200,169,110,0.18)" strokeWidth="1" />
      <text x="210" y="238" textAnchor="middle" fontFamily="Georgia, serif" fontSize="132" fontStyle="italic" fontWeight="700" fill="var(--gold)">
        SX
      </text>
      <text x="210" y="332" textAnchor="middle" fontFamily="var(--mono)" fontSize="18" letterSpacing="7" fill="var(--gold)">
        SOVEREIGN X AUDITS
      </text>
    </svg>
  );
}

function StatusTag({ label, tone }: { label: string; tone: "gold" | "teal" | "green" | "orange" | "red" | "muted" | "neon-blue" | "neon-amber" | "neon-purple" }) {
  const palette = {
    gold: "var(--gold)",
    teal: "var(--teal)",
    green: "var(--green)",
    orange: "var(--orange)",
    red: "var(--red)",
    muted: "var(--subtle)",
    "neon-blue": "var(--neon-blue)",
    "neon-amber": "var(--neon-amber)",
    "neon-purple": "var(--neon-purple)"
  };
  const color = palette[tone];
  return <span className="sx-pill" style={{ color, borderColor: `${color}55`, textShadow: tone.startsWith('neon') ? `0 0 8px ${color}` : undefined }}>{label}</span>;
}

// Staggered particle data (generated once)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5 + 3) % 100}%`,
  top: `${(i * 7.3 + 10) % 90}%`,
  duration: `${6 + (i % 5) * 1.8}s`,
  delay: `${(i * 0.6) % 4}s`,
}));

function IntakeInner({ initialData }: { initialData: DashboardPayload }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [orders, setOrders] = useState<ClientOrder[]>(initialData.orders);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTier, setSelectedTier] = useState(TIER_OPTIONS[0].id);
  const revealRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => {
    const newOrders = orders.filter((order) => order.status === "NEW").length;
    const reviewedOrders = orders.length - newOrders;
    return {
      newOrders,
      reviewedOrders,
      progress: Math.round((initialData.summary.monthlyReceived / initialData.summary.survivalTarget) * 100)
    };
  }, [initialData.summary.monthlyReceived, initialData.summary.survivalTarget, orders]);

  useEffect(() => {
    startTransition(() => setMounted(true));
    const t = setTimeout(() => startTransition(() => setBootDone(true)), 2900);
    return () => clearTimeout(t);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll(".pm-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pm-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [bootDone]);

  useEffect(() => {
    const stream = new EventSource("/api/events/stream");
    const refresh = () => {
      void fetchOrders().then(setOrders).catch(() => undefined);
    };
    stream.onmessage = refresh;
    stream.onerror = () => undefined;
    return () => stream.close();
  }, []);

  const [form, setForm] = useState({
    customerName: "",
    businessName: "",
    email: "",
    phone: "",
    packageName: "Digital Standard",
    serviceType: "Audit",
    budget: "",
    notes: ""
  });

  const selectedTierData = TIER_OPTIONS.find((tier) => tier.id === selectedTier) ?? TIER_OPTIONS[0];

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const pickTier = (tier: (typeof TIER_OPTIONS)[number]) => {
    setSelectedTier(tier.id);
    setForm((current) => ({
      ...current,
      packageName: tier.name,
      serviceType: tier.serviceType
    }));
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "Sovereign X Landing",
          status: "NEW"
        })
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Order submission failed.");
      }

      setForm({
        customerName: "",
        businessName: "",
        email: "",
        phone: "",
        packageName: "Digital Standard",
        serviceType: "Audit",
        budget: "",
        notes: ""
      });
      setSelectedTier(TIER_OPTIONS[0].id);
      setSuccess("Order submitted. It is now flowing into the command center.");
      setOrders(await fetchOrders());
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Order submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const latestOrders = orders.slice(0, 5);

  return (
    <div className="sx-intake" ref={revealRef}>
      {/* ── Boot Splash ── */}
      {!bootDone && (
        <div className="pm-boot">
          <div className="pm-boot-scan" />
          <div className="pm-boot-seal">
            <div className="pm-boot-spinner" />
            SX
          </div>
          <div className="pm-boot-label">Initializing</div>
          <div className="pm-boot-bar" />
        </div>
      )}

      {/* ── Ambient Background Orbs ── */}
      <div className="pm-page-bg" aria-hidden="true">
        <div className="pm-orb pm-orb-neon-blue" />
        <div className="pm-orb pm-orb-neon-amber" />
        <div className="pm-orb pm-orb-neon-purple" />
      </div>

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
            <a href="#hero">Home</a>
            <a href="#services">Services</a>
            <a href="#featured">Featured</a>
            <a href="#intake">Intake</a>
          </div>

          <div className="nav-spacer" />

          <div className="nav-actions">
            <button className="btn btn-quiet" type="button" onClick={toggleTheme}>
              {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
            </button>
          </div>
        </div>
        <div className="pm-nav-glow" aria-hidden="true" />
      </header>

      <main>
        <section className="hero" id="hero">
          {/* floating particles */}
          <div className="pm-particles" aria-hidden="true">
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className="pm-particle"
                style={{ left: p.left, top: p.top, animationDuration: p.duration, animationDelay: p.delay }}
              />
            ))}
          </div>
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="hero-eyebrow pm-animate">
                  <span>Sovereign X Audits</span>
                  <span className="dot">•</span>
                  <span className="gold-tag text-neon-blue border-neon-blue">Digital Superstructure</span>
                  <span className="dot">•</span>
                  <span>BlackFur Capital Group LLC</span>
                </div>
                <h1 className="pm-headline">
                  <span className="accent text-neon-blue">COMMAND YOUR</span> GROWTH OPERATIONALS
                </h1>
                <div className="hero-divider pm-animate bg-neon-blue/20" />
                <p className="hero-sub pm-animate text-slate-300">
                  Deploy a digital superstructure designed for elite operators. Command your pipeline, automate discovery, and scale your influence with the ultimate agency workflow engine.
                </p>
                <div className="hero-ctas pm-animate">
                  <a className="btn btn-primary hover:shadow-neon-blue bg-neon-blue text-slate-950 border-neon-blue" href="#intake">
                    Start Operating <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-ghost hover:text-neon-blue" href="#services">
                    Explore Product Tour
                  </a>
                </div>
                <div className="hero-credentials pm-animate">
                  <span>Live Pipeline Snapshot</span>
                  <span className="sep">•</span>
                  <span>CRM Integration</span>
                  <span className="sep">•</span>
                  <span>AICC Verified</span>
                </div>
              </div>

              <div className="hero-stage pm-animate">
                <div className="hero-stage-grid" />
                <div className="hero-floor" />
                <div className="hero-seal-wrap">{heroSeal()}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="pm-section-glow" aria-hidden="true" />

        <section className="compact">
          <div className="wrap">
            <div className="metrics-grid pm-reveal">
              <div className="metric-card metric-card--blue">
                <div className="metric-label">01 // AUTOMATED DISCOVERY</div>
                <div className="metric-value">2.4x</div>
                <div className="metric-desc">Faster target identification</div>
              </div>
              <div className="metric-card metric-card--amber">
                <div className="metric-label">02 // DEEP AUDITS</div>
                <div className="metric-value">98%</div>
                <div className="metric-desc">Conversion leak detection accuracy</div>
              </div>
              <div className="metric-card metric-card--purple">
                <div className="metric-label">03 // PIPELINE VELOCITY</div>
                <div className="metric-value">+45%</div>
                <div className="metric-desc">Increase in qualified deal flow</div>
              </div>
            </div>
          </div>
        </section>

        <section className="compact mt-24">
          <div className="wrap">
            <div className="sec-head pm-reveal">
              <div className="label text-neon-blue border-neon-blue">Workflow Logic</div>
              <h2 className="text-white">A frictionless pipeline from cold data to closed engagement.</h2>
              <p className="sub text-slate-400">The Agency Superstructure integrates discovery, auditing, and outreach into a single commanding interface.</p>
            </div>

            <div className="pipeline-steps pm-reveal">
              <article className="pipeline-step pipeline-step--blue">
                <div className="num">01</div>
                <h4>Discovery & Intake</h4>
                <p>Target parameters are ingested. The system structures the raw data into actionable prospect profiles.</p>
              </article>
              <article className="pipeline-step pipeline-step--amber">
                <div className="num">02</div>
                <h4>AICC Audit Generation</h4>
                <p>The AI Critic/Creator pipeline analyzes the target, identifying friction points and structural weaknesses.</p>
              </article>
              <article className="pipeline-step pipeline-step--purple">
                <div className="num">03</div>
                <h4>Command Outreach</h4>
                <p>A definitive, executive-ready report is generated alongside tailored outreach copy, ready to dispatch.</p>
              </article>
            </div>
          </div>
        </section>

        <div className="pm-section-glow" aria-hidden="true" />

        <section id="services">
          <div className="wrap">
            <div className="sec-head pm-reveal">
              <div className="label">Service entry points</div>
              <h2>Three ways a client can step into the system.</h2>
              <p className="sub">Each tier is designed to match where a client is in their growth process — from a fast structured review to a premium brand and visibility build.</p>
            </div>

            <div className="services-grid">
              {SERVICE_CARDS.map((card) => (
                <article key={card.title} className="svc-card glass-premium hover:shadow-neon-blue transition-all duration-300">
                  <div className="icon text-neon-blue">{card.icon}</div>
                  <div className="label text-neon-amber">{card.title}</div>
                  <h3 className="text-white">{card.title}</h3>
                  <p className="desc text-dim">{card.desc}</p>
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="text-subtle">{bullet}</li>
                    ))}
                  </ul>
                  <div className="svc-foot">
                    <span className="text-neon-blue font-medium">Ready to order</span>
                    <span className="dim">→</span>
                  </div>
                </article>
              ))}
            </div>


            <div className="sec-head">
              <div className="label">Tier selection</div>
              <h2>Choose the tier that matches the client before the order is submitted.</h2>
              <p className="sub">Select the package that fits the engagement. Your choice carries into the intake form automatically.</p>
            </div>

            <div className="tier-list">
              {TIER_OPTIONS.map((tier) => {
                const isSelected = tier.id === selectedTier;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    className={`tier-card glass-premium transition-all duration-300 ${isSelected ? "selected shadow-neon-amber border-neon-amber" : "hover:shadow-neon-blue"}`}
                    onClick={() => pickTier(tier)}
                  >
                    <div className="tier-body">
                      <div className="tier-top">
                        <h4 className={isSelected ? "text-neon-amber" : ""}>{tier.name}</h4>
                        <StatusTag
                          label={isSelected ? "Selected" : "Available"}
                          tone={isSelected ? (tier.selectedTone as "gold" | "teal" | "green" | "orange" | "red" | "muted") : "muted"}
                        />
                      </div>
                      <div className="price-row">
                        <span className="promo text-neon-blue">{tier.pricePromo}</span>
                        {tier.priceReg ? <span className="reg">{tier.priceReg}</span> : null}
                      </div>
                      <div className="tier-summary">{tier.summary}</div>
                    </div>
                    <div className="tier-tags">
                      {tier.tags.map((tag) => (
                        <span key={tag} className="chip bg-surface border-border text-subtle">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="compact" id="featured">
          <div className="wrap">
            <a className="snippet-card glass-premium hover:shadow-neon-purple transition-all duration-300" href="#intake">
              <div className="snippet-grid">
                <div className="snippet-body">
                  <span className="label aicc-stamp text-neon-purple border-neon-purple">Featured intake</span>
                  <h2 className="snippet-title text-white">A premium intake experience that feels like an executive brief.</h2>
                  <p className="snippet-desc text-subtle">
                    The page keeps the black-and-gold editorial language from the original design while turning the order flow into a clear client-facing conversion path.
                  </p>
                  <div className="snippet-badges">
                    <span className="aicc-stamp border-neon-blue text-neon-blue">AICC Verified</span>
                    <span className="stamp">Intake → Order queue</span>
                    <span className="stamp">Light / Dark mode</span>
                  </div>
                  <div className="snippet-cta-wrap">
                    <span className="btn btn-primary hover:shadow-neon-blue">
                      Start Intake <span className="arrow">→</span>
                    </span>
                    <p className="snippet-note">
                      Orders flow straight into the command center with a live event, a queue item, and a visible status card.
                    </p>
                  </div>
                </div>

                <div className="snippet-preview">
                  <div className="snippet-preview-doc">
                    <div className="doc-head">
                      <div className="doc-badge">SX</div>
                      <div>
                        <div className="doc-eyebrow">Preview document</div>
                        <div className="doc-title">Three things the audit surfaces immediately</div>
                      </div>
                    </div>
                    {FINDINGS.map((finding) => (
                      <div key={finding.id} className="doc-finding">
                        <div className="doc-num">{finding.id}</div>
                        <div>
                          <div className="doc-finding-label">{finding.label}</div>
                          <div className="doc-finding-amount">{finding.amount}</div>
                          <div className="mono-subtle" style={{ marginTop: 4, lineHeight: 1.6 }}>
                            {finding.detail}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="doc-foot">
                      <span>Delivered within the command system</span>
                      <span>{initialData.summary.month} intake view</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>


        <section className="aicc-block">
          <div className="wrap">
            <div className="sec-head aicc-head">
              <div className="label">AICC method</div>
              <h2>
                Generated, critiqued, verified, refined, and specialized through the <span className="accent">AICC</span> workflow.
              </h2>
              <p className="sub">Each output passes through a five-stage refinement cycle before it reaches the operator. Defensible analysis, not just fast generation.</p>
            </div>

            <div className="aicc-flow">
              {AICC_STEPS.map((step) => (
                <article key={step.num} className="aicc-step">
                  <div className="num">{step.num}</div>
                  <div className="icon-circle">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compact">
          <div className="wrap">
            <div className="sec-head">
              <div className="label">Process</div>
              <h2>What happens after the client clicks submit.</h2>
              <p className="sub">From the first form field to the final delivered brief — every step is sequenced, logged, and visible in the command center.</p>
            </div>

            <div className="process-grid">
              {PROCESS_STEPS.map((step) => (
                <article key={step.num} className="process-step">
                  <div className="num">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compact">
          <div className="wrap">
            <div className="sec-head">
              <div className="label">Pricing</div>
              <h2>Transparent pricing. No discovery calls required.</h2>
              <p className="sub">Every tier is structured for operator use, with referral-ready pricing for bulk and follow-up engagements.</p>
            </div>

            <div className="pricing-block">
              {PRICING_BLOCKS.map((block) => (
                <article key={block.title} className="pricing-card">
                  <h3>{block.title}</h3>
                  {block.rows.map((row) => (
                    <div key={row.name} className="pricing-row">
                      <div className="name">{row.name}</div>
                      <div className="promo">{row.promo}</div>
                      <div className="reg">{row.reg || ""}</div>
                    </div>
                  ))}
                </article>
              ))}

              <article className="referral-card">
                <h3>Referrals</h3>
                {REFERRALS.map((ref) => (
                  <div key={ref.name} className="pricing-row">
                    <div className="name">{ref.name}</div>
                    <div className="promo">{ref.note}</div>
                    <div className="reg" />
                  </div>
                ))}
                <div className="promo-notice">
                  <div className="label">Promo notice</div>
                  <div className="text">
                    <p>Promo resets monthly. Orders to the command center should feel like a controlled intake, not a loose contact form.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="wrap">
            <h2>When the brief feels right, send the order and let the system do the rest.</h2>
            <p className="sub">
              The client gets a premium intake experience, and the operator gets a structured queue item with the right package already selected.
            </p>
            <div className="confirm-actions">
              <a className="btn btn-primary" href="#intake">
                Submit Intake <span className="arrow">→</span>
              </a>
              <Link className="btn btn-ghost" href="/login">
                Client Login
              </Link>
            </div>
            <div className="small">
              <span>Command queue</span>
              <span className="sep">•</span>
              <span>AICC verified</span>
              <span className="sep">•</span>
              <span>Light / dark mode</span>
            </div>
          </div>
        </section>

        <section className="compact" id="intake">
          <div className="wrap">
            <div className="order-layout order-layout--solo">
              <div className="order-summary">
                <div className="confirm-stage">
                  <div className="confirm-check">⌁</div>
                  <h1>Start your audit</h1>
                  <div className="summary">
                    Fill out the form below and your team will be in touch within <span className="gold">24 hours</span> to confirm your engagement and next steps.
                  </div>
                </div>

                <form className="order-form" onSubmit={submitOrder}>
                  <div className="intake-form-grid">
                    <input className="field" placeholder="Client name *" value={form.customerName} onChange={(event) => updateField("customerName", event.target.value)} required />
                    <input className="field" placeholder="Business name *" value={form.businessName} onChange={(event) => updateField("businessName", event.target.value)} required />
                    <input className="field" placeholder="Email *" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
                    <input className="field" placeholder="Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
                    <select
                      className="field"
                      value={form.packageName}
                      onChange={(event) => {
                        const packageName = event.target.value;
                        updateField("packageName", packageName);
                        const matchedTier = TIER_OPTIONS.find((tier) => tier.name === packageName);
                        if (matchedTier) {
                          setSelectedTier(matchedTier.id);
                          updateField("serviceType", matchedTier.serviceType);
                        }
                      }}
                    >
                      <option>Digital Standard</option>
                      <option>Digital Deep</option>
                      <option>X Image Audit</option>
                      <option>Voice Agent</option>
                    </select>
                    <input className="field" placeholder="Service type" value={form.serviceType} onChange={(event) => updateField("serviceType", event.target.value)} />
                    <input className="field" placeholder="Budget / target value" value={form.budget} onChange={(event) => updateField("budget", event.target.value)} />
                    <textarea
                      className="field field-textarea"
                      placeholder="Notes, goals, timeline, or anything the operator should know"
                      value={form.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      rows={5}
                    />
                  </div>

                  <div className="intake-form-actions">
                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                      {submitting ? "Sending…" : "Submit Order"} <span className="arrow">→</span>
                    </button>
                    <div className="confirm-foot">Your information is kept confidential and used solely to scope your engagement.</div>
                  </div>
                </form>

                {error ? <div className="intake-message intake-message-error">{error}</div> : null}
                {success ? <div className="intake-message intake-message-success">{success}</div> : null}
              </div>

            </div>
          </div>
        </section>

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
                <Link href="#services">Services</Link>
                <Link href="#intake">Intake</Link>
              </div>
              <div className="footer-col">
                <h5>Support</h5>
                <p>Orders flow into the command center automatically. Light and dark mode are both supported.</p>
                <p>Promo resets monthly. All submissions stay visible to the operator in the shared queue.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Sovereign X Audits</span>
              <span>
                <a href="#hero">Top</a>
                <a href="#intake">Intake</a>
                <Link href="/login" className="footer-admin-link">Admin</Link>
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function IntakeClient({ initialData }: { initialData: DashboardPayload }) {
  return (
    <ThemeProvider>
      <IntakeInner initialData={initialData} />
    </ThemeProvider>
  );
}
