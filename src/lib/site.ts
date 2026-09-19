export const site = {
  name: "Alignodontic Academy",
  instructorName: "Prof. Dr. Ali Raza Jafri",
  instructorSlug: "prof-dr-ali-raza-jafri",
  tagline: "Clinical dental courses, taught by dentists still in practice.",
  description:
    "Continuing dental education for practising dentists in Pakistan. Clear aligners, cephalometrics, infection control and interproximal reduction, taught by clinicians who still see patients.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dralirazajafri.com").replace(/\/$/, ""),
} as const;

/**
 * Routes served by the existing platform. They are plain <a> links (full page
 * loads) because they are rendered by the legacy app, not by this one.
 */
export const legacyRoutes = {
  login: "/login",
  register: "/register",
  cart: "/cart",
  checkout: "/checkout",
  learn: "/learn",
  learnCourse: (courseId: string) => `/learn/${courseId}`,
  accountDelete: "/account/delete",
} as const;

export const primaryNav = [
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refunds", label: "Returns and refunds" },
  { href: "/shipping", label: "Delivery" },
  { href: "/service-policy", label: "Service policy" },
  { href: "/pricing", label: "Pricing" },
] as const;

/** Top-level paths rendered by this app (must mirror OWNED_ROUTES in next.config.ts). */
const OWNED_PREFIXES = ["/courses", "/instructors", "/about", "/faq", "/contact", "/teach", "/pricing", "/terms", "/privacy", "/refunds", "/returns", "/shipping", "/service-policy"];

/** True when a link can use client-side navigation within this app. */
export function isOwnedRoute(href: string) {
  if (!href.startsWith("/")) return false;
  const path = href.split(/[?#]/)[0];
  return path === "/" || OWNED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
