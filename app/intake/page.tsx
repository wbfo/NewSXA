import { permanentRedirect } from "next/navigation";

export default function LegacyIntakePage() {
  permanentRedirect("/");
}
