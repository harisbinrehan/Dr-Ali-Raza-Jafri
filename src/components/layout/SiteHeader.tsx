"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import type { Contact } from "@/lib/catalog";
import { AccountLinks } from "@/components/layout/AccountLinks";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Close, Search } from "@/components/ui/Icons";

export function SiteHeader({ contact }: { contact: Contact }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastY = useRef(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 16);
        // Tuck the bar away while reading downwards; bring it back on any upward scroll.
        if (y > 560 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y <= 560) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const tucked = hidden && !menuOpen && !searchOpen;

  // Lets sticky page elements (catalogue filters, the enrol panel) sit just below the bar.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", tucked ? "0px" : "4.75rem");
  }, [tucked]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,transform] duration-700 ease-(--ease-editorial)",
          scrolled || searchOpen ? "border-line bg-canvas/88 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent",
          tucked && "-translate-y-full",
        )}
      >
        <div className="container-x flex h-[4.75rem] items-center gap-3 lg:gap-10">
          <BrandLockup />

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative py-2 text-[0.875rem] font-medium transition-colors duration-500",
                        active ? "text-ink" : "text-ink/65 hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-px h-px origin-left bg-current transition-transform duration-700 ease-(--ease-editorial)",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:ml-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-controls="header-search-panel"
              aria-label={searchOpen ? "Close search" : "Search courses"}
              className="hidden size-10 place-items-center text-ink/70 transition-colors hover:text-ink sm:grid"
            >
              {searchOpen ? <Close className="size-[1.125rem]" /> : <Search className="size-[1.125rem]" />}
            </button>
            <ThemeToggle />
            <span aria-hidden="true" className="mx-3 hidden h-5 w-px bg-line-strong md:block" />
            <div className="hidden md:block">
              <AccountLinks />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="group flex h-10 items-center gap-2.5 pl-2 text-[0.875rem] font-medium text-ink lg:hidden"
            >
              <span aria-hidden="true" className="hidden sm:inline">
                Menu
              </span>
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 self-end bg-current transition-[width] duration-500 group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>

        <div id="header-search-panel" className="collapse-grid" data-open={searchOpen}>
          <div inert={!searchOpen}>
            <form action="/courses" role="search" className="container-x flex items-center gap-4 pb-6 pt-2" onSubmit={() => setSearchOpen(false)}>
              <label htmlFor="header-search" className="sr-only">
                Search courses
              </label>
              <Search className="size-5 shrink-0 text-muted" />
              <input
                ref={searchRef}
                id="header-search"
                name="query"
                type="search"
                placeholder="Search courses — aligners, cephalometrics, infection control…"
                className="h-14 min-w-0 flex-1 border-b border-line-strong bg-transparent font-display text-[1.625rem] text-ink outline-none placeholder:text-muted/70 focus:border-ink sm:text-[2rem]"
              />
            </form>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} contact={contact} />
    </>
  );
}
