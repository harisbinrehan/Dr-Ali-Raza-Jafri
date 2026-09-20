import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton, SkeletonButton, SkeletonText } from "@/components/ui/Skeleton";

/** Mirrors teach/page.tsx's highlights row, body sections and apply sidebar. */
export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton>
        <Skeleton className="mt-6 h-4 w-full max-w-xs" />
      </PageHeaderSkeleton>

      <section className="section-y-sm" aria-busy="true">
        <ol className="container-x grid gap-x-8 gap-y-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="border-t border-ink py-6 md:pr-6">
              <Skeleton className="h-6 w-32" />
              <SkeletonText className="mt-5" lines={2} lastLineWidth="80%" />
            </li>
          ))}
        </ol>
      </section>

      <div className="container-x grid gap-12 pb-16 pt-8 md:grid-cols-12 lg:grid-cols-12 lg:gap-8" aria-busy="true">
        <div className="space-y-12 md:col-span-7 lg:col-span-7">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="grid gap-4 border-t border-line pt-6 xl:grid-cols-[13rem_1fr] xl:gap-10">
              <Skeleton className="h-6 w-28" />
              <SkeletonText className="max-w-[62ch]" lines={3} lastLineWidth="66%" />
            </div>
          ))}
        </div>

        <aside className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
          <div className="bg-deep p-6 sm:p-8">
            <Skeleton tone="deep" className="h-6 w-40" />
            <SkeletonText tone="deep" className="mt-4" lines={2} lastLineWidth="75%" />
            <div className="mt-6 flex flex-col gap-3">
              <SkeletonButton tone="deep" className="w-full" />
              <SkeletonButton tone="deep" className="w-full" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
