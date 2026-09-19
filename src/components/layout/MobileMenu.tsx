"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import type { Contact } from "@/lib/catalog";
import { AccountLinks } from "@/components/layout/AccountLinks";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Search } from "@/components/ui/Icons";

const links = [...primaryNav, { href: "/teach", label: "Teach with us" }];

/**
 * Full-screen menu on the native <dialog>: focus is trapped, the page behind
 * is inert, and Escape closes it (handled through React state so everything
 * stays in sync).
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
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      aria-label="Menu"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-0 text-ink backdrop:bg-transparent open:flex open:flex-col"
    >
      <div className="container-x flex h-[4.75rem] shrink-0 items-center justify-between border-b border-line">
        <BrandLockup onNavigate={onClose} />
        <button type="button" onClick={onClose} className="flex h-10 items-center gap-3 text-[0.875rem] font-medium">
          Close
          <span aria-hidden="true" className="relative size-4">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <div className="container-x flex flex-1 flex-col overflow-y-auto pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
        <form action="/courses" role="search" className="relative" onSubmit={onClose}>
          <label htmlFor="menu-search" className="sr-only">
            Search courses
          </label>
          <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            id="menu-search"
            name="query"
            type="search"
            placeholder="Search courses"
            className="h-12 w-full border-b border-line-strong bg-transparent pl-7 text-base text-ink outline-none placeholder:text-muted focus:border-ink"
          />
        </form>

        <nav aria-label="Mobile" className="mt-8">
          <ul>
            {links.map((item, i) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href} className={cn("border-b border-line", open && "animate-rise")} style={{ animationDelay: `${80 + i * 60}ms` }}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn("block py-4 font-display text-[2.5rem] leading-none", active ? "text-accent" : "text-ink")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10">
          <AccountLinks layout="stacked" />
        </div>

        <div className="mt-auto pt-12">
          <address className="space-y-1 text-sm not-italic leading-relaxed text-muted">
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="block text-ink">
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="block text-ink">
                {contact.email}
              </a>
            )}
            {contact.hours && <p>{contact.hours}</p>}
          </address>
        </div>
      </div>
    </dialog>
  );
}
