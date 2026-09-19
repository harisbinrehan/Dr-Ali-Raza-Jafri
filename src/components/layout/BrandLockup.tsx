import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function BrandLockup({ tone = "light", onNavigate }: { tone?: "light" | "dark"; onNavigate?: () => void }) {
  const dark = tone === "dark";
  return (
    <Link href="/" onClick={onNavigate} className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
      <Image
        src="/images/brand-mark-96.png"
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-[-8deg]"
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.1875rem] tracking-[-0.01em]", dark ? "text-white" : "text-ink")}>{site.name}</span>
        <span className={cn("mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em]", dark ? "text-white/55" : "text-muted")}>
          {site.instructorName}
        </span>
      </span>
    </Link>
  );
}
