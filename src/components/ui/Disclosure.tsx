"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DisclosureProps = {
  summary: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
  headingLevel?: 2 | 3 | 4;
  tone?: "light" | "deep";
  className?: string;
  panelClassName?: string;
};

/**
 * One accordion row: a real <button> inside a heading, aria-expanded, and a
 * labelled region. A hairline plus turns into a minus; the panel height
 * animates with the grid 0fr→1fr technique.
 */
export function Disclosure({ summary, meta, children, open, onToggle, headingLevel = 3, tone = "light", className, panelClassName }: DisclosureProps) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const Heading = `h${headingLevel}` as const;
  const deep = tone === "deep";

  return (
    <div className={cn("border-b", deep ? "border-deep-line" : "border-line", className)}>
      <Heading className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn("group flex w-full items-baseline gap-6 py-6 text-left sm:py-7", deep ? "text-on-deep" : "text-ink")}
        >
          <span className="min-w-0 flex-1 transition-colors duration-200 group-hover:text-accent">{summary}</span>
          {meta && <span className="hidden shrink-0 sm:block">{meta}</span>}
          <span aria-hidden="true" className="relative mt-1 size-3.5 shrink-0 self-center">
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
            <span
              className={cn(
                "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 ease-(--ease-editorial)",
                open ? "scale-y-0" : "scale-y-100",
              )}
            />
          </span>
        </button>
      </Heading>
      <div className="collapse-grid" data-open={open}>
        <div id={panelId} role="region" aria-labelledby={buttonId} inert={!open}>
          <div className={cn("pb-8", panelClassName)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
