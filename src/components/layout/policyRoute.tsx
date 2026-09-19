import type { Metadata } from "next";
import type { PolicyDocument } from "@/content/policies";
import { getContact, getPolicy } from "@/lib/catalog";
import { PolicyPage } from "@/components/layout/PolicyPage";

/** Metadata and page component for a policy document, so each route file stays one line of intent. */
export function policyRoute(doc: PolicyDocument, canonical = `/${doc.slug}`) {
  const metadata: Metadata = { title: doc.title, description: doc.description, alternates: { canonical } };

  async function Page() {
    const [policy, contact] = await Promise.all([getPolicy(), getContact()]);
    return <PolicyPage doc={doc} policy={policy} contact={contact} />;
  }

  return { metadata, Page };
}
