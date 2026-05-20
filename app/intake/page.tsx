import type { Metadata } from "next";
import { SiteNav } from "@/components/sections/site-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsStrip } from "@/components/sections/stats-strip";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { AICCSection } from "@/components/sections/aicc-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { IntakeInteractive } from "@/components/intake/intake-interactive";

export const metadata: Metadata = {
  title: "Client Intake",
  description: "Premium client intake — Digital Audit, Image Audit, and Voice Agent packages. Delivered in 72 hours. AICC Verified.",
};

export default function IntakePage() {
  const month = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <SiteNav />
      <HeroSection />
      <StatsStrip />
      <WorkflowSection />
      <ServicesSection />
      <FeaturedSection month={month} />
      <AICCSection />
      <ProcessSection />
      <IntakeInteractive />
      <PricingSection />
      <SiteFooter />
    </>
  );
}
