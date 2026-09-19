import Link from "next/link";
import type { CourseDetail } from "@/lib/catalog";
import { displayTitle, formatDuration, levelLabel, plural } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icons";

/** A single course given room: image, what it teaches, and one clear action. */
export function FeaturedCourse({ course, imageUrl }: { course: CourseDetail; imageUrl: string | null }) {
  const outcomes = course.learningObjectives.slice(0, 3);
  const meta = [plural(course.lessonCount, "lesson"), formatDuration(course.totalDurationSeconds), levelLabel[course.level]].filter(Boolean);

  return (
    <article className="group relative grid overflow-hidden rounded-lg border border-line bg-card lg:grid-cols-12">
      <div data-reveal="image" className="relative lg:col-span-7">
        <CourseImage
          src={imageUrl}
          title={displayTitle(course.title)}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="h-full rounded-none lg:aspect-auto lg:min-h-[30rem]"
          imageClassName="transition-transform duration-[1400ms] ease-(--ease-out-expo) group-hover:scale-[1.03]"
        />
        <span className="eyebrow absolute left-4 top-4 rounded-xs bg-paper px-2.5 py-1.5 text-ink">Featured</span>
      </div>

      <div className="flex flex-col p-7 sm:p-10 lg:col-span-5">
        <p data-reveal className="eyebrow text-accent-deep">
          {course.category?.name}
        </p>
        <h3 data-reveal style={revealDelay(60)} className="mt-4 font-display text-display-sm text-ink">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {displayTitle(course.title)}
          </Link>
        </h3>
        {course.subtitle && (
          <p data-reveal style={revealDelay(120)} className="mt-4 leading-relaxed text-muted">
            {course.subtitle}
          </p>
        )}

        {outcomes.length > 0 && (
          <ul data-reveal style={revealDelay(180)} className="mt-7 space-y-3">
            {outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-[0.9375rem] leading-snug text-ink/85">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-deep" />
                {o}
              </li>
            ))}
          </ul>
        )}

        <div data-reveal style={revealDelay(240)} className="mt-auto pt-9">
          <p className="font-mono text-xs text-muted">{meta.join(" · ")}</p>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-5">
            <PriceTag priceCents={course.priceCents} effectivePriceCents={course.effectivePriceCents} currency={course.currency} />
            <span className={buttonClasses({ className: "relative z-10 pointer-events-none" })}>
              View course
              <ArrowRight className="size-4 transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
