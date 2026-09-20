import { faqs } from "@/content/faq";
import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Mirrors faq/page.tsx: the accordion with its first answer open, and the "ask us" panel. */
export default function Loading() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton withLead={false} />

      <div className="container-x grid gap-10 pb-16 pt-6 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pt-8">
        <div className="border-t border-line md:col-span-7 lg:col-span-7">
          {/* The first question is open on arrival, so its answer is part of the shape. */}
          <div className="border-b border-line py-5">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-5 w-[62%]" />
              <Skeleton className="size-4 shrink-0" />
            </div>
            <SkeletonText className="mt-4 max-w-[62ch]" lines={3} lastLineWidth="55%" />
          </div>
          {faqs.slice(1).map((_, i) => (
            // Widths cycle so the column reads like a list of questions, not a bar chart.
            <div key={i} className="flex items-center justify-between gap-4 border-b border-line py-5">
              <Skeleton className="h-5" style={{ width: `${[62, 48, 70, 54, 66, 44, 58][i % 7]}%` }} />
              <Skeleton className="size-4 shrink-0" />
            </div>
          ))}
        </div>

        <aside className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
          <div className="border-t border-ink pt-8">
            <Skeleton className="h-6 w-full max-w-[18rem]" />
            <Skeleton className="mt-2 h-6 w-2/3" />
            <div className="mt-6 space-y-4">
              {[40, 56, 44].map((w, i) => (
                <div key={i}>
                  <Skeleton className="h-3.5 w-12" />
                  <Skeleton className="mt-1.5 h-5" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </RouteSkeleton>
  );
}
