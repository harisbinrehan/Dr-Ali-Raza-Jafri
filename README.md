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

**Recommended routing (the site already runs behind Caddy).** Send the public
paths to this app and leave everything else exactly where it is today, e.g.:

```caddy
@public path / /courses /courses/* /instructors/* /about /faq /contact /teach /pricing /terms /privacy /refunds /returns /shipping /service-policy /_next/* /images/* /icon.png /apple-icon.png /opengraph-image* /sitemap.xml /robots.txt
handle @public {
	reverse_proxy 127.0.0.1:3000
}
# existing handlers for /api and the SPA stay below, unchanged
```

With that split, `LEGACY_ORIGIN` should point at the existing upstream directly
(not the public domain) so the fallback rewrite can never loop. For local
development the default proxies to production, so `/checkout`, `/login` and
`/api` work on `localhost` — **do not complete purchases while testing**.

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

## Replacing images

The editorial photos are stills from the courses themselves (the platform has no
portrait of Dr. Jafri). To use new photography, replace these files keeping the
names, and update the captions that say which course a still is from:

- `public/images/teaching-whiteboard.jpg` — hero and About (landscape, ≥1280px wide)
- `public/images/chairside-portrait.jpg` — instructor section and card (portrait, 4:5)
- `public/images/teaching-whiteboard-portrait.jpg` — social share image

Course images come from each course's thumbnail on the platform.
