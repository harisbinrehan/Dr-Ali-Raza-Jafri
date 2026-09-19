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
  const enrolments = theirs.reduce((n, c) => n + c.studentCount, 0);
  
  const initials = instructor.name
    .split(" ")
    .filter(Boolean)
    .map((p, i, arr) => (i === 0 || i === arr.length - 1 ? p[0] : ""))
    .join("")
    .toUpperCase();

  const formatCount = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0).replace(/\.0$/, "") + "K";
    return String(n);
  };

  return (
    <>
      <section aria-labelledby="instructor-name" className="pt-24 lg:pt-32">
        <div className="container-x">
          <div className="flex size-20 items-center justify-center rounded-full bg-ink text-[1.75rem] font-medium text-canvas">
            {initials}
          </div>
          
          <h1 id="instructor-name" className="mt-6 font-display text-[2rem] leading-none text-ink lg:text-[2.5rem]">
            {instructor.name}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] text-muted">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <span><strong className="font-semibold text-ink">{formatCount(enrolments)}</strong> students</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              <span><strong className="font-semibold text-ink">{theirs.length}</strong> courses</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="their-courses" className="section-y pb-24">
        <div className="container-x">
          <h2 id="their-courses" className="text-[1.3125rem] font-semibold text-ink">
            Courses by {instructor.name.replace(/\b(Jafri)\b/g, "").trim()}
          </h2>
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {theirs.map((course, i) => (
              <li key={course.id} data-reveal style={revealDelay((i % 3) * 110)}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd data={personSchema(instructor.name, `${site.url}/instructors/${slug}`)} />
    </>
  );
}
