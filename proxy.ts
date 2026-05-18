import { NextResponse, type NextRequest } from "next/server";

const DEV_BYPASS_ENABLED =
  process.env.SX_ENABLE_DEV_BYPASS === "true";

/**
 * Edge proxy — fast redirect layer only.
 *
 * Renamed from middleware.ts to proxy.ts per Next.js 16 convention.
 * See: https://nextjs.org/docs/messages/middleware-to-proxy
 *
 * We cannot run Firebase Admin (Node.js SDK) at the edge, so full token
 * verification happens in server components / API routes via getServerAuth().
 * Here we check that the cookie:
 *   1. Exists
 *   2. Looks structurally like a JWT (three base64url segments separated by dots)
 *
 * A forged cookie with a valid-looking structure still fails later when
 * getServerAuth() calls adminAuth.verifyIdToken() — so this guard is
 * defence-in-depth for the redirect layer, not the auth layer.
 */
function looksLikeJwt(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  // Each segment must be non-empty base64url
  return parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p) && p.length > 0);
}

export function proxy(request: NextRequest) {
  const tokenCookie = request.cookies.get("firebase-token");
  const { pathname } = request.nextUrl;

  // Protect /admin (Admin) and /portal (Client)
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
    const isDevToken = DEV_BYPASS_ENABLED &&
                      (tokenCookie?.value === "dev.bypass.token" || tokenCookie?.value === "dev-bypass-token");

    if (!tokenCookie?.value || (!looksLikeJwt(tokenCookie.value) && !isDevToken)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/login"],
};
