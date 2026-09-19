import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Opening block for the light, text-led pages (about, FAQ, contact, policies). */
export function PageHeader({ eyebrow, title, lead, children, className }: { eyebrow?: string; title: string; lead?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <header className={cn("container-x pb-14 pt-32 sm:pt-40", className)}>
      <div className="max-w-4xl">
        {eyebrow && (
          <p className="eyebrow flex items-center gap-3 text-accent-deep animate-fade">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 font-display text-display-lg text-ink animate-rise">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lead text-muted animate-rise [animation-delay:100ms]">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
