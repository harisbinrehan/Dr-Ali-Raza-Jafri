import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

type PriceTagProps = {
  priceCents: number;
  effectivePriceCents: number;
  currency: string;
  size?: "sm" | "lg";
  tone?: "light" | "deep";
  className?: string;
};

/** Current price, with the original struck through while an instructor's sale runs. */
export function PriceTag({ priceCents, effectivePriceCents, currency, size = "sm", tone = "light", className }: PriceTagProps) {
  const text = tone === "deep" ? "text-on-deep" : "text-ink";
  const onSale = effectivePriceCents < priceCents;
  return (
    <span className={cn("inline-flex items-baseline gap-2.5 tabular-nums", className)}>
      <span className={cn(size === "lg" ? "font-display text-[1.875rem] leading-none" : "text-[0.875rem] font-semibold", text)}>
        {formatPrice(effectivePriceCents, currency)}
      </span>
      {onSale && (
        <s className={cn("text-[0.8125rem]", tone === "deep" ? "text-on-deep-muted" : "text-muted")}>
          <span className="sr-only">was </span>
          {formatPrice(priceCents, currency)}
        </s>
      )}
    </span>
  );
}
