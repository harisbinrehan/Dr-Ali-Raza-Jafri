"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { iconButtonClasses } from "@/components/ui/Button";
import { Moon, Sun } from "@/components/ui/Icons";

const subscribeNoop = () => () => {};

/** Outlined sun/moon toggle, as in the Amir Engineering navbar. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration-safe "mounted" flag without setState-in-effect.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button type="button" className={cn(iconButtonClasses, className)} aria-label="Toggle theme" onClick={() => setTheme(dark ? "light" : "dark")}>
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
