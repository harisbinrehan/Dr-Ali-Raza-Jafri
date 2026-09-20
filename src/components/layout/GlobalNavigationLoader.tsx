"use client";

import { useEffect, useState } from "react";

export function GlobalNavigationLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as HTMLElement).closest("a[href]");
      if (!target) return;
      
      const href = target.getAttribute("href");
      if (!href || target.getAttribute("target") === "_blank" || target.hasAttribute("download")) return;
      
      // Determine if it's a hard navigation to legacy platform
      const isLegacyPlatform = [
        "/login", "/register", "/forgot-password", "/reset-password", "/verify-email", 
        "/cart", "/checkout", "/order-complete", "/wishlist", "/messages", 
        "/learn", "/account", "/teacher", "/admin", "/verify"
      ].some(path => href === path || href.startsWith(path + "/"));
      
      if (isLegacyPlatform) {
        setLoading(true);
        // The browser will naturally unload the page when the hard navigation finishes.
        // If it fails or the user cancels, we should probably reset it, but realistically it unloads.
        setTimeout(() => setLoading(false), 10000); // fallback reset
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-canvas animate-in fade-in duration-300">
      <div className="container-x py-12 lg:py-20">
        {/* Title block */}
        <div className="h-10 w-2/3 max-w-xl rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
        <div className="mt-4 h-6 w-1/3 rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
        
        {/* Content lines */}
        <div className="mt-12 space-y-6">
          <div className="h-4 w-full rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="h-4 w-full rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="h-4 w-5/6 rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="h-4 w-full rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="h-4 w-4/5 rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
        </div>
        
        {/* Secondary content block */}
        <div className="mt-16 space-y-6">
          <div className="h-6 w-1/4 rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="mt-6 h-4 w-full rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="h-4 w-[90%] rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
          <div className="h-4 w-3/4 rounded-lg bg-[var(--skeleton-bg,var(--line-strong))] animate-[skeleton-shimmer_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
