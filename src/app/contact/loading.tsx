import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { RouteSkeleton, Skeleton, SkeletonButton } from "@/components/ui/Skeleton";

/** Mirrors contact/page.tsx: the location list and the message form, field for field
 *  (the real fields are underlined, so the placeholders are rules, not filled boxes). */
export default function Loading() {
  return (
    <RouteSkeleton>
      <PageHeaderSkeleton />

      <div className="container-x grid gap-12 pb-16 pt-6 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pt-8">
        <section className="md:col-span-5 lg:col-span-5">
          <Skeleton className="h-6 w-44" />
          <dl className="mt-6">
            {[70, 55, 80, 90].map((w, i) => (
              <div key={i} className="grid gap-1 border-t border-line py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <Skeleton className="h-3.5 w-14 sm:mt-1.5" />
                <Skeleton className="h-5" style={{ width: `${w}%` }} />
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-9 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
          <Skeleton className="h-6 w-40" />
          {[{ label: "w-20", body: "h-[3.25rem]" }, { label: "w-12", body: "h-[3.25rem]" }].map((f, i) => (
            <div key={i}>
              <Skeleton className={`h-3.5 ${f.label}`} />
              <div className={`${f.body} border-b border-line-strong`} />
            </div>
          ))}
          <div>
            <Skeleton className="h-3.5 w-16" />
            <div className="h-[9.5rem] border-b border-line-strong" />
            <Skeleton className="mt-2 h-3.5 w-36" />
          </div>
          <SkeletonButton className="w-44" />
        </section>
      </div>
    </RouteSkeleton>
  );
}
