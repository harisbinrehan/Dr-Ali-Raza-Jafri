import type { Metadata } from "next";
import { contactPage } from "@/content/pages";
import { getContact } from "@/lib/catalog";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Clock, Mail, MapPin, Phone } from "@/components/ui/Icons";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact us",
  description: "For questions about a course, a payment, or teaching with us. Phone, email, address and opening hours.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const contact = await getContact();

  const details = [
    contact.address && { icon: MapPin, label: "Address", value: contact.address },
    contact.phone && { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.email && { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.hours && { icon: Clock, label: "Hours", value: contact.hours },
  ].filter((d) => !!d);

  return (
    <>
      <PageHeader eyebrow="Get help" title={contactPage.title} lead={contactPage.lead} />

      <div className="container-x grid gap-14 border-t border-line pb-28 pt-14 lg:grid-cols-12">
        <section aria-labelledby="where-title" className="lg:col-span-5">
          <h2 id="where-title" className="font-display text-display-sm text-ink">
            {contactPage.locationHeading}
          </h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} data-reveal className="flex gap-5 py-6">
                <Icon className="mt-0.5 size-5 shrink-0 text-accent-deep" />
                <div className="min-w-0">
                  <dt className="eyebrow text-muted">{label}</dt>
                  <dd className="mt-2 text-lg leading-snug text-ink">
                    {href ? (
                      <a href={href} className="link-underline break-words">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <section aria-label="Send a message" className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg border border-line bg-paper-2/60 p-6 sm:p-10">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
