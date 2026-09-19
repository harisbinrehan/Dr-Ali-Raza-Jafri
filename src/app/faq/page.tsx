import type { Metadata } from "next";
import { faqs } from "@/content/faq";
import { getContact, getPolicy } from "@/lib/catalog";
import { faqsWithPolicy } from "@/lib/policy-text";
import { faqSchema, JsonLd } from "@/lib/schema";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { RichText } from "@/components/ui/RichText";
import { Clock, Mail, Phone } from "@/components/ui/Icons";

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

      <div className="container-x grid gap-14 border-t border-line pb-28 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FaqAccordion items={items} headingLevel={2} firstOpen />
        </div>

        <aside aria-labelledby="ask-title" className="lg:col-span-4">
          <div className="rounded-lg bg-ink p-8 text-white lg:sticky lg:top-[calc(var(--header-offset,4.5rem)+2rem)] lg:transition-[top] lg:duration-500">
            <h2 id="ask-title" className="font-display text-2xl leading-snug [&_a]:text-accent-bright [&_a]:underline [&_a]:underline-offset-4">
              <RichText text="Something not answered here? [Ask us](/contact)." />
            </h2>
            <address className="mt-8 space-y-4 border-t border-ink-line pt-6 text-sm not-italic">
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/85 hover:text-white">
                  <Phone className="size-4 text-accent-bright" /> {contact.phone}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-white/85 hover:text-white">
                  <Mail className="size-4 shrink-0 text-accent-bright" /> {contact.email}
                </a>
              )}
              {contact.hours && (
                <p className="flex gap-3 leading-relaxed text-white/60">
                  <Clock className="mt-0.5 size-4 shrink-0 text-accent-bright" /> {contact.hours}
                </p>
              )}
            </address>
          </div>
        </aside>
      </div>

      <JsonLd data={faqSchema(items)} />
    </>
  );
}
