import Link from "next/link";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, tone = "light", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("eyebrow", className)}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2.5">
              {item.href && !current ? (
                <Link
                  href={item.href}
                  className={cn("link-underline transition-colors", tone === "dark" ? "text-ink-muted hover:text-white" : "text-muted hover:text-ink")}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={current ? "page" : undefined} className={tone === "dark" ? "text-accent-bright" : "text-accent-deep"}>
                  {item.label}
                </span>
              )}
              {!current && (
                <span aria-hidden="true" className={tone === "dark" ? "text-white/30" : "text-line-strong"}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
