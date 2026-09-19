"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { dashboardFor, readCart, subscribeCart } from "@/lib/enrolment";
import { isOwnedRoute, legacyRoutes } from "@/lib/site";
import { useViewer } from "@/components/layout/AccountLinks";
import { BookOpen, Cart, Home, User } from "@/components/ui/Icons";

function useCartCount() {
  return useSyncExternalStore(
    subscribeCart,
    () => readCart().length,
    () => 0,
  );
}

type Item = { href: string; label: string; icon: typeof Home; badge?: number };

/** App-style tab bar for small screens: Home, Courses, Cart, Account. */
export function BottomNav() {
  const pathname = usePathname();
  const viewer = useViewer();
  const count = useCartCount();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const items: Item[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: legacyRoutes.cart, label: "Cart", icon: Cart, badge: count },
    { href: viewer ? dashboardFor(viewer.role) : legacyRoutes.login, label: "Account", icon: User },
  ];

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const active = isActive(item.href);
          const content = (
            <>
              <span className="relative">
                <item.icon className="size-5" />
                {!!item.badge && (
                  <span className="absolute -right-1.5 -top-1.5 flex size-[1.0625rem] items-center justify-center rounded-full bg-btn text-[9px] font-semibold text-btn-fg">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </span>
              <span>{item.label}</span>
              <span className={cn("mt-0.5 h-0.5 w-6 rounded-full transition-colors", active ? "bg-accent" : "bg-transparent")} />
            </>
          );
          const className = cn(
            "flex flex-col items-center gap-1 py-2.5 text-[0.6875rem] font-medium transition-colors",
            active ? "text-accent" : "text-muted",
          );
          return (
            <li key={item.href}>
              {isOwnedRoute(item.href) ? (
                <Link href={item.href} className={className}>
                  {content}
                </Link>
              ) : (
                <a href={item.href} className={className}>
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
