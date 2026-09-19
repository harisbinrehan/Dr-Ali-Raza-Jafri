import type { ComponentType, SVGProps } from "react";
import { revealDelay } from "@/lib/motion";
import { Award, InfinityIcon, Refresh } from "@/components/ui/Icons";

const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [InfinityIcon, Award, Refresh];

/** The three commitments, as a full-width band right under the hero. */
export function PromiseCard({ items }: { items: string[] }) {
  return (
    <section className="py-10 sm:py-12 bg-deep text-on-deep">
      <div className="container-x">
        <ul className="space-y-6">
          {items.map((text, i) => {
            const Icon = ICONS[i];
            return (
              <li key={text} data-reveal style={revealDelay(i * 80)} className="flex items-start gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-eyebrow-deep" />
                <p className="text-[0.9375rem] leading-relaxed text-on-deep">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
