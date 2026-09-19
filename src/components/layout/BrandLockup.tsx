import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function BrandLockup({ tone = "light", onNavigate }: { tone?: "light" | "deep"; onNavigate?: () => void }) {
  const deep = tone === "deep";
  return (
    <Link href="/" onClick={onNavigate} className="group flex min-w-0 items-center gap-3">
      <Image
        src="/images/brand-mark-96.png"
        alt=""
        width={38}
        height={38}
        className="size-9 shrink-0 rounded-full sm:size-[2.375rem] transition-transform duration-1000 ease-(--ease-editorial) group-hover:rotate-[-10deg]"
      />
      <span className="flex flex-col">
        <span className={cn("whitespace-nowrap font-display text-[1.1875rem] leading-none tracking-[-0.01em] sm:text-[1.375rem]", deep ? "text-on-deep" : "text-ink")}>{site.name}</span>
        <span className={cn("mt-1 whitespace-nowrap text-[0.6875rem] leading-none tracking-[0.02em]", deep ? "text-on-deep-muted" : "text-muted")}>
          {site.instructorName}
        </span>
      </span>
    </Link>
  );
}
