"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Plus } from "@/components/ui/Icons";

type DisclosureProps = {
  summary: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
  headingLevel?: 2 | 3 | 4;
  tone?: "light" | "dark";
  className?: string;
  panelClassName?: string;
};

/**
 * One accordion row: a real <button> in a heading, with aria-expanded and a
 * labelled region. Height animates via the grid 0fr→1fr technique, so there is
 * no measuring and no layout thrash.
 */
export function Disclosure({
  summary,
  meta,
  children,
  open,
  onToggle,
  headingLevel = 3,
  tone = "light",
  className,
  panelClassName,
}: DisclosureProps) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={cn("border-b", tone === "dark" ? "border-ink-line" : "border-line", className)}>
      <Heading className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "group flex w-full items-start gap-5 py-5 text-left transition-colors sm:py-6",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          <span className="min-w-0 flex-1">{summary}</span>
          {meta && <span className="hidden shrink-0 pt-1 sm:block">{meta}</span>}
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-(--ease-out-expo)",
              tone === "dark"
                ? "border-ink-line group-hover:border-white/40"
                : "border-line-strong group-hover:border-ink",
              open && (tone === "dark" ? "rotate-45 border-accent bg-accent text-ink" : "rotate-45 border-ink bg-ink text-paper"),
            )}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </Heading>
      <div className="collapse-grid" data-open={open}>
        <div id={panelId} role="region" aria-labelledby={buttonId} inert={!open}>
          <div className={cn("pb-6", panelClassName)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
