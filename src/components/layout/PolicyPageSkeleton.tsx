import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Shared loading state for terms, privacy, refunds, delivery, service policy and pricing. */
export function PolicyPageSkeleton() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton />

      <div className="container-x grid gap-8 pb-16 pt-8 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pt-10">
        <nav aria-hidden="true" className="hidden md:col-span-3 lg:col-span-3 lg:block">
          <Skeleton className="h-[0.8125rem] w-24" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-[85%]" />
            ))}
          </div>
        </nav>

        <div className="md:col-span-7 lg:col-span-7 md:col-start-5 lg:col-start-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid gap-3 border-t border-line py-6 first:border-t-0 first:pt-0 xl:grid-cols-[13rem_1fr] xl:gap-10">
              <Skeleton className="h-5 w-32" />
              <SkeletonText lines={3} lastLineWidth="66%" />
            </div>
          ))}
        </div>
      </div>
    </RouteSkeleton>
  );
}
