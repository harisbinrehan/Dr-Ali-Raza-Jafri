import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  size = "md",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)} data-reveal>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", dark ? "text-accent-bright" : "text-accent-deep")}>
          <span aria-hidden="true" className="h-px w-6 bg-current" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-display font-normal",
          size === "lg" ? "text-display-lg" : "text-display-md",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {body && (
        <p className={cn("mt-5 text-lead", align === "center" && "mx-auto", "max-w-2xl", dark ? "text-ink-muted" : "text-muted")}>
          {body}
        </p>
      )}
    </div>
  );
}
