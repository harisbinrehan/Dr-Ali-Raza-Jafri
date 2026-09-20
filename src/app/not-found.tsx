import Link from "next/link";
import { getCourses, upgradeThumbnail } from "@/lib/catalog";
import { displayTitle } from "@/lib/format";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { CourseImage } from "@/components/course/CourseImage";
import { PriceTag } from "@/components/course/PriceTag";

export default async function NotFound() {
  const courses = await getCourses().catch(() => []);
  const [featured] = courses;
  const featuredImage = featured ? await upgradeThumbnail(featured.thumbnailUrl) : null;

  return (
    <section className="relative isolate overflow-hidden bg-deep text-on-deep dark:bg-transparent">
      <div className="container-x flex min-h-[70vh] flex-col justify-center py-16">
        <div className="grid gap-10 md:grid-cols-12 lg:grid-cols-12 lg:gap-8">
          <div className="md:col-span-7 lg:col-span-7">
            <p className="label text-eyebrow-deep">Not found</p>
            <h1 className="mt-4 max-w-2xl font-display text-h1 text-on-deep">That page is not available.</h1>
            <p className="mt-5 max-w-lg text-lead text-on-deep-muted">
              It may have been renamed or unpublished. Every published course is in the catalogue.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/courses" variant="on-deep" size="lg" arrow>
                Browse all courses
              </ButtonLink>
              <ArrowLink href="/" className="text-on-deep">
                Home
              </ArrowLink>
            </div>
          </div>

          {featured && (
            <div className="md:col-span-4 lg:col-span-4 md:col-start-9 lg:col-start-9">
              <p className="label text-on-deep-muted">While you&rsquo;re here</p>
              <article className="group relative mt-5 overflow-hidden rounded-2xl border border-deep-line transition-[transform,box-shadow] duration-300 ease-(--ease-editorial) hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgb(0_0_0/0.4)]">
                <div className="relative">
                  <CourseImage src={featuredImage} title={displayTitle(featured.title)} sizes="(min-width: 1024px) 320px, 90vw" />
                </div>
                <div className="p-5">
                  <p className="label text-eyebrow-deep">Featured · {featured.category?.name}</p>
                  <h3 className="mt-2 font-display text-h4 text-on-deep">
                    <Link href={`/courses/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {displayTitle(featured.title)}
                    </Link>
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-deep-line pt-4">
                    <span className="text-[0.8125rem] text-on-deep-muted">{featured.instructor}</span>
                    <span className="flex items-center gap-2">
                      <PriceTag priceCents={featured.priceCents} effectivePriceCents={featured.effectivePriceCents} currency={featured.currency} tone="deep" />
                      <ArrowRight className="size-3.5 text-on-deep transition-transform duration-200 ease-(--ease-editorial) group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
