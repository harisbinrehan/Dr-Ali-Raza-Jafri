import Image from "next/image";
import { about, home } from "@/content/pages";
import { site } from "@/lib/site";
import { revealDelay } from "@/lib/motion";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { RevealHeading } from "@/components/ui/SectionHeading";

/** Who is teaching, and why that matters — using only what the site already says. */
export function InstructorIntro({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-labelledby="instructor-title" className="section-y bg-canvas-alt dark:bg-transparent">
      <div className="container-x grid gap-10 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
        <div className="md:col-span-5 lg:col-span-5">
          <figure className="lg:sticky lg:top-28">
            <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-canvas">
              <Parallax speed={-0.04} className="absolute -inset-y-[6%] inset-x-0">
                <Image src="/images/chairside-portrait.jpg" alt="Prof. Dr. Ali Raza Jafri in the clinic" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
              </Parallax>
            </div>
            <figcaption className="mt-4 text-[0.8125rem] text-muted">Still from Interproximal Reduction: A Hands-On Course</figcaption>
          </figure>
        </div>

        <div className="md:col-span-6 lg:col-span-6 md:col-start-7 lg:col-start-7 lg:pt-8">
          <p data-reveal className="label text-eyebrow">
            {home.instructor.eyebrow}
          </p>
          <RevealHeading id="instructor-title" className="mt-6 text-h2 text-ink">
            {site.instructorName}
          </RevealHeading>
          <p data-reveal style={revealDelay(100)} className="mt-5 max-w-lg text-lead text-ink-soft">
            {about.lead}
          </p>

          <blockquote data-reveal style={revealDelay(160)} className="mt-8 border-t border-line pt-6">
            <p className="font-display text-h3 text-ink">
              <span aria-hidden="true" className="text-accent">“</span>
              {about.pullQuote}
              <span aria-hidden="true" className="text-accent">”</span>
            </p>
          </blockquote>

          <p data-reveal style={revealDelay(220)} className="mt-6 max-w-lg leading-[1.6] text-muted">
            {about.body[0]}
          </p>

          <dl data-reveal style={revealDelay(260)} className="mt-8 grid grid-cols-3 border-y border-line">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse py-6 ${i > 0 ? "border-l border-line pl-5" : ""}`}>
                <dt className="mt-1.5 text-[0.8125rem] text-muted">{s.label}</dt>
                <dd className="font-display text-[2rem] leading-none tabular-nums text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={`/instructors/${site.instructorSlug}`} arrow>
              Courses by {site.instructorName}
            </ButtonLink>
            <ArrowLink href="/about">
              Read more<span className="sr-only"> about the academy</span>
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
