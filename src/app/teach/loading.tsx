import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

/** Mirrors teach/page.tsx's highlights row, body sections and apply sidebar. */
export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton>
        <Skeleton className="mt-6 h-4 w-full max-w-xs" />
      </PageHeaderSkeleton>

      <section className="section-y-sm">
        <ol className="container-x grid gap-x-8 gap-y-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="border-t border-ink py-6 md:pr-6">
              <Skeleton className="h-6 w-32" />
              <div className="mt-5 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="container-x grid gap-12 pb-16 pt-8 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-12 md:col-span-7 lg:col-span-7">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="grid gap-4 border-t border-line pt-6 xl:grid-cols-[13rem_1fr] xl:gap-10">
              <Skeleton className="h-6 w-28" />
              <div className="max-w-[62ch] space-y-2.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>

        <aside className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
          <div className="bg-deep p-6 sm:p-8">
            <Skeleton tone="deep" className="h-6 w-40" />
            <div className="mt-4 space-y-2">
              <Skeleton tone="deep" className="h-4 w-full" />
              <Skeleton tone="deep" className="h-4 w-3/4" />
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Skeleton tone="deep" className="h-[3.25rem] w-full rounded-lg" />
              <Skeleton tone="deep" className="h-[3.25rem] w-full rounded-lg" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
