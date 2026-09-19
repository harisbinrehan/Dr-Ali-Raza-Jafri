import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { home } from "@/content/pages";
import { plural } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

/** Every subject as a numbered editorial index; each row opens the filtered catalogue. */
export function SubjectIndex({ categories }: { categories: Category[] }) {
  const half = Math.ceil(categories.length / 2);
  const columns = [categories.slice(0, half), categories.slice(half)];

  return (
    <section aria-labelledby="subjects-title" className="section-y border-t border-line bg-paper-2">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="subjects-title" title={home.subjects.heading} body={home.subjects.body} />
          <p data-reveal className="eyebrow text-muted">
            {plural(categories.length, "subject")}
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 md:grid-cols-2">
          {columns.map((column, col) => (
            <ol key={col} start={col * half + 1} className="border-t border-line-strong">
              {column.map((c, i) => {
                const n = col * half + i + 1;
                return (
                  <li key={c.id} data-reveal style={revealDelay(i * 45)} className="border-b border-line-strong">
                    <Link
                      href={`/courses?category=${c.slug}`}
                      className="group flex items-center gap-5 py-5 transition-[padding] duration-500 ease-(--ease-out-expo) hover:pl-2"
                    >
                      <span className="w-7 shrink-0 font-mono text-xs tabular-nums text-muted transition-colors group-hover:text-accent-deep">
                        {String(n).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 font-display text-[1.375rem] leading-tight text-ink sm:text-2xl">{c.name}</span>
                      <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{plural(c.courseCount, "course")}</span>
                      <ArrowRight className="size-4 shrink-0 -translate-x-2 text-accent-deep opacity-0 transition-[opacity,transform] duration-500 ease-(--ease-out-expo) group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          ))}
        </div>
      </div>
    </section>
  );
}
