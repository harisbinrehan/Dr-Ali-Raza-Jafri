import { CourseFactsSkeleton } from "@/components/course/CourseFactsSkeleton";
import { EnrolPanelSkeleton } from "@/components/course/EnrolPanelSkeleton";
import { Skeleton, SkeletonAnnounce, SkeletonText } from "@/components/ui/Skeleton";

/** Mirrors courses/[slug]/page.tsx's hero + enrol panel + body sections. */
export default function Loading() {
  return (
    <div className="relative isolate" aria-busy="true">
      <SkeletonAnnounce />
      <div className="container-x grid pb-6 pt-16 md:grid-cols-12 lg:grid-cols-12 lg:gap-x-8">
        <header className="pb-8 pt-6 md:col-span-7 md:col-start-1 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pb-12 lg:pt-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
            <Skeleton className="h-3.5 w-24" />
          </div>
          <Skeleton className="mt-6 h-9 w-[90%] lg:h-11" />
          <Skeleton className="mt-3 h-9 w-2/3 lg:h-11" />
          <Skeleton className="mt-5 h-4 w-[85%] max-w-2xl" />

          <div className="mt-6">
            <CourseFactsSkeleton />
          </div>
        </header>

        <aside className="relative z-10 md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pt-8">
          <EnrolPanelSkeleton />
        </aside>

        <div className="space-y-12 pt-8 sm:space-y-14 md:col-span-7 md:col-start-1 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:pt-0">
          {[
            { title: 28, rows: 2 },
            { title: 40, rows: 3 },
            { title: 44, rows: 4 },
          ].map((section, i) => (
            <div key={i} className="border-t border-line pt-8 first:border-t-0 first:pt-0 sm:pt-10">
              <Skeleton className="h-6" style={{ width: `${section.title}%` }} />
              <SkeletonText className="mt-6" lines={section.rows} lastLineWidth="70%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
