import Image from "next/image";
import Link from "next/link";
import type { CourseSummary } from "@/lib/catalog";
import { home } from "@/content/pages";
import { displayTitle } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { PriceTag } from "@/components/course/PriceTag";
import { CourseImage } from "@/components/course/CourseImage";
import { ArrowRight } from "@/components/ui/Icons";

type HeroProps = {
  featured: CourseSummary;
  stats: { value: number; label: string }[];
};

export function Hero({ featured, stats }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="column-rules absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(226_123_34/0.16),transparent)]"
      />

      <div className="container-x relative grid items-center gap-14 pb-16 pt-32 sm:pt-36 lg:min-h-[min(100svh,980px)] lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-accent-bright animate-fade">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {home.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-7 font-display text-display-xl font-normal">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block animate-mask-up">{home.headline[0]}</span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <span className="block animate-mask-up italic text-accent-bright [animation-delay:110ms]">{home.headline[1]}</span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lead text-ink-muted animate-rise [animation-delay:280ms]">{home.intro}</p>

          <div className="mt-10 flex flex-col gap-3 animate-rise [animation-delay:400ms] sm:flex-row">
            <ButtonLink href={home.primaryCta.href} variant="accent" size="lg" arrow>
              {home.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={home.secondaryCta.href} variant="outline-light" size="lg">
              {home.secondaryCta.label}
            </ButtonLink>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-ink-line pt-8 animate-rise [animation-delay:520ms]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="eyebrow mt-3 text-white/55">{s.label}</dt>
                <dd className="font-display text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-none tabular-nums">{s.value.toLocaleString("en-US")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <Parallax speed={-0.06}>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-[4/5]">
              <Image
                src="/images/teaching-whiteboard.jpg"
                alt="Prof. Dr. Ali Raza Jafri teaching at a whiteboard"
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover object-[61%_40%] animate-settle"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/30" />
              <figcaption className="eyebrow absolute left-4 right-4 top-4 text-white/80">Still from Diagnosis and Treatment Planning</figcaption>
            </figure>
          </Parallax>

          <Parallax speed={0.05} className="relative z-10 -mt-10 ml-auto w-[82%] sm:w-[62%] lg:absolute lg:-bottom-6 lg:-left-16 lg:mt-0 lg:ml-0 lg:w-[19rem]">
            <Link
              href={`/courses/${featured.slug}`}
              className="group block rounded-md bg-paper p-3 text-ink shadow-float animate-rise [animation-delay:700ms]"
            >
              <CourseImage src={featured.thumbnailUrl} title={displayTitle(featured.title)} sizes="304px" className="rounded-sm" />
              <div className="px-1.5 pb-1 pt-4">
                <p className="eyebrow text-accent-deep">Featured</p>
                <p className="mt-2 font-display text-xl leading-tight">{displayTitle(featured.title)}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <PriceTag priceCents={featured.priceCents} effectivePriceCents={featured.effectivePriceCents} currency={featured.currency} />
                  <ArrowRight className="size-4 transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
