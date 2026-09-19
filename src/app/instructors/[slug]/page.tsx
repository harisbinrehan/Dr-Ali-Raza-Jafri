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
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";

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

  return (
    <>
      <section aria-labelledby="instructor-name" className="grain relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="column-rules absolute inset-0" />
        <div className="container-x relative grid items-end gap-12 pb-16 pt-32 sm:pt-40 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-accent-bright animate-fade">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {home.instructor.eyebrow}
            </p>
            <h1 id="instructor-name" className="mt-6 font-display text-display-lg animate-rise">
              {instructor.name}
            </h1>
            {instructor.headline && <p className="mt-6 max-w-xl text-lead text-ink-muted animate-rise [animation-delay:100ms]">{instructor.headline}</p>}
            {isLead && !instructor.headline && <p className="mt-6 max-w-xl text-lead text-ink-muted animate-rise [animation-delay:100ms]">{about.lead}</p>}

            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4 border-t border-ink-line pt-8 animate-rise [animation-delay:200ms]">
              {[
                { value: theirs.length, label: "courses" },
                { value: enrolments.toLocaleString("en-US"), label: "enrolments" },
                { value: subjects.length, label: "subjects" },
                { value: `${hours}h`, label: "of lessons" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="eyebrow mt-3 text-white/55">{s.label}</dt>
                  <dd className="font-display text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-none tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {isLead && (
            <div className="lg:col-span-4 lg:col-start-9">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-md">
                <Parallax speed={-0.05} className="absolute -inset-y-[8%] inset-x-0">
                  <Image src="/images/chairside-portrait.jpg" alt={instructor.name} fill preload sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover animate-settle" />
                </Parallax>
              </figure>
              <p className="eyebrow mt-4 text-white/50">Still from Interproximal Reduction: A Hands-On Course</p>
            </div>
          )}
        </div>
      </section>

      {(instructor.bio || isLead) && (
        <section aria-label="About" className="section-y">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            {isLead && (
              <blockquote data-reveal className="lg:col-span-5">
                <p className="font-display text-display-sm italic text-ink">“{about.pullQuote}”</p>
              </blockquote>
            )}
            <div className="prose-copy lg:col-span-6 lg:col-start-7">
              {instructor.bio ? (
                <p data-reveal className="whitespace-pre-line">
                  {instructor.bio}
                </p>
              ) : (
                about.body.map((p, i) => (
                  <p key={i} data-reveal style={revealDelay(i * 80)}>
                    {p}
                  </p>
                ))
              )}
              {subjects.length > 0 && (
                <ul data-reveal className="mt-8 flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <li key={s.id}>
                      <Link href={`/courses?category=${s.slug}`} className="inline-block rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink/80 no-underline transition-colors hover:border-ink hover:text-ink">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="their-courses" className="section-y border-t border-line bg-paper-2">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="their-courses" data-reveal className="font-display text-display-md text-ink">
              Courses by {instructor.name}
            </h2>
            <p data-reveal className="eyebrow text-muted">
              {plural(theirs.length, "course")}
            </p>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {theirs.map((course, i) => (
              <li key={course.id} data-reveal style={revealDelay((i % 3) * 80)}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-16 flex justify-center">
            <ButtonLink href="/courses" variant="outline" size="lg" arrow>
              Search and filter
            </ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd data={personSchema(instructor.name, `${site.url}/instructors/${slug}`)} />
    </>
  );
}
