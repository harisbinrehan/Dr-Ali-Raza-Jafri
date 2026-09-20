import { about } from "@/content/pages";
import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonButton, SkeletonText } from "@/components/ui/Skeleton";

/** Mirrors about/page.tsx end to end: photo, pull quote, how it works, teaching. */
export default function Loading() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton />

      <figure className="container-x pt-8 lg:pt-10">
        <Skeleton className="aspect-[4/3] w-full rounded-none sm:aspect-[21/9]" />
        <Skeleton className="mt-4 h-3.5 w-64" />
      </figure>

      <section className="section-y">
        <div className="container-x grid gap-10 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
          <SkeletonText className="md:col-span-6 lg:col-span-6" lines={3} lineHeight="h-7" lastLineWidth="55%" />
          <SkeletonText className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9 lg:pt-3" lines={about.body.length * 3} lastLineWidth="70%" />
        </div>
      </section>

      {/* The numbered "how it works" list, with its dividers already in place. */}
      <section className="section-y bg-canvas-alt dark:bg-transparent">
        <div className="container-x grid gap-10 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
          <Skeleton className="h-8 w-56 md:col-span-4 lg:col-span-4" />
          <ol className="md:col-span-7 lg:col-span-7 md:col-start-6 lg:col-start-6">
            {about.howItWorks.body.map((_, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr]">
                <Skeleton className="h-6 w-9" />
                <SkeletonText lines={3} lastLineWidth="58%" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 md:grid-cols-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="md:col-span-6 lg:col-span-6">
            <Skeleton className="h-8 w-64" />
            <SkeletonText className="mt-6 max-w-lg" lines={3} lastLineWidth="60%" />
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <SkeletonButton className="w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </section>
    </RouteSkeleton>
  );
}
