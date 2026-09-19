import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

/** Matches PageHeader.tsx's structure, so real content drops in without shifting the layout. */
export function PageHeaderSkeleton({ withLead = true, children }: { withLead?: boolean; children?: ReactNode }) {
  return (
    <div className="container-x pt-16">
      <div className="grid gap-6 pb-8 pt-6 md:grid-cols-12 lg:grid-cols-12 lg:gap-8 lg:pb-10 lg:pt-10">
        <div className="md:col-span-8 lg:col-span-8">
          <Skeleton className="h-[0.8125rem] w-40" />
          <Skeleton className="mt-4 h-[2.25rem] w-[85%] max-w-lg lg:h-[2.75rem]" />
        </div>
        {(withLead || children) && (
          <div className="md:col-span-4 lg:col-span-4 lg:self-end">
            {withLead && (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-4/5" />
              </>
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
