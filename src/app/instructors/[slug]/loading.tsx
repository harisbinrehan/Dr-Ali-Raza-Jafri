import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";
import { RouteSkeleton, Skeleton, SkeletonAvatar } from "@/components/ui/Skeleton";

/** Mirrors instructors/[slug]/page.tsx: the avatar, name and stats line, then their courses. */
export default function Loading() {
  return (
    <RouteSkeleton>
      <section className="pt-24 lg:pt-32">
        <div className="container-x">
          <SkeletonAvatar className="size-20" />
          <Skeleton className="mt-6 h-8 w-72 max-w-full lg:h-10" />
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[28, 24].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4" style={{ width: `${w * 4}px` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pb-24">
        <div className="container-x">
          <Skeleton className="h-6 w-64 max-w-full" />
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i}>
                <CourseCardSkeleton />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </RouteSkeleton>
  );
}
