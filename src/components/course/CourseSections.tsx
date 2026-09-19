import Image from "next/image";
import type { ReactNode } from "react";
import type { Review } from "@/lib/catalog";
import { about, home } from "@/content/pages";
import { plural } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { site } from "@/lib/site";
import { ArrowLink } from "@/components/ui/Button";
import { CourseText, RichText } from "@/components/ui/RichText";
import { RevealHeading } from "@/components/ui/SectionHeading";

/** A course-page chapter: hairline, display heading, then content. */
export function CourseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-28 border-t border-line pt-12 sm:pt-16">
      <RevealHeading id={id} className="text-h3 text-ink">
        {title}
      </RevealHeading>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/** Outcomes as a numbered two-column outline — scannable in seconds. */
export function LearningOutcomes({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-x-10 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={item} data-reveal style={revealDelay((i % 2) * 90)} className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-line py-6">
          <span className="font-display text-[1.375rem] leading-none text-accent">{i + 1}</span>
          <span className="leading-relaxed text-ink">
            <CourseText text={item} />
          </span>
        </li>
      ))}
    </ol>
  );
}

/** "How the course works": the platform's own commitments plus this course's format. */
export function HowItWorks({ rows }: { rows: { title: string; body: string }[] }) {
  return (
    <dl>
      {rows.map((row, i) => (
        <div key={row.title} data-reveal style={revealDelay(i * 70)} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[14rem_1fr] sm:gap-10">
          <dt className="font-display text-[1.375rem] leading-snug text-ink">{row.title}</dt>
          <dd className="prose-copy text-[0.9375rem]">
            <RichText text={row.body} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Requirements({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item} className="border-t border-line py-4 leading-relaxed text-ink-soft last:border-b">
          <CourseText text={item} />
        </li>
      ))}
    </ul>
  );
}

type InstructorFeatureProps = { name: string; slug: string; courseCount: number; bio: string | null };

/** The teacher, presented editorially rather than as a profile card. */
export function InstructorFeature({ name, slug, courseCount, bio }: InstructorFeatureProps) {
  const isLead = slug === site.instructorSlug;
  return (
    <div className="grid gap-10 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-12">
      {isLead && (
        <figure data-reveal="image" className="relative aspect-[4/5] w-full max-w-[15rem] overflow-hidden bg-canvas-alt">
          <div className="absolute inset-0">
            <Image src="/images/chairside-portrait.jpg" alt={name} fill sizes="240px" className="object-cover" />
          </div>
        </figure>
      )}
      <div className={isLead ? "" : "sm:col-span-2"}>
        {isLead && <p className="label text-accent">{home.instructor.eyebrow}</p>}
        <p className="mt-4 font-display text-h3 text-ink">{name}</p>
        <p className="mt-2 text-[0.875rem] text-muted">{plural(courseCount, "course")}</p>
        {bio ? (
          <p className="prose-copy mt-6 whitespace-pre-line">{bio}</p>
        ) : (
          isLead && <p className="mt-6 font-display text-[1.25rem] leading-snug text-ink-soft">“{about.pullQuote}”</p>
        )}
        <div className="mt-6">
          <ArrowLink href={`/instructors/${slug}`}>All courses by {name}</ArrowLink>
        </div>
      </div>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className={`size-3.5 ${n <= Math.round(value) ? "fill-accent" : "fill-line-strong"}`}>
          <path d="m10 1.8 2.5 5.3 5.7.7-4.2 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.2-4 5.7-.7L10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

/** Real learner reviews from the platform; the course page shows this only when a course has any. */
export function Reviews({ reviews, average, count, instructor }: { reviews: Review[]; average: number; count: number; instructor: string }) {
  const lead = reviews.find((r) => r.comment);
  const others = reviews.filter((r) => r !== lead);
  return (
    <div>
      <div className="flex items-baseline gap-5">
        <span className="font-display text-[4rem] leading-none tabular-nums text-ink">{average.toFixed(1)}</span>
        <span>
          <Stars value={average} />
          <span className="mt-1.5 block text-[0.875rem] text-muted">{plural(count, "rating")}</span>
        </span>
      </div>
      {lead && (
        <figure className="mt-12 border-t border-line pt-10">
          <blockquote className="font-display text-h3 text-ink">“{lead.comment}”</blockquote>
          <figcaption className="mt-5 text-[0.875rem] text-muted">{lead.author}</figcaption>
        </figure>
      )}
      <ul className="mt-10">
        {others.map((r) => (
          <li key={r.id} className="border-t border-line py-6">
            <div className="flex flex-wrap items-center gap-3">
              <Stars value={r.rating} />
              <span className="sr-only">{r.rating} out of 5</span>
              <span className="text-[0.875rem] font-semibold text-ink">{r.author}</span>
            </div>
            {r.comment ? <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{r.comment}</p> : <p className="mt-2 text-[0.8125rem] text-muted">Rated, no comment</p>}
            {r.teacherReply && (
              <p className="mt-4 max-w-2xl border-l border-accent pl-4 text-[0.9375rem] leading-relaxed text-muted">
                <span className="font-semibold text-ink">{instructor} replied: </span>
                {r.teacherReply}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
