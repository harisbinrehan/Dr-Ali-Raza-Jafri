import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "deep";
type SkeletonProps = { className?: string; style?: CSSProperties; tone?: Tone };

function toneStyle(tone: Tone | undefined): CSSProperties | undefined {
  return tone === "deep" ? ({ "--skeleton-bg": "var(--deep-line)" } as CSSProperties) : undefined;
}

/** A single shimmering placeholder block. Compose these to match a page's real layout. */
export function Skeleton({ className, style, tone = "light" }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("skeleton", className)} style={{ ...toneStyle(tone), ...style }} />;
}

/** A stack of text-line placeholders — the last line is shorter, like a wrapped paragraph.
 *  `lineHeight` replaces the line's height class outright (default "h-4", body-text size) rather
 *  than merging with it, since cn() doesn't dedupe conflicting Tailwind classes. */
export function SkeletonText({
  lines = 3,
  lastLineWidth = "70%",
  lineHeight = "h-4",
  className,
  tone,
}: {
  lines?: number;
  lastLineWidth?: string;
  lineHeight?: string;
  className?: string;
  tone?: Tone;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} tone={tone} className={cn(lineHeight, "w-full")} style={i === lines - 1 ? { width: lastLineWidth } : undefined} />
      ))}
    </div>
  );
}

/** A circular placeholder for an avatar or profile photo. Pass a `size-*` class to size it —
 *  cn() here doesn't dedupe conflicting Tailwind classes, so this has no built-in default size. */
export function SkeletonAvatar({ className, tone }: { className?: string; tone?: Tone }) {
  return <Skeleton tone={tone} className={cn("shrink-0 rounded-full", className)} />;
}

/** A full-bleed image/thumbnail placeholder, at the card image ratio used across the site. */
export function SkeletonImage({ className, tone }: { className?: string; tone?: Tone }) {
  return <Skeleton tone={tone} className={cn("aspect-video w-full rounded-none", className)} />;
}

/** A button-shaped placeholder, at one of Button.tsx's own three heights. Pass a `w-*` class to
 *  size its width — cn() doesn't dedupe conflicting classes, so width has no built-in default. */
export function SkeletonButton({ size = "lg", className, tone }: { size?: "sm" | "md" | "lg"; className?: string; tone?: Tone }) {
  const heights = { sm: "h-9", md: "h-11", lg: "h-[3.25rem]" };
  return <Skeleton tone={tone} className={cn(heights[size], "rounded-lg", className)} />;
}

/** Announces the loading state to screen readers — every Skeleton block itself is aria-hidden. */
export function SkeletonAnnounce({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-live="polite" className="sr-only">
      {label}…
    </span>
  );
}
