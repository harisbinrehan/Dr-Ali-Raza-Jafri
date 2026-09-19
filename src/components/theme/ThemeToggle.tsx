"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

/** Switches between light and dark. Renders a neutral placeholder until mounted. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  const next = dark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={mounted ? `Switch to ${next} theme` : "Switch theme"}
      className={cn("inline-flex shrink-0 items-center text-ink/70 transition-colors hover:text-ink", className)}
    >
      <span aria-hidden="true" className="relative grid size-9 place-items-center">
        <svg viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="12" cy="12" r="7.25" />
          <path d="M12 4.75a7.25 7.25 0 0 1 0 14.5Z" fill="currentColor" stroke="none" className="origin-center transition-transform duration-700 ease-(--ease-editorial) dark:rotate-180" />
        </svg>
      </span>
    </button>
  );
}
