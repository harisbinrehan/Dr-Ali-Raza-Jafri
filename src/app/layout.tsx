import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getCategories, getContact } from "@/lib/catalog";
import { site } from "@/lib/site";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/layout/RevealObserver";

// Same pairing as the Amir Engineering project: Space Grotesk headings, Inter text.
const heading = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1222" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [contact, categories] = await Promise.all([getContact(), getCategories()]);

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter contact={contact} categories={categories} />
          <RevealObserver />
        </ThemeProvider>
        <JsonLd data={organizationSchema(contact)} />
      </body>
    </html>
  );
}
