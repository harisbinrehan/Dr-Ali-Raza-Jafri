import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonButton } from "@/components/ui/Skeleton";

/** Mirrors contact/page.tsx's location details + form. */
export default function Loading() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton />

      <div className="container-x grid gap-12 pb-16 pt-6 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pt-8">
        <section className="md:col-span-5 lg:col-span-5">
          <Skeleton className="h-6 w-32" />
          <div className="mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid gap-1 border-t border-line py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <Skeleton className="h-3.5 w-14" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-28 w-full" />
          <SkeletonButton size="md" className="w-32" />
        </section>
      </div>
    </RouteSkeleton>
  );
}
