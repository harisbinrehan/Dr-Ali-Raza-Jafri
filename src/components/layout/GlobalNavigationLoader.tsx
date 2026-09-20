"use client";

import { useEffect, useState } from "react";
import { isLegacyPlatformRoute } from "@/lib/site";
import { Skeleton, SkeletonAnnounce, SkeletonText } from "@/components/ui/Skeleton";

/** Shown for the moment between clicking a link to the legacy platform (sign-in, cart,
 *  checkout, account, learning) and the browser actually unloading this page for the hard
 *  navigation. Uses the same Skeleton primitives as every loading.tsx, so there's no visible
 *  style change when the legacy page's own skeleton (public/legacy/theme.js) takes over. */
export function GlobalNavigationLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement).closest("a[href]");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || target.getAttribute("target") === "_blank" || target.hasAttribute("download")) return;

      if (isLegacyPlatformRoute(href)) {
        setLoading(true);
        // The browser will naturally unload the page when the hard navigation finishes.
        // If it fails or the user cancels, reset it — realistically it just unloads first.
        setTimeout(() => setLoading(false), 10000);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!loading) return null;

  return (
    <div role="status" aria-busy="true" className="fixed inset-0 z-[999999] bg-canvas animate-in fade-in duration-300">
      <SkeletonAnnounce />
      <div className="container-x py-12 lg:py-20">
        <Skeleton className="h-10 w-2/3 max-w-xl" />
        <Skeleton className="mt-4 h-6 w-1/3" />

        <SkeletonText className="mt-12" lines={5} lastLineWidth="80%" />

        <div className="mt-16">
          <Skeleton className="h-6 w-1/4" />
          <SkeletonText className="mt-6" lines={3} lastLineWidth="75%" />
        </div>
      </div>
    </div>
  );
}
