import type { NextConfig } from "next";

/**
 * The existing Alignodontic platform (accounts, cart, checkout, payments,
 * the learning player, teacher and admin dashboards, and the /api backend)
 * stays exactly as it is. This app only renders the public, marketing-facing
 * pages. Any path it does not own falls through to the legacy origin untouched,
 * so /api/*, /login, /cart, /checkout, /learn/* etc. keep working as before.
 */
const LEGACY_ORIGIN = (process.env.LEGACY_ORIGIN ?? "https://dralirazajafri.com").replace(/\/$/, "");

/** Routes rendered by this app. Headers are applied to these only, so the
 *  legacy checkout keeps its own CSP and Permissions-Policy (Safepay iframe). */
const OWNED_ROUTES = [
  "/",
  "/courses",
  "/courses/:slug",
  "/instructors/:slug",
  "/about",
  "/faq",
  "/contact",
  "/teach",
  "/pricing",
  "/terms",
  "/privacy",
  "/refunds",
  "/returns",
  "/shipping",
  "/service-policy",
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [{ source: "/:path*", destination: `${LEGACY_ORIGIN}/:path*` }],
    };
  },
  async headers() {
    return OWNED_ROUTES.map((source) => ({ source, headers: securityHeaders }));
  },
};

export default nextConfig;
