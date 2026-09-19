"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/** Every route or search parameter change starts scrolled to the top, regardless of where the previous view left off. */
export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}
