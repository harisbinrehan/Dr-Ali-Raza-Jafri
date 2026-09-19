import type { CSSProperties } from "react";

/** Stagger for [data-reveal] elements, e.g. style={revealDelay(i * 80)}. */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
