import { Skeleton } from "@/components/ui/Skeleton";

/** Mirrors Hero.tsx + the stats row, so the homepage doesn't jump when data arrives. */
export default function Loading() {
  return (
    <section className="relative isolate overflow-hidden pb-8 pt-16 sm:pb-10">
      <div className="container-x">
        <div className="flex items-center justify-between border-b border-line pb-4 pt-8 lg:pt-10">
          <Skeleton className="h-[0.8125rem] w-44" />
          <Skeleton className="hidden h-[0.8125rem] w-36 sm:block" />
        </div>

        <div className="mt-6 lg:mt-8">
          <Skeleton className="h-9 w-[90%] max-w-xl lg:h-12" />
          <Skeleton className="mt-3 h-9 w-[70%] max-w-md lg:h-12" />
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-12 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col md:col-span-4 lg:col-span-4">
            <div className="max-w-md space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
              <Skeleton className="h-[3.25rem] w-40 rounded-lg" />
              <Skeleton className="h-[3.25rem] w-36 rounded-lg" />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-6">
              <Skeleton className="h-[0.8125rem] w-32" />
              <Skeleton className="mt-3 h-6 w-[80%]" />
              <div className="mt-5 flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:mt-14">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-line bg-surface px-4 py-5 sm:px-5 sm:py-6">
              <Skeleton className="h-8 w-14" />
              <Skeleton className="mt-2.5 h-3 w-16" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
