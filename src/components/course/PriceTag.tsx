import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

type PriceTagProps = {
  priceCents: number;
  effectivePriceCents: number;
  currency: string;
  size?: "sm" | "lg";
  tone?: "light" | "dark";
  className?: string;
};

/** Current price, with the original struck through while an instructor's sale runs. */
export function PriceTag({ priceCents, effectivePriceCents, currency, size = "sm", tone = "light", className }: PriceTagProps) {
  const onSale = effectivePriceCents < priceCents;
  const free = effectivePriceCents === 0;
  return (
    <span className={cn("inline-flex items-baseline gap-2 tabular-nums", className)}>
      <span
        className={cn(
          size === "lg" ? "font-display text-[2.5rem] leading-none tracking-[-0.02em]" : "text-[0.9375rem] font-semibold",
          free ? (tone === "dark" ? "text-accent-bright" : "text-accent-deep") : tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {formatPrice(effectivePriceCents, currency)}
      </span>
      {onSale && (
        <s className={cn("text-sm", tone === "dark" ? "text-white/45" : "text-muted")}>
          <span className="sr-only">was </span>
          {formatPrice(priceCents, currency)}
        </s>
      )}
    </span>
  );
}
