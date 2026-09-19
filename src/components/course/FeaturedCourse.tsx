import Link from "next/link";
import type { CourseDetail } from "@/lib/catalog";
import { displayTitle, formatDuration, levelLabel, plural } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { ArrowRight } from "@/components/ui/Icons";
import { CourseText } from "@/components/ui/RichText";

/** One course given room: a large image, what it teaches, and one clear way in. */
export function FeaturedCourse({ course, imageUrl }: { course: CourseDetail; imageUrl: string | null }) {
  const outcomes = course.learningObjectives.slice(0, 3);
  const meta = [plural(course.lessonCount, "lesson"), formatDuration(course.totalDurationSeconds), levelLabel[course.level]].filter(Boolean);

  return (
    <article className="group relative grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div data-reveal="image" className="lg:col-span-7">
        <CourseImage
          src={imageUrl}
          title={displayTitle(course.title)}
          sizes="(min-width: 1360px) 760px, (min-width: 1024px) 56vw, 100vw"
          imageClassName="transition-transform duration-[1800ms] ease-(--ease-editorial) group-hover:scale-[1.025]"
        />
      </div>

      <div className="flex flex-col lg:col-span-4 lg:col-start-9">
        <p data-reveal className="label text-eyebrow">
          Featured · {course.category?.name}
        </p>
        <h3 data-reveal style={revealDelay(60)} className="mt-5 font-display text-h3 text-ink">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {displayTitle(course.title)}
          </Link>
        </h3>
        {course.subtitle && (
          <p data-reveal style={revealDelay(120)} className="mt-5 leading-relaxed text-muted">
            {course.subtitle}
          </p>
        )}

        {outcomes.length > 0 && (
          <ul data-reveal style={revealDelay(180)} className="mt-8 border-t border-line">
            {outcomes.map((o) => (
              <li key={o} className="border-b border-line py-3.5 text-[0.9375rem] leading-snug text-ink-soft">
                <CourseText text={o} />
              </li>
            ))}
          </ul>
        )}

        <div data-reveal style={revealDelay(240)} className="mt-auto flex items-end justify-between gap-6 pt-10">
          <div>
            <p className="text-[0.8125rem] text-muted">{meta.join(" · ")}</p>
            <PriceTag priceCents={course.priceCents} effectivePriceCents={course.effectivePriceCents} currency={course.currency} className="mt-2" />
          </div>
          <span className="inline-flex items-center gap-2.5 text-[0.875rem] font-semibold text-ink">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5">View course</span>
            <ArrowRight className="size-4 transition-transform duration-700 ease-(--ease-editorial) group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
