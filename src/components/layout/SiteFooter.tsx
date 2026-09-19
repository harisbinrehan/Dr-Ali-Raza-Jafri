import Link from "next/link";
import type { Category, Contact } from "@/lib/catalog";
import { legalNav, site } from "@/lib/site";
import { BrandLockup } from "@/components/layout/BrandLockup";

const helpLinks = [
  { href: "/contact", label: "Contact us" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/about", label: "About us" },
  { href: "/teach", label: "Teach with us" },
];

export function SiteFooter({ contact, categories }: { contact: Contact; categories: Category[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-ink text-white">
      <div className="container-x relative pb-10 pt-20 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLockup tone="dark" />
            <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-white/90">{site.tagline}</p>
          </div>

          <nav aria-label="Get help" className="lg:col-span-2">
            <h2 className="eyebrow text-white/50">Get help</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-white/80 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Subjects" className="lg:col-span-3">
            <h2 className="eyebrow text-white/50">Subjects</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/courses?category=${c.slug}`} className="link-underline text-white/80 transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-white/50">Contact us</h2>
            <address className="mt-5 space-y-3 text-[0.9375rem] not-italic leading-relaxed text-white/80">
              {contact.address && <p>{contact.address}</p>}
              {contact.phone && (
                <p>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline hover:text-white">
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.email && (
                <p>
                  <a href={`mailto:${contact.email}`} className="link-underline break-all hover:text-white">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.hours && <p className="text-white/60">{contact.hours}</p>}
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-ink-line pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
