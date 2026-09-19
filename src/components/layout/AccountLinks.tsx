"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses, iconButtonClasses } from "@/components/ui/Button";
import { Cart, User } from "@/components/ui/Icons";
import { dashboardFor, fetchViewer, readCart, subscribeCart, type Viewer } from "@/lib/enrolment";
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

function useCartCount() {
  return useSyncExternalStore(
    subscribeCart,
    () => readCart().length,
    () => 0,
  );
}

const dashboardLabel = (viewer: NonNullable<Viewer>) => (viewer.role === "ADMIN" || viewer.role === "TEACHER" ? "Dashboard" : "My learning");

/** Navbar: ghost "Sign in" and the orange primary action. */
export function AccountLinks({ viewer, className }: { viewer: Viewer | undefined; className?: string }) {
  if (viewer) {
    if (viewer.role !== "ADMIN" && viewer.role !== "TEACHER") {
      return null;
    }
    return (
      <a href={dashboardFor(viewer.role)} className={buttonClasses({ size: "sm", className })}>
        {dashboardLabel(viewer)}
      </a>
    );
  }
  return (
    <span className={cn("flex items-center gap-1", className)}>
      <a href={legacyRoutes.login} className={buttonClasses({ variant: "ghost", size: "sm", className: "hidden md:inline-flex" })}>
        Sign in
      </a>
      <a href={legacyRoutes.register} className={buttonClasses({ size: "sm" })}>
        Create account
      </a>
    </span>
  );
}

/** Outlined cart button with a count badge; the cart itself lives on the platform. */
export function CartButton() {
  const count = useCartCount();
  return (
    <a href={legacyRoutes.cart} aria-label={count ? `View cart, ${count} ${count === 1 ? "course" : "courses"}` : "View cart"} className={iconButtonClasses}>
      <Cart />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex size-[1.125rem] items-center justify-center rounded-full bg-btn text-[10px] font-semibold text-btn-fg">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </a>
  );
}

/** Drawer footer: full-width outline buttons and the primary action. */
export function DrawerAccountLinks({ viewer, onNavigate }: { viewer: Viewer | undefined; onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      <a href={viewer ? dashboardFor(viewer.role) : legacyRoutes.login} onClick={onNavigate} className={buttonClasses({ variant: "outline", size: "sm", className: "w-full" })}>
        <User className="size-4" />
        {viewer ? dashboardLabel(viewer) : "Sign in / My learning"}
      </a>
      <Link href="/teach" onClick={onNavigate} className={buttonClasses({ variant: "outline", size: "sm", className: "w-full" })}>
        Teach with us
      </Link>
      {!viewer && (
        <a href={legacyRoutes.register} onClick={onNavigate} className={buttonClasses({ size: "sm", className: "w-full" })}>
          Create account
        </a>
      )}
    </div>
  );
}
