import { cn } from "@/lib/cn";

/**
 * The dark theme's signature background: navy, a soft teal glow top-right,
 * and grain. Only rendered in dark mode; the parent must be `relative isolate`.
 */
export function DarkBackdrop({ glow = true, className }: { glow?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden dark:block", className)}>
      {glow && <div className="absolute -right-40 top-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(124_196_184/0.12),transparent)]" />}
      <div className="grain absolute inset-0" />
    </div>
  );
}
