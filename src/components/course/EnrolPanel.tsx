"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { addToCart, enrolNow, fetchOwnsCourse, readCart } from "@/lib/enrolment";
import { legacyRoutes } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight, Certificate, Clock, Infinity, Level, Play, Refund } from "@/components/ui/Icons";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";
import { openPreview, type PreviewLesson } from "@/components/course/PreviewDialog";

export type EnrolPanelProps = {
  courseId: string;
  title: string;
  imageUrl: string | null;
  priceCents: number;
  effectivePriceCents: number;
  currency: string;
  includes: { icon: "lessons" | "keep" | "refund" | "certificate" | "level"; label: string; href?: string }[];
  firstPreview: PreviewLesson | null;
};

const includeIcons = { lessons: Clock, keep: Infinity, refund: Refund, certificate: Certificate, level: Level };

type Status = "idle" | "in-cart" | "owned";

/**
 * Price and enrolment. The buttons do exactly what the platform's own course
 * page does — add the course to the cart the platform keeps, then open its
 * checkout — so payment, sign-in and access are untouched.
 */
export function EnrolPanel(props: EnrolPanelProps) {
  const { courseId, title, imageUrl, priceCents, effectivePriceCents, currency, includes, firstPreview } = props;
  const [status, setStatus] = useState<Status>("idle");
  const [pending, setPending] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const free = effectivePriceCents === 0;
  const primaryLabel = free ? "Enrol for free" : "Buy this course";

  useEffect(() => {
    if (readCart().includes(courseId)) setStatus("in-cart");
    const controller = new AbortController();
    fetchOwnsCourse(courseId, controller.signal).then((owned) => owned && setStatus("owned"));
    return () => controller.abort();
  }, [courseId]);

  // The mobile bar takes over once the main button has scrolled out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setBarVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onEnrol = () => {
    setPending(true);
    enrolNow(courseId);
  };
  const onAddToCart = () => {
    addToCart(courseId);
    setStatus("in-cart");
  };

  const primary =
    status === "owned" ? (
      <a href={legacyRoutes.learnCourse(courseId)} className={buttonClasses({ size: "lg", className: "w-full" })}>
        Go to course <ArrowRight className="size-4" />
      </a>
    ) : (
      <button type="button" onClick={onEnrol} disabled={pending} className={buttonClasses({ variant: "accent", size: "lg", className: "w-full" })}>
        {pending ? "Opening checkout…" : primaryLabel}
        {!pending && <ArrowRight className="size-4 transition-transform duration-500 ease-(--ease-out-expo) group-hover/btn:translate-x-1" />}
      </button>
    );

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-line bg-card shadow-card">
        <div className="relative">
          <CourseImage src={imageUrl} title={title} sizes="(min-width: 1024px) 400px, 92vw" preload className="rounded-none" />
          {firstPreview && (
            <button
              type="button"
              onClick={() => openPreview(firstPreview)}
              className="group absolute inset-0 grid place-items-center bg-ink/35 text-white transition-colors hover:bg-ink/50"
            >
              <span className="flex flex-col items-center gap-3">
                <span className="grid size-16 place-items-center rounded-full bg-paper text-ink shadow-float transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-110">
                  <Play className="ml-0.5 size-6" />
                </span>
                <span className="eyebrow text-white">Preview this course</span>
              </span>
            </button>
          )}
        </div>

        <div className="p-6 sm:p-7">
          {status === "owned" ? (
            <p className="font-display text-[2.5rem] leading-none text-ink">Owned</p>
          ) : (
            <PriceTag priceCents={priceCents} effectivePriceCents={effectivePriceCents} currency={currency} size="lg" />
          )}

          <div ref={ctaRef} className="mt-6">
            {primary}
            {status === "idle" && (
              <button
                type="button"
                onClick={onAddToCart}
                className="mt-2.5 w-full py-2 text-sm font-medium text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                Add to cart instead
              </button>
            )}
            {status === "in-cart" && (
              <a
                href={legacyRoutes.cart}
                className="mt-2.5 block w-full py-2 text-center text-sm font-medium text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                In your cart. Go to cart
              </a>
            )}
          </div>

          <ul className="mt-6 space-y-3 border-t border-line pt-6">
            {includes.map((item) => {
              const Icon = includeIcons[item.icon];
              return (
                <li key={item.label} className="flex items-center gap-3 text-[0.9375rem] text-ink/80">
                  <Icon className="size-[1.125rem] shrink-0 text-accent-deep" />
                  {item.href ? (
                    <Link href={item.href} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile: price and the same action, always within reach. */}
      <div
        aria-hidden={!barVisible}
        inert={!barVisible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-500 ease-(--ease-out-expo) lg:hidden",
          barVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container-x flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-muted">{title}</p>
            <p className="font-semibold tabular-nums text-ink">{status === "owned" ? "Owned" : formatPrice(effectivePriceCents, currency)}</p>
          </div>
          <div className="shrink-0">{primary}</div>
        </div>
      </div>
    </>
  );
}
