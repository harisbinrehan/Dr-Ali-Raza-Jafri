import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DarkBackdrop } from "@/components/theme/DarkBackdrop";

/** Opening block for the text-led pages: label, masked display title, lead. */
export function PageHeader({ eyebrow, title, lead, children, className }: { eyebrow?: string; title: string; lead?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className="relative isolate overflow-hidden">
      <DarkBackdrop />
      <header className={cn("container-x pt-16", className)}>
        <div className="grid gap-6 pb-8 pt-6 lg:grid-cols-12 lg:gap-8 lg:pb-10 lg:pt-10">
          <div className="lg:col-span-8">
            {eyebrow && <p className="label text-eyebrow animate-fade">{eyebrow}</p>}
            <h1 className="mt-4 font-display text-h1 text-ink">
              <span className="mask">
                <span className="block animate-mask">{title}</span>
              </span>
            </h1>
          </div>
          {(lead || children) && (
            <div className="lg:col-span-4 lg:self-end">
              {lead && <p className="text-lead text-ink-soft animate-rise [animation-delay:200ms]">{lead}</p>}
              {children}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
