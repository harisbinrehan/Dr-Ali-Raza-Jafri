import Link from "next/link";
import type { CourseSummary } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { displayTitle, formatDuration, levelLabel, plural } from "@/lib/format";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { ArrowRight } from "@/components/ui/Icons";

export const CARD_SIZES = "(min-width: 1360px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw";

type CourseCardProps = {
  course: CourseSummary;
  headingLevel?: "h2" | "h3";
  preload?: boolean;
  className?: string;
};

/**
 * Image-first catalogue entry. No box, no shadow: the photograph, a quiet
 * subject line, the title in display type, and the facts on a hairline.
 * The whole card is one link target.
 */
export function CourseCard({ course, headingLevel: Heading = "h3", preload, className }: CourseCardProps) {
  const meta = [plural(course.lessonCount, "lesson"), formatDuration(course.totalDurationSeconds)].filter(Boolean).join(" · ");

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <CourseImage
        src={course.thumbnailUrl}
        title={displayTitle(course.title)}
        sizes={CARD_SIZES}
        preload={preload}
        imageClassName="transition-transform duration-[1600ms] ease-(--ease-editorial) group-hover:scale-[1.035]"
      />

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[0.8125rem] text-muted">
          {course.category?.name}
          <span aria-hidden="true" className="mx-2 text-line-strong">/</span>
          {levelLabel[course.level]}
        </p>
        <Heading className="mt-3 font-display text-h4 text-ink">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:content-['']">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-(--ease-editorial) group-hover:bg-[length:100%_1px]">
              {displayTitle(course.title)}
            </span>
          </Link>
        </Heading>
        {course.subtitle && <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{course.subtitle}</p>}

        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="text-[0.8125rem] tabular-nums text-muted">{meta}</span>
            <span className="flex items-center gap-2">
              <PriceTag priceCents={course.priceCents} effectivePriceCents={course.effectivePriceCents} currency={course.currency} />
              <ArrowRight className="size-3.5 -translate-x-1 text-ink opacity-0 transition-[opacity,transform] duration-700 ease-(--ease-editorial) group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
