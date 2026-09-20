"use client";

import { useEffect, useState } from "react";
import { HANDOFF_EVENT } from "@/lib/enrolment";
import { isLegacyPlatformRoute } from "@/lib/site";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { RouteSkeleton } from "@/components/ui/Skeleton";

/**
 * Covers the gap between clicking through to the platform (sign-in, cart,
 * checkout, account, learning) and the browser unloading this page.
 *
 * It behaves exactly like a route change inside the app: the same skeleton,
 * the same 120ms delay before anything appears, and the header and bottom bar
 * stay put — only the content area is replaced — so a hand-off to checkout
 * doesn't look like a different application booting.
 */
export function GlobalNavigationLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 10s is a backstop only: in practice the browser unloads this page first.
    const start = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 10000);
    };

    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement).closest("a[href]");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || target.getAttribute("target") === "_blank" || target.hasAttribute("download")) return;

      if (isLegacyPlatformRoute(href)) start();
    }

    // "Buy this course" / "Enrol for free" go to checkout in code, not through
    // a link — they get the same loading state as every other hand-off.
    document.addEventListener("click", handleClick, true);
    window.addEventListener(HANDOFF_EVENT, start);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener(HANDOFF_EVENT, start);
    };
  }, []);

  if (!loading) return null;

  return (
    <RouteSkeleton className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-hidden bg-canvas">
      <PageSkeleton />
    </RouteSkeleton>
  );
}
