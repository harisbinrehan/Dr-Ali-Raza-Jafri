import Image from "next/image";
import { about, home } from "@/content/pages";
import { site } from "@/lib/site";
import { revealDelay } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";

type InstructorIntroProps = {
  stats: { value: string; label: string }[];
};

/** Who is teaching, and why that matters — using only what the site already says. */
export function InstructorIntro({ stats }: InstructorIntroProps) {
  return (
    <section aria-labelledby="instructor-title" className="section-y overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <figure data-reveal="image" className="relative aspect-[4/5] overflow-hidden rounded-md bg-ink-2">
            <Parallax speed={-0.05} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/images/chairside-portrait.jpg"
                alt="Prof. Dr. Ali Raza Jafri in the clinic"
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover"
              />
            </Parallax>
          </figure>
          <p className="eyebrow mt-4 text-muted">Still from Interproximal Reduction: A Hands-On Course</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p data-reveal className="eyebrow flex items-center gap-3 text-accent-deep">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            {home.instructor.eyebrow}
          </p>
          <h2 id="instructor-title" data-reveal style={revealDelay(80)} className="mt-5 font-display text-display-lg font-normal text-ink">
            {site.instructorName}
          </h2>
          <p data-reveal style={revealDelay(140)} className="mt-6 text-lead text-muted">
            {about.lead}
          </p>

          <blockquote data-reveal style={revealDelay(200)} className="relative mt-10 border-l-2 border-accent pl-6 sm:pl-8">
            <p className="font-display text-display-sm italic text-ink">“{about.pullQuote}”</p>
          </blockquote>

          <p data-reveal style={revealDelay(260)} className="mt-8 max-w-xl leading-relaxed text-muted">
            {about.body[0]}
          </p>

          <dl data-reveal style={revealDelay(320)} className="mt-10 grid grid-cols-3 gap-6 border-y border-line py-7">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="eyebrow mt-2.5 text-muted">{s.label}</dt>
                <dd className="font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-none tabular-nums text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal style={revealDelay(380)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={`/instructors/${site.instructorSlug}`} arrow>
              Courses by {site.instructorName}
            </ButtonLink>
            <ButtonLink href="/about" variant="quiet" className="text-[0.9375rem] font-medium">
              Read more<span className="sr-only"> about the academy</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
