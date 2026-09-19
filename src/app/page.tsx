import type { Metadata } from "next";
import { faqs, purchaseFaqIds } from "@/content/faq";
import { home } from "@/content/pages";
import { getCategories, getContact, getCourse, getCourses, getPolicy, getStats, upgradeThumbnail } from "@/lib/catalog";
import { faqsWithPolicy } from "@/lib/policy-text";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { InstructorIntro } from "@/components/home/InstructorIntro";
import { SubjectIndex } from "@/components/home/SubjectIndex";
import { Commitments } from "@/components/home/Commitments";
import { FinalCta } from "@/components/home/FinalCta";
import { FeaturedCourse } from "@/components/course/FeaturedCourse";
import { CourseCard } from "@/components/course/CourseCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [courses, categories, stats, policy, contact] = await Promise.all([
    getCourses(),
    getCategories(),
    getStats(),
    getPolicy(),
    getContact(),
  ]);

  const [featuredSummary, ...rest] = courses;
  const [featured, featuredImage] = await Promise.all([
    getCourse(featuredSummary.slug),
    upgradeThumbnail(featuredSummary.thumbnailUrl),
  ]);
  const gridCourses = rest.slice(0, 6);

  const byInstructor = courses.filter((c) => c.instructorSlug === site.instructorSlug);
  const lessonHours = Math.round(byInstructor.reduce((sum, c) => sum + c.totalDurationSeconds, 0) / 3600);
  const instructorSubjects = new Set(byInstructor.map((c) => c.category?.slug).filter(Boolean)).size;

  return (
    <>
      <Hero
        featured={featuredSummary}
        stats={[
          { value: stats.courses, label: "courses" },
          { value: categories.length, label: "subjects" },
          { value: stats.students, label: "students" },
        ]}
      />

      <InstructorIntro
        stats={[
          { value: String(byInstructor.length), label: "courses" },
          { value: String(instructorSubjects), label: "subjects" },
          { value: `${lessonHours}h`, label: "of lessons" },
        ]}
      />

      <SubjectIndex categories={categories} />

      <section aria-labelledby="courses-title" className="section-y">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="courses-title" title={home.courses.heading} body={home.courses.body} />
            <div data-reveal>
              <ButtonLink href="/courses" variant="outline" arrow>
                Search and filter
              </ButtonLink>
            </div>
          </div>

          <div className="mt-14">{featured && <FeaturedCourse course={featured} imageUrl={featuredImage} />}</div>

          <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {gridCourses.map((course, i) => (
              <li key={course.id} data-reveal style={revealDelay((i % 3) * 90)}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-16 flex justify-center">
            <ButtonLink href="/courses" size="lg" arrow>
              View all {courses.length} courses
            </ButtonLink>
          </div>
        </div>
      </section>

      <Commitments />

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="faq-title" title="Frequently asked questions" />
              <p data-reveal className="prose-copy mt-6 text-muted">
                <RichText text="Something not answered here? [Ask us](/contact)." />
              </p>
            </div>
          </div>
          <div data-reveal className="lg:col-span-8">
            <FaqAccordion items={faqsWithPolicy(faqs, policy, purchaseFaqIds.slice(0, 5))} firstOpen />
            <div className="mt-8">
              <ButtonLink href="/faq" variant="quiet" className="font-medium">
                {home.promise.moreLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta contact={contact} courseCount={courses.length} />
    </>
  );
}
