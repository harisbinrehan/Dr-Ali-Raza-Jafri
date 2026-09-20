import { Skeleton, SkeletonImage } from "@/components/ui/Skeleton";

/** Matches CourseCard.tsx's proportions, so the catalogue doesn't jump when real cards arrive. */
export function CourseCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <SkeletonImage />
      <div className="flex flex-1 flex-col p-5">
        <Skeleton className="h-[0.8125rem] w-24" />
        <Skeleton className="mt-3 h-5 w-[85%]" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-1.5 h-4 w-3/5" />
        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
            <Skeleton className="h-[0.8125rem] w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
