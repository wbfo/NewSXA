"use client";

import { useState } from "react";
import type { ToolkitDocument } from "@/lib/domain/types";
import { Panel } from "@/components/ui";

const GOLD = "#C8A96E";
const TEAL = "#7AADA0";
const RED = "#C0392B";
const GREEN = "#27AE60";
const ORANGE = "#E67E22";
const BLUE = "#1A5276";
const PURPLE = "#6C3483";

const researchLayers = [
  {
    layer: "LAYER 1 — DIGITAL SURFACE",
    accent: GOLD,
    time: "~30 min",
    items: [
      "Google the name — what appears before their own site?",
      "Check domain · all variations · expiration date",
      "PageSpeed DESKTOP — score, LCP, CLS, FCP, TTI",
      "PageSpeed MOBILE — score separately from desktop",
      "SSL/HTTPS · sitemap.xml · robots.txt",
      "Test all navigation links — document broken links",
      "Test contact/booking form — desktop AND mobile",
      "Check all social handles listed on site",
      "Google Business Profile — claimed? Hours accurate?",
      "Run Gemini QA Prompts 01, 03, 05, 06 on website"
    ]
  },
  {
    layer: "LAYER 2 — COMPETITION",
    accent: TEAL,
    time: "~15 min",
    items: [
      "Identify top 3 local competitors",
      "Run PageSpeed mobile on each competitor",
      "Compare Google ratings and review counts",
      "Search service + city on Google Maps — ranking?",
      "Search service + city on Yelp — ranking?",
      "Search queries in ChatGPT + Perplexity + Google AI",
      "Note which competitors appear in AI responses"
    ]
  },
  {
    layer: "LAYER 3 — OPERATIONAL",
    accent: GOLD,
    time: "~15 min",
    items: [
      "Read 10–15 recent reviews — recurring complaints?",
      "CALL after hours — voicemail? (Voice agent check)",
      "Check booking/intake system existence",
      "Check pricing visibility",
      "Look for hours discrepancies in reviews",
      "Check NAP: Google, Yelp, Facebook, Nextdoor, Apple Maps",
      "Check for duplicate listings"
    ]
  },
  {
    layer: "LAYER 4 — INSTITUTIONAL",
    accent: TEAL,
    time: "~30 min",
    items: [
      "LinkedIn — staffing, recent hires/exits",
      "Indeed/Glassdoor — job postings + reviews",
      "BBB — complaints?",
      "Google News — press coverage?",
      "AI READINESS: Identify manual tasks from job posts",
      "AI READINESS: ROI formula on each identified process",
      "VOICE AGENT: Calculate lost lead revenue",
      "LAND & EXPAND: Who at this firm has a personal brand?"
    ]
  },
  {
    layer: "LAYER 5 — X IMAGE SPECIFIC",
    accent: PURPLE,
    time: "~20 min",
    items: [
      "Search name on Google — what shows in image search?",
      "Use Apify to pull Instagram public feed",
      "Use Apify/ScrapeCreators for TikTok profile",
      "Pull LinkedIn profile if exists",
      "Pull Threads + YouTube if active",
      "Check Behance/VSCO/500px for photographers",
      "Cross-platform consistency — same person everywhere?",
      "Flag platforms where NO presence exists",
      "AICC: Critic challenges every finding before writing",
      "Mark each finding: CONFIRMED / DIRECTIONAL / PENDING"
    ]
  }
];

const qaPrompts = [
  {
    n: "01",
    title: "Full Website Onboarding Audit",
    sub: "First Impression Killer",
    accent: GOLD,
    text:
      "You are a senior QA engineer who has tested 200+ high-converting websites. Open [WEBSITE_URL] and test the full first-time visitor experience from landing to key action. Click every major path. Document all states including loading, errors, empty states. Identify broken links, unclickable elements, missing feedback, confusing navigation. Format: Bug Title, Severity (Critical/High/Medium/Low), Page URL, Suggested Fix."
  },
  {
    n: "02",
    title: "Form Edge Case Breaker",
    sub: "Conversion Leak Finder",
    accent: TEAL,
    text:
      "You are a QA engineer specializing in web form validation. Open [WEBSITE_URL] and locate all forms. Test with empty fields, 500+ character inputs, special characters, invalid formats. Flag silent failures, weak validation, unclear error messages. Format: steps to reproduce, expected vs actual, severity."
  },
  {
    n: "03",
    title: "Responsive Layout Inspector",
    sub: "Mobile = Money",
    accent: GOLD,
    text:
      "You are a frontend QA expert. Open [WEBSITE_URL] and analyze layout at 375px, 768px, 1280px, 1920px. Identify overlapping elements, broken navigation, clipped text, unclickable buttons. Pay attention to mobile CTA visibility. Format: Screen Size, Page, Element, Severity, Recommended Fix."
  },
  {
    n: "04",
    title: "CSS Regression Detector",
    sub: "Post-Update Safety",
    accent: TEAL,
    text:
      "You are a QA engineer performing regression testing. Open [WEBSITE_URL] and review key pages for CSS/UI inconsistencies. Compare layout, typography, spacing, button styles. Identify misaligned elements, inconsistent colors, broken interactions. Format: Intended Change, Verified (Yes/No), Issues Found, Severity, Fix."
  },
  {
    n: "05",
    title: "User Journey Mapper",
    sub: "Experience Breakdown",
    accent: GOLD,
    text:
      "You are a UX-focused QA engineer. Open [WEBSITE_URL] and walk through the main conversion path. Document each step, note confusion points, estimate time per step. Identify friction and hesitation moments. Format: Step Name, User Action, Time Taken, Friction Points, Optimization Suggestions."
  },
  {
    n: "06",
    title: "Accessibility Spot Check",
    sub: "Hidden UX Gaps",
    accent: TEAL,
    text:
      "You are a QA engineer experienced in WCAG standards. Open [WEBSITE_URL] and perform a visual accessibility audit. Check contrast, small buttons on mobile, missing form labels, color-only meaning, lack of focus states. Format: Issue, Page/Section, Severity, Recommended Fix."
  },
  {
    n: "07",
    title: "Structured Bug Report Writer",
    sub: "Dev-Ready Output",
    accent: GOLD,
    text:
      "You are a senior QA engineer. Based on these findings: [PASTE ISSUES], write structured bug reports. For each: Bug Title, Steps to Reproduce, Expected vs Actual, Severity (Critical/High/Medium/Low), Priority (P1/P2/P3), Suggested Fix. Format for GitHub or Jira."
  },
  {
    n: "08",
    title: "Pre-Launch QA Plan",
    sub: "Ship With Confidence",
    accent: TEAL,
    text:
      "You are a QA lead preparing a site for launch. Review [WEBSITE_URL] and create a complete QA test plan. Include core user flows, test cases with acceptance criteria, edge cases, device/browser coverage, high-risk areas. Estimate time per test case. Format by feature or page."
  }
];

const objections = [
  {
    q: '"How much does it cost?"',
    accent: GOLD,
    a:
      'Anchor value first. Then price. Then deadline.\n\n"The Standard Digital Audit is $500 — promotional, regular $750. 21 dimensions, tool-generated technical scores, revenue leaks with dollar figures, Impact Matrix, Fix-It Checklist. Delivered in 48 hours.\n\nThe Deep is $1,500 — everything plus full technical analysis, AI QA on your actual website, competitive scoring, ROI calculations, audio, deck, 60-day guarantee.\n\nPromo closes May 31st. Which tier makes more sense for where you are right now?"'
  },
  {
    q: '"I need to think about it."',
    accent: TEAL,
    a:
      '"Completely fair. One thing worth knowing — [Finding #3] is getting worse while it sits. Promo closes May 31st. Not pressure, just context. What specifically do you want to think through? If it\'s price I can walk you through the ROI. If it\'s timing I can tell you what delaying typically costs."'
  },
  {
    q: '"We already handle our marketing internally."',
    accent: GOLD,
    a:
      '"That\'s great — this isn\'t marketing. I identify what\'s broken in your digital infrastructure — things your marketing person may not be looking at from the outside: technical performance scores, NAP inconsistencies, AI search visibility, conversion failures, after-hours lead gaps. The audit tells you if your marketing investment is actually working."'
  },
  {
    q: '"We\'re already thinking about implementing AI."',
    accent: TEAL,
    a:
      '"80% of AI implementations fail — not because the technology doesn\'t work, but because they\'re built on broken infrastructure. Before you invest, you need to know which processes are AI-ready and what the infrastructure gaps cost right now. The Deep Audit gives you exactly that — including a voice agent readiness assessment."'
  },
  {
    q: '"I don\'t need an image audit — I look fine."',
    accent: GOLD,
    a:
      '"This isn\'t about looking fine. It\'s about whether your current image is communicating what you intend it to — to your clients, your industry, your audience, or potential partners. The gap is almost never about appearance. It\'s about whether the appearance matches the brand and the goals."'
  },
  {
    q: '"I can\'t afford it right now."',
    accent: TEAL,
    a:
      '"I hear you. The finding about [X] — how much is that costing you per month right now? [Let them answer.] So the audit pays for itself in [X weeks] from fixing that one thing. I\'m not asking you to spend $500. I\'m asking if it makes sense to trade $500 to stop losing $[X] every month."'
  }
];

const outreachScripts = [
  {
    type: "DIGITAL AUDIT — COLD EMAIL",
    accent: GOLD,
    text:
      "Hi [Name],\n\nBefore reaching out, I spent time reviewing [Business]'s digital footprint. I found 3 specific things costing you customers right now — and at least one gets worse every day it sits.\n\nI put together a free 1-page document with those findings. No pitch, no pressure — just the information.\n\nWorth 60 seconds?\n\n— Ola · Sovereign X Audits · BlackFur Capital Group LLC"
  },
  {
    type: "VOICE AGENT — COLD EMAIL",
    accent: BLUE,
    text:
      "Hi [Name],\n\nI called [Business] yesterday at [time]. Voicemail.\n\nThat's a lead that chose a competitor by morning. I calculated what that costs annually based on your call volume and average transaction. The number is worth knowing.\n\nFree 1-page breakdown. No pitch.\n\n— Ola · Sovereign X Audits · BlackFur Capital Group LLC"
  },
  {
    type: "X IMAGE AUDIT — COLD EMAIL",
    accent: TEAL,
    text:
      "Hi [Name],\n\nBefore reaching out I spent time reviewing your image — what your appearance and public presence are actually communicating right now.\n\nI found 3 things worth knowing about. One of them is actively working against the brand you've built.\n\nFree 1-page breakdown. No strings.\n\n— Ola · X Image Audit · BlackFur Capital Group LLC"
  },
  {
    type: "THE BRIDGE — OUTCOME FORCING QUESTIONS",
    accent: ORANGE,
    text:
      'When they respond — ask ONE. Their answer closes the sale.\n\nQ1: "What\'s the most expensive problem you\'re dealing with right now in terms of visibility or customer acquisition?"\n\nQ2: "If we could solve one thing that would actually move the needle on revenue, what would it be?"\n\nQ3: "Where are you losing money that you know about but haven\'t fixed?"\n\nQ4 (Voice agent): "What happens when someone calls your business at 10pm on a Saturday?"'
  }
];

const linkedinPosts = [
  {
    title: "POST 1 — COO STORY (LEAD WITH THIS)",
    accent: GOLD,
    text:
      'In a final interview, a CEO asked: "What\'s your biggest weakness?"\n\nHe slid a 3-page document across the desk.\n\n"Choosing who I work for. Your shipping overhead is consuming 18% of gross margins. Industry standard is 11. Your fulfillment lag is 12 days — competitors are at 4. Your AR aging shows 38% of invoices past 90 days. That\'s a crisis."\n\nThe CEO canceled his next two meetings. 90 minutes later: signed offer letter.\n\nAll that information was public. Anyone could have done this analysis. I paused. But no one else did.\n\nThat\'s what I do — except I\'m not applying for jobs. I show business owners what their digital footprint looks like from the outside in. Before they ever ask.\n\nThat\'s a Sovereign Intelligence Audit.\n\n— Ola | Sovereign X Audits · BlackFur Capital Group LLC'
  },
  {
    title: "POST 2 — THE 80% STAT",
    accent: TEAL,
    text:
      "80% of AI projects fail.\n\nNot because the technology doesn't work.\nBecause businesses implement AI on broken infrastructure.\n\nReviews in the wrong place. Listings inconsistent. Hours wrong on three directories. Brand invisible in AI search.\n\nBuild AI on top of that — the AI fails too.\n\nThe 20% who succeed all start the same way: Diagnosis before technology. Fix the foundation. Then the AI works.\n\n— Ola | Sovereign X Audits · BlackFur Capital Group LLC"
  },
  {
    title: "POST 3 — INDIVIDUAL BRAND ANGLE",
    accent: GOLD,
    text:
      "Your name is your business.\n\nIf you're an attorney, appraiser, broker, or consultant — your digital infrastructure matters more, not less.\n\nI searched a well-known Staten Island professional's name last week. Incomplete information on two platforms. A competitor appeared where they should have. Their contact email was AOL across three directories.\n\nEach one is a client who searched, felt uncertain, and chose someone else.\n\nA Sovereign Audit shows you exactly what a potential client sees when they search your name.\n\n— Ola | Sovereign X Audits · BlackFur Capital Group LLC"
  },
  {
    title: "POST 4 — INFRASTRUCTURE PRINCIPLE",
    accent: TEAL,
    text:
      "Before you spend a dollar on AI — answer these:\n\nAre your listings consistent across Google, Yelp, and Facebook?\nIs your GBP claimed and optimized?\nDoes your brand exist in AI-generated responses?\nDo clients have a frictionless way to reach you after hours?\n\nIf any answer is no — AI will not save you.\n\nAI amplifies what's already there. Broken infrastructure amplifies broken.\n\nFix the foundation first.\n\n— Ola | Sovereign X Audits · BlackFur Capital Group LLC"
  },
  {
    title: "POST 5 — THE REFERRAL POST",
    accent: GOLD,
    text:
      "Quick announcement:\n\nI run Sovereign X Audits — digital intelligence reports showing businesses where they're invisible, where reputation is leaking, and where revenue is walking out the door.\n\nI also run X Image Audit — personal brand intelligence for professionals and creatives.\n\nIf you know someone who fits either → send them my way.\n\n$100 gift card paid within 48 hours. No cap.\n\n— Ola | Sovereign X Audits · BlackFur Capital Group LLC"
  }
];

const matrixQuadrants = [
  {
    label: "QUICK WINS",
    color: GREEN,
    rule: "Low effort · High value → DO FIRST",
    examples: [
      "Fix GBP hours error",
      "Claim unclaimed GBP",
      "Add online intake form",
      "Build LinkedIn profile",
      "Update credentials in bio",
      "Fix Finding #3 from snippet",
      "Add online booking link"
    ]
  },
  {
    label: "BIG SWINGS",
    color: GOLD,
    rule: "Medium effort · High value → PHASE 2",
    examples: [
      "Schema markup + GBP optimization",
      "Voice agent deployment",
      "Full brand standardization",
      "Social media visual rebrand",
      "Professional portrait session"
    ]
  },
  {
    label: "LOW PRIORITY",
    color: TEAL,
    rule: "Low effort · Low value → SKIP FOR NOW",
    examples: ["Minor website copy tweaks", "Secondary directories", "Posting without fixing identity first"]
  },
  {
    label: "MONEY PITS",
    color: RED,
    rule: "High effort · Low value → AVOID",
    examples: ["AI tools on broken infrastructure", "Paid ads before fixing GBP/schema", "Voice agent with no conversation design"]
  }
];

function ToolkitBlock({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="toolkit-block">
      <div className="toolkit-label" style={{ color: accent }}>
        <span className="toolkit-label-line" style={{ background: accent }} />
        {label}
      </div>
      <div className="toolkit-frame" style={{ borderLeftColor: accent }}>
        {children}
      </div>
    </div>
  );
}

function OfferPricingView() {
  return (
    <>
      <ToolkitBlock label="COMPLETE PRICING STACK" accent={RED}>
        <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
          {`── SOVEREIGN X DIGITAL AUDITS ──────────────────────────
Standard Audit                $500 promo   /  $750 regular
Deep Audit                    $1,500 promo /  $2,000 regular
Deep + Intake                 $2,000 promo /  $2,500 regular
Individual / Personal Brand   $500 promo   /  $750 regular
Bulk 3–4 individuals          $350/ea
Bulk 5–9 individuals          $300/ea
Enterprise per location       $200/location + $2,000 brand audit

── X IMAGE AUDIT ────────────────────────────────────────
Standard                      $350 promo   /  $500 regular
Public Figure Tier            $750 promo   /  $1,000 regular
X Attraction Audit            $350 promo   /  $500 regular
Follow-Up Re-Audit            $150–$200
Wardrobe Blueprint Add-On     Available after any audit

── VOICE AGENT SERVICES ─────────────────────────────────
Starter                       $1,500 setup + $200/mo
Standard                      $2,500 setup + $350/mo
Advanced                      $4,000–$5,000 setup + $500/mo
Enterprise                    Custom + custom retainer

── REFERRALS ────────────────────────────────────────────
Any audit referral            $100 gift card within 48hrs
Photography referral          10–15% of gig value
Styling referral              10–15% of gig value

Promo resets monthly · 10 slots/month
All payments to BlackFur Capital Group LLC`}
        </div>
      </ToolkitBlock>
      <ToolkitBlock label="AICC PRINCIPLE" accent={GOLD}>
        <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
          {`Every deliverable is AICC Verified — generated, critiqued, verified, refined, and synthesized through the AI Council Conductor methodology. Not one AI's opinion. A verified council finding.

Five roles: GENERATOR → CRITIC → VERIFIER → REFINER → SPECIALIST
You are the Conductor. You Direct, Distill, and Decide.

Confidence levels on every finding:
CONFIRMED — verified across multiple sources
DIRECTIONAL — single source or partial data
PENDING — requires intake data (height/weight, natural light photo, screenshots)`}
        </div>
      </ToolkitBlock>
      <ToolkitBlock label="NON-NEGOTIABLE RULES" accent={TEAL}>
        <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
          {`01  Never deliver a finding you can't defend with actual data
02  Always lead with intelligence — show up with findings before you pitch
03  Price reflects value — never apologize for the rate
04  The audit creates the brief — Section 16 tells them what they need
05  No fabricated precision — mark it DIRECTIONAL if data isn't there
06  Social media requires scraped data or screenshots — not inference
07  Height + weight required for body type analysis in image audits
08  Natural light close-up required for accurate color analysis
09  AICC verification runs on every finding before it's written
10  All payments to BlackFur Capital Group LLC`}
        </div>
      </ToolkitBlock>
    </>
  );
}

function ResearchView() {
  return (
    <div className="toolkit-stack">
      {researchLayers.map((layer) => (
        <div key={layer.layer} className="toolkit-layer">
          <div className="toolkit-layer-head">
            <div className="toolkit-label" style={{ color: layer.accent }}>
              <span className="toolkit-label-line" style={{ background: layer.accent }} />
              {layer.layer}
            </div>
            <span className="mono-subtle">{layer.time}</span>
          </div>
          <div className="toolkit-layer-list">
            {layer.items.map((item, index) => (
              <div key={item} className="toolkit-layer-row">
                <span className="toolkit-index" style={{ color: layer.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PromptsView() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <>
      <ToolkitBlock label="THE PIPELINE" accent={RED}>
        <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
          {`Input: business name → AI discovers URL → runs all 8 prompts → findings populate Sections 03, 04, 05 → AICC verification → report builds → you approve → deliver`}
        </div>
      </ToolkitBlock>
      <div className="toolkit-stack">
        {qaPrompts.map((prompt) => (
          <div key={prompt.n} className="toolkit-prompt">
            <div className="toolkit-prompt-head">
              <div>
                <div className="toolkit-label" style={{ color: prompt.accent }}>
                  PROMPT {prompt.n} · {prompt.title}
                </div>
                <div className="mono-subtle">{prompt.sub}</div>
              </div>
              <button className="toolkit-copy-button" type="button" onClick={() => void copy(prompt.text, prompt.n)}>
                {copied === prompt.n ? "COPIED" : "COPY"}
              </button>
            </div>
            <div className="toolkit-frame" style={{ borderLeftColor: prompt.accent }}>
              <div className="toolkit-copy">{prompt.text}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function OutreachView() {
  return (
    <>
      {outreachScripts.map((script) => (
        <ToolkitBlock key={script.type} label={script.type} accent={script.accent}>
          <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
            {script.text}
          </div>
        </ToolkitBlock>
      ))}
      <ToolkitBlock label="COLD CALLING — SEQUENCE" accent={GOLD}>
        <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
          {`DAY 1:  Send snippet email
DAY 2:  LinkedIn connection request
DAY 3:  First call — "following up on my email"
DAY 5:  Second call + voicemail
DAY 7:  Final email + LinkedIn message
DAY 10: Final call → move on

BEST TIMES: 10am–12pm · 4pm–5pm
BEST DAYS:  Tuesday, Wednesday, Thursday
GOAL OF CALL: Get permission to send the snippet. Not to sell. Not to pitch pricing.

FREE TOOLS: Apollo.io (50 lookups/mo) · Hunter.io (25/mo) · HubSpot Free CRM · Google Voice
SOCIAL RESEARCH: Apify + ScrapeCreators for all major platforms`}
        </div>
      </ToolkitBlock>
    </>
  );
}

function ObjectionsView() {
  return (
    <div className="toolkit-stack">
      {objections.map((item) => (
        <div key={item.q} className="toolkit-objection">
          <div className="toolkit-objection-title" style={{ color: item.accent }}>
            OBJECTION: {item.q}
          </div>
          <div className="toolkit-frame" style={{ borderLeftColor: item.accent }}>
            <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MatrixView() {
  return (
    <div className="toolkit-matrix">
      {matrixQuadrants.map((quadrant) => (
        <div key={quadrant.label} className="toolkit-quadrant" style={{ borderTopColor: quadrant.color }}>
          <div className="toolkit-quadrant-title" style={{ color: quadrant.color }}>
            {quadrant.label}
          </div>
          <div className="mono-subtle" style={{ marginBottom: 10 }}>
            {quadrant.rule}
          </div>
          <div className="toolkit-stack" style={{ gap: 6 }}>
            {quadrant.examples.map((example) => (
              <div key={example} className="toolkit-quadrant-row">
                <span style={{ color: quadrant.color }}>→</span>
                <span>{example}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoiCalculatorView() {
  const [operations, setOperations] = useState({ hours: 1, people: 3, days: 260, rate: 20 });
  const [voice, setVoice] = useState({ leads: 10, loss: 60, close: 5, value: 15000 });
  const operationalWaste = operations.hours * operations.people * operations.days * operations.rate;
  const voiceLoss = Math.round(voice.leads * (voice.loss / 100) * (voice.close / 100) * voice.value * 52);

  return (
    <div className="toolkit-stack">
      <div className="toolkit-calc-card" style={{ borderLeftColor: GOLD }}>
        <div className="toolkit-label" style={{ color: GOLD }}>
          OPERATIONAL WASTE — hrs/day × people × 260 × hourly = annual waste
        </div>
        <div className="toolkit-form-grid">
          <label className="toolkit-input-group">
            <span className="mono-subtle">Hours wasted/day</span>
            <input className="input" type="number" step="0.25" value={operations.hours} onChange={(event) => setOperations((current) => ({ ...current, hours: Number(event.target.value) || 0 }))} />
          </label>
          <label className="toolkit-input-group">
            <span className="mono-subtle"># of people</span>
            <input className="input" type="number" value={operations.people} onChange={(event) => setOperations((current) => ({ ...current, people: Number(event.target.value) || 0 }))} />
          </label>
          <label className="toolkit-input-group">
            <span className="mono-subtle">Working days/year</span>
            <input className="input" type="number" step="5" value={operations.days} onChange={(event) => setOperations((current) => ({ ...current, days: Number(event.target.value) || 0 }))} />
          </label>
          <label className="toolkit-input-group">
            <span className="mono-subtle">Loaded hourly cost ($)</span>
            <input className="input" type="number" step="5" value={operations.rate} onChange={(event) => setOperations((current) => ({ ...current, rate: Number(event.target.value) || 0 }))} />
          </label>
        </div>
        <div className="toolkit-calc-result">
          <div className="mono-subtle">ANNUAL OPERATIONAL WASTE</div>
          <div className="toolkit-result-value" style={{ color: GOLD }}>
            ${operationalWaste.toLocaleString()}
          </div>
          <div className="mono-subtle">Standard audit ($500) pays for itself in {operationalWaste > 0 ? (500 / operationalWaste * 52).toFixed(1) : "0.0"} weeks.</div>
        </div>
      </div>

      <div className="toolkit-calc-card" style={{ borderLeftColor: BLUE }}>
        <div className="toolkit-label" style={{ color: BLUE }}>
          VOICE AGENT — weekly calls × % unanswered × close rate × avg value × 52
        </div>
        <div className="toolkit-form-grid">
          <label className="toolkit-input-group">
            <span className="mono-subtle">After-hours calls/week</span>
            <input className="input" type="number" value={voice.leads} onChange={(event) => setVoice((current) => ({ ...current, leads: Number(event.target.value) || 0 }))} />
          </label>
          <label className="toolkit-input-group">
            <span className="mono-subtle">% unanswered</span>
            <input className="input" type="number" step="5" value={voice.loss} onChange={(event) => setVoice((current) => ({ ...current, loss: Number(event.target.value) || 0 }))} />
          </label>
          <label className="toolkit-input-group">
            <span className="mono-subtle">Close rate (%)</span>
            <input className="input" type="number" value={voice.close} onChange={(event) => setVoice((current) => ({ ...current, close: Number(event.target.value) || 0 }))} />
          </label>
          <label className="toolkit-input-group">
            <span className="mono-subtle">Avg transaction ($)</span>
            <input className="input" type="number" step="500" value={voice.value} onChange={(event) => setVoice((current) => ({ ...current, value: Number(event.target.value) || 0 }))} />
          </label>
        </div>
        <div className="toolkit-calc-result">
          <div className="mono-subtle">ANNUAL REVENUE LOST FROM MISSED CALLS</div>
          <div className="toolkit-result-value" style={{ color: BLUE }}>
            ${voiceLoss.toLocaleString()}
          </div>
          <div className="mono-subtle">Starter voice agent ($3,900/yr) pays for itself in {voiceLoss > 0 ? Math.ceil((3900 / voiceLoss) * 52) : 0} weeks.</div>
        </div>
      </div>
    </div>
  );
}

function LinkedInView() {
  return (
    <>
      {linkedinPosts.map((post) => (
        <ToolkitBlock key={post.title} label={post.title} accent={post.accent}>
          <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
            {post.text}
          </div>
        </ToolkitBlock>
      ))}
      <ToolkitBlock label="CONNECTION TARGETING — 20-30/DAY" accent={TEAL}>
        <div className="toolkit-copy" style={{ whiteSpace: "pre-line" }}>
          {`PRIMARY:
→ Personal injury + family law attorneys — SI/Manhattan
→ Dental practice owners and office managers
→ Med spa owners and operators
→ Real estate agents and appraisers — NY/NJ
→ Independent CPAs and financial advisors
→ Photographers, stylists, creatives
→ Content creators and personal brand builders

SECONDARY (referral sources):
→ Business attorneys and CPAs
→ Commercial real estate brokers
→ Chamber of commerce members

CONNECTION NOTE (under 300 chars):
"Hi [Name] — I work in digital intelligence auditing for businesses and professionals in NY. Would love to connect. — Ola"

BANNER (Canva — 10 minutes):
Background: Dark (#0D0D0D)
Left: "Sovereign X Audits" [gold] · "BlackFur Capital Group LLC" [gold smaller]
Right: "Digital Intelligence · X Image Audit · Voice Agents" · "Find what's costing you clients." [gold italic]`}
        </div>
      </ToolkitBlock>
    </>
  );
}

function FallbackToolkitView({ document }: { document: ToolkitDocument }) {
  return (
    <div className="toolkit-frame" style={{ borderLeftColor: GOLD }}>
      <div className="toolkit-copy" style={{ whiteSpace: "pre-wrap" }}>
        {document.body}
      </div>
    </div>
  );
}

export function ToolkitSectionView({ document }: { document?: ToolkitDocument }) {
  if (!document) {
    return <Panel title="Toolkit">Select a toolkit document.</Panel>;
  }

  const content = (() => {
    switch (document.id) {
      case "offer-pricing":
        return <OfferPricingView />;
      case "research":
        return <ResearchView />;
      case "qa-prompts":
        return <PromptsView />;
      case "outreach":
        return <OutreachView />;
      case "objections":
        return <ObjectionsView />;
      case "impact-matrix":
        return <MatrixView />;
      case "roi-calculator":
        return <RoiCalculatorView />;
      case "linkedin":
        return <LinkedInView />;
      default:
        return <FallbackToolkitView document={document} />;
    }
  })();

  return (
    <Panel title={document.title} aside={<span className="mono-subtle">{document.lastUpdated}</span>}>
      {content}
    </Panel>
  );
}
