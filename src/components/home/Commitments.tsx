import { home, promises } from "@/content/pages";
import { revealDelay } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Certificate, Infinity, Refund } from "@/components/ui/Icons";

const icons = [Infinity, Certificate, Refund];

/** "What you get for the money" — the three commitments behind every course. */
export function Commitments() {
  return (
    <section aria-labelledby="promise-title" className="section-y grain relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="column-rules absolute inset-0" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="promise-title" tone="dark" title={home.promise.heading} />
          <div data-reveal>
            <ButtonLink href="/faq" variant="outline-light" arrow>
              {home.promise.moreLabel}
            </ButtonLink>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-3">
          {promises.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} data-reveal style={revealDelay(i * 90)} className="flex flex-col bg-ink p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="size-7 text-white/40" />
                </div>
                <h3 className="mt-14 font-display text-[1.75rem] leading-tight">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{p.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
