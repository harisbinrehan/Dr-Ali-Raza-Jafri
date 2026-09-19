import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { getCategories, getContact } from "@/lib/catalog";
import { site } from "@/lib/site";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/layout/RevealObserver";

// Only the 400 weight is used; static instances are a fraction of the variable font's size.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - clinical dental courses`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PK",
    title: `${site.name} - clinical dental courses`,
    description: "Continuing dental education for practising dentists in Pakistan, taught by clinicians who still see patients.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b1222",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [contact, categories] = await Promise.all([getContact(), getCategories()]);

  return (
    <html lang="en" className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader contact={contact} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter contact={contact} categories={categories} />
        <RevealObserver />
        <JsonLd data={organizationSchema(contact)} />
      </body>
    </html>
  );
}
