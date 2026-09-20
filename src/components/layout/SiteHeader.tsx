"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import { AccountLinks, CartButton, useViewer } from "@/components/layout/AccountLinks";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Menu, Search } from "@/components/ui/Icons";

/**
 * Sticky navbar in the Amir Engineering style: solid translucent bar with a
 * hairline, text links with rounded hover fills, the orange primary action and
 * outlined icon buttons (theme, cart, menu).
 */
const subscribeNoop = () => () => {};

export function SiteHeader() {
  const pathname = usePathname();
  const viewer = useViewer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const { resolvedTheme } = useTheme();
  // Hydration-safe "mounted" flag without setState-in-effect.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sticky page elements (catalogue filters, enrol panel) sit below the bar.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", "4rem");
  }, []);

  const isLightTop = pathname.startsWith("/instructors/");
  const isTransparent = !scrolled;
  const tone = isTransparent && !isLightTop && isDark ? "deep" : "light";

  return (
    <>
      <a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-lg bg-btn px-4 py-2.5 text-sm font-medium text-btn-fg transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80 border-b border-line shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.15)]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-3 px-[clamp(1rem,3vw,2.5rem)]">
          <BrandLockup tone={tone} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 items-center whitespace-nowrap rounded-lg px-4 text-[0.875rem] font-medium transition-colors",
                        tone === "deep" 
                          ? (active ? "text-accent" : "text-on-deep hover:bg-on-deep/[0.08]") 
                          : (active ? "text-accent" : "text-ink hover:bg-ink/[0.06]")
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={cn(
              "flex shrink-0 items-center gap-1.5 sm:gap-2",
              tone === "deep"
                ? "text-on-deep [&_a]:text-on-deep [&_button]:text-on-deep [&_a:hover]:bg-on-deep/[0.08] [&_button:hover]:bg-on-deep/[0.08]"
                : "text-ink [&_a]:text-ink [&_button]:text-ink [&_a:hover]:bg-ink/[0.06] [&_button:hover]:bg-ink/[0.06]"
            )}
          >
            <AccountLinks viewer={viewer} className="hidden sm:flex" />
            <span className="hidden md:contents">
              <Link
                href="/courses"
                aria-label="Search courses"
                className="relative inline-grid size-9 shrink-0 place-items-center rounded-lg transition-colors [&_svg]:size-5"
              >
                <Search />
              </Link>
            </span>
            <ThemeToggle />
            <span className="hidden lg:contents">
              <CartButton />
            </span>
            <span className="contents lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                className="relative inline-grid size-9 shrink-0 place-items-center rounded-lg transition-colors [&_svg]:size-5"
              >
                <Menu />
              </button>
            </span>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} viewer={viewer} />
    </>
  );
}
