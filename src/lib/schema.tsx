import type { Contact, CourseDetail } from "@/lib/catalog";
import { isoDuration, stripLinks } from "@/lib/format";
import { site } from "@/lib/site";

/**
 * JSON-LD builders. Every value comes from the platform's own data; nothing is
 * added that the site does not already state.
 */

const ORG_ID = `${site.url}/#organization`;

export function organizationSchema(contact: Contact) {
  // "House number 39-F, PIA, Lahore" → street + locality.
  const parts = contact.address?.split(",").map((p) => p.trim()) ?? [];
  const locality = parts.length > 1 ? parts.pop() : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: contact.name || site.name,
    url: site.url,
    logo: `${site.url}/icon.png`,
    description: site.description,
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone.replace(/\s/g, "") }),
    ...(contact.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: parts.join(", "),
        ...(locality && { addressLocality: locality }),
        addressCountry: "PK",
      },
    }),
  };
}

export function courseSchema(course: CourseDetail, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.subtitle ?? course.description ?? course.title,
    url,
    inLanguage: course.language,
    ...(course.thumbnailUrl && { image: course.thumbnailUrl }),
    provider: { "@id": ORG_ID, "@type": "EducationalOrganization", name: site.name, sameAs: site.url },
    instructor: { "@type": "Person", name: course.instructor, url: `${site.url}/instructors/${course.instructorSlug}` },
    ...(course.learningObjectives.length > 0 && { teaches: course.learningObjectives }),
    ...(course.requirements.length > 0 && { coursePrerequisites: course.requirements }),
    offers: {
      "@type": "Offer",
      category: course.effectivePriceCents === 0 ? "Free" : "Paid",
      price: (course.effectivePriceCents / 100).toFixed(2),
      priceCurrency: course.currency,
      url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      ...(course.totalDurationSeconds > 0 && { courseWorkload: isoDuration(course.totalDurationSeconds) }),
    },
    ...(course.ratingCount > 0 && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: course.ratingAverage.toFixed(1), ratingCount: course.ratingCount },
    }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

export function personSchema(name: string, url: string) {
  return { "@context": "https://schema.org", "@type": "Person", name, url };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(f.answer) },
    })),
  };
}

/** Renders a JSON-LD block. `<` is escaped so data can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
