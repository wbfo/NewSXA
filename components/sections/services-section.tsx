const SERVICE_CARDS = [
  {
    title: "Digital Standard",
    icon: "◈",
    desc: "A clean, structured review of the website, conversion friction, and quick wins.",
    bullets: ["Website & content review", "Conversion leaks", "Clear next-step brief"],
  },
  {
    title: "Digital Deep",
    icon: "✦",
    desc: "A more detailed audit with technical notes, competitive context, and revenue impact.",
    bullets: ["Technical analysis", "Competitive context", "ROI-facing findings"],
  },
  {
    title: "X Image Audit",
    icon: "◎",
    desc: "A premium brand and public-presence review for professionals and creators.",
    bullets: ["Personal brand review", "Public presence audit", "Image alignment"],
  },
];

export function ServicesSection() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head pm-reveal">
          <div className="label">Service entry points</div>
          <h2>Three ways a client can step into the system.</h2>
          <p className="sub">
            Each tier is designed to match where a client is in their growth process — from a fast structured review to a premium brand and visibility build.
          </p>
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
      </div>
    </section>
  );
}
