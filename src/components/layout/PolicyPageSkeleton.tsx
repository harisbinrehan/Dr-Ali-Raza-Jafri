import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Shared loading state for terms, privacy, refunds, delivery, service policy and pricing. */
export function PolicyPageSkeleton() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton />

      <div className="container-x grid gap-8 pb-16 pt-8 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pt-10">
        <nav className="hidden md:col-span-3 lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-offset,4rem)+2.5rem)]">
            <Skeleton className="h-3.5 w-24" />
            <div className="mt-6 space-y-2.5">
              {[80, 62, 74, 56, 68, 60].map((w, i) => (
                <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </nav>

        <div className="md:col-span-7 md:col-start-5 lg:col-span-7 lg:col-start-5">
          {[3, 2, 4, 2].map((lines, i) => (
            <div key={i} className="grid gap-3 border-t border-line py-6 first:border-t-0 first:pt-0 xl:grid-cols-[13rem_1fr] xl:gap-10">
              <Skeleton className="h-5 w-36" />
              <SkeletonText className="max-w-[62ch]" lines={lines} lastLineWidth="64%" />
            </div>
          ))}

          {/* The contact address that closes every policy page. */}
          <div className="mt-4 space-y-2 border-t border-line pt-6">
            <Skeleton className="h-4 w-72 max-w-full" />
            <Skeleton className="h-4 w-56 max-w-full" />
            <Skeleton className="mt-3 h-4 w-64 max-w-full" />
          </div>
        </div>
      </div>
    </RouteSkeleton>
  );
}
