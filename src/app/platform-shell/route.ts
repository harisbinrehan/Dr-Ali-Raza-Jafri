/**
 * Serves the existing platform's pages (sign-in, cart, checkout, learning,
 * account, dashboards) with the academy's skin attached.
 *
 * The platform is a single-page app: every one of those URLs returns the same
 * HTML shell, and its JavaScript does the rest. This fetches that shell and
 * adds three things before </head> — the site fonts, /legacy/skin.css and
 * /legacy/theme.js — leaving the platform's code, API calls and payment flow
 * exactly as they are. Its security headers (CSP, Permissions-Policy for the
 * payment iframe, etc.) are passed through unchanged.
 */

const LEGACY_ORIGIN = (process.env.LEGACY_ORIGIN ?? "https://dralirazajafri.com").replace(/\/$/, "");

const INJECT = [
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />',
  '<link rel="stylesheet" href="/legacy/skin.css" />',
  '<script src="/legacy/theme.js"></script>',
].join("");

const PASS_THROUGH = [
  "content-security-policy",
  "permissions-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "strict-transport-security",
];

export async function GET() {
  const upstream = await fetch(`${LEGACY_ORIGIN}/`, {
    headers: { Accept: "text/html" },
    next: { revalidate: 60 },
  });
  const html = await upstream.text();
  const body = html.includes("</head>") ? html.replace("</head>", `${INJECT}</head>`) : html;

  const headers = new Headers({ "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
  for (const name of PASS_THROUGH) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new Response(body, { status: upstream.ok ? 200 : upstream.status, headers });
}
