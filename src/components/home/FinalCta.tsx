import Image from "next/image";
import type { Contact } from "@/lib/catalog";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { RevealHeading } from "@/components/ui/SectionHeading";

/** The closing frame: one photograph, the academy's own line, one clear action. */
export function FinalCta({ contact, courseCount }: { contact: Contact; courseCount: number }) {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-deep text-on-deep">
      <div data-reveal="image" className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <Image src="/images/teaching-whiteboard.jpg" alt="" fill sizes="100vw" className="object-cover object-[62%_35%] opacity-45 dark:opacity-35" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/80 to-deep/20" />

      <div className="container-x flex min-h-[min(46rem,92svh)] flex-col justify-end py-20 sm:py-28">
        <p data-reveal className="label text-deep-accent">
          {site.name}
        </p>
        <RevealHeading id="final-cta-title" className="mt-6 max-w-4xl text-h1 italic text-on-deep">
          {site.tagline}
        </RevealHeading>
        <div data-reveal className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/courses" variant="on-deep" size="lg" arrow>
            Browse {courseCount} courses
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-deep" size="lg">
            Contact us
          </ButtonLink>
        </div>
        <p data-reveal className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-deep-line pt-6 text-[0.875rem] text-on-deep-muted">
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
