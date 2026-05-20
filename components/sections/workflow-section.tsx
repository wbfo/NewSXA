export function WorkflowSection() {
  return (
    <section className="compact mt-24">
      <div className="wrap">
        <div className="sec-head pm-reveal">
          <div className="label text-neon-blue border-neon-blue">Workflow Logic</div>
          <h2 className="text-white">A frictionless pipeline from cold data to closed engagement.</h2>
          <p className="sub text-slate-400">
            The Agency Superstructure integrates discovery, auditing, and outreach into a single commanding interface.
          </p>
        </div>
        <div className="pipeline-steps pm-reveal">
          <article className="pipeline-step pipeline-step--blue">
            <div className="num">01</div>
            <h4>Discovery &amp; Intake</h4>
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
  );
}
