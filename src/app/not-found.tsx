import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center pb-24 pt-40">
      <p className="eyebrow text-accent-deep">Not found</p>
      <h1 className="mt-5 max-w-3xl font-display text-display-lg text-ink">That page is not available.</h1>
      <p className="mt-6 max-w-xl text-lead text-muted">It may have been renamed or unpublished. Every published course is in the catalogue.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/courses" size="lg" arrow>
          Browse all courses
        </ButtonLink>
        <ButtonLink href="/" variant="outline" size="lg">
          Home
        </ButtonLink>
      </div>
    </section>
  );
}
