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

/** A stack of text-line placeholders — the last line is shorter, like a wrapped paragraph. */
export function SkeletonText({
  lines = 3,
  lastLineWidth = "70%",
  className,
  lineClassName,
  tone,
}: {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
  lineClassName?: string;
  tone?: Tone;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} tone={tone} className={cn("h-4 w-full", lineClassName)} style={i === lines - 1 ? { width: lastLineWidth } : undefined} />
      ))}
    </div>
  );
}

/** A circular placeholder for an avatar or profile photo. */
export function SkeletonAvatar({ className, tone }: { className?: string; tone?: Tone }) {
  return <Skeleton tone={tone} className={cn("size-10 shrink-0 rounded-full", className)} />;
}

/** A full-bleed image/thumbnail placeholder — defaults to the card image ratio used across the site. */
export function SkeletonImage({ className, tone }: { className?: string; tone?: Tone }) {
  return <Skeleton tone={tone} className={cn("aspect-video w-full rounded-none", className)} />;
}

/** A button-shaped placeholder, sized to match Button.tsx's own heights (sm=h-9, md=h-11, lg=h-[3.25rem]). */
export function SkeletonButton({ className, tone }: { className?: string; tone?: Tone }) {
  return <Skeleton tone={tone} className={cn("h-11 w-32 rounded-lg", className)} />;
}

/** Announces the loading state to screen readers — every Skeleton block itself is aria-hidden. */
export function SkeletonAnnounce({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-live="polite" className="sr-only">
      {label}…
    </span>
  );
}
