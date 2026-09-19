import type { Metadata } from "next";
import { getCategories, getCourses } from "@/lib/catalog";
import { plural } from "@/lib/format";
import { CourseCatalog } from "@/components/course/CourseCatalog";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

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
    <div className="relative isolate">
      <DarkBackdrop />
      <div className="container-x pb-32 pt-16">
        <header className="grid gap-6 pb-14 pt-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-20 lg:pt-20">
          <div className="lg:col-span-8">
            <p className="label text-accent animate-fade">The courses</p>
            <h1 className="mt-6 font-display text-h1 text-ink">
              <span className="mask">
                <span className="block animate-mask">Browse courses</span>
              </span>
            </h1>
          </div>
          <p className="text-lead text-muted animate-rise [animation-delay:200ms] lg:col-span-4 lg:text-right">{plural(courses.length, "course")} available</p>
        </header>

        <CourseCatalog key={`${initial.category}|${initial.query}|${initial.sort}`} courses={courses} categories={categories} initial={initial} />
      </div>
    </div>
  );
}
