import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { about, home } from "@/content/pages";
import { getCategories, getCourses, getInstructor } from "@/lib/catalog";
import { plural } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { JsonLd, personSchema } from "@/lib/schema";
import { CourseCard } from "@/components/course/CourseCard";
import { ArrowLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { RevealHeading } from "@/components/ui/SectionHeading";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

export const revalidate = 300;

export async function generateStaticParams() {
  const courses = await getCourses();
  return [...new Set(courses.map((c) => c.instructorSlug))].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/instructors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructor(slug);
  if (!instructor) return {};
  return {
    title: instructor.name,
    description: instructor.headline ?? `Clinical dental courses taught by ${instructor.name} on ${site.name}.`,
    alternates: { canonical: `/instructors/${slug}` },
  };
}

export default async function InstructorPage({ params }: PageProps<"/instructors/[slug]">) {
  const { slug } = await params;
  const [instructor, courses, categories] = await Promise.all([getInstructor(slug), getCourses(), getCategories()]);
  if (!instructor) notFound();

  const theirs = courses.filter((c) => c.instructorSlug === slug);
  const subjectSlugs = new Set(theirs.map((c) => c.category?.slug).filter(Boolean));
  const subjects = categories.filter((c) => subjectSlugs.has(c.slug));
  const hours = Math.round(theirs.reduce((n, c) => n + c.totalDurationSeconds, 0) / 3600);
  // The platform's instructor page shows this total; it counts one per student per course.
  const enrolments = theirs.reduce((n, c) => n + c.studentCount, 0);
  const isLead = slug === site.instructorSlug;
  const stats = [
    { value: String(theirs.length), label: "Courses" },
    { value: enrolments.toLocaleString("en-US"), label: "Enrolments" },
    { value: String(subjects.length), label: "Subjects" },
    { value: `${hours}h`, label: "Of lessons" },
  ];

  return (
    <>
      <section aria-labelledby="instructor-name" className="relative isolate overflow-hidden pt-16">
        <DarkBackdrop />
        <div className="container-x grid gap-10 pb-12 pt-6 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-10">
          <div className="flex flex-col lg:col-span-7">
            <p className="label text-eyebrow animate-fade">{home.instructor.eyebrow}</p>
            <h1 id="instructor-name" className="mt-5 font-display text-hero text-ink">
              <span className="mask">
                <span className="block animate-mask">{instructor.name}</span>
              </span>
            </h1>
            {(instructor.headline || isLead) && (
              <p className="mt-6 max-w-lg text-lead text-ink-soft animate-rise [animation-delay:250ms]">{instructor.headline ?? about.lead}</p>
            )}

            <dl className="mt-auto grid grid-cols-2 border-t border-line pt-2 animate-rise [animation-delay:350ms] sm:grid-cols-4 lg:mt-10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse py-5">
                  <dt className="mt-1.5 text-[0.8125rem] text-muted">{s.label}</dt>
                  <dd className="font-display text-[2rem] leading-none tabular-nums text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {isLead && (
            <figure className="lg:col-span-4 lg:col-start-9">
              <div className="relative aspect-[4/5] overflow-hidden bg-canvas-alt">
                <Parallax speed={-0.05} className="absolute -inset-y-[6%] inset-x-0">
                  <Image src="/images/chairside-portrait.jpg" alt={instructor.name} fill preload sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover animate-settle" />
                </Parallax>
              </div>
              <figcaption className="mt-4 text-[0.8125rem] text-muted">Still from Interproximal Reduction: A Hands-On Course</figcaption>
            </figure>
          )}
        </div>
      </section>

      {(instructor.bio || isLead) && (
        <section aria-label="About" className="section-y bg-canvas-alt">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
            {isLead && (
              <blockquote data-reveal className="lg:col-span-6">
                <p className="font-display text-h2 text-ink">
                  <span aria-hidden="true" className="text-accent">“</span>
                  {about.pullQuote}
                  <span aria-hidden="true" className="text-accent">”</span>
                </p>
              </blockquote>
            )}
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <div className="prose-copy">
                {instructor.bio ? (
                  <p data-reveal className="whitespace-pre-line">
                    {instructor.bio}
                  </p>
                ) : (
                  about.body.map((p, i) => (
                    <p key={i} data-reveal style={revealDelay(i * 100)}>
                      {p}
                    </p>
                  ))
                )}
              </div>
              {subjects.length > 0 && (
                <div data-reveal className="mt-6 border-t border-line pt-5">
                  <p className="text-[0.8125rem] text-muted">Teaches</p>
                  <ul className="mt-3 text-[0.9375rem] leading-[1.6] text-ink">
                    {subjects.map((s, i) => (
                      <li key={s.id} className="inline">
                        <Link href={`/courses?category=${s.slug}`} className="link-quiet">
                          {s.name}
                        </Link>
                        {i < subjects.length - 1 && <span aria-hidden="true">, </span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="their-courses" className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <RevealHeading id="their-courses" className="text-h2 text-ink">
              Courses by {instructor.name}
            </RevealHeading>
            <p data-reveal className="text-[0.875rem] text-muted">
              {plural(theirs.length, "course")}
            </p>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {theirs.map((course, i) => (
              <li key={course.id} data-reveal style={revealDelay((i % 3) * 110)}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-12 flex justify-center">
            <ArrowLink href="/courses">Search and filter</ArrowLink>
          </div>
        </div>
      </section>

      <JsonLd data={personSchema(instructor.name, `${site.url}/instructors/${slug}`)} />
    </>
  );
}
