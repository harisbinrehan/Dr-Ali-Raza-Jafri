import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/pages";
import { getCourses } from "@/lib/catalog";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { RichText } from "@/components/ui/RichText";
import { RevealHeading } from "@/components/ui/SectionHeading";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: "Alignodontic Academy publishes clinical courses for practising dentists and dental students in Pakistan, written and recorded by clinicians who still see patients.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const courses = await getCourses();

  return (
    <>
      <PageHeader eyebrow="About us" title={about.title} lead={about.lead} />

      <figure className="container-x pt-12 lg:pt-16">
        <div className="relative aspect-[4/3] overflow-hidden bg-canvas-alt sm:aspect-[21/9]">
          <Parallax speed={-0.06} className="absolute -inset-y-[10%] inset-x-0">
            <Image
              src="/images/teaching-whiteboard.jpg"
              alt="Prof. Dr. Ali Raza Jafri teaching at a whiteboard"
              fill
              preload
              sizes="(min-width: 1360px) 1232px, 100vw"
              className="object-cover object-[60%_35%] animate-settle"
            />
          </Parallax>
        </div>
        <figcaption className="mt-4 text-[0.8125rem] text-muted">Still from Diagnosis and Treatment Planning</figcaption>
      </figure>

      <section aria-label="Who we are" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
          <blockquote data-reveal className="lg:col-span-6">
            <p className="font-display text-h2 italic text-ink">
              <span aria-hidden="true" className="text-accent">“</span>
              {about.pullQuote}
              <span aria-hidden="true" className="text-accent">”</span>
            </p>
          </blockquote>
          <div className="prose-copy lg:col-span-4 lg:col-start-9 lg:pt-3">
            {about.body.map((p, i) => (
              <p key={i} data-reveal style={revealDelay(i * 100)}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="section-y bg-canvas-alt">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <RevealHeading id="how-title" className="text-h2 text-ink">
              {about.howItWorks.heading}
            </RevealHeading>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {about.howItWorks.body.map((p, i) => (
              <li key={i} data-reveal style={revealDelay(i * 110)} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-9 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr]">
                <span className="font-display text-[2rem] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[1.0625rem] leading-[1.8] text-ink-soft">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="teaching-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <RevealHeading id="teaching-title" className="text-h2 text-ink">
              {about.teaching.heading}
            </RevealHeading>
            <p data-reveal className="prose-copy mt-8 max-w-lg">
              <RichText text={about.teaching.body} />
            </p>
          </div>
          <div data-reveal className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <ButtonLink href="/courses" size="lg" arrow>
              Browse {courses.length} courses
            </ButtonLink>
            <ArrowLink href={`/instructors/${site.instructorSlug}`}>{site.instructorName}</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
