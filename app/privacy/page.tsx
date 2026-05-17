import Link from "next/link";

export const metadata = { title: "Privacy Policy — Sovereign X Audits" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono px-8 py-24 max-w-3xl mx-auto">
      <Link href="/" className="text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase">← Back</Link>
      <h1 className="mt-8 text-3xl font-display tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-xs text-zinc-500">Effective date: May 2026 — BlackFur Capital Group LLC</p>

      <div className="mt-10 space-y-8 text-sm text-zinc-400 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">1. Who We Are</h2>
          <p>
            Sovereign X Audits is operated by BlackFur Capital Group LLC ("Company," "we," "us"). This policy
            explains what personal data we collect, how we use it, and what rights you have. By submitting
            an intake form or accessing the client portal, you agree to the practices described here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">2. Information We Collect</h2>
          <p>
            We collect personal data you provide directly:
          </p>
          <ul className="list-none space-y-2 pl-4">
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Contact information</strong> — your name, email address, and phone number, submitted via the intake form.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Business information</strong> — your business name, website, social media handle, city, and category, submitted to scope your audit.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Account information</strong> — your Google account email and profile, used to authenticate access to the client portal.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Communications</strong> — messages and requests sent to us through any channel.</li>
          </ul>
          <p>
            We do not collect payment card data directly. Any payment processing is handled by a third-party
            provider subject to their own privacy terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">3. How We Use Your Information</h2>
          <p>We use the data we collect to:</p>
          <ul className="list-none space-y-2 pl-4">
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600">Scope, conduct, and deliver your audit engagement.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600">Authenticate you and manage your access to the client portal.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600">Communicate with you regarding your engagement, status updates, and deliverables.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600">Maintain internal operational records as required for our business.</li>
          </ul>
          <p>
            We do not use your data for advertising, sell it to third parties, or use it to train AI models.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">4. Data Sharing</h2>
          <p>
            We do not sell or rent your personal data. We may share it only in the following limited circumstances:
          </p>
          <ul className="list-none space-y-2 pl-4">
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Service providers</strong> — third parties who help us operate the platform (authentication, hosting, email), bound by confidentiality obligations.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Legal requirements</strong> — where we are required by law or court order to disclose information.</li>
            <li className="before:content-['—'] before:mr-2 before:text-zinc-600"><strong className="text-white">Business transfers</strong> — in connection with a merger, acquisition, or sale of assets, subject to the acquirer honouring this policy.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">5. Data Retention</h2>
          <p>
            We retain your personal data for as long as your engagement is active and for a reasonable period
            thereafter for legal and operational purposes. You may request deletion of your data at any time
            by contacting your Sovereign X representative. We will honour deletion requests within 30 days,
            subject to any legal obligations to retain certain records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">6. Security</h2>
          <p>
            We apply technical and organisational measures to protect your personal data against unauthorised
            access, disclosure, alteration, and destruction. All data in transit is encrypted. Client records
            are access-controlled and scoped to individual accounts — no client can access another client's data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">7. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict
            processing of your personal data. To exercise any of these rights, contact your Sovereign X
            representative. We will respond to all requests within 30 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">8. Changes to This Policy</h2>
          <p>
            We may update this policy as our practices evolve. Material changes will be communicated to active
            clients directly. Continued use of our services following an update constitutes acceptance of the
            revised policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white text-xs tracking-widest uppercase">9. Contact</h2>
          <p>
            For privacy questions, data requests, or concerns, contact your assigned Sovereign X representative
            or reach us through the intake form on this site.
          </p>
        </section>

      </div>
    </div>
  );
}
