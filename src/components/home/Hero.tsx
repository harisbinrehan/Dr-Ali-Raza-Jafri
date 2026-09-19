import Image from "next/image";
import Link from "next/link";
import type { CourseSummary } from "@/lib/catalog";
import { home } from "@/content/pages";
import { displayTitle } from "@/lib/format";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowRight } from "@/components/ui/Icons";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

type HeroProps = {
  featured: CourseSummary;
  stats: { value: number; label: string }[];
};

/**
 * Editorial opening: the headline carries the page, the photograph carries the
 * authority, and the facts line underneath says how much there is to learn.
 */
export function Hero({ featured, stats }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[4.75rem]">
      <DarkBackdrop />
      <div className="container-x">
        <div className="flex items-center justify-between border-b border-line pb-5 pt-10 lg:pt-14">
          <p className="label text-accent animate-fade">{home.eyebrow}</p>
          <p className="label hidden text-muted animate-fade sm:block">Taught by {site.instructorName}</p>
        </div>

        <h1 id="hero-title" className="mt-10 font-display text-hero text-ink lg:mt-14">
          <span className="mask">
            <span className="block animate-mask">{home.headline[0]}</span>
          </span>
          <span className="mask lg:pl-[16%]">
            <span className="block italic text-accent animate-mask [animation-delay:140ms]">{home.headline[1]}</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-4">
            <p className="max-w-md text-lead text-ink-soft animate-rise [animation-delay:350ms]">{home.intro}</p>
            <div className="mt-10 flex flex-col gap-3 animate-rise [animation-delay:480ms] sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={home.primaryCta.href} size="lg" arrow>
                {home.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={home.secondaryCta.href} variant="outline" size="lg">
                {home.secondaryCta.label}
              </ButtonLink>
            </div>

            <div aria-hidden="true" className="mt-auto hidden items-center gap-4 pt-16 lg:flex">
              <span className="relative h-14 w-px overflow-hidden bg-line">
                <span className="absolute inset-0 bg-ink animate-scroll-cue" />
              </span>
              <span className="label text-muted">Scroll</span>
            </div>
          </div>

          <figure className="lg:col-span-7 lg:col-start-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-canvas-alt sm:aspect-[16/10]">
              <Parallax speed={-0.05} className="absolute -inset-y-[6%] inset-x-0">
                <Image
                  src="/images/teaching-whiteboard.jpg"
                  alt="Prof. Dr. Ali Raza Jafri teaching at a whiteboard"
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(min-width: 1360px) 700px, (min-width: 1024px) 54vw, 100vw"
                  className="object-cover object-[62%_38%] animate-settle"
                />
              </Parallax>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3 text-[0.8125rem] text-muted">
              <span>Still from Diagnosis and Treatment Planning</span>
              <Link href={`/courses/${featured.slug}`} className="group inline-flex items-center gap-2 text-ink">
                <span className="text-muted">Featured —</span>
                <span className="link-line">{displayTitle(featured.title)}</span>
                <ArrowRight className="size-3.5 transition-transform duration-700 ease-(--ease-editorial) group-hover:translate-x-1" />
              </Link>
            </figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid grid-cols-3 border-t border-line lg:mt-24">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse py-7 ${i > 0 ? "border-l border-line pl-5 sm:pl-8" : ""}`}>
              <dt className="mt-2 text-[0.8125rem] text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,1.6rem+2.2vw,3.75rem)] leading-none tabular-nums text-ink">{s.value.toLocaleString("en-US")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
