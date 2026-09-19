import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Review } from "@/lib/catalog";
import { home } from "@/content/pages";
import { plural } from "@/lib/format";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/ui/Icons";
import { CourseText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";

/** Section wrapper for the course page body: consistent heading and rhythm. */
export function CourseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-28 border-t border-line pt-12 first:border-t-0 first:pt-0">
      <h2 id={id} data-reveal className="font-display text-display-sm text-ink">
        {title}
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function LearningOutcomes({ items }: { items: string[] }) {
  return (
    <ol data-reveal className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={item} className={cn("flex gap-4 bg-card p-6", i === items.length - 1 && items.length % 2 === 1 && "sm:col-span-2")}>
          <span className="font-display text-[1.75rem] leading-none tabular-nums text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
          <span className="pt-1 leading-relaxed text-ink/85">
            <CourseText text={item} />
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Requirements({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-4 leading-relaxed text-ink/85">
          <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent-deep" />
          <span>
            <CourseText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

type InstructorCardProps = { name: string; slug: string; courseCount: number; bio: string | null };

export function InstructorCard({ name, slug, courseCount, bio }: InstructorCardProps) {
  const isLead = slug === site.instructorSlug;
  const initials = name
    .replace(/\b(prof|dr)\.?\s*/gi, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div data-reveal className="flex flex-col gap-6 rounded-lg border border-line bg-card p-6 sm:flex-row sm:items-center sm:p-7">
      {isLead ? (
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-ink-2">
          <Image src="/images/chairside-portrait.jpg" alt={name} fill sizes="96px" className="object-cover object-top" />
        </div>
      ) : (
        <div aria-hidden="true" className="grid size-24 shrink-0 place-items-center rounded-full bg-ink font-display text-3xl text-white">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {isLead && <p className="eyebrow text-accent-deep">{home.instructor.eyebrow}</p>}
        <p className="mt-2 font-display text-2xl text-ink">{name}</p>
        <p className="mt-1 font-mono text-xs text-muted">{plural(courseCount, "course")}</p>
        {bio && <p className="mt-4 leading-relaxed text-muted">{bio}</p>}
      </div>
      <Link
        href={`/instructors/${slug}`}
        className="group flex shrink-0 items-center gap-2 py-2 text-sm font-medium text-ink hover:text-accent-deep"
      >
        All courses
        <ArrowRight className="size-4 transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`flex gap-0.5 ${className ?? ""}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className={`size-4 ${n <= Math.round(value) ? "fill-accent" : "fill-line-strong"}`}>
          <path d="m10 1.8 2.5 5.3 5.7.7-4.2 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.2-4 5.7-.7L10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

/** Real learner reviews from the platform; the course page shows this only when a course has any. */
export function Reviews({ reviews, average, count, instructor }: { reviews: Review[]; average: number; count: number; instructor: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-6 border-y border-line py-6">
        <span className="font-display text-[3rem] leading-none tabular-nums text-ink">{average.toFixed(1)}</span>
        <div>
          <Stars value={average} />
          <p className="mt-1.5 text-sm text-muted">
            {plural(count, "rating")} · showing {reviews.length}
          </p>
        </div>
      </div>
      <ul className="divide-y divide-line">
        {reviews.map((r) => (
          <li key={r.id} className="py-6">
            <div className="flex flex-wrap items-center gap-3">
              <Stars value={r.rating} />
              <span className="sr-only">{r.rating} out of 5</span>
              <span className="font-medium text-ink">{r.author}</span>
            </div>
            {r.comment && <p className="mt-3 max-w-2xl leading-relaxed text-ink/85">{r.comment}</p>}
            {r.teacherReply && (
              <p className="mt-4 max-w-2xl border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">{instructor} replied: </span>
                {r.teacherReply}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
