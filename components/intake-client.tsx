"use client";

import { useEffect, useMemo, useRef, useState, startTransition, type FormEvent } from "react";
import Link from "next/link";
import type { DashboardPayload, ClientOrder } from "@/lib/domain/types";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { formatDisplayTime } from "@/lib/utils/time";
import { SnippetParallax } from "@/components/snippet-parallax";
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
    text: "Your audit lands in Google Drive within 72 hours. Clear findings. Dollar figures. A roadmap you can act on today."
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

const REFERRALS = [
  { name: "Any audit referral", note: "$100 gift card within 48hrs" },
  { name: "Photography referral", note: "10–15% of gig value" },
  { name: "Styling referral", note: "10–15% of gig value" }
];

const TESTIMONIALS = [
  {
    quote: "I had no idea my website was turning away customers. The audit showed me exactly where — and we fixed it within a week. Fully worth it.",
    name: "Marcus T.",
    title: "Restaurant Owner",
    tier: "Sovereign X Digital Audit — Standard"
  },
  {
    quote: "My online presence looked professional to me, but the X Image Audit showed gaps I couldn't see myself. The findings were specific and actionable.",
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
  const [bootDone, setBootDone] = useState(false);
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
    const t = setTimeout(() => startTransition(() => setBootDone(true)), 2900);
    return () => clearTimeout(t);
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
            <div className="hero-grid">
              <div>
                <div className="hero-eyebrow pm-animate mb-6">
                  <div className="hero-eyebrow-track">
                    <span>Sovereign X Audits</span>
                    <span className="dot">•</span>
                    <span className="gold-tag text-neon-blue border-neon-blue">Digital Superstructure</span>
                    <span className="dot">•</span>
                    <span>BlackFur Capital Group LLC</span>
                  </div>
                  <div className="hero-eyebrow-track" aria-hidden="true">
                    <span>Sovereign X Audits</span>
                    <span className="dot">•</span>
                    <span className="gold-tag text-neon-blue border-neon-blue">Digital Superstructure</span>
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
                  We audit your business, your brand, and your image — and show you exactly what it&apos;s costing you. Delivered in 72 hours. No discovery call.
                </p>
                <div className="hero-ctas pm-animate">
                  <a className="btn btn-primary cta-primary hover:shadow-neon-blue bg-neon-blue text-slate-950 border-neon-blue" href="#intake">
                    Get Your Audit <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-ghost hover:text-neon-blue" href="#services">
                    See What We Audit <span className="arrow">↓</span>
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

              {/* Unified Responsive Preview Snippet */}
              <div className="hero-stage pm-animate">
                <SnippetParallax />
              </div>
            </div>
          </div>
        </section>

        <div className="pm-section-glow" aria-hidden="true" />

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

        <section className="compact mt-24">
          <div className="wrap">
            <div className="sec-head pm-reveal">
              <div className="label text-neon-blue border-neon-blue">Workflow Logic</div>
              <h2 className="text-white">A clear path from intake to verified delivery.</h2>
              <p className="sub text-slate-400">You submit once. We audit, verify, and deliver the findings in a format you can act on immediately.</p>
            </div>

            <div className="pipeline-steps pm-reveal">
              <article className="pipeline-step pipeline-step--blue">
                <div className="num">01</div>
                <h4>Discovery & Intake</h4>
                <p>You tell us who you are and what you need. We take it from there.</p>
              </article>
              <article className="pipeline-step pipeline-step--amber">
                <div className="num">02</div>
                <h4>AICC Verification</h4>
                <p>Every finding goes through a five-stage verification process. Nothing reaches you unless it&apos;s defensible.</p>
              </article>
              <article className="pipeline-step pipeline-step--purple">
                <div className="num">03</div>
                <h4>Google Drive delivery</h4>
                <p>Your audit lands in Google Drive within 72 hours. Clear findings. Dollar figures. A roadmap you can act on today.</p>
              </article>
            </div>
          </div>
        </section>

        <div className="pm-section-glow" aria-hidden="true" />

        <section id="services">
          <div className="wrap">
            <div className="sec-head pm-reveal">
              <div className="label">Service entry points</div>
              <h2>Four ways a client can step into the system.</h2>
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
                          tone={isSelected ? (tier.selectedTone as StatusTone) : "muted"}
                        />
                      </div>
                      <div className="price-row">
                        <span className="promo text-neon-blue">{tier.pricePromo}</span>
                        {tier.priceReg ? <span className="reg">{tier.priceReg}</span> : null}
                      </div>
                      <div className="tier-summary">{tier.summary}</div>
                      {"note" in tier && tier.note ? <div className="tier-note">{tier.note as string}</div> : null}
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

                <div className="snippet-preview preview-float">
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
              <h2>Seven deliverables. One Google Drive link. 72 hours.</h2>
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
                    "Delivered to your Google Drive"
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

        <section className="compact section-diagonal">
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

        <section className="compact section-diagonal" id="samples">
          <div className="wrap">
            <div className="sec-head pm-reveal">
              <div className="label">SEE THE WORK</div>
              <h2>Sample Intelligence Reports</h2>
              <p className="sub">This is what lands in your Google Drive.</p>
            </div>
            <div className="pm-reveal">
              <a className="sample-featured glass-premium" href="/samples/snippet">
                <div className="sample-featured-inner">
                  <div className="sample-featured-body">
                    <div className="label aicc-stamp text-neon-amber border-neon-amber">THE SNIPPET</div>
                    <h2 className="text-white">What You Receive Before You Pay a Dollar</h2>
                    <p className="text-subtle">Before any client commits, we send a free 1-page partial disclosure — 3 verified findings from a real audit of their business or image. No pitch. No pressure. Just the intelligence. This is what that looks like.</p>
                    <div className="snippet-badges">
                      <span className="aicc-stamp border-neon-blue text-neon-blue">AICC VERIFIED</span>
                      <span className="stamp">FREE</span>
                      <span className="stamp">NO STRINGS</span>
                    </div>
                    <span className="btn btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>View Sample Snippet →</span>
                    <p className="sample-featured-note">The snippet is sent before any purchase. The full report is what you receive after.</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="sample-cards pm-reveal">
              <a className="sample-card glass-premium" href="/samples/digital">
                <div className="label">SOVEREIGN X DIGITAL AUDIT</div>
                <h4 className="text-white">Sample Business Intelligence Report</h4>
                <p className="text-subtle">21 sections. Revenue leaks with dollar figures. Technical performance scores. AI readiness analysis. Impact Matrix. Priority roadmap.</p>
                <span className="aicc-stamp border-neon-blue text-neon-blue" style={{ marginTop: "auto" }}>AICC VERIFIED</span>
                <span className="sample-cta">View Sample Report →</span>
              </a>
              <a className="sample-card glass-premium" href="/samples/image">
                <div className="label">SOVEREIGN X IMAGE AUDIT</div>
                <h4 className="text-white">Sample Personal Brand Report</h4>
                <p className="text-subtle">18 sections. Color analysis. Social media audit. Brand alignment. Photography readiness score. Priority sequence.</p>
                <span className="aicc-stamp border-neon-blue text-neon-blue" style={{ marginTop: "auto" }}>AICC VERIFIED</span>
                <span className="sample-cta">View Sample Report →</span>
              </a>
              <a className="sample-card glass-premium" href="/samples/voice">
                <div className="label">SOVEREIGN X VOICE AGENT</div>
                <h4 className="text-white">Sample ROI Analysis</h4>
                <p className="text-subtle">After-hours lead gap calculation. Annual revenue loss from missed calls. Conversation flow design. Build and deployment plan.</p>
                <span className="aicc-stamp border-neon-blue text-neon-blue" style={{ marginTop: "auto" }}>AICC VERIFIED</span>
                <span className="sample-cta">View Sample →</span>
              </a>
            </div>
          </div>
        </section>

        <section className="compact">
          <div className="wrap">
            <div className="sec-head">
              <div className="label">Pricing</div>
              <h2>Transparent pricing. No discovery calls required.</h2>
              <p className="sub">Every tier is structured for clean delivery, clear scope, and simple next steps.</p>
            </div>

            <div className="pricing-block">
              {PRICING_BLOCKS.map((block) => (
                <article key={block.title} className="pricing-card">
                  <h3>{block.title}</h3>
                  {block.rows.map((row) => (
                    <div key={row.name} className="pricing-row">
                      <div className="name">{row.name}{row.rowNote ? <span className="row-note"> — {row.rowNote}</span> : null}</div>
                      {row.comingSoon
                        ? <div className="promo"><span className="coming-soon-badge">COMING SOON</span></div>
                        : <div className="promo">{row.promo}</div>
                      }
                      <div className="reg">{row.reg ?? ""}</div>
                    </div>
                  ))}
                  {block.blockNote ? <div className="block-note">{block.blockNote}</div> : null}
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
                  Fill out the full intake below. Your audit brief routes into the command center and delivery moves through Google Drive.
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
                <p>BlackFur Capital Group LLC</p>
                <p>Executive intake, premium audit briefs, and a command center queue that stays easy to operate.</p>
              </div>
              <div className="footer-col">
                <h5>Quick links</h5>
                <Link href="/login">Client Login</Link>
                <Link href="#services">Services</Link>
                <Link href="#intake">Intake</Link>
                <a href="https://aicouncilconductor.com" target="_blank" rel="noreferrer">AI Council Conductor</a>
              </div>
              <div className="footer-col">
                <h5>Support</h5>
                <p>Orders flow into the command center automatically. Light and dark mode are both supported.</p>
                <p>Promo resets monthly. All submissions stay visible to the operator in the shared queue.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Sovereign X Audits · sxaudits.com</span>
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
