import type { PolicyDocument } from "@/content/policies";
import type { Contact, Policy } from "@/lib/catalog";
import { fillPolicy } from "@/lib/policy-text";
import { PageHeader } from "@/components/layout/PageHeader";
import { RichText } from "@/components/ui/RichText";

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Shared layout for terms, privacy, refunds, delivery, service policy and pricing. */
export function PolicyPage({ doc, policy, contact }: { doc: PolicyDocument; policy: Policy; contact: Contact }) {
  return (
    <>
      <PageHeader eyebrow="Policies" title={doc.title} lead={<RichText text={fillPolicy(doc.intro, policy)} />} />

      <div className="container-x grid gap-8 pb-16 pt-8 lg:grid-cols-12 lg:gap-8 lg:pt-10">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-offset,4rem)+2.5rem)] transition-[top] duration-700">
            <p className="label text-muted">On this page</p>
            <ol className="mt-6 space-y-1">
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="link-line inline-block py-1 text-[0.875rem] text-muted transition-colors hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-7 lg:col-start-5">
          {doc.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} aria-labelledby={`${anchor(s.heading)}-title`} className="grid scroll-mt-20 gap-3 border-t border-line py-6 first:border-t-0 first:pt-0 xl:grid-cols-[13rem_1fr] xl:gap-10">
              <h2 id={`${anchor(s.heading)}-title`} className="font-display text-h4 text-ink">
                {s.heading}
              </h2>
              <div className="prose-copy max-w-[62ch]">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>
                    <RichText text={fillPolicy(p, policy)} />
                  </p>
                ))}
              </div>
            </section>
          ))}

          <address className="mt-4 space-y-1 border-t border-line pt-6 text-[0.875rem] not-italic leading-relaxed text-muted">
            <p>
              {contact.name}
              {contact.address && `, ${contact.address}`}
            </p>
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`} className="link-quiet text-ink">
                  {contact.email}
                </a>
              </p>
            )}
            <p className="pt-3 text-ink [&_a]:underline [&_a]:decoration-accent [&_a]:underline-offset-4">
              <RichText text="Questions about this page? [Contact us](/contact)." />
            </p>
          </address>
        </div>
      </div>
    </>
  );
}
