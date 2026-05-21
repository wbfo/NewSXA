import { permanentRedirect } from "next/navigation";
import { getPublicUrl } from "@/lib/config/public-url";

const publicUrl = getPublicUrl();

export const metadata = {
  title: "Sovereign X Audits — Digital & Image Intelligence Reports",
  description:
    "We audit your business, your brand, and your image — and show you exactly what it's costing you. Delivered in 72 hours. No discovery call.",
  alternates: {
    canonical: `${publicUrl}/intake`,
  },
};

export default function RootPage() {
  permanentRedirect("/intake");
}
