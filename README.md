# Alignodontic Academy — public website

The redesigned public site for Dr. Ali Raza Jafri / Alignodontic Academy
(<https://dralirazajafri.com>). Next.js 16 (App Router), React 19, Tailwind CSS 4.

## How it fits with the existing platform

The existing platform — accounts, cart, checkout and payment providers, the
learning player, teacher and admin dashboards, and the `/api` backend — is
**not modified**. This app renders only the public pages and reads the
platform's public catalogue API:

| Served by this app | Served by the existing platform (unchanged) |
| --- | --- |
| `/`, `/courses`, `/courses/:slug`, `/instructors/:slug`, `/about`, `/faq`, `/contact`, `/teach`, `/pricing`, `/terms`, `/privacy`, `/refunds`, `/returns`, `/shipping`, `/service-policy` | `/api/*`, `/login`, `/register`, `/cart`, `/checkout`, `/order-complete`, `/learn/*`, `/account/*`, `/teacher/*`, `/admin/*`, `/messages`, `/wishlist`, `/verify/*`, password and email flows, `/assets/*` |

**Enrolment hand-off.** "Enrol for free" / "Buy this course" do exactly what the
platform's own button does: add the course id to `localStorage["alignodontic.cart"]`
and open `/checkout`. Sign-in, pricing quote, coupons, order creation, the payment
provider and `/order-complete` all stay in the existing app. See `src/lib/enrolment.ts`.

**Content.** Courses, prices, subjects, contact details, stats and policy numbers
(refund window, commission, minimum withdrawal) come live from `/api/catalog/*`
and refresh every 5 minutes (ISR). Page copy that the platform hard-codes
(home, about, FAQ, policies) lives verbatim in `src/content/`.

## Deployment

Environment variables (all optional):

| Variable | Default | Purpose |
| --- | --- | --- |
| `LEGACY_ORIGIN` | `https://dralirazajafri.com` | Where unmatched paths are proxied (Next `fallback` rewrite) |
| `API_ORIGIN` | `LEGACY_ORIGIN` | Where the server reads the catalogue API |
| `NEXT_PUBLIC_SITE_URL` | `https://dralirazajafri.com` | Canonical URLs, sitemap, structured data |

```bash
npm ci
npm run build
npm run start   # PORT=3000 by default
```

**Recommended routing (the site already runs behind Caddy).** Send everything
to this app except the platform's API and its built assets, which keep going
straight to the existing upstreams:

```caddy
@platform path /api/* /assets/*
handle @platform {
	# existing handlers for the Node API and the SPA's static files, unchanged
}
handle {
	reverse_proxy 127.0.0.1:3000
}
```

This app serves the platform's own pages (`/login`, `/cart`, `/checkout`,
`/learn/*`, dashboards …) through `/platform-shell`: it fetches the platform's
HTML shell from `LEGACY_ORIGIN` and adds the site fonts, `public/legacy/skin.css`
and `public/legacy/theme.js`. The platform's JavaScript, API calls and payment
flow are untouched; the skin only redefines its Tailwind colour, font and radius
variables (light and dark), fixes its mobile overflow, and sends its links to
redesigned pages (home, courses, about …) through a full page load.
`LEGACY_ORIGIN` should point at the existing upstream directly (not the public
domain) so requests can never loop. For local development the default proxies to
production, so `/checkout`, `/login` and `/api` work on `localhost` — **do not
complete purchases while testing**.

Security headers are applied only to the routes this app owns, so the legacy
checkout keeps its own CSP and `Permissions-Policy` (required by the Safepay iframe).

## Project layout

```
src/
  app/                 routes, metadata, sitemap, robots, OG image
  components/
    ui/                Button, SectionHeading, Disclosure, Breadcrumb, Icons, Parallax, RichText
    layout/            SiteHeader, MobileMenu, SiteFooter, PageHeader, PolicyPage, RevealObserver
    home/              Hero, InstructorIntro, SubjectIndex, Commitments, FinalCta
    course/            CourseCard, CourseCatalog, EnrolPanel, Curriculum, PreviewDialog, …
    faq/, contact/
  content/             verbatim page copy ([text](/href) marks links)
  lib/                 catalog API client, enrolment hand-off, formatting, JSON-LD
public/images/         editorial photography (see below)
```

## Design system

- **Type:** Space Grotesk (headings, bold with tight tracking) and Inter (text) —
  the same pairing as the Amir Engineering project. Scale tokens `text-hero`,
  `text-h1`–`text-h4`, `text-lead` and the `label` utility live in `src/app/globals.css`.
- **Navbar and sidebar:** modelled on Amir Engineering — a sticky 64px bar with
  outlined icon buttons (search, theme, cart, menu), and a right-hand sheet for
  the mobile menu (`SiteHeader`, `MobileMenu`, `AccountLinks`).
- **Colour:** semantic tokens (`canvas`, `canvas-alt`, `surface`, `ink`, `ink-soft`,
  `muted`, `line`, `accent`, `deep`, `on-deep` …) defined once for light and once
  for dark. Components never use raw colours.
- **Themes:** light and dark via `next-themes` (`[data-theme]`), following the
  system until the visitor uses the toggle in the header or menu.
- **Shape:** square images, 8px radius on buttons, hairlines instead of boxes
  and shadows.
- **Motion:** `data-reveal` (fade-up), `data-reveal="text"` (masked headings via
  `RevealHeading`), `data-reveal="image"` (wipe + settle) and desktop-only
  `Parallax`; all observed by one `RevealObserver` and disabled under
  `prefers-reduced-motion`.

## Supabase

`src/lib/supabase.ts` and the `NEXT_PUBLIC_SUPABASE_*` variables point at a
Supabase project that is reachable (auth healthy, email sign-in enabled) but has
no tables or buckets exposed yet. Nothing on the site reads from it; the site's
data comes from the platform API above.

## Replacing images

The editorial photos are stills from the courses themselves (the platform has no
portrait of Dr. Jafri). To use new photography, replace these files keeping the
names, and update the captions that say which course a still is from:

- `public/images/teaching-whiteboard.jpg` — hero and About (landscape, ≥1280px wide)
- `public/images/chairside-portrait.jpg` — instructor section and card (portrait, 4:5)
- `public/images/teaching-whiteboard-portrait.jpg` — social share image

Course images come from each course's thumbnail on the platform.
