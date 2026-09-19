"use client";

import { useState } from "react";
import { Disclosure } from "@/components/ui/Disclosure";
import { RichText } from "@/components/ui/RichText";

export type FaqEntry = { id: string; question: string; answer: string };

/** FAQ list. Several answers can be open at once; the first can start open. */
export function FaqAccordion({
  items,
  firstOpen = false,
  tone = "light",
  headingLevel = 3,
}: {
  items: FaqEntry[];
  firstOpen?: boolean;
  tone?: "light" | "dark";
  headingLevel?: 2 | 3;
}) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(firstOpen && items[0] ? [items[0].id] : []));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={tone === "dark" ? "border-t border-ink-line" : "border-t border-line"}>
      {items.map((item) => (
        <Disclosure
          key={item.id}
          open={open.has(item.id)}
          onToggle={() => toggle(item.id)}
          tone={tone}
          headingLevel={headingLevel}
          summary={<span className="font-display text-[1.3125rem] leading-snug sm:text-[1.5rem]">{item.question}</span>}
        >
          <p className={`prose-copy max-w-2xl pr-12 ${tone === "dark" ? "text-white/70 [&_a]:text-accent-bright" : ""}`}>
            <RichText text={item.answer} />
          </p>
        </Disclosure>
      ))}
    </div>
  );
}
