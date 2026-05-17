import { IntakeClient } from "@/components/intake-client";
import { readDashboard } from "@/lib/server/store";

export const metadata = {
  title: "Client Intake | Sovereign X Audits",
  description: "Premium client intake landing page that routes directly into the command center order queue."
};

export default async function IntakePage() {
  const data = await readDashboard();
  // Strip orders from the server-side payload — this page is public and order
  // records contain client PII (name, email, phone).  The IntakeClient sidebar
  // that displays orders will render empty and reload via the authenticated
  // /api/orders endpoint, which enforces its own auth guard.
  return <IntakeClient initialData={{ ...data, orders: [] }} />;
}
