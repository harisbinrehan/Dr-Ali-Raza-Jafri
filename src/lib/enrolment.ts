/**
 * Hand-off to the existing checkout.
 *
 * The platform's own "Buy this course" / "Enrol for free" button does exactly
 * two things: it adds the course id to the cart kept in localStorage under
 * `alignodontic.cart` (a JSON array of course ids, no duplicates), then opens
 * /checkout. Checkout — sign-in, pricing quote, coupons, order creation, the
 * payment provider and /order-complete — is all handled by the existing app.
 *
 * This module reproduces that hand-off and nothing more. It never talks to the
 * payment API.
 */
import { legacyRoutes } from "@/lib/site";

const CART_KEY = "alignodontic.cart";
const ACCESS_TOKEN_KEY = "alignodontic.accessToken";

export function readCart(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

const CART_EVENT = "alignodontic:cart";

export function addToCart(courseId: string) {
  const items = readCart();
  if (items.includes(courseId)) return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify([...items, courseId]));
  } catch {
    // Storage unavailable (private mode quota etc.) — checkout will show an empty cart.
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

/** Subscribe to cart changes from this tab and others (for useSyncExternalStore). */
export function subscribeCart(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === CART_KEY && onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(CART_EVENT, onChange);
  window.addEventListener("pageshow", onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener("pageshow", onChange);
  };
}

/** Announces a hand-off to the platform so the loading state matches a link click. */
export const HANDOFF_EVENT = "alignodontic:handoff";

/** Same behaviour as the platform's primary course button. */
export function enrolNow(courseId: string) {
  addToCart(courseId);
  window.dispatchEvent(new Event(HANDOFF_EVENT));
  window.location.assign(legacyRoutes.checkout);
}

function readAccessToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export type Viewer = { firstName: string | null; role: string } | null;

/**
 * Who is signed in, if anyone. Uses the access token the platform already
 * stores and never refreshes it (the platform does that itself), so this can't
 * disturb an existing session. An expired token simply reads as signed out.
 */
export async function fetchViewer(signal?: AbortSignal): Promise<Viewer> {
  const token = readAccessToken();
  if (!token) return null;
  try {
    const res = await fetch("/api/auth/me", {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      credentials: "include",
      signal,
    });
    if (!res.ok) return null;
    const { data } = (await res.json()) as { data: { firstName?: string | null; role: string } };
    return { firstName: data.firstName ?? null, role: data.role };
  } catch {
    return null;
  }
}

/**
 * Whether the signed-in viewer already owns a course. Mirrors the platform:
 * a pricing quote for an owned course is refused with CONFLICT.
 */
export async function fetchOwnsCourse(courseId: string, signal?: AbortSignal): Promise<boolean> {
  const token = readAccessToken();
  if (!token) return false;
  try {
    const res = await fetch("/api/checkout/quote", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      credentials: "include",
      body: JSON.stringify({ courseIds: [courseId] }),
      signal,
    });
    if (res.ok) return false;
    const body = (await res.json().catch(() => null)) as { error?: { code?: string } } | null;
    return body?.error?.code === "CONFLICT";
  } catch {
    return false;
  }
}

/** Where a signed-in user's dashboard lives, matching the platform's own routing. */
export function dashboardFor(role: string) {
  if (role === "ADMIN") return "/admin";
  if (role === "TEACHER") return "/teacher";
  return legacyRoutes.learn;
}

/**
 * Ends a video session the way the platform's player does: only when signed in,
 * with keepalive so it survives the page closing.
 */
export function endVideoSession(sessionId: string) {
  const token = readAccessToken();
  if (!token) return;
  fetch(`/api/videos/sessions/${sessionId}/end`, {
    method: "POST",
    keepalive: true,
    credentials: "include",
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => {});
}
