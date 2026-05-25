const AICC_STEPS = [
  { num: "01", icon: "🎯", title: "Generator", text: "Creates the first pass, gathers the raw inputs, and turns the intake into an actionable brief." },
  { num: "02", icon: "🔍", title: "Critic",    text: "Challenges weak assumptions, catches gaps, and makes the intake more defensible before it ships." },
  { num: "03", icon: "✓", title: "Verifier",  text: "Checks the details against the source material and confirms the order is ready for review." },
  { num: "04", icon: "✨", title: "Refiner",   text: "Shapes the order into something clearer, tighter, and easier to act on in the command center." },
  { num: "05", icon: "💎", title: "Specialist", text: "Turns the verified brief into a usable engagement path with the right next action." },
];

export function AICCSection() {
  return (
    <section className="aicc-block">
      <div className="wrap">
        <div className="sec-head aicc-head">
          <div className="label">AICC method</div>
          <h2>
            Five stages. Every finding defended before it reaches you.
          </h2>
          <p className="sub">
            Nothing reaches you unless it&apos;s defensible. Not fast generation — verified intelligence.
          </p>
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
  );
}
