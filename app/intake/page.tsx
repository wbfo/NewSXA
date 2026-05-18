import { IntakeClient } from "@/components/intake-client";
import { readDashboard } from "@/lib/server/store";

export const metadata = {
  title: {
    absolute: "Sovereign X Audits"
  },
  description: "Your presence is telling a story. We audit your business, brand, and image and show you exactly what it's costing you.",
  alternates: {
    canonical: "https://sxaudits.com/intake"
  },
  openGraph: {
    title: "Sovereign X Audits",
    description: "Delivered in 72 hours. No discovery call.",
    url: "https://sxaudits.com/intake",
    siteName: "Sovereign X Audits",
    type: "website"
  }
};

export default async function IntakePage() {
  const data = await readDashboard();
  // Strip orders from the server-side payload — this page is public and order
  // records contain client PII (name, email, phone).  The IntakeClient sidebar
  // that displays orders will render empty and reload via the authenticated
  // /api/orders endpoint, which enforces its own auth guard.
  return <IntakeClient initialData={{ ...data, orders: [] }} />;
}
