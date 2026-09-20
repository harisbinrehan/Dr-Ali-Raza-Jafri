import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/**
 * The default page shape: the standard header block over a couple of text
 * groups. Used for any route without a more specific skeleton, and for the
 * hand-off to the platform's own pages, so an unfamiliar route still loads
 * exactly like a familiar one.
 */
export function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="container-x pb-16 pt-6 lg:pt-8">
        <SkeletonText lines={4} lastLineWidth="72%" />
        <div className="mt-12">
          <Skeleton className="h-5 w-40" />
          <SkeletonText className="mt-6" lines={3} lastLineWidth="66%" />
        </div>
      </div>
    </>
  );
}
