"use client";

// Staggered particle data (generated once — deterministic, not random)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5 + 3) % 100}%`,
  top: `${(i * 7.3 + 10) % 90}%`,
  duration: `${6 + (i % 5) * 1.8}s`,
  delay: `${(i * 0.6) % 4}s`,
}));

export function ParallaxBg() {
  return (
    <>
      <div className="pm-particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="pm-particle"
            style={{ left: p.left, top: p.top, animationDuration: p.duration, animationDelay: p.delay }}
          />
        ))}
      </div>
      <div className="pm-page-bg" aria-hidden="true">
        <div className="pm-orb pm-orb-neon-blue" />
        <div className="pm-orb pm-orb-neon-amber" />
        <div className="pm-orb pm-orb-neon-purple" />
      </div>
    </>
  );
}
