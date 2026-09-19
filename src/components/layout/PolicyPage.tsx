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

      <div className="container-x grid gap-12 border-t border-line pb-28 pt-14 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-offset,4.5rem)+2rem)] transition-[top] duration-500">
            <p className="eyebrow text-muted">On this page</p>
            <ol className="mt-5 space-y-3 border-l border-line">
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-ink hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
          {doc.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} aria-labelledby={`${anchor(s.heading)}-title`} className="scroll-mt-28 border-b border-line py-10 first:pt-0">
              <h2 id={`${anchor(s.heading)}-title`} className="font-display text-[1.75rem] leading-tight text-ink">
                {s.heading}
              </h2>
              <div className="prose-copy mt-5">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>
                    <RichText text={fillPolicy(p, policy)} />
                  </p>
                ))}
              </div>
            </section>
          ))}

          <address className="mt-10 space-y-1 text-sm not-italic leading-relaxed text-muted">
            <p>
              {contact.name}
              {contact.address && `, ${contact.address}`}
            </p>
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                  {contact.email}
                </a>
              </p>
            )}
            <p className="pt-3 text-ink [&_a]:underline [&_a]:underline-offset-4">
              <RichText text="Questions about this page? [Contact us](/contact)." />
            </p>
          </address>
        </div>
      </div>
    </>
  );
}
