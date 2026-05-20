const PROCESS_STEPS = [
  { num: "01", title: "Inquiry lands",         text: "The client fills out the intake form and the order is written into the shared queue." },
  { num: "02", title: "Brief is shaped",        text: "The order gets a clear package, summary, and service type so the operator knows what to do." },
  { num: "03", title: "Command center updates", text: "A live record appears in the dashboard with status, timing, and the latest notes." },
  { num: "04", title: "Delivery begins",        text: "The order moves into review, follow-up, and completion without the client needing to resend anything." },
];

export function ProcessSection() {
  return (
    <section className="compact">
      <div className="wrap">
        <div className="sec-head">
          <div className="label">Process</div>
          <h2>What happens after the client clicks submit.</h2>
          <p className="sub">
            From the first form field to the final delivered brief — every step is sequenced, logged, and visible in the command center.
          </p>
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
  );
}
