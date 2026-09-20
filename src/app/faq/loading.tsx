import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

/** Mirrors faq/page.tsx's accordion + "ask us" sidebar. */
export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton withLead={false} />

      <div className="container-x grid gap-10 pb-16 pt-6 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pt-8" aria-busy="true">
        <div className="border-t border-line md:col-span-7 lg:col-span-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-b border-line py-5">
              <Skeleton className="h-5 w-[70%]" />
              <Skeleton className="size-4 shrink-0 rounded-full" />
            </div>
          ))}
        </div>

        <aside className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
          <div className="border-t border-ink pt-8">
            <Skeleton className="h-6 w-48" />
            <div className="mt-6 space-y-5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-3.5 w-12" />
                  <Skeleton className="mt-1.5 h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
