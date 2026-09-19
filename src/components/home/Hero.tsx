import Image from "next/image";
import Link from "next/link";
import type { CourseSummary } from "@/lib/catalog";
import { home } from "@/content/pages";
import { displayTitle, formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowRight } from "@/components/ui/Icons";
import { CourseImage } from "@/components/course/CourseImage";
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
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16">
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
            <span className="block text-accent animate-mask [animation-delay:140ms]">{home.headline[1]}</span>
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

          </div>

          {/* Photograph with the featured course laid over its corner. */}
          <div className="relative lg:col-span-7 lg:col-start-6 lg:pb-16">
            <Parallax speed={-0.05}>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-canvas-alt sm:aspect-[16/10]">
                <Image
                  src="/images/teaching-whiteboard.jpg"
                  alt="Prof. Dr. Ali Raza Jafri teaching at a whiteboard"
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(min-width: 1360px) 700px, (min-width: 1024px) 54vw, 100vw"
                  className="object-cover object-[62%_38%] animate-settle"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/10" />
                <figcaption className="label absolute left-5 right-5 top-5 text-white/90">Still from Diagnosis and Treatment Planning</figcaption>
              </figure>
            </Parallax>

            <Parallax
              speed={0.04}
              className="relative z-10 -mt-14 ml-auto w-[86%] sm:w-[62%] lg:absolute lg:bottom-0 lg:-left-10 lg:mt-0 lg:ml-0 lg:w-[19rem]"
            >
              <Link
                href={`/courses/${featured.slug}`}
                className="group block rounded-xl bg-[#f7f4ee] p-3 text-[#17181c] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.5)] ring-1 ring-black/5 animate-rise [animation-delay:650ms]"
              >
                <CourseImage src={featured.thumbnailUrl} title={displayTitle(featured.title)} sizes="320px" className="rounded-md" />
                <div className="px-2 pb-1.5 pt-4">
                  <p className="label text-[#a05a1c]">Featured</p>
                  <p className="mt-2 font-display text-h4 leading-snug">{displayTitle(featured.title)}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3.5">
                    <span className="text-[0.9375rem] font-semibold text-[#a05a1c]">{formatPrice(featured.effectivePriceCents, featured.currency)}</span>
                    <ArrowRight className="size-4 transition-transform duration-700 ease-(--ease-editorial) group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Parallax>
          </div>
        </div>

        <dl className="mt-16 grid border-t border-line lg:mt-24" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
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
