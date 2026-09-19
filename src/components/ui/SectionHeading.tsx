import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingTag = "h1" | "h2" | "h3";

/**
 * A display heading that rises out of a mask as it enters the viewport.
 * The same words, one element — just typeset and revealed with care.
 */
export function RevealHeading({
  as: Tag = "h2",
  id,
  className,
  style,
  children,
}: {
  as?: HeadingTag;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag id={id} data-reveal="text" style={style} className={cn("font-display", className)}>
      <span className="mask">
        <span>{children}</span>
      </span>
    </Tag>
  );
}

type SectionIntroProps = {
  label?: string;
  title: ReactNode;
  body?: ReactNode;
  id?: string;
  as?: HeadingTag;
  size?: "h1" | "h2" | "h3";
  tone?: "light" | "deep";
  className?: string;
};

/** Label (optional), display heading and a short supporting line. Left-aligned by design. */
export function SectionIntro({ label, title, body, id, as = "h2", size = "h2", tone = "light", className }: SectionIntroProps) {
  const deep = tone === "deep";
  return (
    <div className={cn("max-w-3xl", className)}>
      {label && (
        <p data-reveal className={cn("label mb-6", deep ? "text-deep-accent" : "text-accent")}>
          {label}
        </p>
      )}
      <RevealHeading
        as={as}
        id={id}
        className={cn(size === "h1" ? "text-h1" : size === "h3" ? "text-h3" : "text-h2", deep ? "text-on-deep" : "text-ink")}
      >
        {title}
      </RevealHeading>
      {body && (
        <p data-reveal className={cn("mt-6 max-w-xl text-lead", deep ? "text-on-deep-muted" : "text-muted")}>
          {body}
        </p>
      )}
    </div>
  );
}
