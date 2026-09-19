import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { home } from "@/content/pages";
import { plural } from "@/lib/format";
import { revealDelay } from "@/lib/motion";
import { SectionIntro } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

/** Every subject as an editorial index; each row opens the filtered catalogue. */
export function SubjectIndex({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="subjects-title" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionIntro id="subjects-title" title={home.subjects.heading} body={home.subjects.body} />
            <p data-reveal className="mt-8 text-[0.8125rem] text-muted">
              {plural(categories.length, "subject")}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {categories.map((c, i) => (
            <li key={c.id} data-reveal style={revealDelay(Math.min(i, 6) * 50)} className="border-b border-line first:border-t">
              <Link href={`/courses?category=${c.slug}`} className="group flex items-baseline gap-6 py-5 sm:py-6">
                <span className="w-7 shrink-0 text-[0.8125rem] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 font-display text-[1.25rem] font-semibold leading-tight text-ink transition-[color,transform] duration-700 ease-(--ease-editorial) group-hover:translate-x-2 group-hover:text-accent sm:text-[1.5rem]">
                  {c.name}
                </span>
                <span className="hidden shrink-0 text-[0.8125rem] tabular-nums text-muted sm:block">{plural(c.courseCount, "course")}</span>
                <ArrowRight className="size-4 shrink-0 self-center text-muted transition-[color,transform] duration-700 ease-(--ease-editorial) group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
