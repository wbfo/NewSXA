"use client";

import { useState, type FormEvent } from "react";

const TIER_OPTIONS = [
  {
    id: "Digital Standard",
    name: "Digital Standard",
    serviceType: "Digital Audit",
    pricePromo: "$500 promo",
    priceReg: "$750 regular",
    summary: "Fast, clear, and easy to submit.",
    tags: ["Website review", "Conversion leaks", "Quick wins"],
  },
  {
    id: "Digital Deep",
    name: "Digital Deep",
    serviceType: "Deep Digital Audit",
    pricePromo: "$1,500 promo",
    priceReg: "$2,000 regular",
    summary: "More detail, more signal, more confidence.",
    tags: ["Technical analysis", "Competitive context", "ROI-facing findings"],
  },
  {
    id: "X Image Audit",
    name: "X Image Audit",
    serviceType: "Image Audit",
    pricePromo: "$350 promo",
    priceReg: "$500 regular",
    summary: "Premium brand presentation for public-facing clients.",
    tags: ["Personal brand", "Public presence", "Image alignment"],
  },
];

export function IntakeInteractive() {
  const [selectedTier, setSelectedTier] = useState(TIER_OPTIONS[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    businessName: "",
    email: "",
    phone: "",
    packageName: "Digital Standard",
    serviceType: "Audit",
    budget: "",
    notes: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const pickTier = (tier: (typeof TIER_OPTIONS)[number]) => {
    setSelectedTier(tier.id);
    setForm((current) => ({ ...current, packageName: tier.name, serviceType: tier.serviceType }));
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Sovereign X Landing", status: "NEW" }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "Order submission failed.");
      setForm({ customerName: "", businessName: "", email: "", phone: "", packageName: "Digital Standard", serviceType: "Audit", budget: "", notes: "" });
      setSelectedTier(TIER_OPTIONS[0].id);
      setSuccess("Order submitted. It is now flowing into the command center.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Order submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Tier selector */}
      <section id="services-select">
        <div className="wrap">
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
                      <span className="sx-pill" style={{ color: isSelected ? "var(--neon-amber)" : "var(--subtle)", borderColor: isSelected ? "var(--neon-amber)55" : undefined }}>
                        {isSelected ? "Selected" : "Available"}
                      </span>
                    </div>
                    <div className="price-row">
                      <span className="promo text-neon-blue">{tier.pricePromo}</span>
                      {tier.priceReg ? <span className="reg">{tier.priceReg}</span> : null}
                    </div>
                    <div className="tier-summary">{tier.summary}</div>
                  </div>
                  <div className="tier-tags">
                    {tier.tags.map((tag) => (
                      <span key={tag} className="chip bg-surface border-border text-subtle">{tag}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="wrap">
          <h2>When the brief feels right, send the order and let the system do the rest.</h2>
          <p className="sub">
            The client gets a premium intake experience, and the operator gets a structured queue item with the right package already selected.
          </p>
          <div className="confirm-actions">
            <a className="btn btn-primary" href="#intake">Submit Intake <span className="arrow">→</span></a>
            <a className="btn btn-ghost" href="/login">Client Login</a>
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

      {/* Intake form */}
      <section className="compact" id="intake">
        <div className="wrap">
          <div className="order-layout order-layout--solo">
            <div className="order-summary">
              <div className="confirm-stage">
                <div className="confirm-check">⌁</div>
                <h1>Start your audit</h1>
                <div className="summary">
                  Fill out the form below and your team will be in touch within <span className="gold">24 hours</span> to confirm your engagement and next steps.
                </div>
              </div>
              <form className="order-form" onSubmit={submitOrder}>
                <div className="intake-form-grid">
                  <input className="field" placeholder="Client name *" value={form.customerName} onChange={(e) => updateField("customerName", e.target.value)} required />
                  <input className="field" placeholder="Business name *" value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)} required />
                  <input className="field" placeholder="Email *" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
                  <input className="field" placeholder="Phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                  <select
                    className="field"
                    value={form.packageName}
                    onChange={(e) => {
                      const packageName = e.target.value;
                      updateField("packageName", packageName);
                      const matched = TIER_OPTIONS.find((t) => t.name === packageName);
                      if (matched) { setSelectedTier(matched.id); updateField("serviceType", matched.serviceType); }
                    }}
                  >
                    <option>Digital Standard</option>
                    <option>Digital Deep</option>
                    <option>X Image Audit</option>
                    <option>Voice Agent</option>
                  </select>
                  <input className="field" placeholder="Service type" value={form.serviceType} onChange={(e) => updateField("serviceType", e.target.value)} />
                  <input className="field" placeholder="Budget / target value" value={form.budget} onChange={(e) => updateField("budget", e.target.value)} />
                  <textarea
                    className="field field-textarea"
                    placeholder="Notes, goals, timeline, or anything the operator should know"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    rows={5}
                  />
                </div>
                <div className="intake-form-actions">
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? "Sending…" : "Submit Order"} <span className="arrow">→</span>
                  </button>
                  <div className="confirm-foot">Your information is kept confidential and used solely to scope your engagement.</div>
                </div>
              </form>
              {error   ? <div className="intake-message intake-message-error">{error}</div>   : null}
              {success ? <div className="intake-message intake-message-success">{success}</div> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
