import { ArrowLink, ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col justify-center pb-24 pt-40">
      <p className="label text-accent">Not found</p>
      <h1 className="mt-6 max-w-4xl font-display text-h1 text-ink">That page is not available.</h1>
      <p className="mt-8 max-w-lg text-lead text-muted">It may have been renamed or unpublished. Every published course is in the catalogue.</p>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink href="/courses" size="lg" arrow>
          Browse all courses
        </ButtonLink>
        <ArrowLink href="/">Home</ArrowLink>
      </div>
    </section>
  );
}
