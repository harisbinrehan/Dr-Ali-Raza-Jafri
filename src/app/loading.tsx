import { Skeleton } from "@/components/ui/Skeleton";

/** Generic loading skeleton used across the app (excluding the homepage) to indicate page transitions. */
export default function Loading() {
  return (
    <div className="container-x py-12 lg:py-20 animate-in fade-in duration-500">
      {/* Title block */}
      <Skeleton className="h-10 w-2/3 max-w-xl rounded-lg" />
      <Skeleton className="mt-4 h-6 w-1/3 rounded-lg" />
      
      {/* Content lines */}
      <div className="mt-12 space-y-6">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
      </div>
      
      {/* Secondary content block */}
      <div className="mt-16 space-y-6">
        <Skeleton className="h-6 w-1/4 rounded-lg" />
        <Skeleton className="mt-6 h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-[90%] rounded-lg" />
        <Skeleton className="h-4 w-3/4 rounded-lg" />
      </div>
    </div>
  );
}
