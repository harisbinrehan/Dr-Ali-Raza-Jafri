import type { Contact } from "@/lib/catalog";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Clock, Mail, Phone } from "@/components/ui/Icons";

/** Closing band: one primary action, plus the people to talk to first. */
export function FinalCta({ contact, courseCount }: { contact: Contact; courseCount: number }) {
  return (
    <section aria-labelledby="final-cta-title" className="section-y">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-lg bg-accent-soft px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full border border-accent/25" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 size-52 rounded-full border border-accent/25" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p data-reveal className="eyebrow text-accent-deep">
                {site.name}
              </p>
              <h2 id="final-cta-title" data-reveal className="mt-5 font-display text-display-md text-ink">
                {site.tagline}
              </h2>
              <div data-reveal className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/courses" size="lg" arrow>
                  Browse {courseCount} courses
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Contact us
                </ButtonLink>
              </div>
            </div>

            <address data-reveal className="space-y-4 border-t border-accent/30 pt-8 not-italic lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-ink hover:text-accent-deep">
                  <Phone className="size-5 shrink-0 text-accent-deep" />
                  <span className="link-underline font-medium">{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-ink hover:text-accent-deep">
                  <Mail className="size-5 shrink-0 text-accent-deep" />
                  <span className="link-underline break-all font-medium">{contact.email}</span>
                </a>
              )}
              {contact.hours && (
                <p className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent-deep" />
                  {contact.hours}
                </p>
              )}
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
