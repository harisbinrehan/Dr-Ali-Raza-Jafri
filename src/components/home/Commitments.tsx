import { home, promises } from "@/content/pages";
import { revealDelay } from "@/lib/motion";
import { ArrowLink } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionHeading";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

/** "What you get for the money" — three commitments, set as an editorial list. */
export function Commitments() {
  return (
    <section aria-labelledby="promise-title" className="section-y relative isolate overflow-hidden bg-deep text-on-deep">
      <DarkBackdrop glow={false} />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionIntro id="promise-title" tone="deep" title={home.promise.heading} />
          <div data-reveal className="mt-10 text-on-deep">
            <ArrowLink href="/faq">{home.promise.moreLabel}</ArrowLink>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {promises.map((p, i) => (
            <li key={p.title} data-reveal style={revealDelay(i * 110)} className="grid gap-4 border-t border-deep-line py-10 first:border-t-0 first:pt-2 sm:grid-cols-[1fr_1.15fr] sm:gap-10">
              <h3 className="font-display text-h3 text-on-deep">{p.title}</h3>
              <p className="leading-[1.6] text-on-deep-muted sm:pt-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
