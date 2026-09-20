"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Every route change starts scrolled to the top, regardless of where the
 * previous page left off. Deliberately keyed on pathname only, not search
 * params: filter changes (e.g. /courses?category=x) update the query string
 * without a real navigation, and forcing a scroll reset there would fight the
 * user. useSearchParams() would also require this to be wrapped in Suspense
 * to avoid bailing out of static generation for every page in the app.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
