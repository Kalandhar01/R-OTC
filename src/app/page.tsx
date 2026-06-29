import { OtcExchangeLanding } from "@/components/otc-exchange-landing";
import { SITE_URL, COMPANY_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "FinancialService"],
    "@id": `${SITE_URL}/#service`,
    name: `${COMPANY_NAME} — OTC & Business Consulting`,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "OTC & Business Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "OTC Exchange Desk Services" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Corporate Consulting" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Business Advisory" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Trade Facilitation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Financial Consulting" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Intermediary Services" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Investment Support" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Strategic Consulting" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "International Business Support" },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "OTC Exchange Desk", item: `${SITE_URL}/#otc-desk` },
      { "@type": "ListItem", position: 3, name: "Services", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 4, name: "Contact", item: `${SITE_URL}/#contact` },
    ],
  };

  return (
    <>
      <JsonLd schema={professionalServiceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <OtcExchangeLanding />
    </>
  );
}
