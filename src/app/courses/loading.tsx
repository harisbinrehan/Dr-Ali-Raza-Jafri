import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

/** Mirrors courses/page.tsx + CourseCatalog.tsx's search/tabs/grid. */
export default function Loading() {
  return (
    <div className="relative isolate">
      <DarkBackdrop />
      <div className="container-x pb-16 pt-16">
        <header className="grid gap-4 pb-8 pt-4 md:grid-cols-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-12 lg:pt-8">
          <div className="md:col-span-8 lg:col-span-8">
            <Skeleton className="h-[0.8125rem] w-28" />
            <Skeleton className="mt-4 h-9 w-64 lg:h-11" />
          </div>
          <Skeleton className="h-4 w-32 md:col-span-4 md:ml-auto lg:col-span-4" />
        </header>

        <div className="grid gap-5 md:grid-cols-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Skeleton className="h-12 w-full md:col-span-8 lg:col-span-8" />
          <div className="flex items-center justify-between gap-4 md:col-span-4 lg:col-span-4 lg:justify-end">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>

        <div className="mt-6 flex gap-7 overflow-hidden border-b border-line pb-4">
          {[96, 112, 88, 128, 104].map((w, i) => (
            <Skeleton key={i} className="h-4 shrink-0" style={{ width: w }} />
          ))}
        </div>

        <Skeleton className="mt-6 h-4 w-24" />

        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <CourseCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
