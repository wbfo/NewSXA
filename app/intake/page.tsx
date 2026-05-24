import type { Metadata } from "next";
import { IntakeClient } from "@/components/intake-client";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sxaudits.com/#organization",
      name: "Sovereign X Audits",
      alternateName: "BlackFur Capital Group LLC",
      url: "https://sxaudits.com",
      logo: { "@type": "ImageObject", url: "https://sxaudits.com/logo.png" },
      founder: { "@type": "Person", name: "Ola Olaitan", url: "https://aicouncilconductor.com" },
      contactPoint: { "@type": "ContactPoint", email: "sxabfcg@gmail.com", contactType: "customer service", areaServed: "US" },
      sameAs: ["https://aicouncilconductor.com"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://sxaudits.com/#service",
      name: "Sovereign X Audits",
      description: "Digital intelligence audits, personal brand audits, and voice agent services for businesses and professionals.",
      url: "https://sxaudits.com",
      priceRange: "$200 - $5000",
      areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Audit & Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Digital Audit — Standard", description: "21-section digital intelligence report identifying revenue leaks, technical gaps, and AI readiness. Delivered in 48-72 hours." },
            price: "500",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Digital Audit — Deep", description: "Complete digital architecture review including forensic competitor analysis and strategy roadmap." },
            price: "1500",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Digital Audit — Deep + Intake", description: "Complete digital architecture review with advanced intake system engineering." },
            price: "2000",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Image Audit — Standard", description: "18-section personal brand intelligence report for professionals, creatives, and public figures." },
            price: "350",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Image Audit — Public Figure", description: "Deep image audit for high-profile individuals including media strategy and narrative control." },
            price: "750",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Growth Blueprint", description: "Post-audit customized growth and strategy execution blueprint." },
            price: "250",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Voice Agent Services", description: "ElevenLabs-powered voice agents for businesses losing revenue to missed after-hours calls. Ranging from Starter to Advanced." },
            price: "1500",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sovereign X Website Development", description: "Custom Next.js performance website development and continuous retainer." },
            price: "500",
            priceCurrency: "USD",
          }
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://sxaudits.com/#website",
      url: "https://sxaudits.com",
      name: "Sovereign X Audits",
      publisher: { "@id": "https://sxaudits.com/#organization" },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://sxaudits.com/?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
  ],
};

export const metadata: Metadata = {
  title: { absolute: "Sovereign X Audits — Digital Intelligence. Delivered in 72 Hours." },
  description: "Your presence is telling a story. We audit your business, brand, and image and show you exactly what it's costing you. Delivered in 72 hours. No discovery call.",
  keywords: ["digital audit", "brand audit", "AI audit", "voice agent", "image audit", "law firm marketing", "dental marketing", "med spa audit", "personal brand audit", "New York"],
  alternates: { canonical: "https://sxaudits.com" },
  openGraph: {
    title: "Sovereign X Audits",
    description: "Delivered in 72 hours. No discovery call.",
    url: "https://sxaudits.com",
    siteName: "Sovereign X Audits",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign X Audits",
    description: "Delivered in 72 hours. No discovery call.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function IntakePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IntakeClient initialData={{ orders: [], summary: { monthlyReceived: 0, survivalTarget: 1 } } as any} />
    </>
  );
}
