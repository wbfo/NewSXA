const PRICING_BLOCKS = [
  {
    title: "Sovereign X Digital Audits",
    rows: [
      { name: "Standard Audit",          promo: "$500 promo",       reg: "$750 regular" },
      { name: "Deep Audit",              promo: "$1,500 promo",     reg: "$2,000 regular" },
      { name: "Deep + Intake",           promo: "$2,000 promo",     reg: "$2,500 regular" },
      { name: "Individual / Personal Brand", promo: "$500 promo",   reg: "$750 regular" },
      { name: "Bulk 3–4 individuals",    promo: "$350/ea",          reg: "" },
      { name: "Bulk 5–9 individuals",    promo: "$300/ea",          reg: "" },
      { name: "Enterprise per location", promo: "$200/location",    reg: "+ $2,000 brand audit" },
    ],
  },
  {
    title: "X Image Audit",
    rows: [
      { name: "Standard",                promo: "$350 promo",       reg: "$500 regular" },
      { name: "Public Figure Tier",      promo: "$750 promo",       reg: "$1,000 regular" },
      { name: "X Attraction Audit",      promo: "$350 promo",       reg: "$500 regular" },
      { name: "Follow-Up Re-Audit",      promo: "$150–$200",        reg: "" },
      { name: "Wardrobe Blueprint Add-On", promo: "Available after any audit", reg: "" },
    ],
  },
  {
    title: "Voice Agent Services",
    rows: [
      { name: "Starter",                 promo: "$1,500 setup + $200/mo", reg: "" },
      { name: "Standard",                promo: "$2,500 setup + $350/mo", reg: "" },
      { name: "Advanced",                promo: "$4,000–$5,000 setup + $500/mo", reg: "" },
      { name: "Enterprise",              promo: "Custom + custom retainer", reg: "" },
    ],
  },
];

const REFERRALS = [
  { name: "Any audit referral",   note: "$100 gift card within 48hrs" },
  { name: "Photography referral", note: "10–15% of gig value" },
  { name: "Styling referral",     note: "10–15% of gig value" },
];

export function PricingSection() {
  return (
    <section className="compact">
      <div className="wrap">
        <div className="sec-head">
          <div className="label">Pricing</div>
          <h2>Transparent pricing. No discovery calls required.</h2>
          <p className="sub">
            Every tier is structured for operator use, with referral-ready pricing for bulk and follow-up engagements.
          </p>
        </div>
        <div className="pricing-block">
          {PRICING_BLOCKS.map((block) => (
            <article key={block.title} className="pricing-card">
              <h3>{block.title}</h3>
              {block.rows.map((row) => (
                <div key={row.name} className="pricing-row">
                  <div className="name">{row.name}</div>
                  <div className="promo">{row.promo}</div>
                  <div className="reg">{row.reg}</div>
                </div>
              ))}
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
  );
}
