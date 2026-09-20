import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";
import { Skeleton, SkeletonAnnounce, SkeletonAvatar } from "@/components/ui/Skeleton";

/** Mirrors instructors/[slug]/page.tsx's avatar/name/stats header + course grid. */
export default function Loading() {
  return (
    <>
      <SkeletonAnnounce />
      <section className="pt-24 lg:pt-32" aria-busy="true">
        <div className="container-x">
          <SkeletonAvatar className="size-20" />
          <Skeleton className="mt-6 h-9 w-64 lg:h-11" />
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </section>

      <section className="section-y pb-24" aria-busy="true">
        <div className="container-x">
          <Skeleton className="h-6 w-56" />
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i}>
                <CourseCardSkeleton />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
