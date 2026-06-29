import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, COMPANY_NAME, COMPANY_LEGAL, COMPANY_CIN, COMPANY_ADDRESS, OG_IMAGE, SITE_DESCRIPTION } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ractysh Associates Pvt Ltd | OTC & Business Consulting Services",
    template: "%s | Ractysh Associates Pvt Ltd",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ractysh Associates",
    "Ractysh Associates Pvt Ltd",
    "OTC Services",
    "Business Consulting",
    "Corporate Advisory",
    "Financial Consulting",
    "Trade Services",
    "Business Solutions",
    "Intermediary Services",
    "Corporate Support",
    "Business Advisory",
    "Tamil Nadu Consulting Company",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: "Ractysh Associates Pvt Ltd | OTC & Business Consulting Services",
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 512,
        height: 512,
        alt: COMPANY_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ractysh Associates Pvt Ltd | OTC & Business Consulting Services",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#16211c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_LEGAL,
    legalName: COMPANY_LEGAL,
    alternateName: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    email: "",
    founder: {
      "@type": "Person",
      name: "Shaiknoordeen Noorul Fawaz",
    },
    identifier: COMPANY_CIN,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS.street,
      addressLocality: COMPANY_ADDRESS.locality,
      addressRegion: COMPANY_ADDRESS.state,
      postalCode: COMPANY_ADDRESS.postalCode,
      addressCountry: COMPANY_ADDRESS.country,
    },
    knowsAbout: [
      "OTC Services",
      "Business Consulting",
      "Corporate Advisory",
      "Trade Facilitation",
      "Financial Consulting",
      "Intermediary Services",
      "Investment Support",
      "Business Partnerships",
      "Corporate Solutions",
      "International Business Support",
      "Strategic Consulting",
      "Commercial Advisory",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: COMPANY_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body>
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
