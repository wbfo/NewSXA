import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Build the Content-Security-Policy value.
 *
 * 'unsafe-inline'  — required by Next.js for hydration scripts (both envs).
 * 'unsafe-eval'    — required by Next.js Fast Refresh and React DevTools in
 *                    development. Intentionally EXCLUDED in production builds
 *                    where no source-mapping or hot-reload occurs.
 *
 * If you add nonce-based CSP in the future, remove 'unsafe-inline' and inject
 * a per-request nonce via a custom server or Edge middleware.
 */
function buildCsp(): string {
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebase.com wss://*.firebaseio.com",
    "frame-ancestors 'none'",
  ].join("; ");
}

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Content-Security-Policy",
    value: buildCsp(),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        // Google user profile photos from Firebase/Google Auth
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
