"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import type { Viewer } from "@/lib/enrolment";
import { DrawerAccountLinks } from "@/components/layout/AccountLinks";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Close } from "@/components/ui/Icons";

/**
 * Right-hand sheet in the Amir Engineering style, built on the native
 * <dialog>: focus is trapped, the page behind is inert, and Escape closes it
 * through React state so everything stays in sync.
 */
export function MobileMenu({ open, onClose, viewer }: { open: boolean; onClose: () => void; viewer: Viewer | undefined }) {
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
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Menu"
      className="sheet fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-sm flex-col border-l border-line bg-canvas p-0 text-ink shadow-lg open:flex"
    >
      <div className="relative flex h-16 shrink-0 items-center border-b border-line px-4">
        <BrandLockup onNavigate={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink [&_svg]:size-4"
        >
          <Close />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-col gap-1 overflow-y-auto p-4">
        {primaryNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <div key={item.href} className="border-b border-line py-1 last:border-none">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn("block py-2.5 text-[0.875rem] font-medium", active ? "text-accent" : "text-ink")}
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-line p-4">
        <DrawerAccountLinks viewer={viewer} onNavigate={onClose} />
      </div>
    </dialog>
  );
}
