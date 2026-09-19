import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

/** Mirrors about/page.tsx's header, photo and opening quote. */
export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="container-x pt-8 lg:pt-10">
        <Skeleton className="aspect-[4/3] w-full rounded-none sm:aspect-[21/9]" />
      </div>

      <section className="section-y">
        <div className="container-x grid gap-10 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-3 md:col-span-6 lg:col-span-6">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-[85%]" />
            <Skeleton className="h-7 w-2/3" />
          </div>
          <div className="space-y-3 md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    </>
  );
}
