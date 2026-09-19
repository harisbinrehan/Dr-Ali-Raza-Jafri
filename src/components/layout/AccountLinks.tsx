"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import { dashboardFor, fetchViewer, readCart, type Viewer } from "@/lib/enrolment";
import { legacyRoutes } from "@/lib/site";

/**
 * Sign-in state is owned by the existing platform. This reads it (never
 * changes it) so returning students see their way back to their courses.
 */
export function useViewer() {
  const [viewer, setViewer] = useState<Viewer | undefined>(undefined);
  useEffect(() => {
    const controller = new AbortController();
    fetchViewer(controller.signal).then(setViewer);
    return () => controller.abort();
  }, []);
  return viewer;
}

export function useCartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const sync = () => setCount(readCart().length);
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("pageshow", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, []);
  return count;
}

type AccountLinksProps = { tone: "light" | "dark"; layout?: "inline" | "stacked" };

export function AccountLinks({ tone, layout = "inline" }: AccountLinksProps) {
  const viewer = useViewer();
  const cartCount = useCartCount();
  const dark = tone === "dark";
  const stacked = layout === "stacked";

  const cart =
    cartCount > 0 ? (
      <a
        href={legacyRoutes.cart}
        className={cn(
          "text-[0.9375rem] font-medium transition-colors",
          stacked ? buttonClasses({ variant: dark ? "outline-light" : "outline", className: "w-full" }) : dark ? "text-white/80 hover:text-white" : "text-ink/75 hover:text-ink",
        )}
      >
        Cart <span className="ml-1 rounded-full bg-accent px-1.5 py-px font-mono text-xs text-ink tabular-nums">{cartCount}</span>
      </a>
    ) : null;

  if (viewer) {
    return (
      <div className={cn("flex items-center gap-5", stacked && "flex-col items-stretch gap-3")}>
        {cart}
        <a href={dashboardFor(viewer.role)} className={buttonClasses({ variant: dark ? "outline-light" : "primary", className: stacked ? "w-full" : "" })}>
          {viewer.role === "ADMIN" || viewer.role === "TEACHER" ? "Dashboard" : "My learning"}
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-5", stacked && "flex-col items-stretch gap-3")}>
      {cart}
      <a
        href={legacyRoutes.login}
        className={cn(
          stacked
            ? buttonClasses({ variant: dark ? "outline-light" : "outline", className: "w-full" })
            : cn("link-underline text-[0.9375rem] font-medium transition-colors", dark ? "text-white/80 hover:text-white" : "text-ink/75 hover:text-ink"),
        )}
      >
        Sign in
      </a>
      <a href={legacyRoutes.register} className={buttonClasses({ variant: dark ? "accent" : "primary", className: stacked ? "w-full" : "" })}>
        Create account
      </a>
    </div>
  );
}
