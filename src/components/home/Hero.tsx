import Link from "next/link";
import type { CourseSummary } from "@/lib/catalog";
import { home } from "@/content/pages";
import { displayTitle } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

type HeroProps = {
  featured: CourseSummary;
  stats: { value: number; label: string }[];
};

/**
 * Editorial opening: the headline carries the page, the featured course
 * carries the authority, and the facts line underneath says how much there
 * is to learn.
 */
export function Hero({ featured, stats }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-8 pt-16 sm:pb-10">
      <DarkBackdrop />
      <div className="container-x">
        <div className="flex items-center justify-between border-b border-line pb-4 pt-8 lg:pt-10">
          <p className="label text-eyebrow animate-fade">{home.eyebrow}</p>
          <p className="label hidden text-muted animate-fade sm:block">Taught by {site.instructorName}</p>
        </div>

        <h1 id="hero-title" className="mt-6 font-display text-hero text-ink lg:mt-8">
          <span className="mask">
            <span className="block animate-mask">{home.headline[0]}</span>
          </span>
          <span className="mask lg:pl-[16%]">
            <span className="block text-accent animate-mask [animation-delay:140ms]">{home.headline[1]}</span>
          </span>
        </h1>

        <div className="mt-8 grid gap-10 lg:mt-12 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col md:col-span-4 lg:col-span-4">
            <p className="max-w-md text-lead text-ink-soft animate-rise [animation-delay:350ms]">{home.intro}</p>
            <div className="mt-6 flex flex-col flex-wrap gap-3 animate-rise [animation-delay:480ms] sm:flex-row md:flex-col xl:flex-row">
              <ButtonLink href={home.primaryCta.href} size="lg" arrow>
                {home.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={home.secondaryCta.href} variant="outline" size="lg">
                {home.secondaryCta.label}
              </ButtonLink>
            </div>

          </div>

          {/* The featured course, given the room a photograph used to take. */}
          <div className="md:col-span-7 lg:col-span-7 md:col-start-6 lg:col-start-6">
            <Link
              href={`/courses/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-editorial) animate-rise [animation-delay:400ms] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_32px_-16px_rgb(0_0_0/0.25)]"
            >
              <div data-reveal="image" className="relative">
                <CourseImage
                  src={featured.thumbnailUrl}
                  title={displayTitle(featured.title)}
                  sizes="(min-width: 1360px) 700px, (min-width: 1024px) 54vw, 100vw"
                  imageClassName="transition-transform duration-[1600ms] ease-(--ease-editorial) group-hover:scale-[1.025]"
                />
              </div>

              <div data-reveal style={revealDelay(120)} className="p-6">
                <p className="label text-eyebrow">Featured · {featured.category?.name}</p>
                <p className="mt-2 font-display text-h3 leading-snug text-ink">{displayTitle(featured.title)}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[0.9375rem] text-muted">{featured.instructor}</span>
                  <span className="flex items-center gap-2">
                    <PriceTag priceCents={featured.priceCents} effectivePriceCents={featured.effectivePriceCents} currency={featured.currency} />
                    <ArrowRight className="size-4 text-ink transition-transform duration-700 ease-(--ease-editorial) group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <dl className="mt-10 grid gap-3 sm:gap-4 lg:mt-14" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-surface px-4 py-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:px-5 sm:py-6">
              <dd className="font-display text-[clamp(1.75rem,1.3rem+1.8vw,3rem)] leading-none tabular-nums text-ink">{s.value.toLocaleString("en-US")}</dd>
              <dt className="mt-2.5 text-[0.8125rem] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
