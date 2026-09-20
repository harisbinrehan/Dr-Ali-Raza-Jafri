import { Skeleton, SkeletonAnnounce, SkeletonText } from "@/components/ui/Skeleton";

/** Generic loading skeleton used across the app (excluding the homepage) to indicate page transitions. */
export default function Loading() {
  return (
    <div className="container-x py-12 lg:py-20 animate-in fade-in duration-500" aria-busy="true">
      <SkeletonAnnounce />
      <Skeleton className="h-10 w-2/3 max-w-xl" />
      <Skeleton className="mt-4 h-6 w-1/3" />

      <SkeletonText className="mt-12" lines={5} lastLineWidth="80%" />

      <div className="mt-16">
        <Skeleton className="h-6 w-1/4" />
        <SkeletonText className="mt-6" lines={3} lastLineWidth="75%" />
      </div>
    </div>
  );
}
