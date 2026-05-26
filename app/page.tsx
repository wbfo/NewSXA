import type { Metadata } from "next";
import { IntakeClient } from "@/components/intake-client";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sxaudits.com/#organization",
      name: "Sovereign X Audits",
      legalName: "BlackFur Capital Group LLC",
      alternateName: "BlackFur Capital Group LLC",
      url: "https://sxaudits.com",
      logo: { "@type": "ImageObject", url: "https://sxaudits.com/og-image.png" },
      founder: { "@type": "Person", name: "Ola Olaitan", url: "https://aicouncilconductor.com" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
      contactPoint: { "@type": "ContactPoint", email: "sxa@sxaudits.com", contactType: "customer service", areaServed: "US" },
      sameAs: ["https://aicouncilconductor.com"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://sxaudits.com/#service",
      name: "Sovereign X Audits",
      description: "Digital intelligence audits, personal brand audits, and voice agent services for businesses and professionals.",
      url: "https://sxaudits.com",
      priceRange: "$350 - $5000",
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
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://sxaudits.com/blog?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://sxaudits.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you gather the findings?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every audit runs through the AICC methodology — a five-stage process where findings are generated from live web research, challenged by a critic layer, cross-referenced across multiple sources, refined into dollar figures, and reviewed by a human conductor before delivery."
          }
        },
        {
          "@type": "Question",
          "name": "Is this automated or does a real person review it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both. AI systems gather and structure the research. A human conductor reviews every finding before it reaches you."
          }
        },
        {
          "@type": "Question",
          "name": "What if the audit doesn't find anything significant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You still receive the full report. If the findings are minor, the report will say so clearly. You pay for the truth — not for inflated problems."
          }
        },
        {
          "@type": "Question",
          "name": "What is your refund policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Once the audit is delivered, the findings are yours to keep. If we fail to deliver within the stated 48–72 hour window without prior communication, we will discuss a resolution directly."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after I submit the form?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You will receive an invoice link within 30 minutes. After payment is confirmed, your audit begins. Delivery follows within 48–72 hours via email."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between Standard and Deep?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard covers all 21 sections with dollar figures and a priority sequence. Deep adds competitive context, a prioritized impact matrix, and the AI Readiness section with a Voice Agent ROI calculation."
          }
        }
      ]
    }
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

export default function RootPage() {
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
