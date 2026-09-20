import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isOwnedRoute } from "@/lib/site";
import { ArrowRight } from "@/components/ui/Icons";

type Variant = "primary" | "outline" | "ghost" | "on-deep" | "outline-deep" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-[0.9375rem] font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-(--ease-editorial) active:translate-y-px disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-btn text-btn-fg shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_20px_-8px_rgb(15_107_97/0.45)] hover:bg-btn-hover hover:-translate-y-px hover:shadow-[0_2px_4px_rgb(0_0_0/0.08),0_12px_24px_-8px_rgb(15_107_97/0.5)]",
  outline: "border-ink/25 bg-ink/[0.04] text-ink hover:border-ink/45 hover:bg-ink/[0.08]",
  "on-deep": "bg-btn-deep text-btn-deep-fg shadow-[0_1px_2px_rgb(0_0_0/0.1),0_8px_20px_-8px_rgb(0_0_0/0.35)] hover:bg-btn-deep-hover hover:-translate-y-px",
  ghost: "text-ink/80 hover:bg-ink/[0.06] hover:text-ink",
  "outline-deep": "border-deep-line bg-on-deep/[0.04] text-on-deep hover:border-on-deep/40 hover:bg-on-deep/[0.08]",
  danger: "bg-danger text-[#f7f4ee] hover:bg-danger/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
  lg: "h-[3.25rem] px-6",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Plain icon button (theme, cart, menu): no border or fill, just the glyph. */
export const iconButtonClasses = "relative inline-grid size-9 shrink-0 place-items-center rounded-lg text-ink transition-colors hover:bg-ink/[0.06] [&_svg]:size-5";

function Arrow() {
  return <ArrowRight className="size-4 shrink-0 transition-transform duration-200 ease-(--ease-editorial) group-hover/btn:translate-x-1" />;
}

type LinkProps = { href: string; children: ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Internal routes use client navigation; the platform's own pages, tel: and mailto: are plain anchors. */
function SmartLink({ href, className, children, ...rest }: LinkProps) {
  return isOwnedRoute(href) ? (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant,
  size,
  arrow,
  className,
  ...rest
}: LinkProps & { variant?: Variant; size?: Size; arrow?: boolean }) {
  return (
    <SmartLink href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </SmartLink>
  );
}

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: { variant?: Variant; size?: Size; arrow?: boolean } & ComponentPropsWithoutRef<"button">) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

/** The editorial secondary action: text, a hairline that draws on hover, and an arrow. */
export function ArrowLink({ href, children, className, ...rest }: LinkProps) {
  return (
    <SmartLink href={href} className={cn("group/arrow inline-flex items-center gap-2.5 py-2 text-[0.9375rem] font-semibold", className)} {...rest}>
      <span className="link-line pb-0.5 group-hover/arrow:bg-[length:100%_1px]">{children}</span>
      <ArrowRight className="size-4 shrink-0 transition-transform duration-200 ease-(--ease-editorial) group-hover/arrow:translate-x-1" />
    </SmartLink>
  );
}
