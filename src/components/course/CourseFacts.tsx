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
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 pt-6 pb-5 text-[0.9375rem] text-on-deep-muted">
        <p>
          Taught by{" "}
          <Link href={`/instructors/${instructorSlug}`} className="link-line font-semibold text-on-deep">
            {instructor}
          </Link>
        </p>
        <p>{studentCount.toLocaleString("en-US")} enrolled</p>
      </div>

      <div className="grid grid-cols-2 border-t border-deep-line pb-2">
        {facts.map((f, i) => (
          <div key={f.label} className={cn("flex items-start gap-3 border-b border-deep-line px-6 py-5", i % 2 === 1 && "border-l")}>
            <f.icon className="mt-0.5 size-5 shrink-0 text-eyebrow-deep" />
            <div>
              <p className="label text-on-deep-muted">{f.label}</p>
              <p className="mt-1 font-display text-[1.125rem] text-on-deep">{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
