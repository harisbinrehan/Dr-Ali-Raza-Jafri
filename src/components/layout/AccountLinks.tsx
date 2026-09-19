"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import { dashboardFor, fetchViewer, readCart, subscribeCart, type Viewer } from "@/lib/enrolment";
import { legacyRoutes } from "@/lib/site";

/**
 * Sign-in state is owned by the existing platform. This reads it (never
 * changes it) so returning students see their way back to their courses.
 */
function useViewer() {
  const [viewer, setViewer] = useState<Viewer | undefined>(undefined);
  useEffect(() => {
    const controller = new AbortController();
    fetchViewer(controller.signal).then(setViewer);
    return () => controller.abort();
  }, []);
  return viewer;
}

function useCartCount() {
  return useSyncExternalStore(
    subscribeCart,
    () => readCart().length,
    () => 0,
  );
}

const textLink = "link-line py-2 text-[0.875rem] font-medium text-ink/75 transition-colors hover:text-ink";

export function AccountLinks({ layout = "inline" }: { layout?: "inline" | "stacked" }) {
  const viewer = useViewer();
  const cartCount = useCartCount();
  const stacked = layout === "stacked";

  const cart =
    cartCount > 0 ? (
      <a href={legacyRoutes.cart} className={stacked ? buttonClasses({ variant: "outline", size: "lg", className: "w-full" }) : textLink}>
        Cart <span className="ml-1 tabular-nums text-accent">({cartCount})</span>
      </a>
    ) : null;

  const primary = viewer ? (
    <a href={dashboardFor(viewer.role)} className={buttonClasses({ size: stacked ? "lg" : "md", className: cn(stacked && "w-full", !stacked && "h-10 px-4") })}>
      {viewer.role === "ADMIN" || viewer.role === "TEACHER" ? "Dashboard" : "My learning"}
    </a>
  ) : (
    <a href={legacyRoutes.register} className={buttonClasses({ size: stacked ? "lg" : "md", className: cn(stacked && "w-full", !stacked && "h-10 px-4") })}>
      Create account
    </a>
  );

  return (
    <div className={cn("flex items-center gap-6", stacked && "flex-col items-stretch gap-3")}>
      {cart}
      {!viewer && (
        <a href={legacyRoutes.login} className={stacked ? buttonClasses({ variant: "outline", size: "lg", className: "w-full" }) : textLink}>
          Sign in
        </a>
      )}
      {primary}
    </div>
  );
}
