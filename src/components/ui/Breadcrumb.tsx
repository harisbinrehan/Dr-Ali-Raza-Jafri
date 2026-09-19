import Link from "next/link";
import { cn } from "@/lib/cn";
import { ChevronRight } from "@/components/ui/Icons";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[0.8125rem]", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-muted" />}
              {item.href && !current ? (
                <Link href={item.href} className="link-line inline-block py-1.5 text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={current ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
