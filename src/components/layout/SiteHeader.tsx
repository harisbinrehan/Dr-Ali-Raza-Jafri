"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import { AccountLinks, CartButton, useViewer } from "@/components/layout/AccountLinks";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { iconButtonClasses } from "@/components/ui/Button";
import { Menu, Search } from "@/components/ui/Icons";

/**
 * Sticky navbar in the Amir Engineering style: solid translucent bar with a
 * hairline, text links with rounded hover fills, the orange primary action and
 * outlined icon buttons (theme, cart, menu).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const viewer = useViewer();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Sticky page elements (catalogue filters, enrol panel) sit below the bar.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", "4rem");
  }, []);

  return (
    <>
      <a href="#main" className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-lg bg-btn px-4 py-2.5 text-sm font-medium text-btn-fg transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-3 px-[clamp(1.25rem,4.5vw,4rem)]">
          <BrandLockup />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center whitespace-nowrap rounded-lg px-4 text-[0.875rem] font-medium transition-colors hover:bg-ink/[0.06]",
                      isActive(item.href) ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <AccountLinks viewer={viewer} className="hidden sm:flex" />
            <span className="hidden md:contents">
              <Link href="/courses" aria-label="Search courses" className={iconButtonClasses}>
                <Search />
              </Link>
            </span>
            <ThemeToggle />
            <CartButton />
            <span className="contents lg:hidden">
              <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuOpen} className={iconButtonClasses}>
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
