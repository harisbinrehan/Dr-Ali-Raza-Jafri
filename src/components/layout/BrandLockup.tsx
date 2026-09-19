import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function BrandLockup({ tone = "light", onNavigate }: { tone?: "light" | "deep"; onNavigate?: () => void }) {
  const deep = tone === "deep";
  return (
    <Link href="/" onClick={onNavigate} className="flex min-w-0 shrink items-center gap-2.5">
      <Image src="/images/brand-mark-96.png" alt="" width={36} height={36} className="size-8 shrink-0 rounded-full sm:size-9" />
      <span className="flex min-w-0 flex-col">
        <span className={cn("truncate font-display text-[0.9375rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.125rem]", deep ? "text-on-deep" : "text-ink")}>
          {site.name}
        </span>
        <span className={cn("truncate text-[0.6875rem] leading-tight", deep ? "text-on-deep-muted" : "text-muted")}>{site.instructorName}</span>
      </span>
    </Link>
  );
}
