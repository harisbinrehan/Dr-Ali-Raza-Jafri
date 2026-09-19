"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import type { Contact } from "@/lib/catalog";
import { AccountLinks } from "@/components/layout/AccountLinks";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Close, Search } from "@/components/ui/Icons";

const links = [...primaryNav, { href: "/teach", label: "Teach with us" }];

/**
 * Full-screen menu built on the native <dialog>: focus is trapped, Escape
 * closes it and the page behind is inert, without any extra script.
 */
export function MobileMenu({ open, onClose, contact }: { open: boolean; onClose: () => void; contact: Contact }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label="Menu"
      className="m-0 h-dvh max-h-none w-full max-w-none translate-y-0 bg-ink p-0 text-white backdrop:bg-transparent open:flex open:flex-col"
    >
      <div className="container-x flex h-[4.5rem] shrink-0 items-center justify-between border-b border-ink-line">
        <BrandLockup tone="dark" onNavigate={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
        >
          <Close className="size-5" />
        </button>
      </div>

      <div className="container-x flex flex-1 flex-col overflow-y-auto pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
        <form action="/courses" role="search" className="relative" onSubmit={onClose}>
          <label htmlFor="menu-search" className="sr-only">
            Search courses
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/50" />
          <input
            id="menu-search"
            name="query"
            type="search"
            placeholder="Search courses"
            className="h-12 w-full rounded-sm border border-white/15 bg-white/5 pl-11 pr-4 text-base text-white outline-none placeholder:text-white/45 focus:border-white/40"
          />
        </form>

        <nav aria-label="Mobile" className="mt-6">
          <ul>
            {links.map((item, i) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href} className={cn(open && "animate-rise")} style={{ animationDelay: `${60 + i * 55}ms` }}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-ink-line py-4"
                  >
                    <span className="w-7 font-mono text-xs text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
                    <span className={cn("font-display text-[2.25rem] leading-none", active ? "text-accent-bright" : "text-white")}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8">
          <AccountLinks tone="dark" layout="stacked" />
        </div>

        <address className="mt-auto space-y-1 pt-10 text-sm not-italic leading-relaxed text-white/60">
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="block text-white/85">
              {contact.phone}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="block text-white/85">
              {contact.email}
            </a>
          )}
          {contact.hours && <p>{contact.hours}</p>}
        </address>
      </div>
    </dialog>
  );
}
