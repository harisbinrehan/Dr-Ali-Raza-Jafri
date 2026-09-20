"use client";

import { useMemo, useRef, useState } from "react";
import type { Category, CourseSummary } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { plural } from "@/lib/format";
import { CourseCard } from "@/components/course/CourseCard";
import { ChevronDown, Search } from "@/components/ui/Icons";

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

export function CourseCatalog({ courses, categories, initial }: { courses: CourseSummary[]; categories: Category[]; initial: CatalogFilters }) {
  const [category, setCategory] = useState(categories.some((c) => c.slug === initial.category) ? initial.category : "");
  const [sort, setSort] = useState<Sort>(SORTS.some((s) => s.value === initial.sort) ? (initial.sort as Sort) : "popular");
  const [query, setQuery] = useState(initial.query);

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
    const terms = normalise(query).split(/\s+/).filter(Boolean);
    const filtered = courses.filter((c) => {
      if (category && c.category?.slug !== category) return false;
      if (terms.length === 0) return true;
      const haystack = normalise([c.title, c.subtitle, c.category?.name, c.instructor].filter(Boolean).join(" "));
      return terms.every((t) => haystack.includes(t));
    });
    return sortCourses(filtered, sort);
  }, [courses, category, query, sort]);

  const activeCategory = categories.find((c) => c.slug === category);
  const hasFilters = Boolean(category || query.trim());
  const tabs = [{ slug: "", name: "All subjects", courseCount: courses.length }, ...categories];

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="relative md:col-span-8 lg:col-span-8">
          <label htmlFor="catalog-search" className="sr-only">
            Search courses
          </label>
          <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search courses"
            className="h-12 w-full border-b border-line-strong bg-transparent pl-7 font-display text-[1.375rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink sm:text-[1.5rem]"
          />
        </div>
        <div className="flex items-center justify-between gap-4 md:col-span-4 lg:col-span-4 lg:justify-end">
          <label htmlFor="catalog-sort" className="text-[0.8125rem] text-muted">
            Sort by
          </label>
          <span className="relative">
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as Sort)}
              className="h-11 cursor-pointer appearance-none border-b border-line-strong bg-transparent pr-8 text-[0.9375rem] font-medium text-ink outline-none focus:border-ink"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </span>
        </div>
      </div>

      {/* Subjects: a quiet tab rail rather than a row of pills. */}
      <div className="sticky top-(--header-offset,0px) z-30 -mx-[clamp(1rem,3vw,2.5rem)] mt-6 border-b border-line bg-canvas/92 px-[clamp(1rem,3vw,2.5rem)] backdrop-blur-xl transition-[top] duration-300 ease-(--ease-editorial)">
        <div role="group" aria-label="Filter by subject" className="no-scrollbar -mb-px flex gap-7 overflow-x-auto pr-10 [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] lg:pr-0 lg:[mask-image:none]">
          {tabs.map((c) => {
            const active = category === c.slug;
            return (
              <button
                key={c.slug || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => onCategoryChange(c.slug)}
                className={cn(
                  "flex shrink-0 items-baseline gap-1.5 border-b py-4 text-[0.875rem] transition-colors duration-200",
                  active ? "border-ink font-semibold text-ink" : "border-transparent text-muted hover:text-ink",
                )}
              >
                {c.name}
                <span className="text-[0.8125rem] tabular-nums text-muted">{c.courseCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
        <p role="status" className="text-[0.9375rem] text-muted">
          {plural(results.length, "course")}
          {activeCategory && (
            <>
              {" "}
              in <span className="text-ink">{activeCategory.name}</span>
            </>
          )}
          {query.trim() && (
            <>
              {" "}
              matching <span className="text-ink">“{query.trim()}”</span>
            </>
          )}
        </p>
        {hasFilters && (
          <button type="button" onClick={clearFilters} className="link-quiet py-2 text-[0.875rem] font-semibold text-ink">
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((course, i) => (
            <li key={course.id} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
              <CourseCard course={course} preload={i < 3} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 border-t border-line py-14">
          <p className="font-display text-h3 text-ink">No course matches that yet.</p>
          <p className="mt-4 max-w-md text-muted">Try another word, or clear the filters to see all {plural(courses.length, "course")}.</p>
          <button type="button" onClick={clearFilters} className="link-quiet mt-6 text-[0.875rem] font-semibold text-ink">
            Show all courses
          </button>
        </div>
      )}
    </div>
  );
}
