import Link from "next/link";

export const metadata = { title: "Security — Sovereign X" };

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono px-8 py-24 max-w-3xl mx-auto">
      <Link href="/" className="text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase">← Back</Link>
      <h1 className="mt-8 text-3xl font-display tracking-tight">Security</h1>
      <p className="mt-4 text-xs text-zinc-500">Last updated: 2026</p>
      <div className="mt-10 space-y-6 text-sm text-zinc-400 leading-relaxed">
        <p>
          Sovereign X Audits takes the security of your data seriously. All client communications are transmitted
          over encrypted connections. Every protected route is verified server-side — no client-facing session
          can access data belonging to another client.
        </p>
        <p>
          Audit workflows are processed in an isolated, access-controlled environment. Administrative access
          is restricted to authorised operators on the approved email allowlist.
        </p>
        <p>
          Client data is scoped strictly to the individual — each client account can only view records tied
          to their own identity. Internal operational data, pricing, and methodology are never accessible
          through the client portal.
        </p>
        <p>
          To report a security concern, contact your Sovereign X representative immediately. All reports
          are investigated and receive a response within 48 hours.
        </p>
      </div>
    </div>
  );
}
