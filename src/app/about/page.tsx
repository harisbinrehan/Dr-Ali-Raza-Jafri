import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/pages";
import { getCourses } from "@/lib/catalog";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { RichText } from "@/components/ui/RichText";

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

      <div className="container-x">
        <figure className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink-2 sm:aspect-[21/9]">
          <Parallax speed={-0.07} className="absolute -inset-y-[10%] inset-x-0">
            <Image
              src="/images/teaching-whiteboard.jpg"
              alt="Prof. Dr. Ali Raza Jafri teaching at a whiteboard"
              fill
              preload
              sizes="(min-width: 1320px) 1224px, 94vw"
              className="object-cover object-[60%_35%] animate-settle"
            />
          </Parallax>
        </figure>
        <p className="eyebrow mt-4 text-muted">Still from Diagnosis and Treatment Planning</p>
      </div>

      <section aria-label="Who we are" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <blockquote data-reveal className="lg:col-span-5">
            <p className="font-display text-display-sm italic text-ink">“{about.pullQuote}”</p>
          </blockquote>
          <div className="prose-copy lg:col-span-6 lg:col-start-7">
            {about.body.map((p, i) => (
              <p key={i} data-reveal style={revealDelay(i * 80)}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="section-y grain relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="column-rules absolute inset-0" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <h2 id="how-title" data-reveal className="font-display text-display-md lg:col-span-4">
            {about.howItWorks.heading}
          </h2>
          <ol data-reveal className="grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-2 lg:col-span-8">
            {about.howItWorks.body.map((p, i) => (
              <li key={i} className="bg-ink p-8 sm:p-10">
                <span className="font-mono text-xs text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-8 leading-relaxed text-ink-muted">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="teaching-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="teaching-title" data-reveal className="font-display text-display-md text-ink">
              {about.teaching.heading}
            </h2>
            <p data-reveal className="prose-copy mt-6">
              <RichText text={about.teaching.body} />
            </p>
          </div>
          <div data-reveal className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <ButtonLink href="/courses" size="lg" arrow>
              Browse {courses.length} courses
            </ButtonLink>
            <ButtonLink href={`/instructors/${site.instructorSlug}`} variant="outline" size="lg">
              {site.instructorName}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
