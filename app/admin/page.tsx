import { DashboardClient } from "@/components/dashboard-client";
import { readDashboard } from "@/lib/server/store";
import { requireAdmin } from "@/lib/auth/server-auth";

export const metadata = {
  title: "Command Center | Sovereign X Audits",
  description: "Internal operator dashboard. Manage orders, pipeline, Hermes workflows, and approvals."
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  // Enforce admin access
  await requireAdmin();
  
  const { section = "command" } = await searchParams;
  return <DashboardClient initialData={await readDashboard()} section={section} />;
}
