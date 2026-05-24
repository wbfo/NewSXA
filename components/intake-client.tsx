"use client";

import { useEffect, useMemo, useRef, useState, startTransition, type FormEvent } from "react";
import Link from "next/link";
import type { DashboardPayload, ClientOrder } from "@/lib/domain/types";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { formatDisplayTime } from "@/lib/utils/time";
import { ThreeDocumentCarousel } from "@/components/three-document-carousel";
const SERVICE_CARDS = [
  {
    title: "Sovereign X Digital Audit — Standard",
    icon: "◈",
    desc: "A clean, structured review of the website, conversion friction, and quick wins.",
    bullets: ["Website & content review", "Conversion leaks", "Clear next-step brief"]
  },
  {
    title: "Sovereign X Digital Audit — Deep",
    icon: "✦",
    desc: "A more detailed audit with technical notes, competitive context, and revenue impact.",
    bullets: ["Technical analysis", "Competitive context", "ROI-facing findings"]
  },
  {
    title: "Sovereign X Image Audit",
    icon: "◎",
    desc: "A premium brand and public-presence review for professionals and creators.",
    bullets: ["Personal brand review", "Public presence audit", "Image alignment"]
  },
  {
    title: "Sovereign X Voice Agent",
    icon: "⌁",
    desc: "A deployed voice intake layer for missed calls, booking flow, and client routing.",
    bullets: ["Voice persona", "Calendar + CRM integration", "Monthly management"]
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
    id: "Sovereign X Digital Audit — Standard",
    name: "Sovereign X Digital Audit — Standard",
    serviceType: "Digital Audit",
    pricePromo: "$500 promo",
    priceReg: "$750 regular",
    summary: "Fast, clear, and easy to submit.",
    tags: ["Website review", "Conversion leaks", "Quick wins"],
    selectedTone: "neon-blue"
  },
  {
    id: "Sovereign X Digital Audit — Deep",
    name: "Sovereign X Digital Audit — Deep",
    serviceType: "Deep Digital Audit",
    pricePromo: "$1,500 promo",
    priceReg: "$2,000 regular",
    summary: "More detail, more signal, more confidence.",
    tags: ["Technical analysis", "Competitive context", "ROI-facing findings"],
    selectedTone: "neon-amber"
  },
  {
    id: "Sovereign X Image Audit",
    name: "Sovereign X Image Audit",
    serviceType: "Image Audit",
    pricePromo: "$350 promo",
    priceReg: "$500 regular",
    summary: "Premium brand presentation for public-facing clients.",
    tags: ["Personal brand", "Public presence", "Image alignment"],
    selectedTone: "neon-purple"
  },
  {
    id: "Sovereign X Voice Agent",
    name: "Sovereign X Voice Agent",
    serviceType: "Voice Agent",
    pricePromo: "$1,500+ setup",
    priceReg: "monthly management",
    summary: "Call intake, booking, and after-hours coverage.",
    tags: ["ElevenLabs", "CRM integration", "Analytics dashboard"],
    selectedTone: "neon-blue"
  },
  {
    id: "Sovereign X Growth Blueprint",
    name: "Sovereign X Growth Blueprint",
    serviceType: "Growth Blueprint",
    pricePromo: "$250 promo",
    priceReg: "$350 regular",
    summary: "90-day implementation roadmap built from your audit findings.",
    note: "Available after any completed Sovereign X audit.",
    tags: ["90-day roadmap", "Audit-specific", "Growth phases"],
    selectedTone: "neon-purple"
  }
];

const AICC_STEPS = [
  {
    num: "01",
    icon: "◈",
    title: "Generator",
    text: "Pulls every available signal about your business, brand, or image from across the web."
  },
  {
    num: "02",
    icon: "◉",
    title: "Critic",
    text: "Challenges every finding. If it's not defensible with real data, it doesn't make it into your report."
  },
  {
    num: "03",
    icon: "✦",
    title: "Verifier",
    text: "Cross-references findings across multiple sources. Confirmed, directional, or pending — every finding is labeled honestly."
  },
  {
    num: "04",
    icon: "◎",
    title: "Refiner",
    text: "Converts raw findings into clear dollar figures and specific recommendations you can act on immediately."
  },
  {
    num: "05",
    icon: "⬡",
    title: "Specialist",
    text: "Adds the industry context that makes the findings specific to your world — not generic advice that fits everyone."
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Inquiry lands",
    text: "You tell us who you are and what you need. We take it from there."
  },
  {
    num: "02",
    title: "Brief is shaped",
    text: "Every finding goes through a five-stage verification process. Nothing reaches you unless it's defensible."
  },
  {
    num: "03",
    title: "Command center updates",
    text: "Your audit lands in Google Drive. Clear findings. Dollar figures. A roadmap you can act on today."
  },
  {
    num: "04",
    title: "Delivery begins",
    text: "The order moves into review, follow-up, and completion without the client needing to resend anything."
  }
];

const PLATFORM_OPTIONS = ["Instagram", "TikTok", "LinkedIn", "YouTube", "X / Twitter", "Website", "Press / Media"];

const EMPTY_FORM = {
  customerName: "",
  businessName: "",
  email: "",
  phone: "",
  packageName: "Sovereign X Digital Audit — Standard",
  serviceType: "Digital Audit",
  budget: "",
  hearAbout: "",
  websiteUrl: "",
  industry: "",
  cityState: "",
  locations: "",
  biggestChallenge: "",
  aiImplementation: "",
  deadlines: "",
  gender: "",
  ageRange: "",
  height: "",
  weight: "",
  instagram: "",
  tiktok: "",
  linkedin: "",
  youtube: "",
  twitter: "",
  otherPlatform: "",
  importantPlatforms: [] as string[],
  imageCommunication: "",
  imageConcerns: "",
  imageEvents: "",
  styleAdmire: "",
  desiredEnergy: "",
  wardrobeBudget: "",
  photographyInterest: "",
  wardrobeBlueprintInterest: "",
  industryField: "",
  role: "",
  socialInstagram: "",
  socialLinkedin: "",
  socialFacebook: "",
  socialOther: "",
  monthlyCallVolume: "",
  afterHoursVoicemail: "",
  onlineBooking: "",
  averageTransactionValue: "",
  phoneChallenges: "",
  notes: ""
};

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const frames = 112;
    const timer = setInterval(() => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / frames, 3);
      setCount(Math.min(target, Math.floor(target * eased)));
      if (frame >= frames) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

type PricingRow = { name: string; promo: string; reg?: string; comingSoon?: boolean; rowNote?: string };
const PRICING_BLOCKS: { title: string; rows: PricingRow[]; blockNote?: string }[] = [
  {
    title: "Sovereign X Digital Audits",
    rows: [
      { name: "Sovereign X Digital Audit — Standard", promo: "$500 promo", reg: "$750 regular" },
      { name: "Sovereign X Digital Audit — Deep", promo: "$1,500 promo", reg: "$2,000 regular" },
      { name: "Sovereign X Digital Audit — Deep + Intake", promo: "$2,000 promo", reg: "$2,500 regular" },
      { name: "Individual / Personal Brand", promo: "$500 promo", reg: "$750 regular" },
      { name: "Bulk 3–4 individuals", promo: "$350/ea" },
      { name: "Bulk 5–9 individuals", promo: "$300/ea" },
      { name: "Enterprise per location", promo: "$200/location", reg: "+ $2,000 brand audit" }
    ]
  },
  {
    title: "Sovereign X Image Audit",
    rows: [
      { name: "Standard", promo: "$350 promo", reg: "$500 regular" },
      { name: "Public Figure Tier", promo: "$750 promo", reg: "$1,000 regular" },
      { name: "Sovereign X Attraction Audit", promo: "", comingSoon: true },
      { name: "Sovereign X Image Audit — Follow-Up", promo: "$350" },
      { name: "Sovereign X Wardrobe Blueprint", promo: "", comingSoon: true }
    ]
  },
  {
    title: "Sovereign X Strategy — Post-Audit Add-Ons",
    rows: [
      { name: "Sovereign X Growth Blueprint", promo: "$250 promo", reg: "$350 regular", rowNote: "Available after any completed audit" },
      { name: "Sovereign X Content Calendar", promo: "$200", rowNote: "Included in Deep Audit" }
    ],
    blockNote: "Strategy add-ons are available after any completed Sovereign X audit. Not sold standalone."
  },
  {
    title: "Sovereign X Voice Agent",
    rows: [
      { name: "Starter", promo: "$1,500 setup + $200/mo" },
      { name: "Standard", promo: "$2,500 setup + $350/mo" },
      { name: "Advanced", promo: "$4,000–$5,000 setup + $500/mo" },
      { name: "Enterprise", promo: "Custom + custom retainer" },
      { name: "Sovereign X Website", promo: "$500–$1,500 one-time build", reg: "$150–$200/mo retainer", rowNote: "Complexity-dependent. Quoted per project." }
    ]
  }
];

// Referrals are rendered inline below

const TESTIMONIALS = [
  {
    quote: "I had no idea my website was turning away customers. The audit showed me exactly where — and we fixed it within a week. Fully worth it.",
    name: "Marcus T.",
    title: "Restaurant Owner",
    tier: "Sovereign X Digital Audit — Standard"
  },
  {
    quote: "My online presence looked professional to me, but the Sovereign X Image Audit showed gaps I couldn't see myself. The findings were specific and actionable.",
    name: "Danielle R.",
    title: "Licensed Esthetician & Brand Builder",
    tier: "Sovereign X Image Audit"
  },
  {
    quote: "The Deep Audit gave us a competitive breakdown I didn't expect at this price point. We used the findings to rebuild our entire intake flow.",
    name: "James O.",
    title: "Med Spa Founder",
    tier: "Sovereign X Digital Audit — Deep"
  }
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

type StatusTone = Parameters<typeof StatusTag>[0]["tone"];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState<ClientOrder[]>(initialData.orders);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTier, setSelectedTier] = useState(TIER_OPTIONS[0].id);
  const [heroBgY, setHeroBgY] = useState(0);
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
  }, []);

  useEffect(() => {
    const update = () => setHeroBgY(Math.min(180, window.scrollY * 0.3));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
  }, [mounted]);

  useEffect(() => {
    const stream = new EventSource("/api/events/stream");
    const refresh = () => {
      void fetchOrders().then(setOrders).catch(() => undefined);
    };
    stream.onmessage = refresh;
    stream.onerror = () => undefined;
    return () => stream.close();
  }, []);

  const [form, setForm] = useState(EMPTY_FORM);

  const isDigitalAudit = form.serviceType === "Digital Audit" || form.serviceType === "Deep Digital Audit";
  const isImageAudit = form.serviceType === "Image Audit";
  const isVoiceAgent = form.serviceType === "Voice Agent";

  const updateField = (field: keyof typeof form, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const togglePlatform = (platform: string) => {
    setForm((current) => ({
      ...current,
      importantPlatforms: current.importantPlatforms.includes(platform)
        ? current.importantPlatforms.filter((item) => item !== platform)
        : [...current.importantPlatforms, platform]
    }));
  };

  const pickTier = (tier: (typeof TIER_OPTIONS)[number]) => {
    setSelectedTier(tier.id);
    setForm((current) => ({
      ...current,
      packageName: tier.name,
      serviceType: tier.serviceType
    }));
  };

  const buildExpandedNotes = () => {
    const sections = [
      `How heard about us: ${form.hearAbout || "Not provided"}`,
      form.notes ? `General notes: ${form.notes}` : "",
    ];

    if (isDigitalAudit) {
      sections.push([
        "SOVEREIGN X DIGITAL AUDIT INTAKE",
        `Website URL: ${form.websiteUrl}`,
        `Industry / field: ${form.industry}`,
        `City and state: ${form.cityState}`,
        `Number of locations: ${form.locations}`,
        `Biggest current challenge: ${form.biggestChallenge}`,
        `Considering AI implementation: ${form.aiImplementation}`,
        `Upcoming deadlines/events: ${form.deadlines || "None provided"}`
      ].join("\n"));
    }

    if (isImageAudit) {
      sections.push([
        "SOVEREIGN X IMAGE AUDIT INTAKE",
        `Gender: ${form.gender}`,
        `Age range: ${form.ageRange}`,
        `Height: ${form.height}`,
        `Weight: ${form.weight}`,
        `Instagram: ${form.instagram || "Not provided"}`,
        `TikTok: ${form.tiktok || "Not provided"}`,
        `LinkedIn: ${form.linkedin || "Not provided"}`,
        `YouTube: ${form.youtube || "Not provided"}`,
        `X / Twitter: ${form.twitter || "Not provided"}`,
        `Other platform: ${form.otherPlatform || "Not provided"}`,
        `Most important platforms: ${form.importantPlatforms.join(", ") || "Not provided"}`,
        `Image should communicate: ${form.imageCommunication}`,
        `Current image concerns: ${form.imageConcerns}`,
        `Upcoming events/shoots: ${form.imageEvents || "None provided"}`,
        `Style references: ${form.styleAdmire || "Not provided"}`,
        `Desired energy: ${form.desiredEnergy || "Not provided"}`,
        `Wardrobe budget: ${form.wardrobeBudget || "Not provided"}`,
        `Photography session interest: ${form.photographyInterest || "Not provided"}`,
        `Wardrobe Blueprint interest: ${form.wardrobeBlueprintInterest || "Not provided"}`,
        "Photo submission notice shown: Google Drive upload link after payment confirmation."
      ].join("\n"));
    }

    if (isVoiceAgent) {
      sections.push([
        "VOICE AGENT INTAKE",
        `Website URL: ${form.websiteUrl}`,
        `Industry: ${form.industry}`,
        `Approx monthly call volume: ${form.monthlyCallVolume || "Not provided"}`,
        `Calls go to voicemail after hours: ${form.afterHoursVoicemail || "Not provided"}`,
        `Online booking system: ${form.onlineBooking || "Not provided"}`,
        `Average transaction value: ${form.averageTransactionValue || "Not provided"}`,
        `Phone intake challenges: ${form.phoneChallenges || "Not provided"}`
      ].join("\n"));
    }

    return sections.filter(Boolean).join("\n\n");
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          businessName: form.businessName || form.customerName,
          email: form.email,
          phone: form.phone,
          packageName: form.packageName,
          serviceType: form.serviceType,
          budget: form.budget || form.wardrobeBudget || form.averageTransactionValue,
          notes: buildExpandedNotes(),
          source: "Sovereign X Landing",
        })
      });
      const body = (await response.json()) as { url?: string; error?: string };
      if (!response.ok) throw new Error(body.error ?? "Order submission failed.");
      if (body.url) {
        window.location.href = body.url;
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Order submission failed.");
      setSubmitting(false);
    }
  };

  const latestOrders = orders.slice(0, 5);

  return (
    <div className="sx-intake" ref={revealRef}>
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
            <a href="/samples">Sample Reports</a>
            <a href="#featured">Featured</a>
            <a href="#intake">Intake</a>
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
            <a href="#hero"     onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="/samples"   onClick={() => setMenuOpen(false)}>Sample Reports</a>
            <a href="#featured" onClick={() => setMenuOpen(false)}>Featured</a>
            <a href="#intake"   onClick={() => setMenuOpen(false)}>Intake</a>
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

      <main>
        <section className="hero" id="hero">
          <div className="hero-dot-grid" style={{ transform: `translateY(${heroBgY}px)` }} aria-hidden="true" />
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
            <div className="hero-content">
              <div className="hero-eyebrow pm-animate mb-6">
                <div className="hero-eyebrow-track">
                  <span>Sovereign X Audits</span>
                  <span className="dot">•</span>
                  <span>BlackFur Capital Group LLC</span>
                </div>
                <div className="hero-eyebrow-track" aria-hidden="true">
                  <span>Sovereign X Audits</span>
                  <span className="dot">•</span>
                  <span>BlackFur Capital Group LLC</span>
                </div>
              </div>
              <h1 className="pm-headline">
                YOUR PRESENCE IS TELLING A STORY.
                <span className="pm-headline-break">IS IT THE RIGHT ONE?</span>
              </h1>
              <div className="hero-divider pm-animate bg-neon-blue/20" />
              <p className="hero-sub pm-animate text-slate-300">
                We audit your business, your brand, and your image — and show you exactly what it&apos;s costing you. No waiting weeks.
              </p>

              <div className="hero-ctas pm-animate" style={{ marginTop: "32px" }}>
                <a className="btn btn-primary cta-primary hover:shadow-neon-blue bg-neon-blue text-slate-950 border-neon-blue" href="#intake">
                  Start the Audit <span className="arrow">→</span>
                </a>
                <a className="btn btn-ghost hover:text-neon-blue" href="#services">
                  See What We Audit <span className="arrow">↓</span>
                </a>
              </div>

              <div className="hero-credentials pm-animate">
                <span>Digital Intelligence</span>
                <span className="sep">·</span>
                <span>AICC Verified</span>
              </div>
            </div>
          </div>
        </section>

        <div className="pm-section-glow" aria-hidden="true" />




        {/* ── HOW IT WORKS Section ── */}
        <section id="how-it-works" style={{ padding: "16px 0 0" }}>
          <div className="wrap">
            {/* ── 3-Node System Flow ── */}
            <div className="sx-system-flow pm-reveal">
              <div className="sx-system-node">
                <div className="sx-system-node-num">01</div>
                <div className="sx-system-node-label">THE AUDIT</div>
                <p className="sx-system-node-text">We diagnose your digital infrastructure, brand presence, and revenue leaks.</p>
              </div>
              <div className="sx-system-arrow" aria-hidden="true">→</div>
              <div className="sx-system-node">
                <div className="sx-system-node-num">02</div>
                <div className="sx-system-node-label">THE FINDINGS</div>
                <p className="sx-system-node-text">You receive a verified intelligence report with dollar figures and a priority sequence.</p>
              </div>
              <div className="sx-system-arrow" aria-hidden="true">→</div>
              <div className="sx-system-node">
                <div className="sx-system-node-num">03</div>
                <div className="sx-system-node-label">THE FIX</div>
                <p className="sx-system-node-text">We implement only what the audit prescribes — voice agents, image alignment, web fixes, or local SEO recovery.</p>
              </div>
            </div>

            {/* ── Philosophy Sentence ── */}
            <div className="sx-hero-philosophy pm-reveal">
              <p>We don&apos;t pitch services. We run diagnostics.<br />
              If the audit finds nothing, you pay for the truth.<br />
              If it finds leaks, you decide which ones we fix.</p>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="wrap">

            {/* ── Section Header ── */}
            <div className="sec-head pm-reveal">
              <div className="label" style={{ color: "var(--gold)", letterSpacing: "4px" }}>THE SYSTEM</div>
              <h2>The audit is always the entry point.<br />Everything else is prescribed by what it finds.</h2>
            </div>

            {/* ── PHASE 1 — DIAGNOSIS ── */}
            <div className="sx-phase-block sx-phase-1 pm-reveal">
              <div className="sx-phase-header">
                <div className="sx-phase-label">PHASE 1 — DIAGNOSIS</div>
                <div className="sx-phase-subtext">The only way in.</div>
              </div>
              <div className="services-grid">
                <article className="svc-card glass-premium hover:shadow-neon-blue transition-all duration-300">
                  <div className="icon text-neon-blue">◈</div>
                  <div className="label text-neon-amber">Standard</div>
                  <h3 className="text-white">Sovereign X Digital Audit — Standard</h3>
                  <p className="desc text-dim">A clean, structured review of the website, conversion friction, and quick wins.</p>
                  <ul>
                    <li className="text-subtle">Website &amp; content review</li>
                    <li className="text-subtle">Conversion leaks identified</li>
                    <li className="text-subtle">Clear next-step brief</li>
                  </ul>
                  <div className="svc-foot">
                    <a href="#intake" style={{ color: "var(--neon-blue)", textDecoration: "none", fontWeight: "500" }}>Start This Audit →</a>
                  </div>
                </article>
                <article className="svc-card glass-premium hover:shadow-neon-blue transition-all duration-300">
                  <div className="icon text-neon-blue">✦</div>
                  <div className="label text-neon-amber">Deep</div>
                  <h3 className="text-white">Sovereign X Digital Audit — Deep</h3>
                  <p className="desc text-dim">A more detailed audit with technical notes, competitive context, and revenue impact.</p>
                  <ul>
                    <li className="text-subtle">Technical analysis</li>
                    <li className="text-subtle">Competitive context</li>
                    <li className="text-subtle">ROI-facing findings</li>
                  </ul>
                  <div className="svc-foot">
                    <a href="#intake" style={{ color: "var(--neon-blue)", textDecoration: "none", fontWeight: "500" }}>Start This Audit →</a>
                  </div>
                </article>
                <article className="svc-card glass-premium hover:shadow-neon-blue transition-all duration-300">
                  <div className="icon text-neon-blue">◎</div>
                  <div className="label text-neon-amber">Enterprise</div>
                  <h3 className="text-white">Sovereign X Digital Audit — Enterprise</h3>
                  <p className="desc text-dim">Multi-location brand audit with full competitive landscape and enterprise revenue mapping.</p>
                  <ul>
                    <li className="text-subtle">Per-location analysis</li>
                    <li className="text-subtle">Full brand-wide audit</li>
                    <li className="text-subtle">Enterprise roadmap</li>
                  </ul>
                  <div className="svc-foot">
                    <a href="#intake" style={{ color: "var(--neon-blue)", textDecoration: "none", fontWeight: "500" }}>Start This Audit →</a>
                  </div>
                </article>
              </div>
            </div>

            {/* ── PHASE 2 — IMPLEMENTATION ── */}
            <div className="sx-phase-block sx-phase-2 pm-reveal">
              <div className="sx-phase-header">
                <div className="sx-phase-label" style={{ color: "var(--subtle)" }}>PHASE 2 — IMPLEMENTATION</div>
                <div className="sx-phase-subtext" style={{ color: "var(--subtle)" }}>Unlocks after audit delivery. Prescribed by findings.</div>
              </div>
              <div className="sx-phase-gate-note">
                We don&apos;t sell solutions before we diagnose the problem. Every Phase 2 service is deployed based on what your audit finds.
              </div>
              <div className="sx-phase2-grid">
                <article className="sx-phase2-card">
                  <div className="sx-phase2-label">Revenue Recovery</div>
                  <p className="sx-phase2-desc">Digital infrastructure fixes, local SEO recovery, website builds, conversion optimization.</p>
                  <a href="#intake" className="sx-phase2-cta">Find out if you need this → Start your audit</a>
                </article>
                <article className="sx-phase2-card">
                  <div className="sx-phase2-label">Image Alignment</div>
                  <p className="sx-phase2-desc">Sovereign X Image Audit, personal brand alignment, photography readiness, presence coaching.</p>
                  <a href="#intake" className="sx-phase2-cta">Find out if you need this → Start your audit</a>
                </article>
                <article className="sx-phase2-card">
                  <div className="sx-phase2-label">Voice Agent &amp; Systems</div>
                  <p className="sx-phase2-desc">AI voice agent deployment, after-hours lead capture, CRM integration, calendar automation.</p>
                  <a href="#intake" className="sx-phase2-cta">Find out if you need this → Start your audit</a>
                </article>
                <article className="sx-phase2-card">
                  <div className="sx-phase2-label">Strategy &amp; Growth</div>
                  <p className="sx-phase2-desc">Sovereign X Growth Blueprint, Content Calendar, 90-day implementation roadmap.</p>
                  <a href="#intake" className="sx-phase2-cta">Find out if you need this → Start your audit</a>
                </article>
              </div>
            </div>


          </div>
        </section>

        <section className="aicc-block section-diagonal">
          <div className="wrap">
            <div className="sec-head aicc-head">
              <div className="label">AICC method</div>
              <h2>
                Generated, critiqued, verified, refined, and specialized through the <span className="accent">AICC</span> workflow.
              </h2>
              <a className="aicc-cross-link" href="https://aicouncilconductor.com" target="_blank" rel="noreferrer">
                Powered by the AI Council Conductor methodology →
              </a>
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



        <section className="white-section" id="deliverables">
          <div className="wrap">
            <div className="white-section-head">
              <div className="label">What Gets Delivered</div>
              <h2>Seven deliverables. One delivery.</h2>
            </div>
            <div className="deliverables-grid">
              {[
                {
                  title: "Sovereign X Digital Audit",
                  items: [
                    "21-section written report",
                    "Technical performance scores",
                    "Revenue leak analysis with dollar figures",
                    "AI Readiness & Voice Agent assessment",
                    "Impact Matrix",
                    "Fix-It Checklist",
                    "Delivered within 48–72 hours"
                  ]
                },
                {
                  title: "Sovereign X Image Audit",
                  items: [
                    "18-section written report",
                    "Personal Color Analysis Card",
                    "Hairstyle Analysis Card",
                    "Outfit Analysis Card",
                    "Grooming Guide (Men) / Makeup Guide (Women)",
                    "Scent Profile Card",
                    "Quick Reference Card"
                  ]
                },
                {
                  title: "Sovereign X Voice Agent",
                  items: [
                    "Conversation flow design",
                    "Voice persona configuration",
                    "ElevenLabs deployment",
                    "Calendar + CRM integration",
                    "Branded client portal",
                    "Monthly management",
                    "Usage analytics dashboard"
                  ]
                }
              ].map((column) => (
                <article key={column.title} className="deliverable-column">
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => <li key={item}>✦ {item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <a className="btn white-cta" href="#intake">Start Your Audit <span className="arrow">→</span></a>
          </div>
        </section>

        {/* ── Snippet Parallax — What Lands in Your Drive ── */}
        <section className="compact" id="samples" style={{ paddingBottom: "0" }}>
          <div className="wrap">
            <ThreeDocumentCarousel />
          </div>
        </section>

        <section className="compact section-diagonal">
          <div className="wrap">


            <div className="metrics-grid pm-reveal">
              <div className="metric-card metric-card--blue">
                <div className="metric-label">01 // DELIVERY</div>
                <div className="metric-value">48–72 hrs</div>
                <div className="metric-desc">Audit turnaround — no waiting weeks for a report</div>
              </div>
              <div className="metric-card metric-card--amber">
                <div className="metric-label">02 // REVENUE IMPACT</div>
                <div className="metric-value">$500–$2K</div>
                <div className="metric-desc">Monthly revenue leaked by the average audited business</div>
              </div>
              <div className="metric-card metric-card--purple">
                <div className="metric-label">03 // COVERAGE</div>
                <div className="metric-value">21 sections</div>
                <div className="metric-desc">Every audit covers 21 diagnostic areas across your digital presence</div>
              </div>
            </div>
          </div>
        </section>

        <section className="compact">
          <div className="wrap">
            <div className="sec-head">
              <div className="label">Pricing</div>
              <h2>Transparent pricing. No discovery calls required.</h2>
              <p className="sub">Phase 1 is always the entry point. Phase 2 is quoted after findings are delivered.</p>
            </div>

            <div className="sx-pricing-two-col">
              {/* Column 1 — Phase 1: Diagnosis */}
              <div className="sx-pricing-col sx-pricing-col-1">
                <div className="sx-pricing-col-header">
                  <div className="sx-pricing-col-phase">Phase 1 — Diagnosis</div>
                  <div className="sx-pricing-col-sub">Start here. Always.</div>
                </div>
                <PricingAccordionRow 
                  name="Sovereign X Digital Audit — Standard" 
                  promo="$500 promo" 
                  reg="$750 regular" 
                  description="A comprehensive 21-section analysis covering your domain authority, technical SEO, brand visibility, and core digital assets to identify major revenue leaks."
                />
                <PricingAccordionRow 
                  name="Sovereign X Digital Audit — Deep" 
                  promo="$1,500 promo" 
                  reg="$2,000 regular" 
                  description="Everything in Standard plus competitive context, prioritized impact matrix, and AI workforce readiness to prepare your operations for automation."
                />
                <PricingAccordionRow 
                  name="Sovereign X Digital Audit — Deep + Intake" 
                  promo="$2,000 promo" 
                  reg="$2,500 regular" 
                  description="Includes the Deep Audit and a complete restructuring of your client intake process to maximize conversion rates and operational efficiency."
                />
                <PricingAccordionRow 
                  name="Sovereign X Image Audit — Standard" 
                  promo="$350 promo" 
                  reg="$500 regular" 
                  description="A meticulous review of your public brand image, aesthetic consistency, and content messaging across all active social and professional channels."
                />
                <PricingAccordionRow 
                  name="Sovereign X Image Audit — Public Figure" 
                  promo="$750 promo" 
                  reg="$1,000 regular" 
                  description="An exhaustive multi-platform audit designed for high-profile individuals, focusing on reputation management, PR vulnerability, and premium brand positioning."
                />
                <div style={{ marginTop: "24px" }}>
                  <a href="#intake" className="btn btn-primary" style={{ display: "inline-block" }}>
                    Start the Audit <span className="arrow">→</span>
                  </a>
                </div>
              </div>

              {/* Column 2 — Phase 2: Post-Audit */}
              <div className="sx-pricing-col sx-pricing-col-2">
                <div className="sx-pricing-col-header">
                  <div className="sx-pricing-col-phase" style={{ color: "var(--subtle)" }}>Phase 2 — Post-Audit</div>
                  <div className="sx-pricing-col-sub" style={{ color: "var(--subtle)" }}>Quoted after findings. Requires completed audit.</div>
                </div>
                <PricingAccordionRow 
                  name="Sovereign X Growth Blueprint" 
                  promo="$250 promo" 
                  reg="$350 regular" 
                  description="A customized, step-by-step strategic roadmap to systematically implement all audit findings and optimize your digital presence for maximum revenue growth."
                />
                <PricingAccordionRow 
                  name="Sovereign X Content Calendar" 
                  promo="$200" 
                  reg="Included in Deep" 
                  description="A fully mapped out content strategy and scheduling matrix tailored to your brand voice, designed to maximize engagement and audience retention."
                />
                <PricingAccordionRow 
                  name="Voice Agent — Starter" 
                  promo="$1,500 setup" 
                  reg="+ $200/mo" 
                  description="Implementation of a basic AI voice agent for your business to handle fundamental customer inquiries, appointment setting, and basic routing."
                />
                <PricingAccordionRow 
                  name="Voice Agent — Standard" 
                  promo="$2,500 setup" 
                  reg="+ $350/mo" 
                  description="A sophisticated AI voice agent with custom knowledge base integration, capable of handling complex customer service scenarios and detailed product inquiries."
                />
                <PricingAccordionRow 
                  name="Voice Agent — Advanced" 
                  promo="$4,000–$5,000" 
                  reg="+ $500/mo" 
                  description="Our most powerful AI voice solution. Fully customized conversational flows, deep CRM integration, dynamic data retrieval, and advanced objection handling."
                />
                <PricingAccordionRow 
                  name="Sovereign X Website" 
                  promo="$500–$1,500 one-time" 
                  reg="$150–$200/mo retainer" 
                  description="A high-performance, conversion-optimized landing page or website designed according to Sovereign X standards, complete with ongoing technical maintenance."
                />
                <div className="block-note" style={{ marginTop: "16px" }}>
                  Phase 2 services are recommended after audit delivery. If you have existing findings, contact us directly.
                </div>
              </div>
            </div>

            <article className="referral-card" style={{ marginTop: "40px" }}>
              <h3>Referrals</h3>
              <PricingAccordionRow 
                name="Any audit referral" 
                promo="$100 gift card within 48hrs" 
                reg="" 
                description="When you refer a new client who successfully completes an audit, we will send you a $100 gift card of your choice within 48 hours of their payment processing. There is no cap on the number of referral rewards you can earn."
              />
              <div className="promo-notice">
                <div className="label">Promo notice</div>
                <div className="text">
                  <p>Promotional pricing resets on the 1st of each month. Limited slots available.</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="compact">
          <div className="wrap">
            <div className="sec-head pm-reveal">
              <div className="label">Client results</div>
              <h2>What clients say after the audit lands.</h2>
              <p className="sub">Real engagements. Real findings. Every audit is scoped, delivered, and followed up — no generic reports.</p>
            </div>

            <div className="testimonials-grid">
              {TESTIMONIALS.map((t, index) => (
                <article key={t.name} className="testimonial-card glass-premium testimonial-stagger pm-reveal" style={{ transitionDelay: `${index * 0.15}s` }}>
                  <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
                  <div className="testimonial-foot">
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-title">{t.title}</div>
                    <div className="testimonial-tier">
                      <StatusTag label={t.tier} tone="neon-blue" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="wrap">
            <h2 style={{ fontFamily: "Georgia, serif", color: "#FFF" }}>Your findings are waiting.</h2>
            <div className="confirm-actions">
              <a className="btn btn-primary cta-primary hover:shadow-neon-amber bg-neon-amber text-slate-950 border-neon-amber" href="#intake">
                Start the Audit <span className="arrow">→</span>
              </a>
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
                  Fill out the full intake below. Your audit brief routes directly into the command center. Delivery follows within 48–72 hours.
                </div>
                </div>

                <form className="order-form" onSubmit={submitOrder}>
                  <div className="intake-form-grid">
                    <input className="field" placeholder="Full name *" value={form.customerName} onChange={(event) => updateField("customerName", event.target.value)} required />
                    <input className="field" placeholder="Email address *" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
                    <input className="field" placeholder="Phone / WhatsApp" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
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
                      <option>Sovereign X Digital Audit — Standard</option>
                      <option>Sovereign X Digital Audit — Deep</option>
                      <option>Sovereign X Image Audit</option>
                      <option>Sovereign X Voice Agent</option>
                      <option>Sovereign X Growth Blueprint</option>
                    </select>
                    <input className="field" placeholder="How did you hear about us?" value={form.hearAbout} onChange={(event) => updateField("hearAbout", event.target.value)} required />

                    {(isDigitalAudit || isVoiceAgent) && (
                      <>
                        <input className="field" placeholder="Business name *" value={form.businessName} onChange={(event) => updateField("businessName", event.target.value)} required />
                        <input className="field" placeholder="Website URL *" value={form.websiteUrl} onChange={(event) => updateField("websiteUrl", event.target.value)} required />
                        <input className="field" placeholder={isVoiceAgent ? "Industry *" : "Industry / field *"} value={form.industry} onChange={(event) => updateField("industry", event.target.value)} required />
                      </>
                    )}

                    {isDigitalAudit && (
                      <>
                        <input className="field" placeholder="City and state *" value={form.cityState} onChange={(event) => updateField("cityState", event.target.value)} required />
                        <input className="field" placeholder="Number of locations *" value={form.locations} onChange={(event) => updateField("locations", event.target.value)} required />
                        <textarea className="field field-textarea" placeholder="Biggest current challenge *" value={form.biggestChallenge} onChange={(event) => updateField("biggestChallenge", event.target.value)} rows={3} required />
                        <select className="field" value={form.aiImplementation} onChange={(event) => updateField("aiImplementation", event.target.value)} required>
                          <option value="">Considering AI implementation? *</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Maybe</option>
                        </select>
                        <input className="field" placeholder="Any upcoming deadlines or events?" value={form.deadlines} onChange={(event) => updateField("deadlines", event.target.value)} />
                        <input className="field" placeholder="Instagram handle" value={form.socialInstagram} onChange={(event) => updateField("socialInstagram", event.target.value)} />
                        <input className="field" placeholder="LinkedIn profile URL" value={form.socialLinkedin} onChange={(event) => updateField("socialLinkedin", event.target.value)} />
                        <input className="field" placeholder="Facebook page URL" value={form.socialFacebook} onChange={(event) => updateField("socialFacebook", event.target.value)} />
                        <input className="field" placeholder="Other social platform + handle" value={form.socialOther} onChange={(event) => updateField("socialOther", event.target.value)} />
                      </>
                    )}

                    {isImageAudit && (
                      <>
                        <select className="field" value={form.gender} onChange={(event) => updateField("gender", event.target.value)} required>
                          <option value="">Gender *</option>
                          <option>Man</option>
                          <option>Woman</option>
                          <option>Non-binary</option>
                          <option>Prefer not to say</option>
                        </select>
                        <select className="field" value={form.ageRange} onChange={(event) => updateField("ageRange", event.target.value)} required>
                          <option value="">Age range *</option>
                          <option>18–24</option>
                          <option>25–34</option>
                          <option>35–44</option>
                          <option>45–54</option>
                          <option>55+</option>
                        </select>
                        <input className="field" placeholder="Height *" value={form.height} onChange={(event) => updateField("height", event.target.value)} required />
                        <input className="field" placeholder="Weight *" value={form.weight} onChange={(event) => updateField("weight", event.target.value)} required />
                        <input className="field" placeholder="Industry / Field *" value={form.industryField} onChange={(event) => updateField("industryField", event.target.value)} required />
                        <input className="field" placeholder="Your role or title *" value={form.role} onChange={(event) => updateField("role", event.target.value)} required />
                        <input className="field" placeholder="Instagram handle" value={form.instagram} onChange={(event) => updateField("instagram", event.target.value)} />
                        <input className="field" placeholder="TikTok handle" value={form.tiktok} onChange={(event) => updateField("tiktok", event.target.value)} />
                        <input className="field" placeholder="LinkedIn profile URL" value={form.linkedin} onChange={(event) => updateField("linkedin", event.target.value)} />
                        <input className="field" placeholder="YouTube channel" value={form.youtube} onChange={(event) => updateField("youtube", event.target.value)} />
                        <input className="field" placeholder="X / Twitter handle" value={form.twitter} onChange={(event) => updateField("twitter", event.target.value)} />
                        <input className="field" placeholder="Any other platform + handle" value={form.otherPlatform} onChange={(event) => updateField("otherPlatform", event.target.value)} />
                        <div className="field checkbox-field">
                          <div className="checkbox-title">Most important platforms</div>
                          <div className="checkbox-grid">
                            {PLATFORM_OPTIONS.map((platform) => (
                              <label key={platform}><input type="checkbox" checked={form.importantPlatforms.includes(platform)} onChange={() => togglePlatform(platform)} /> {platform}</label>
                            ))}
                          </div>
                        </div>
                        <textarea className="field field-textarea" placeholder="What do you want your image to communicate? *" value={form.imageCommunication} onChange={(event) => updateField("imageCommunication", event.target.value)} rows={3} required />
                        <textarea className="field field-textarea" placeholder="Biggest current image concerns *" value={form.imageConcerns} onChange={(event) => updateField("imageConcerns", event.target.value)} rows={3} required />
                        <input className="field" placeholder="Upcoming events or shoots?" value={form.imageEvents} onChange={(event) => updateField("imageEvents", event.target.value)} />
                        <textarea className="field field-textarea" placeholder="People whose style you admire" value={form.styleAdmire} onChange={(event) => updateField("styleAdmire", event.target.value)} rows={3} />
                        <textarea className="field field-textarea" placeholder="Describe the energy you want to project" value={form.desiredEnergy} onChange={(event) => updateField("desiredEnergy", event.target.value)} rows={3} />
                        <select className="field" value={form.wardrobeBudget} onChange={(event) => updateField("wardrobeBudget", event.target.value)}>
                          <option value="">Wardrobe budget range</option>
                          <option>$0–$250</option>
                          <option>$250–$750</option>
                          <option>$750–$1,500</option>
                          <option>$1,500+</option>
                        </select>
                        <select className="field" value={form.photographyInterest} onChange={(event) => updateField("photographyInterest", event.target.value)}>
                          <option value="">Interested in photography session after audit?</option>
                          <option>Yes</option>
                          <option>Possibly</option>
                          <option>No</option>
                        </select>
                        <select className="field" value={form.wardrobeBlueprintInterest} onChange={(event) => updateField("wardrobeBlueprintInterest", event.target.value)}>
                          <option value="">Interested in Wardrobe Blueprint add-on?</option>
                          <option>Yes</option>
                          <option>Possibly</option>
                          <option>No</option>
                          <option>Tell me more</option>
                        </select>
                        <div className="photo-notice">
                          <strong>Photo submission after payment confirmation</strong>
                          <p>After payment confirmation you will receive a Google Drive upload link for photo submission.</p>
                          <p>Required: full body front in natural light, full body side, face close-up in natural light, and 3 current outfit photos.</p>
                          <p>For Instagram and TikTok, submit 6–10 feed screenshots as part of your image dump for social media analysis.</p>
                          <p>Color analysis requires a natural light face close-up. Body type analysis requires accurate height and weight. Sections without complete data are marked directional.</p>
                        </div>
                      </>
                    )}

                    {isVoiceAgent && (
                      <>
                        <input className="field" placeholder="Approximate monthly call volume" value={form.monthlyCallVolume} onChange={(event) => updateField("monthlyCallVolume", event.target.value)} />
                        <select className="field" value={form.afterHoursVoicemail} onChange={(event) => updateField("afterHoursVoicemail", event.target.value)}>
                          <option value="">Do calls currently go to voicemail after hours?</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Not sure</option>
                        </select>
                        <select className="field" value={form.onlineBooking} onChange={(event) => updateField("onlineBooking", event.target.value)}>
                          <option value="">Do you have an online booking system?</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                        <input className="field" placeholder="Average transaction value ($)" value={form.averageTransactionValue} onChange={(event) => updateField("averageTransactionValue", event.target.value)} />
                        <textarea className="field field-textarea" placeholder="Any notes on current phone intake challenges" value={form.phoneChallenges} onChange={(event) => updateField("phoneChallenges", event.target.value)} rows={4} />
                      </>
                    )}

                    <textarea
                      className="field field-textarea"
                      placeholder="Anything else we should know?"
                      value={form.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      rows={4}
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
                <p>Operated by BlackFur Capital Group LLC</p>
                <p>All payments processed by BlackFur Capital Group LLC</p>
                <p style={{ marginTop: "8px", fontSize: "12px" }}>
                  <a href="https://sxaudits.com" style={{ color: "var(--subtle)", textDecoration: "none" }}>sxaudits.com</a>
                  {" · "}
                  <a href="https://aicouncilconductor.com" target="_blank" rel="noreferrer" style={{ color: "var(--subtle)", textDecoration: "none" }}>aicouncilconductor.com</a>
                </p>
              </div>
              <div className="footer-col">
                <h5>Quick links</h5>
                <Link href="/login">Client Login</Link>
                <a href="#services">Services</a>
                <a href="#intake">Start an Audit</a>
                <Link href="/samples">Sample Reports</Link>
                <a href="https://aicouncilconductor.com" target="_blank" rel="noreferrer">AI Council Conductor</a>
              </div>
              <div className="footer-col">
                <h5>The System</h5>
                <p>Phase 1 is always the entry point — the audit. Phase 2 services are prescribed by what the audit finds.</p>
                <p>Promo pricing resets monthly. All audit findings are verified before delivery.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Sovereign X Audits · Operated by BlackFur Capital Group LLC</span>
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

function PricingAccordionRow({ name, promo, reg, description }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px dashed var(--border)", padding: "14px 0" }}>
      <div 
        className="pricing-row" 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ cursor: "pointer", borderBottom: "none", padding: 0 }}
      >
        <div className="name" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ 
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", 
            transition: "transform 0.2s ease", 
            fontSize: "10px", 
            color: "var(--gold)", 
            display: "inline-block" 
          }}>▶</span>
          {name}
        </div>
        <div className="promo">{promo}</div>
        <div className="reg">{reg}</div>
      </div>
      <div style={{ 
        maxHeight: isOpen ? "500px" : "0", 
        overflow: "hidden", 
        transition: "max-height 0.3s ease, opacity 0.3s ease",
        opacity: isOpen ? 1 : 0
      }}>
        <div style={{ paddingTop: "12px", paddingLeft: "20px", fontSize: "14px", color: "var(--subtle)", lineHeight: "1.6" }}>
          {description}
        </div>
      </div>
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
