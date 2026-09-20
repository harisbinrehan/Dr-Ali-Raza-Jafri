import type { Contact } from "@/lib/catalog";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { RevealHeading } from "@/components/ui/SectionHeading";

/** The closing frame: a sleek glowing background, the academy's own line, one clear action. */
export function FinalCta({ contact, courseCount }: { contact: Contact; courseCount: number }) {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-deep text-on-deep dark:bg-transparent">
      {/* Ambient background glow to make the dark theme look premium */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 aspect-square w-[70%] rounded-full bg-[radial-gradient(closest-side,var(--color-deep-accent),transparent)] opacity-[0.15]" />
        <div className="absolute -bottom-1/4 -right-1/4 aspect-square w-[60%] rounded-full bg-[radial-gradient(closest-side,var(--color-deep-accent),transparent)] opacity-[0.15]" />
      </div>

      <div className="container-x py-16 sm:py-20">
        <p data-reveal className="label text-eyebrow-deep">
          {site.name}
        </p>
        <RevealHeading id="final-cta-title" className="mt-4 max-w-3xl text-h2 text-on-deep">
          {site.tagline}
        </RevealHeading>
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/courses" variant="on-deep" size="lg" arrow>
            Browse {courseCount} courses
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-deep" size="lg">
            Contact us
          </ButtonLink>
        </div>
        <p data-reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-deep-line pt-5 text-[0.875rem] text-on-deep-muted">
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-line text-on-deep">
              {contact.phone}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="link-line break-all text-on-deep">
              {contact.email}
            </a>
          )}
          {contact.hours && <span>{contact.hours}</span>}
        </p>
      </div>
    </section>
  );
}
