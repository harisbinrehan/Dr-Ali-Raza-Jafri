import type { Metadata } from "next";
import { teach } from "@/content/pages";
import { getPolicy } from "@/lib/catalog";
import { fillPolicy } from "@/lib/policy-text";
import { revealDelay } from "@/lib/motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { RevealHeading } from "@/components/ui/SectionHeading";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Teach on Alignodontic Academy",
  description: "For clinicians who want to teach what they actually do. Build a course, price it yourself, and be paid to a Pakistani bank account.",
  alternates: { canonical: "/teach" },
};

export default async function TeachPage() {
  const policy = await getPolicy();

  return (
    <>
      <PageHeader eyebrow="Teach with us" title={teach.title} lead={teach.lead}>
        <p className="mt-6 leading-relaxed text-muted animate-rise [animation-delay:300ms]">{teach.intro}</p>
      </PageHeader>

      <section aria-label="At a glance" className="section-y-sm">
        <ol className="container-x grid gap-x-8 md:grid-cols-3">
          {teach.highlights.map((h, i) => (
            <li key={h.title} data-reveal style={revealDelay(i * 110)} className="border-t border-ink py-10 md:pr-6">
              <h2 className="font-display text-h3 text-ink">{fillPolicy(h.title, policy)}</h2>
              <p className="mt-5 leading-[1.8] text-muted">{fillPolicy(h.body, policy)}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="container-x grid gap-20 pb-32 pt-8 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-20 lg:col-span-7">
          {teach.sections.map((s) => (
            <section key={s.heading} aria-labelledby={`teach-${s.heading}`} className="grid gap-6 border-t border-line pt-10 xl:grid-cols-[13rem_1fr] xl:gap-10">
              <RevealHeading as="h2" id={`teach-${s.heading}`} className="text-[2rem] leading-tight text-ink">
                {s.heading}
              </RevealHeading>
              <div className="prose-copy max-w-[62ch]">
                {s.paragraphs.map((p, i) => (
                  <p key={i} data-reveal style={revealDelay(i * 80)}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside aria-labelledby="apply-title" className="lg:col-span-4 lg:col-start-9">
          <div data-reveal className="bg-deep p-9 text-on-deep sm:p-11 lg:sticky lg:top-[calc(var(--header-offset,4.75rem)+2.5rem)] lg:transition-[top] lg:duration-700">
            <h2 id="apply-title" className="font-display text-h3">
              {teach.apply.heading}
            </h2>
            <p className="mt-5 leading-[1.8] text-on-deep-muted">{teach.apply.body}</p>
            <div className="mt-10 flex flex-col gap-3">
              <ButtonLink href={teach.apply.primary.href} variant="on-deep" size="lg" arrow>
                {teach.apply.primary.label}
              </ButtonLink>
              <ButtonLink href={teach.apply.secondary.href} variant="outline-deep" size="lg">
                {teach.apply.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
