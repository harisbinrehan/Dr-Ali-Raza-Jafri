import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/catalog";
import { site } from "@/lib/site";

export const revalidate = 3600;

const STATIC_ROUTES = ["", "/courses", "/about", "/faq", "/contact", "/teach", "/pricing", "/terms", "/privacy", "/refunds", "/shipping", "/service-policy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses();
  const instructors = [...new Set(courses.map((c) => c.instructorSlug))];

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: path === "" || path === "/courses" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/courses" ? 0.9 : 0.5,
    })),
    ...courses.map((c) => ({
      url: `${site.url}/courses/${c.slug}`,
      lastModified: c.publishedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      ...(c.thumbnailUrl && { images: [c.thumbnailUrl] }),
    })),
    ...instructors.map((slug) => ({ url: `${site.url}/instructors/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
