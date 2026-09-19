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

const linkClass = "link-line inline-block py-1 text-on-deep/80 transition-colors duration-500 hover:text-on-deep";

export function SiteFooter({ contact, categories }: { contact: Contact; categories: Category[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-deep text-on-deep">
      <div className="container-x pb-8 pt-14 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLockup tone="deep" />
            <p className="mt-8 max-w-xs text-[0.9375rem] leading-relaxed text-on-deep-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Get help" className="lg:col-span-2 lg:col-start-6">
            <h2 className="label text-on-deep-muted">Get help</h2>
            <ul className="mt-6 space-y-1.5 text-[0.9375rem]">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Subjects" className="lg:col-span-3">
            <h2 className="label text-on-deep-muted">Subjects</h2>
            <ul className="mt-6 space-y-1.5 text-[0.9375rem]">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/courses?category=${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label text-on-deep-muted">Contact us</h2>
            <address className="mt-6 space-y-3 text-[0.9375rem] not-italic leading-relaxed text-on-deep/80">
              {contact.address && <p>{contact.address}</p>}
              {contact.phone && (
                <p>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-line hover:text-on-deep">
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.email && (
                <p>
                  <a href={`mailto:${contact.email}`} className="link-line break-all hover:text-on-deep">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.hours && <p className="text-on-deep-muted">{contact.hours}</p>}
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-deep-line pt-6 text-[0.8125rem] text-on-deep-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-1">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line inline-block py-1 transition-colors hover:text-on-deep">
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
