import { cn } from "@/lib/cn";

/**
 * The dark theme's signature background, kept exactly as it was: navy, six
 * faint column rules, a soft orange glow top-right, and grain. Only rendered
 * in dark mode; the parent must be `relative isolate`.
 */
export function DarkBackdrop({ glow = true, className }: { glow?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden dark:block", className)}>
      <div className="column-rules absolute inset-0" />
      {glow && <div className="absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(124_196_184/0.16),transparent)]" />}
      <div className="grain absolute inset-0" />
    </div>
  );
}
