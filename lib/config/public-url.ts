function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getPublicUrl(): string {
  const candidate =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.SX_PUBLIC_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";

  return normalizeUrl(candidate);
}
