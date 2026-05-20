export function StatsStrip() {
  return (
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
  );
}
