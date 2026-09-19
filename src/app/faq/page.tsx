import type { Metadata } from "next";
import { faqs } from "@/content/faq";
import { getContact, getPolicy } from "@/lib/catalog";
import { faqsWithPolicy } from "@/lib/policy-text";
import { faqSchema, JsonLd } from "@/lib/schema";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { RichText } from "@/components/ui/RichText";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Access, payment, refunds, certificates, video and delivery: answers to the questions people ask before and after buying a course.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const [policy, contact] = await Promise.all([getPolicy(), getContact()]);
  const items = faqsWithPolicy(faqs, policy);

  return (
    <>
      <PageHeader eyebrow="Get help" title="Frequently asked questions" />

      <div className="container-x grid gap-10 pb-16 pt-6 lg:grid-cols-12 lg:gap-8 lg:pt-8">
        <div className="lg:col-span-7">
          <FaqAccordion items={items} headingLevel={2} firstOpen />
        </div>

        <aside aria-labelledby="ask-title" className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-ink pt-8 lg:sticky lg:top-[calc(var(--header-offset,4rem)+2.5rem)] lg:transition-[top] lg:duration-700">
            <h2 id="ask-title" className="font-display text-h3 text-ink [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.2em]">
              <RichText text="Something not answered here? [Ask us](/contact)." />
            </h2>
            <address className="mt-6 space-y-4 text-[0.9375rem] not-italic">
              {contact.phone && (
                <div>
                  <p className="text-[0.8125rem] text-muted">Phone</p>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-line inline-block py-1 text-ink">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.email && (
                <div>
                  <p className="text-[0.8125rem] text-muted">Email</p>
                  <a href={`mailto:${contact.email}`} className="link-line inline-block break-all py-1 text-ink">
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.hours && (
                <div>
                  <p className="text-[0.8125rem] text-muted">Hours</p>
                  <p className="leading-relaxed text-ink-soft">{contact.hours}</p>
                </div>
              )}
            </address>
          </div>
        </aside>
      </div>

      <JsonLd data={faqSchema(items)} />
    </>
  );
}
