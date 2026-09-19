import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Signed-in areas of the platform are kept out of search results. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/teacher", "/learn", "/account", "/cart", "/checkout", "/order-complete", "/messages", "/wishlist"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
