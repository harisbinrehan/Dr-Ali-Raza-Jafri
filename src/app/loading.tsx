import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { RouteSkeleton } from "@/components/ui/Skeleton";

/** Fallback for any route without its own skeleton — same shape, timing and tint as the rest. */
export default function Loading() {
  return (
    <RouteSkeleton>
      <PageSkeleton />
    </RouteSkeleton>
  );
}
