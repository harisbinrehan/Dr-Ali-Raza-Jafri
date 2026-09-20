import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Mirrors about/page.tsx's header, photo and opening quote. */
export default function Loading() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton />

      <div className="container-x pt-8 lg:pt-10">
        <Skeleton className="aspect-[4/3] w-full rounded-none sm:aspect-[21/9]" />
      </div>

      <section className="section-y">
        <div className="container-x grid gap-10 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
          <SkeletonText className="md:col-span-6 lg:col-span-6" lines={3} lineHeight="h-7" lastLineWidth="66%" />
          <SkeletonText className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9" lines={3} lastLineWidth="75%" />
        </div>
      </section>
    </RouteSkeleton>
  );
}
