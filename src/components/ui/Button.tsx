import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isOwnedRoute } from "@/lib/site";
import { ArrowRight } from "@/components/ui/Icons";

type Variant = "primary" | "accent" | "outline" | "outline-light" | "quiet";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-sm font-medium tracking-[-0.005em] transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-3",
  accent: "bg-accent text-ink hover:bg-accent-bright",
  outline: "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
  quiet: "text-current underline decoration-current/30 underline-offset-4 hover:decoration-current",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], variant !== "quiet" && sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight className="size-4 shrink-0 transition-transform duration-500 ease-(--ease-out-expo) group-hover/btn:translate-x-1" />
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/**
 * A link styled as a button. Routes owned by this app use client navigation;
 * anything else (the legacy platform, tel:, mailto:) is a plain anchor.
 */
export function ButtonLink({ href, children, variant, size, arrow, className, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (isOwnedRoute(href)) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, arrow, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
