"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Every route change starts scrolled to the top, regardless of where the previous page left off. */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
