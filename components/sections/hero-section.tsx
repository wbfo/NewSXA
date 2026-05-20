import { ParallaxBg } from "@/components/ui/parallax-bg";

export function HeroSection() {
  return (
    <section className="hero" id="hero">
      <ParallaxBg />
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
            <div className="hero-seal-wrap">
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
                <text x="210" y="238" textAnchor="middle" fontFamily="Georgia, serif" fontSize="132" fontStyle="italic" fontWeight="700" fill="var(--gold)">SX</text>
                <text x="210" y="332" textAnchor="middle" fontFamily="var(--mono)" fontSize="18" letterSpacing="7" fill="var(--gold)">SOVEREIGN X AUDITS</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
