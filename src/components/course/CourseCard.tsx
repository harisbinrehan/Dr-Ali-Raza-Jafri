import Link from "next/link";
import type { CourseSummary } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { displayTitle, formatDuration, levelLabel, plural } from "@/lib/format";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { ArrowUpRight } from "@/components/ui/Icons";

export const CARD_SIZES = "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw";

type CourseCardProps = {
  course: CourseSummary;
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
  preload?: boolean;
  className?: string;
};

/** The one course card used everywhere. The whole card is a single link target. */
export function CourseCard({ course, tone = "light", headingLevel: Heading = "h3", preload, className }: CourseCardProps) {
  const dark = tone === "dark";
  const duration = formatDuration(course.totalDurationSeconds);
  const meta = [plural(course.lessonCount, "lesson"), duration].filter(Boolean).join(" · ");

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative">
        <CourseImage
          src={course.thumbnailUrl}
          title={displayTitle(course.title)}
          sizes={CARD_SIZES}
          preload={preload}
          imageClassName="transition-transform duration-[1200ms] ease-(--ease-out-expo) group-hover:scale-[1.045]"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 grid size-9 translate-y-1 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-card transition-[opacity,transform] duration-500 ease-(--ease-out-expo) group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className={cn("eyebrow", dark ? "text-white/55" : "text-muted")}>
          {[course.category?.name, levelLabel[course.level]].filter(Boolean).join(" · ")}
        </p>
        <Heading className={cn("mt-3 font-display text-[1.5rem] leading-[1.15] tracking-[-0.01em]", dark ? "text-white" : "text-ink")}>
          <Link
            href={`/courses/${course.slug}`}
            className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-(--ease-out-expo) after:absolute after:inset-0 after:content-[''] group-hover:bg-[length:100%_1px]"
          >
            {displayTitle(course.title)}
          </Link>
        </Heading>
        {course.subtitle && <p className={cn("mt-2.5 line-clamp-2 text-[0.9375rem] leading-relaxed", dark ? "text-white/65" : "text-muted")}>{course.subtitle}</p>}

        <div className="mt-auto pt-6">
          <div className={cn("flex items-center justify-between gap-4 border-t pt-4", dark ? "border-ink-line" : "border-line")}>
            <span className={cn("font-mono text-xs tabular-nums", dark ? "text-white/55" : "text-muted")}>{meta}</span>
            <PriceTag
              priceCents={course.priceCents}
              effectivePriceCents={course.effectivePriceCents}
              currency={course.currency}
              tone={tone}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
