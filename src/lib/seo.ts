import type { Metadata } from "next";

export const SITE_URL = "https://associates.ractysh.com";
export const COMPANY_NAME = "Ractysh Associates Pvt Ltd";
export const COMPANY_LEGAL = "RACTYSH ASSOCIATES PRIVATE LIMITED";
export const COMPANY_CIN = "U66190TZ2025PTC036206";
export const COMPANY_EMAIL = "";
export const COMPANY_PHONE = "";
export const OG_IMAGE = "/logo.png";

export const COMPANY_ADDRESS = {
  street: "D.NO:129A, Maruthuvanagar",
  locality: "Palani",
  district: "Dindigul",
  state: "Tamil Nadu",
  postalCode: "624601",
  country: "IN",
};

export const SITE_DESCRIPTION =
  "Ractysh Associates Private Limited provides OTC services, business consulting, trade facilitation, corporate advisory, financial support, and intermediary business solutions for clients across India and international markets.";

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
}

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: "Ractysh Associates Pvt Ltd | OTC & Business Consulting Services",
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
    path: "/",
  },
  "/works": {
    title: "Our Projects & Portfolio | Ractysh Associates Pvt Ltd",
    description:
      "Explore the portfolio of Ractysh Associates Private Limited showcasing OTC transactions, business consulting engagements, and completed mandates.",
    path: "/works",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Ractysh Associates Pvt Ltd",
    description:
      "Privacy Policy of Ractysh Associates Pvt Ltd. Learn how we collect, use, store, and protect your personal data in compliance with applicable laws.",
    path: "/privacy-policy",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Ractysh Associates Pvt Ltd",
    description:
      "Terms and Conditions of Ractysh Associates Pvt Ltd governing the use of our website, OTC desk, and consulting services.",
    path: "/terms-and-conditions",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Ractysh Associates Pvt Ltd",
    description:
      "Cookie Policy of Ractysh Associates Pvt Ltd. Understand how we use cookies and similar tracking technologies on our website.",
    path: "/cookie-policy",
  },
  "/disclaimer": {
    title: "Disclaimer | Ractysh Associates Pvt Ltd",
    description:
      "Disclaimer of Ractysh Associates Pvt Ltd regarding the use of our website, content, OTC services, and consulting advice.",
    path: "/disclaimer",
  },
};

export function buildMetadata(seo: PageSeo): Metadata {
  const url = `${SITE_URL}${seo.path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: COMPANY_NAME,
      title: seo.title,
      description: seo.description,
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
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE],
    },
  };
}
