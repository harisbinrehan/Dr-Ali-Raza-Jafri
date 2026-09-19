import Link from "next/link";
import type { ReactNode } from "react";
import { isOwnedRoute } from "@/lib/site";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders copy that marks links as [text](/href), the format used in src/content. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [raw, label, href] = match;
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      isOwnedRoute(href) ? (
        <Link key={index} href={href}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href}>
          {label}
        </a>
      ),
    );
    last = index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
