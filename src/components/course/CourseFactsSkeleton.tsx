import { Skeleton } from "@/components/ui/Skeleton";

/** Matches CourseFacts.tsx's card structure. */
export function CourseFactsSkeleton() {
  return (
    <div className="rounded-2xl bg-deep">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 pt-4 pb-3">
        <Skeleton tone="deep" className="h-3.5 w-40" />
        <Skeleton tone="deep" className="h-3.5 w-24" />
      </div>
      <div className="grid grid-cols-2 border-t border-deep-line pb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2.5 border-b border-deep-line px-5 py-3.5">
            <Skeleton tone="deep" className="mt-0.5 size-4 shrink-0" />
            <div className="w-full">
              <Skeleton tone="deep" className="h-2.5 w-14" />
              <Skeleton tone="deep" className="mt-1.5 h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
