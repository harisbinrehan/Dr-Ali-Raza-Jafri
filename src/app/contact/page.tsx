import type { Metadata } from "next";
import { contactPage } from "@/content/pages";
import { getContact } from "@/lib/catalog";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact us",
  description: "For questions about a course, a payment, or teaching with us. Phone, email, address and opening hours.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const contact = await getContact();

  const details = [
    contact.address && { label: "Address", value: contact.address },
    contact.phone && { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.hours && { label: "Hours", value: contact.hours },
  ].filter((d) => !!d);

  return (
    <>
      <PageHeader eyebrow="Get help" title={contactPage.title} lead={contactPage.lead} />

      <div className="container-x grid gap-12 pb-16 pt-6 lg:grid-cols-12 lg:gap-8 lg:pt-8">
        <section aria-labelledby="where-title" className="lg:col-span-5">
          <h2 id="where-title" className="font-display text-h3 text-ink">
            {contactPage.locationHeading}
          </h2>
          <dl className="mt-6">
            {details.map(({ label, value, href }) => (
              <div key={label} data-reveal className="grid gap-1 border-t border-line py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-[0.8125rem] text-muted sm:pt-1.5">{label}</dt>
                <dd className="text-[1.0625rem] font-medium leading-snug text-ink">
                  {href ? (
                    <a href={href} className="link-line inline-block break-words py-1">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-label="Send a message" className="lg:col-span-5 lg:col-start-8">
          <ContactForm />
        </section>
      </div>
    </>
  );
}
