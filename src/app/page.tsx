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
import { SectionIntro } from "@/components/ui/SectionHeading";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
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
  const [featured, featuredImage] = await Promise.all([getCourse(featuredSummary.slug), upgradeThumbnail(featuredSummary.thumbnailUrl)]);
  const gridCourses = rest.slice(0, 6);

  const byInstructor = courses.filter((c) => c.instructorSlug === site.instructorSlug);
  const lessonHours = Math.round(byInstructor.reduce((sum, c) => sum + c.totalDurationSeconds, 0) / 3600);
  const instructorSubjects = new Set(byInstructor.map((c) => c.category?.slug).filter(Boolean)).size;

  return (
    <>
      <Hero
        featured={featuredSummary}
        stats={[
          { value: stats.courses, label: "Courses" },
          { value: categories.length, label: "Subjects" },
          { value: stats.students, label: "Students" },
        ]}
      />

      <InstructorIntro
        stats={[
          { value: String(byInstructor.length), label: "Courses" },
          { value: String(instructorSubjects), label: "Subjects" },
          { value: `${lessonHours}h`, label: "Of lessons" },
        ]}
      />

      <SubjectIndex categories={categories} />

      <section aria-labelledby="courses-title" className="section-y border-t border-line">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionIntro id="courses-title" title={home.courses.heading} body={home.courses.body} />
            <div data-reveal className="shrink-0">
              <ArrowLink href="/courses">Search and filter</ArrowLink>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">{featured && <FeaturedCourse course={featured} imageUrl={featuredImage} />}</div>

          <ul className="mt-24 grid gap-x-8 gap-y-20 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {gridCourses.map((course, i) => (
              <li key={course.id} data-reveal style={revealDelay((i % 3) * 110)}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-20 flex justify-center">
            <ButtonLink href="/courses" variant="outline" size="lg" arrow>
              View all {courses.length} courses
            </ButtonLink>
          </div>
        </div>
      </section>

      <Commitments />

      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionIntro id="faq-title" title="Frequently asked questions" />
              <p data-reveal className="prose-copy mt-8 text-muted">
                <RichText text="Something not answered here? [Ask us](/contact)." />
              </p>
            </div>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={faqsWithPolicy(faqs, policy, purchaseFaqIds.slice(0, 5))} firstOpen />
            <div className="mt-8">
              <ArrowLink href="/faq">{home.promise.moreLabel}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta contact={contact} courseCount={courses.length} />
    </>
  );
}
