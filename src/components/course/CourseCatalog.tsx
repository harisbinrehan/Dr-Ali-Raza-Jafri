"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import type { Category, CourseSummary } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { plural } from "@/lib/format";
import { CourseCard } from "@/components/course/CourseCard";
import { Close, Search } from "@/components/ui/Icons";

/** The platform's own sort options, in its order. */
const SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest rated" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
] as const;
type Sort = (typeof SORTS)[number]["value"];

const normalise = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s]/g, " ");

function sortCourses(courses: CourseSummary[], sort: Sort) {
  const list = [...courses]; // incoming order is already "popular"
  switch (sort) {
    case "newest":
      return list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    case "rating":
      return list.sort((a, b) => b.ratingAverage - a.ratingAverage || b.ratingCount - a.ratingCount);
    case "price_asc":
      return list.sort((a, b) => a.effectivePriceCents - b.effectivePriceCents);
    case "price_desc":
      return list.sort((a, b) => b.effectivePriceCents - a.effectivePriceCents);
    default:
      return list;
  }
}

export type CatalogFilters = { category: string; query: string; sort: string };

export function CourseCatalog({
  courses,
  categories,
  initial,
}: {
  courses: CourseSummary[];
  categories: Category[];
  initial: CatalogFilters;
}) {
  const [category, setCategory] = useState(categories.some((c) => c.slug === initial.category) ? initial.category : "");
  const [sort, setSort] = useState<Sort>(SORTS.some((s) => s.value === initial.sort) ? (initial.sort as Sort) : "popular");
  const [query, setQuery] = useState(initial.query);
  const deferredQuery = useDeferredValue(query);

  // Mirror the filters in the URL (?category=, ?query=, ?sort= — the platform's own
  // parameter names) so any view can be shared, without a server round trip.
  const syncUrl = (next: { category?: string; query?: string; sort?: string }) => {
    const sp = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(next)) {
      if (value && !(key === "sort" && value === "popular")) sp.set(key, value);
      else sp.delete(key);
    }
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const queryTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onQueryChange = (value: string) => {
    setQuery(value);
    clearTimeout(queryTimer.current);
    queryTimer.current = setTimeout(() => syncUrl({ query: value.trim() }), 350);
  };
  const onCategoryChange = (slug: string) => {
    setCategory(slug);
    syncUrl({ category: slug });
  };
  const onSortChange = (value: Sort) => {
    setSort(value);
    syncUrl({ sort: value });
  };
  const clearFilters = () => {
    clearTimeout(queryTimer.current);
    setQuery("");
    setCategory("");
    syncUrl({ category: "", query: "" });
  };

  const results = useMemo(() => {
    const terms = normalise(deferredQuery).split(/\s+/).filter(Boolean);
    const filtered = courses.filter((c) => {
      if (category && c.category?.slug !== category) return false;
      if (terms.length === 0) return true;
      const haystack = normalise([c.title, c.subtitle, c.category?.name, c.instructor].filter(Boolean).join(" "));
      return terms.every((t) => haystack.includes(t));
    });
    return sortCourses(filtered, sort);
  }, [courses, category, deferredQuery, sort]);

  const activeCategory = categories.find((c) => c.slug === category);
  const hasFilters = Boolean(category || deferredQuery.trim());

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-(--header-offset,0px) z-30 transition-[top] duration-500 ease-(--ease-out-expo) -mx-[clamp(1rem,4vw,3rem)] border-b border-line bg-paper/92 px-[clamp(1rem,4vw,3rem)] py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor="catalog-search" className="sr-only">
              Search courses
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search courses"
              className="h-12 w-full rounded-sm border border-line bg-card pl-11 pr-4 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-ink/40"
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="catalog-sort" className="eyebrow shrink-0 text-muted">
              Sort by
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as Sort)}
              className="h-12 w-full min-w-0 cursor-pointer rounded-sm border border-line bg-card px-3 text-[0.9375rem] text-ink outline-none focus:border-ink/40 sm:w-auto"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div role="group" aria-label="Filter by subject" className="-mx-[clamp(1rem,4vw,3rem)] mt-4 flex gap-2 overflow-x-auto px-[clamp(1rem,4vw,3rem)] pb-1 [scrollbar-width:none]">
          {[{ slug: "", name: "All", courseCount: courses.length }, ...categories].map((c) => {
            const active = category === c.slug;
            return (
              <button
                key={c.slug || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => onCategoryChange(c.slug)}
                className={cn(
                  "flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                  active ? "border-ink bg-ink text-paper" : "border-line-strong bg-transparent text-ink/80 hover:border-ink hover:text-ink",
                )}
              >
                {c.name}
                <span className={cn("font-mono text-[0.6875rem] tabular-nums", active ? "text-paper/60" : "text-muted")}>{c.courseCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result summary */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-[0.9375rem] text-muted">
          {plural(results.length, "course")}
          {activeCategory && (
            <>
              {" "}
              in <span className="text-ink">{activeCategory.name}</span>
            </>
          )}
          {deferredQuery.trim() && (
            <>
              {" "}
              matching <span className="text-ink">“{deferredQuery.trim()}”</span>
            </>
          )}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm font-medium text-ink/80 hover:text-ink"
          >
            <Close className="size-4" /> Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((course, i) => (
            <li key={course.id} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
              <CourseCard course={course} preload={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-line-strong px-6 py-20 text-center">
          <p className="font-display text-display-sm text-ink">No course matches that yet.</p>
          <p className="mx-auto mt-3 max-w-md text-muted">Try another word, or clear the filters to see all {plural(courses.length, "course")}.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 text-sm font-medium text-accent-deep underline underline-offset-4"
          >
            Show all courses
          </button>
        </div>
      )}
    </div>
  );
}
