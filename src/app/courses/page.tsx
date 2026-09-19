import type { Metadata } from "next";
import { getCategories, getCourses } from "@/lib/catalog";
import { plural } from "@/lib/format";
import { CourseCatalog } from "@/components/course/CourseCatalog";

export const metadata: Metadata = {
  title: "Browse courses",
  description:
    "Every clinical dental course on Alignodontic Academy: orthodontics, clear aligners, cephalometrics, infection control and more. Search, filter by subject and sort by price.",
  alternates: { canonical: "/courses" },
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function CoursesPage({ searchParams }: PageProps<"/courses">) {
  const [courses, categories, params] = await Promise.all([getCourses(), getCategories(), searchParams]);
  const initial = { category: first(params.category), query: first(params.query), sort: first(params.sort) };

  return (
    <div className="container-x pb-28 pt-32 sm:pt-40">
      <header className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-accent-deep animate-fade">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            The courses
          </p>
          <h1 className="mt-5 font-display text-display-lg text-ink animate-rise">Browse courses</h1>
        </div>
        <p className="text-lead text-muted animate-rise [animation-delay:120ms] lg:col-span-4 lg:text-right">
          {plural(courses.length, "course")} available
        </p>
      </header>

      <CourseCatalog key={`${initial.category}|${initial.query}|${initial.sort}`} courses={courses} categories={categories} initial={initial} />
    </div>
  );
}
