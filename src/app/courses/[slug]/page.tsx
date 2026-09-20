import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { faqs, purchaseFaqIds } from "@/content/faq";
import { courseIncludes, promises } from "@/content/pages";
import { getCourse, getCourses, getInstructor, getPolicy, upgradeThumbnail, type CourseDetail } from "@/lib/catalog";
import { displayTitle, formatDuration, levelLabel, plural } from "@/lib/format";
import { faqsWithPolicy, fillPolicy } from "@/lib/policy-text";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { breadcrumbSchema, courseSchema, JsonLd } from "@/lib/schema";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CourseText } from "@/components/ui/RichText";
import { ArrowLink } from "@/components/ui/Button";
import { EnrolButton, EnrolPanel, type EnrolPanelProps } from "@/components/course/EnrolPanel";
import { CourseFacts, type CourseFact } from "@/components/course/CourseFacts";
import { Curriculum } from "@/components/course/Curriculum";
import { PreviewDialog, type PreviewLesson } from "@/components/course/PreviewDialog";
import { CourseCard } from "@/components/course/CourseCard";
import { PriceTag } from "@/components/course/PriceTag";
import { CourseSection, HowItWorks, InstructorFeature, LearningOutcomes, Requirements, Reviews } from "@/components/course/CourseSections";
import { Award, BarChart, Clock, Globe, ListVideo } from "@/components/ui/Icons";
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

/** "7 video lessons, 1 quiz" — the course's own format, counted from its lessons. */
function formatSummary(course: CourseDetail) {
  const counts = new Map<string, number>();
  for (const s of course.sections) for (const l of s.lessons) counts.set(l.type, (counts.get(l.type) ?? 0) + 1);
  const videos = (counts.get("VIDEO") ?? 0) + (counts.get("EXTERNAL_VIDEO") ?? 0);
  const parts = [
    videos && plural(videos, "video lesson"),
    counts.get("QUIZ") && plural(counts.get("QUIZ")!, "quiz", "quizzes"),
    counts.get("FLASHCARDS") && plural(counts.get("FLASHCARDS")!, "flashcard set"),
    counts.get("ASSIGNMENT") && plural(counts.get("ASSIGNMENT")!, "assignment"),
  ].filter(Boolean);
  const duration = formatDuration(course.totalDurationSeconds);
  return `${parts.join(", ")}${duration ? ` — ${duration} in total` : ""}.`;
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const [course, courses, policy] = await Promise.all([getCourse(slug), getCourses(), getPolicy()]);
  if (!course) notFound();

  const [imageUrl, instructor] = await Promise.all([upgradeThumbnail(course.thumbnailUrl), getInstructor(course.instructorSlug)]);

  const title = displayTitle(course.title);
  const url = `${site.url}/courses/${course.slug}`;
  const duration = formatDuration(course.totalDurationSeconds);
  const free = course.effectivePriceCents === 0;
  const paragraphs = course.description?.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) ?? [];
  const previews: PreviewLesson[] = course.sections.flatMap((s) =>
    s.lessons.flatMap((l) => (l.previewAssetId ? [{ id: l.id, title: l.title, previewAssetId: l.previewAssetId }] : [])),
  );
  const instructorCourseCount = courses.filter((c) => c.instructorSlug === course.instructorSlug).length;

  const includes: EnrolPanelProps["includes"] = [
    { label: [plural(course.lessonCount, "lesson"), duration].filter(Boolean).join(", ") },
    { label: courseIncludes.keep },
    { label: fillPolicy(courseIncludes.refund, policy), href: "/refunds" },
    ...(course.certificateEnabled ? [{ label: courseIncludes.certificate }] : []),
    { label: course.level === "ALL_LEVELS" ? levelLabel.ALL_LEVELS : `${levelLabel[course.level]} level` },
  ];

  const facts: CourseFact[] = [
    { label: "Lessons", value: String(course.lessonCount), icon: ListVideo },
    ...(duration ? [{ label: "Duration", value: duration, icon: Clock }] : []),
    { label: "Level", value: levelLabel[course.level], icon: BarChart },
    { label: "Language", value: course.language === "en" ? "English" : course.language.toUpperCase(), icon: Globe },
    ...(course.certificateEnabled ? [{ label: "Certificate", value: "On completion", icon: Award }] : []),
  ];

  const [keepPromise, certificatePromise, refundPromise] = promises;
  const howItWorks = [
    ...(course.lessonCount > 0 ? [{ title: "Format", body: formatSummary(course) }] : []),
    { title: keepPromise.title, body: keepPromise.body },
    ...(course.certificateEnabled ? [{ title: certificatePromise.title, body: certificatePromise.body }] : []),
    { title: refundPromise.title, body: `${refundPromise.body} [The refund policy](/refunds).` },
  ];

  const sameCategory = courses.filter((c) => c.id !== course.id && c.category?.slug === course.category?.slug);
  const related = [...sameCategory, ...courses.filter((c) => c.id !== course.id && !sameCategory.includes(c))].slice(0, 3);

  return (
    <>
      <div className="relative isolate">
        <article className="container-x grid pb-6 pt-16 md:grid-cols-12 lg:grid-cols-12 lg:gap-x-8">
          {/* Hero */}
          <header className="pb-8 pt-6 md:col-span-7 lg:col-span-7 md:col-start-1 lg:col-start-1 lg:row-start-1 lg:pb-12 lg:pt-8">
            <Breadcrumb
              items={[
                { label: "Courses", href: "/courses" },
                ...(course.category ? [{ label: course.category.name, href: `/courses?category=${course.category.slug}` }] : []),
                { label: title },
              ]}
              className="animate-fade"
            />
            <h1 className="mt-6 font-display text-h1 text-ink">
              <span className="mask">
                <span className="block animate-mask">{title}</span>
              </span>
            </h1>
            {course.subtitle && <p className="mt-5 max-w-2xl text-lead text-ink-soft animate-rise [animation-delay:100ms]">{course.subtitle}</p>}

            <div className="mt-6 animate-rise [animation-delay:160ms]">
              <CourseFacts instructor={course.instructor} instructorSlug={course.instructorSlug} studentCount={course.studentCount} facts={facts} />
            </div>
          </header>

          {/* Enrolment: sticky beside the whole course on desktop, straight after the hero on mobile */}
          <aside aria-label="Enrol" className="relative z-10 md:col-span-4 lg:col-span-4 md:col-start-9 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pt-8">
            <div className="animate-rise [animation-delay:120ms] lg:sticky lg:top-[calc(var(--header-offset,4rem)+1.5rem)] lg:transition-[top] lg:duration-700">
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
          <div className="space-y-12 pt-8 sm:space-y-14 md:col-span-7 lg:col-span-7 md:col-start-1 lg:col-start-1 lg:row-start-2 lg:pt-0">
            {course.learningObjectives.length > 0 && (
              <CourseSection id="learn" title="What you will learn">
                <LearningOutcomes items={course.learningObjectives} />
              </CourseSection>
            )}

            <CourseSection id="how" title="How the course works">
              <HowItWorks rows={howItWorks} />
            </CourseSection>

            {paragraphs.length > 0 && (
              <CourseSection id="description" title="Course description">
                <div className="prose-copy max-w-[62ch]">
                  {paragraphs.map((p, i) => (
                    <p key={i} data-reveal style={revealDelay(i * 60)} className="whitespace-pre-line">
                      <CourseText text={p} />
                    </p>
                  ))}
                </div>
              </CourseSection>
            )}

            {course.sections.some((s) => s.lessons.length > 0) && (
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
              <InstructorFeature name={course.instructor} slug={course.instructorSlug} courseCount={instructorCourseCount} bio={instructor?.bio ?? null} />
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
      </div>

      {/* Closing enrolment */}
      <section aria-labelledby="enrol-title" className="mt-14 bg-deep text-on-deep dark:bg-transparent">
        <div className="container-x grid gap-8 py-12 sm:py-14 md:grid-cols-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="md:col-span-7 lg:col-span-7">
            <p className="label text-eyebrow-deep">{course.category?.name ?? site.name}</p>
            <h2 id="enrol-title" className="mt-5 font-display text-h2 text-on-deep">
              {title}
            </h2>
            <p className="mt-5 text-[0.9375rem] text-on-deep-muted">{includes.slice(0, 3).map((i) => i.label).join(" · ")}</p>
          </div>
          <div className="flex flex-col items-start gap-6 md:col-span-4 lg:col-span-4 md:col-start-9 lg:col-start-9 lg:items-end">
            <PriceTag priceCents={course.priceCents} effectivePriceCents={course.effectivePriceCents} currency={course.currency} size="lg" tone="deep" />
            <EnrolButton courseId={course.id} free={free} tone="deep" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
              <h2 id="related-title" className="font-display text-h2 text-ink">
                {sameCategory.length > 0 ? `More in ${course.category?.name}` : "More courses"}
              </h2>
              <ArrowLink href="/courses">Browse all courses</ArrowLink>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <li key={c.id} data-reveal style={revealDelay(i * 60)}>
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
