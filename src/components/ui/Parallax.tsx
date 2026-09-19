"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves its content at `speed` × scroll distance while on screen (desktop widths).
 * Transform only, one rAF per frame, and off under prefers-reduced-motion.
 */
export function Parallax({ speed = -0.08, className, children }: { speed?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Desktop only: on phones the offsets are large enough to misalign stacked images.
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 1023px)").matches) return;
    let frame = 0;
    let visible = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(offset * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!visible) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} data-parallax className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
