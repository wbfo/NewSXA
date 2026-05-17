import Link from "next/link";

export const metadata = { title: "Terms of Service — Sovereign X Audits" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono px-8 py-24 max-w-3xl mx-auto">
      <Link href="/" className="text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase">← Back</Link>
      <h1 className="mt-8 text-3xl font-display tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-xs text-zinc-500">Effective date: May 2026 — BlackFur Capital Group LLC</p>

      <div className="mt-10 space-y-8 text-sm text-zinc-400 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">1. Services</h2>
          <p>
            Sovereign X Audits is a service of BlackFur Capital Group LLC ("Company," "we," "us"). We provide
            digital intelligence audits, reputational analysis, and strategic digital structuring services to
            individuals and organisations ("Client," "you"). Engagements are governed by a separate service
            agreement executed between the Client and the Company, which takes precedence over these general terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">2. Eligibility and Authorised Use</h2>
          <p>
            By accessing this platform or submitting an intake form, you confirm that you are at least 18 years
            of age and are authorised to enter into binding agreements on behalf of yourself or the entity you
            represent. Access to the client portal is limited to individuals whose accounts have been verified
            by the Company.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">3. Confidentiality of Deliverables</h2>
          <p>
            All audit reports, findings, summaries, and supporting materials delivered by the Company
            ("Deliverables") are confidential and intended solely for the named Client. You agree not to
            reproduce, distribute, publish, or disclose any Deliverable to third parties without prior written
            consent from the Company.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">4. Payment and Refunds</h2>
          <p>
            Fees for services are set out in your service agreement. Payment is due as specified therein.
            The Company reserves the right to pause or discontinue work on an engagement if payment obligations
            are not met. Refund eligibility is determined on a case-by-case basis at the sole discretion of the
            Company, taking into account work completed at the time of the refund request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">5. Limitation of Liability</h2>
          <p>
            The Company's Deliverables are provided for informational and strategic purposes only and do not
            constitute legal, financial, or professional advice. To the fullest extent permitted by applicable law,
            the Company's total liability for any claim arising from an engagement shall not exceed the fees paid
            by the Client for that engagement in the preceding 90 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">6. Intellectual Property</h2>
          <p>
            The Company retains all intellectual property rights in its proprietary methodology, frameworks,
            and tooling. Deliverables provided to a Client are licensed for that Client's internal use only.
            No Deliverable may be used to build a competing service or redistributed commercially.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">7. Termination</h2>
          <p>
            Either party may terminate an engagement by providing written notice. The Company reserves the right
            to refuse or discontinue service at any time, including where continued service would conflict with
            applicable law or the Company's internal policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which BlackFur Capital Group LLC is
            registered. Any disputes shall be resolved through binding arbitration or in the courts of that
            jurisdiction, as elected by the Company.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">9. Changes to These Terms</h2>
          <p>
            The Company may update these terms from time to time. Continued use of the platform or services
            following notice of an update constitutes acceptance of the revised terms. Material changes will
            be communicated to active clients directly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">10. Contact</h2>
          <p>
            For questions about these terms, contact your assigned Sovereign X representative or reach us
            through the intake form.
          </p>
        </section>

      </div>
    </div>
  );
}
