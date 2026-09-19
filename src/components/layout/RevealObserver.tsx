"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for the whole page. Server-rendered sections opt in
 * with `data-reveal` (no client wrapper needed); this marks them revealed as
 * they enter the viewport. Elements added later (filters, navigation) are
 * picked up by a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((el) => io.observe(el));
    };
    observe(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]:not(.is-revealed)")) io.observe(node);
          observe(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
