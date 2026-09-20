import { Skeleton, SkeletonButton, SkeletonImage } from "@/components/ui/Skeleton";

/** Matches EnrolPanel.tsx's card structure. */
export function EnrolPanelSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)]">
      <SkeletonImage />
      <div className="p-7">
        <Skeleton className="h-8 w-24" />
        <div className="mt-7">
          <SkeletonButton className="w-full" />
        </div>
        <ul className="mt-7 border-t border-line">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="border-b border-line py-3 last:border-b-0">
              <Skeleton className="h-3.5 w-[70%]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
