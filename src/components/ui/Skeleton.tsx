import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type SkeletonProps = { className?: string; style?: CSSProperties; tone?: "light" | "deep" };

/** A single shimmering placeholder block. Compose these to match a page's real layout. */
export function Skeleton({ className, style, tone = "light" }: SkeletonProps) {
  const toneStyle = tone === "deep" ? ({ "--skeleton-bg": "var(--deep-line)" } as CSSProperties) : undefined;
  return <div aria-hidden="true" className={cn("skeleton", className)} style={{ ...toneStyle, ...style }} />;
}
