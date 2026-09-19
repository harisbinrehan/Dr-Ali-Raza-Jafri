import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { faqs, purchaseFaqIds } from "@/content/faq";
import { courseIncludes } from "@/content/pages";
import { getCourse, getCourses, getInstructor, getPolicy, upgradeThumbnail } from "@/lib/catalog";
import { displayTitle, formatDuration, levelLabel, plural } from "@/lib/format";
import { faqsWithPolicy, fillPolicy } from "@/lib/policy-text";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { breadcrumbSchema, courseSchema, JsonLd } from "@/lib/schema";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Certificate, Clock, Language, Level } from "@/components/ui/Icons";
import { EnrolPanel, type EnrolPanelProps } from "@/components/course/EnrolPanel";
import { Curriculum } from "@/components/course/Curriculum";
import { PreviewDialog, type PreviewLesson } from "@/components/course/PreviewDialog";
import { CourseCard } from "@/components/course/CourseCard";
import { CourseSection, InstructorCard, LearningOutcomes, Requirements, Reviews } from "@/components/course/CourseSections";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const revalidate = 300;

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  const title = displayTitle(course.title);
  const description = (course.subtitle ? `${course.subtitle}. ` : "") + (course.description ?? "");
  const image = await upgradeThumbnail(course.thumbnailUrl);
  return {
    title,
    description: description.replace(/\s+/g, " ").trim().slice(0, 158),
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: { type: "website", title, description: course.subtitle ?? undefined, images: image ? [{ url: image }] : undefined },
  };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const [course, courses, policy] = await Promise.all([getCourse(slug), getCourses(), getPolicy()]);
  if (!course) notFound();

  const [imageUrl, instructor] = await Promise.all([upgradeThumbnail(course.thumbnailUrl), getInstructor(course.instructorSlug)]);

  const title = displayTitle(course.title);
  const url = `${site.url}/courses/${course.slug}`;
  const duration = formatDuration(course.totalDurationSeconds);
  const paragraphs = course.description?.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) ?? [];
  const previews: PreviewLesson[] = course.sections.flatMap((s) =>
    s.lessons.flatMap((l) => (l.previewAssetId ? [{ id: l.id, title: l.title, previewAssetId: l.previewAssetId }] : [])),
  );
  const instructorCourseCount = courses.filter((c) => c.instructorSlug === course.instructorSlug).length;

  const includes: EnrolPanelProps["includes"] = [
    { icon: "lessons", label: [plural(course.lessonCount, "lesson"), duration].filter(Boolean).join(", ") },
    { icon: "keep", label: courseIncludes.keep },
    { icon: "refund", label: fillPolicy(courseIncludes.refund, policy), href: "/refunds" },
    ...(course.certificateEnabled ? [{ icon: "certificate" as const, label: courseIncludes.certificate }] : []),
    { icon: "level", label: course.level === "ALL_LEVELS" ? levelLabel.ALL_LEVELS : `${levelLabel[course.level]} level` },
  ];

  const sameCategory = courses.filter((c) => c.id !== course.id && c.category?.slug === course.category?.slug);
  const related = [...sameCategory, ...courses.filter((c) => c.id !== course.id && !sameCategory.includes(c))].slice(0, 3);

  const facts = [
    { icon: Clock, label: [plural(course.lessonCount, "lesson"), duration].filter(Boolean).join(" · ") },
    { icon: Level, label: levelLabel[course.level] },
    { icon: Language, label: course.language === "en" ? "English" : course.language.toUpperCase() },
    ...(course.certificateEnabled ? [{ icon: Certificate, label: "Certificate on completion" }] : []),
  ];

  return (
    <>
      <article className="container-x grid pb-24 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        {/* Hero */}
        <header className="bleed-ink relative pb-12 pt-32 text-white sm:pt-36 lg:col-span-8 lg:row-start-1 lg:pb-16">
          <Breadcrumb
            tone="dark"
            items={[{ label: "Courses", href: "/courses" }, ...(course.category ? [{ label: course.category.name, href: `/courses?category=${course.category.slug}` }] : []), { label: title }]}
            className="animate-fade"
          />
          <h1 className="mt-7 font-display text-display-lg text-white animate-rise">{title}</h1>
          {course.subtitle && <p className="mt-5 max-w-2xl text-lead text-ink-muted animate-rise [animation-delay:100ms]">{course.subtitle}</p>}

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 animate-rise [animation-delay:180ms]">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white/75">
                <Icon className="size-4 text-accent-bright" />
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-ink-line pt-6 text-sm text-white/65 animate-rise [animation-delay:240ms]">
            Taught by{" "}
            <Link href={`/instructors/${course.instructorSlug}`} className="link-underline font-medium text-white">
              {course.instructor}
            </Link>
          </p>
        </header>

        {/* Price and enrolment: sticky on desktop, straight after the hero on mobile */}
        <aside aria-label="Enrol" className="relative z-10 pt-8 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pt-32">
          <div className="animate-rise [animation-delay:200ms] lg:sticky lg:top-[calc(var(--header-offset,4.5rem)+1.5rem)] lg:transition-[top] lg:duration-500">
            <EnrolPanel
              courseId={course.id}
              title={title}
              imageUrl={imageUrl}
              priceCents={course.priceCents}
              effectivePriceCents={course.effectivePriceCents}
              currency={course.currency}
              includes={includes}
              firstPreview={previews[0] ?? null}
            />
          </div>
        </aside>

        {/* Body */}
        <div className="space-y-16 pt-16 lg:col-span-8 lg:row-start-2">
          {course.learningObjectives.length > 0 && (
            <CourseSection id="learn" title="What you will learn">
              <LearningOutcomes items={course.learningObjectives} />
            </CourseSection>
          )}

          {paragraphs.length > 0 && (
            <CourseSection id="description" title="Course description">
              <div className="prose-copy max-w-2xl">
                {paragraphs.map((p, i) => (
                  <p key={i} data-reveal style={revealDelay(i * 60)} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>
            </CourseSection>
          )}

          {course.sections.length > 0 && (
            <CourseSection id="curriculum" title="Curriculum">
              <Curriculum sections={course.sections} totalSeconds={course.totalDurationSeconds} />
            </CourseSection>
          )}

          {course.requirements.length > 0 && (
            <CourseSection id="requirements" title="Requirements">
              <Requirements items={course.requirements} />
            </CourseSection>
          )}

          <CourseSection id="instructor" title="Who teaches it">
            <InstructorCard name={course.instructor} slug={course.instructorSlug} courseCount={instructorCourseCount} bio={instructor?.bio ?? null} />
          </CourseSection>

          {course.reviews.length > 0 && (
            <CourseSection id="reviews" title="What learners said">
              <Reviews reviews={course.reviews} average={course.ratingAverage} count={course.ratingCount} instructor={course.instructor} />
            </CourseSection>
          )}

          <CourseSection id="questions" title="Before you enrol">
            <FaqAccordion items={faqsWithPolicy(faqs, policy, purchaseFaqIds)} />
          </CourseSection>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y border-t border-line bg-paper-2">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" data-reveal className="font-display text-display-md text-ink">
                {sameCategory.length > 0 ? `More in ${course.category?.name}` : "More courses"}
              </h2>
              <Link data-reveal href="/courses" className="link-underline text-sm font-medium text-ink">
                Browse all courses
              </Link>
            </div>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <li key={c.id} data-reveal style={revealDelay(i * 90)}>
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {previews.length > 0 && <PreviewDialog courseTitle={title} lessons={previews} />}
      <JsonLd data={courseSchema(course, url)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Courses", url: `${site.url}/courses` },
          ...(course.category ? [{ name: course.category.name, url: `${site.url}/courses?category=${course.category.slug}` }] : []),
          { name: title, url },
        ])}
      />
    </>
  );
}
