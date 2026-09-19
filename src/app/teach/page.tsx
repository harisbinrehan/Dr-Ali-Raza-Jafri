import type { Metadata } from "next";
import { teach } from "@/content/pages";
import { getPolicy } from "@/lib/catalog";
import { fillPolicy } from "@/lib/policy-text";
import { revealDelay } from "@/lib/motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

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
        <p className="mt-6 max-w-2xl leading-relaxed text-ink/80 animate-rise [animation-delay:160ms]">{teach.intro}</p>
      </PageHeader>

      <section aria-label="At a glance" className="container-x">
        <ul data-reveal className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {teach.highlights.map((h, i) => (
            <li key={h.title} className="bg-card p-8 sm:p-10">
              <span className="font-mono text-xs text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-10 font-display text-[1.875rem] leading-tight text-ink">{fillPolicy(h.title, policy)}</h2>
              <p className="mt-4 leading-relaxed text-muted">{fillPolicy(h.body, policy)}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="container-x section-y grid gap-16 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-7">
          {teach.sections.map((s) => (
            <section key={s.heading} aria-labelledby={`teach-${s.heading}`}>
              <h2 id={`teach-${s.heading}`} data-reveal className="font-display text-display-sm text-ink">
                {s.heading}
              </h2>
              <div className="prose-copy mt-6">
                {s.paragraphs.map((p, i) => (
                  <p key={i} data-reveal style={revealDelay(i * 70)}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside aria-labelledby="apply-title" className="lg:col-span-4 lg:col-start-9">
          <div data-reveal className="rounded-lg bg-ink p-8 text-white sm:p-10 lg:sticky lg:top-[calc(var(--header-offset,4.5rem)+2rem)] lg:transition-[top] lg:duration-500">
            <h2 id="apply-title" className="font-display text-display-sm">
              {teach.apply.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{teach.apply.body}</p>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={teach.apply.primary.href} variant="accent" size="lg" arrow>
                {teach.apply.primary.label}
              </ButtonLink>
              <ButtonLink href={teach.apply.secondary.href} variant="outline-light" size="lg">
                {teach.apply.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
