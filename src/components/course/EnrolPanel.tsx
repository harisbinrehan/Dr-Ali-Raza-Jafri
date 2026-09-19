"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { addToCart, enrolNow, fetchOwnsCourse, readCart, subscribeCart } from "@/lib/enrolment";
import { legacyRoutes } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight, Play } from "@/components/ui/Icons";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { openPreview, type PreviewLesson } from "@/components/course/PreviewDialog";

type Status = "idle" | "in-cart" | "owned";

/**
 * The platform's own enrolment behaviour: add the course to the cart it keeps,
 * then open its checkout. Payment, sign-in and access stay with the platform.
 */
function useEnrolment(courseId: string) {
  const [owned, setOwned] = useState(false);
  const [pending, setPending] = useState(false);
  const inCart = useSyncExternalStore(
    subscribeCart,
    () => readCart().includes(courseId),
    () => false,
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchOwnsCourse(courseId, controller.signal).then(setOwned);
    return () => controller.abort();
  }, [courseId]);

  const status: Status = owned ? "owned" : inCart ? "in-cart" : "idle";
  const enrol = () => {
    setPending(true);
    enrolNow(courseId);
  };
  return { status, pending, enrol, addToCart: () => addToCart(courseId) };
}

type EnrolButtonProps = { courseId: string; free: boolean; tone?: "light" | "deep"; size?: "md" | "lg"; className?: string };

/** The primary action on its own — used in the closing band and the mobile bar. */
export function EnrolButton({ courseId, free, tone = "light", size = "lg", className }: EnrolButtonProps) {
  const { status, pending, enrol } = useEnrolment(courseId);
  const variant = tone === "deep" ? "on-deep" : "primary";
  if (status === "owned") {
    return (
      <a href={legacyRoutes.learnCourse(courseId)} className={buttonClasses({ variant, size, className })}>
        Go to course <ArrowRight className="size-4" />
      </a>
    );
  }
  return (
    <button type="button" onClick={enrol} disabled={pending} className={buttonClasses({ variant, size, className })}>
      {pending ? "Opening checkout…" : free ? "Enrol for free" : "Buy this course"}
      {!pending && <ArrowRight className="size-4 transition-transform duration-700 ease-(--ease-editorial) group-hover/btn:translate-x-1" />}
    </button>
  );
}

export type EnrolPanelProps = {
  courseId: string;
  title: string;
  imageUrl: string | null;
  priceCents: number;
  effectivePriceCents: number;
  currency: string;
  includes: { label: string; href?: string }[];
  firstPreview: PreviewLesson | null;
};

/** Price and enrolment, kept in view beside the course on desktop. */
export function EnrolPanel({ courseId, title, imageUrl, priceCents, effectivePriceCents, currency, includes, firstPreview }: EnrolPanelProps) {
  const { status, addToCart } = useEnrolment(courseId);
  const [barVisible, setBarVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const free = effectivePriceCents === 0;

  // The mobile bar takes over once the main button has scrolled out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setBarVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="border border-line bg-surface">
        <div className="relative">
          <CourseImage src={imageUrl} title={title} sizes="(min-width: 1024px) 400px, 100vw" preload />
          {firstPreview && (
            <button
              type="button"
              onClick={() => openPreview(firstPreview)}
              className="group absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 text-left text-white"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-11 place-items-center bg-white text-black transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-105">
                  <Play className="ml-0.5 size-4" />
                </span>
                <span className="text-[0.875rem] font-semibold">Preview this course</span>
              </span>
            </button>
          )}
        </div>

        <div className="p-7">
          {status === "owned" ? (
            <p className="font-display text-[2.75rem] leading-none text-ink">Owned</p>
          ) : (
            <PriceTag priceCents={priceCents} effectivePriceCents={effectivePriceCents} currency={currency} size="lg" />
          )}

          <div ref={ctaRef} className="mt-7">
            <EnrolButton courseId={courseId} free={free} className="w-full" />
            {status === "idle" && (
              <button type="button" onClick={addToCart} className="link-quiet mt-3 w-full py-2 text-[0.875rem] text-ink/75 hover:text-ink">
                Add to cart instead
              </button>
            )}
            {status === "in-cart" && (
              <a href={legacyRoutes.cart} className="link-quiet mt-3 block w-full py-2 text-center text-[0.875rem] text-ink/75 hover:text-ink">
                In your cart. Go to cart
              </a>
            )}
          </div>

          <ul className="mt-7 border-t border-line">
            {includes.map((item) => (
              <li key={item.label} className="border-b border-line py-3 text-[0.875rem] text-ink-soft last:border-b-0">
                {item.href ? (
                  <Link href={item.href} className="link-quiet">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile: price and the same action, always within reach. */}
      <div
        aria-hidden={!barVisible}
        inert={!barVisible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-700 ease-(--ease-editorial) lg:hidden",
          barVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container-x flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.8125rem] text-muted">{title}</p>
            <p className="font-semibold tabular-nums text-ink">{status === "owned" ? "Owned" : formatPrice(effectivePriceCents, currency)}</p>
          </div>
          <EnrolButton courseId={courseId} free={free} size="md" className="shrink-0" />
        </div>
      </div>
    </>
  );
}
