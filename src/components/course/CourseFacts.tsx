import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

export type CourseFact = { label: string; value: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

/** Instructor, enrolment count and the course's key facts, on the deep band. */
export function CourseFacts({
  instructor,
  instructorSlug,
  studentCount,
  facts,
}: {
  instructor: string;
  instructorSlug: string;
  studentCount: number;
  facts: CourseFact[];
}) {
  return (
    <div className="rounded-2xl bg-deep text-on-deep">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 pt-4 pb-3 text-[0.8125rem] text-on-deep-muted">
        <p>
          Taught by{" "}
          <Link href={`/instructors/${instructorSlug}`} className="link-line font-semibold text-on-deep">
            {instructor}
          </Link>
        </p>
        <p>{studentCount.toLocaleString("en-US")} enrolled</p>
      </div>

      <div className="grid grid-cols-2 border-t border-deep-line pb-1">
        {facts.map((f, i) => (
          <div key={f.label} className={cn("flex items-start gap-2.5 border-b border-deep-line px-5 py-3.5", i % 2 === 1 && "border-l")}>
            <f.icon className="mt-0.5 size-4 shrink-0 text-eyebrow-deep" />
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-deep-muted">{f.label}</p>
              <p className="mt-0.5 font-display text-[0.9375rem] text-on-deep">{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
