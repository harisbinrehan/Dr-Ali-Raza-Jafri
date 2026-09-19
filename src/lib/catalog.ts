import "server-only";

/**
 * Read-only access to the existing Alignodontic catalog API.
 * Every course, price, category and contact detail on the site comes from here,
 * so the pages always match what the platform actually sells.
 */

const API_ORIGIN = (process.env.API_ORIGIN ?? process.env.LEGACY_ORIGIN ?? "https://dralirazajafri.com").replace(/\/$/, "");

/** Catalog pages are regenerated in the background at most this often. */
export const CATALOG_REVALIDATE_SECONDS = 300;

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ALL_LEVELS";
export type LessonType = "VIDEO" | "EXTERNAL_VIDEO" | "QUIZ" | "FLASHCARDS" | "ASSIGNMENT" | "TEXT" | (string & {});

export type Category = {
  id: string;
  slug: string;
  name: string;
  courseCount: number;
};

export type CourseSummary = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  thumbnailUrl: string | null;
  priceCents: number;
  effectivePriceCents: number;
  currency: string;
  level: CourseLevel;
  totalDurationSeconds: number;
  lessonCount: number;
  studentCount: number;
  ratingAverage: number;
  ratingCount: number;
  publishedAt: string;
  category: { name: string; slug: string } | null;
  instructor: string;
  instructorSlug: string;
};

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  durationSeconds: number;
  isFreePreview: boolean;
  previewAssetId: string | null;
};

export type Section = { id: string; title: string; lessons: Lesson[] };

export type Review = {
  id: string;
  rating: number;
  author: string;
  comment: string | null;
  teacherReply: string | null;
};

export type CourseDetail = CourseSummary & {
  description: string | null;
  language: string;
  requirements: string[];
  learningObjectives: string[];
  certificateEnabled: boolean;
  discountEndsAt: string | null;
  sections: Section[];
  reviews: Review[];
};

export type Contact = {
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
};

export type Stats = { courses: number; students: number; reviews: number; averageRating: number | null };
export type Policy = { currency: string; refundWindowDays: number; commissionPercent: number; minWithdrawal: string };

export type Instructor = {
  slug: string;
  name: string;
  headline: string | null;
  bio: string | null;
};

class CatalogError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`Catalog request failed (${status}) for ${path}`);
  }
}

const RETRIES = 2;

/** GET from the catalogue API; transient failures (5xx, network) are retried with backoff. */
async function request<T>(path: string): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(`${API_ORIGIN}/api${path}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: CATALOG_REVALIDATE_SECONDS },
      });
      if (!res.ok) throw new CatalogError(res.status, path);
      const body = (await res.json()) as { data: T };
      return body.data;
    } catch (error) {
      const transient = !(error instanceof CatalogError) || error.status >= 500;
      if (!transient || attempt >= RETRIES) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt));
    }
  }
}

/* ---------- Mapping raw API shapes to what the UI needs ---------- */

type RawCourse = Omit<CourseSummary, "instructor" | "instructorSlug" | "lessonCount"> & {
  instructor?: string;
  instructorSlug?: string;
  lessonCount?: number;
  _count?: { lessons: number };
  teacher: { slug: string; user: { firstName: string | null; lastName: string | null } };
};

function instructorName(user: { firstName: string | null; lastName: string | null }) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
}

function toSummary(raw: RawCourse): CourseSummary {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle || null,
    thumbnailUrl: raw.thumbnailUrl,
    priceCents: raw.priceCents,
    effectivePriceCents: raw.effectivePriceCents ?? raw.priceCents,
    currency: raw.currency,
    level: raw.level,
    totalDurationSeconds: raw.totalDurationSeconds ?? 0,
    lessonCount: raw.lessonCount ?? raw._count?.lessons ?? 0,
    studentCount: raw.studentCount ?? 0,
    ratingAverage: raw.ratingAverage ?? 0,
    ratingCount: raw.ratingCount ?? 0,
    publishedAt: raw.publishedAt,
    category: raw.category ?? null,
    instructor: raw.instructor ?? instructorName(raw.teacher.user),
    instructorSlug: raw.instructorSlug ?? raw.teacher.slug,
  };
}

/* ---------- Public API ---------- */

const PAGE_SIZE = 50; // the API rejects anything larger

/** Every published course, in the platform's "most popular" order. */
export async function getCourses(): Promise<CourseSummary[]> {
  const items: RawCourse[] = [];
  for (let skip = 0; ; skip += PAGE_SIZE) {
    const page = await request<{ total: number; items: RawCourse[] }>(
      `/catalog/courses?take=${PAGE_SIZE}&skip=${skip}&sort=popular`,
    );
    items.push(...page.items);
    if (items.length >= page.total || page.items.length === 0) break;
  }
  return items.map(toSummary);
}

export async function getCourse(slug: string): Promise<CourseDetail | null> {
  try {
    const raw = await request<
      RawCourse & Omit<CourseDetail, keyof CourseSummary> & { teacher: RawCourse["teacher"] }
    >(`/catalog/courses/${encodeURIComponent(slug)}`);
    return {
      ...toSummary(raw),
      description: raw.description || null,
      language: raw.language,
      requirements: raw.requirements ?? [],
      learningObjectives: raw.learningObjectives ?? [],
      certificateEnabled: Boolean(raw.certificateEnabled),
      discountEndsAt: raw.discountEndsAt ?? null,
      sections: raw.sections ?? [],
      reviews: raw.reviews ?? [],
    };
  } catch (error) {
    if (error instanceof CatalogError && (error.status === 404 || error.status === 400)) return null;
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  const raw = await request<{ id: string; slug: string; name: string; _count: { courses: number } }[]>(
    "/catalog/categories",
  );
  return raw.map((c) => ({ id: c.id, slug: c.slug, name: c.name, courseCount: c._count.courses }));
}

export async function getInstructor(slug: string): Promise<Instructor | null> {
  try {
    const raw = await request<{
      slug: string;
      headline: string | null;
      bio: string | null;
      user: { firstName: string | null; lastName: string | null };
    }>(`/catalog/instructors/${encodeURIComponent(slug)}`);
    return {
      slug: raw.slug,
      name: instructorName(raw.user),
      headline: raw.headline,
      bio: raw.bio,
    };
  } catch (error) {
    if (error instanceof CatalogError && error.status === 404) return null;
    throw error;
  }
}

export const getContact = () => request<Contact>("/catalog/contact");

/** Platform-wide counts. Optional: pages still render if the endpoint is down. */
export async function getStats(): Promise<Stats | null> {
  try {
    return await request<Stats>("/catalog/stats");
  } catch (error) {
    console.error("[catalog] stats unavailable:", error);
    return null;
  }
}

/** The values the site's own policy pages state, used only if the endpoint is down. */
const POLICY_FALLBACK: Policy = { currency: "PKR", refundWindowDays: 14, commissionPercent: 30, minWithdrawal: "PKR 5,000" };

export async function getPolicy(): Promise<Policy> {
  try {
    return await request<Policy>("/catalog/policy");
  } catch (error) {
    console.error("[catalog] policy unavailable, using published values:", error);
    return POLICY_FALLBACK;
  }
}

/**
 * YouTube's `hqdefault` is 480×360 with letterbox bars. When the widescreen
 * `hq720` rendition exists for the same video, use it for large placements.
 */
export async function upgradeThumbnail(url: string | null): Promise<string | null> {
  const match = url?.match(/^https:\/\/i\.ytimg\.com\/vi\/([\w-]+)\/hqdefault\.jpg$/);
  if (!match) return url;
  const candidate = `https://i.ytimg.com/vi/${match[1]}/hq720.jpg`;
  try {
    const res = await fetch(candidate, { method: "HEAD", next: { revalidate: 86_400 } });
    return res.ok ? candidate : url;
  } catch {
    return url;
  }
}
