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
import { Menu, Search } from "@/components/ui/Icons";

/** Pages that open on a dark band; the header sits transparently over it until scrolled. */
const DARK_TOP = [/^\/$/, /^\/courses\/[^/]+$/, /^\/instructors\/[^/]+$/];

export function SiteHeader({ contact }: { contact: Contact }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Tuck the bar away while reading downwards; bring it back on any upward scroll.
        setHidden(y > 480 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y <= 480) setHidden(false);
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

  // Lets sticky page elements (catalogue filters, the enrol card) sit just below the bar.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", hidden && !menuOpen ? "0px" : "4.5rem");
  }, [hidden, menuOpen]);

  const overDark = DARK_TOP.some((re) => re.test(pathname)) && !scrolled;
  const tone = overDark ? "dark" : "light";

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,transform,backdrop-filter] duration-500 ease-(--ease-out-expo)",
          overDark ? "border-b border-transparent bg-transparent" : "border-b border-line/80 bg-paper/88 backdrop-blur-xl backdrop-saturate-150",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center gap-6 lg:gap-10">
          <BrandLockup tone={tone} />

          <nav aria-label="Primary" className="ml-2 hidden lg:block">
            <ul className="flex items-center gap-7">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.9375rem] font-medium transition-colors",
                        overDark ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-ink",
                        active && (overDark ? "text-white" : "text-ink"),
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-300",
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-5">
            <form action="/courses" role="search" className="relative hidden xl:block">
              <label htmlFor="header-search" className="sr-only">
                Search courses
              </label>
              <Search
                className={cn("pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2", overDark ? "text-white/55" : "text-muted")}
              />
              <input
                id="header-search"
                name="query"
                type="search"
                placeholder="Search courses"
                className={cn(
                  "h-10 w-48 rounded-sm border pl-9 pr-3 text-sm outline-none transition-[width,background-color,border-color] duration-500 ease-(--ease-out-expo) focus:w-64",
                  overDark
                    ? "border-white/15 bg-white/5 text-white placeholder:text-white/45 focus:border-white/40"
                    : "border-line bg-card/70 text-ink placeholder:text-muted focus:border-ink/40",
                )}
              />
            </form>

            <Link
              href="/teach"
              className={cn(
                "link-underline hidden text-[0.9375rem] font-medium transition-colors 2xl:block",
                overDark ? "text-white/75 hover:text-white" : "text-ink/70 hover:text-ink",
              )}
            >
              Teach with us
            </Link>

            <div className="hidden md:block">
              <AccountLinks tone={tone} />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors lg:hidden",
                overDark ? "border-white/20 text-white hover:bg-white/10" : "border-line-strong text-ink hover:bg-ink hover:text-paper",
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} contact={contact} />
    </>
  );
}
