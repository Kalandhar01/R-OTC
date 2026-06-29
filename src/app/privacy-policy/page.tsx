import type { Metadata } from "next";
import Link from "next/link";
import NavbarDemo from "@/components/navbar-menu-demo";
import SiteFooter from "@/components/site-footer";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/privacy-policy"]);

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "Ractysh Associates Pvt Ltd ('we', 'our', 'us') is committed to protecting the privacy of individuals who visit our website and use our services. This Privacy Policy outlines how we collect, use, store, and safeguard your personal information when you interact with us through our website, contact forms, career applications, newsletter subscriptions, and other digital services.",
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content:
      "We may collect the following categories of information when you visit our website or engage with our services: (a) Personal identification information such as your name, email address, phone number, and company name provided through forms or communications; (b) Technical data including IP address, browser type, device information, and operating system; (c) Usage data such as pages visited, time spent on pages, referral sources, and interaction patterns; (d) Communication data including records of correspondence when you contact us via email or other channels.",
  },
  {
    id: "personal-information",
    title: "Personal Information",
    content:
      "Personal information refers to any data that can be used to identify you as an individual. We collect personal information only when you voluntarily provide it to us, such as when filling out contact forms, submitting job applications, subscribing to newsletters, or requesting services. We do not collect sensitive personal data unless explicitly required and consented to for a specific purpose.",
  },
  {
    id: "contact-forms",
    title: "Contact Forms",
    content:
      "When you submit a contact form on our website, we collect your name, email address, phone number, and any message you provide. This information is used solely to respond to your inquiry and provide the information or services you have requested. We retain contact form submissions for a reasonable period to follow up on your request and for record-keeping purposes.",
  },
  {
    id: "careers-applications",
    title: "Careers Applications",
    content:
      "If you submit a job application through our website, we collect your name, contact details, resume/CV, cover letter, and any other information you choose to provide. This information is used exclusively for evaluating your candidacy and communicating with you regarding potential employment opportunities. We retain application data for up to 12 months after the recruitment process unless you consent to longer storage.",
  },
  {
    id: "newsletter-subscriptions",
    title: "Newsletter Subscriptions",
    content:
      "When you subscribe to our newsletter, we collect your email address and optionally your name. We use this information to send you updates about our services, industry insights, and company news. You may unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly. We do not share your subscription data with third parties for marketing purposes.",
  },
  {
    id: "cookies",
    title: "Cookies",
    content:
      "Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. Cookies are small text files stored on your device by your web browser. You can control cookie preferences through your browser settings. For detailed information, please refer to our Cookie Policy.",
  },
  {
    id: "analytics",
    title: "Analytics",
    content:
      "We use analytics tools to collect anonymized data about website usage, including page views, bounce rates, session duration, and traffic sources. This information helps us improve our website content and user experience. The data collected is aggregated and does not personally identify you. We may use third-party analytics providers who process this data under our instructions.",
  },
  {
    id: "data-security",
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, regular security assessments, and staff training on data protection. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content:
      "We may engage trusted third-party service providers to assist us in operating our website and business. These providers have access to personal information only to perform specific tasks on our behalf and are contractually obligated to protect your data. We do not authorize third parties to use your personal information for their own purposes.",
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share information when required by law, to protect our rights, to enforce our terms, or with your explicit consent. In the event of a business transfer, merger, or acquisition, your information may be transferred as part of the transaction, subject to this Privacy Policy.",
  },
  {
    id: "user-rights",
    title: "User Rights",
    content:
      "You have the right to access, correct, update, or delete your personal information held by us. You also have the right to object to or restrict processing, request data portability, and withdraw consent at any time where processing is based on consent. To exercise these rights, please contact us at ractyshassociates@gmail.com. We will respond to your request within a reasonable timeframe.",
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content:
      "We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, including for legal, accounting, or reporting requirements. When data is no longer needed, we securely delete or anonymize it. Retention periods vary depending on the type of data and the purpose of collection.",
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content:
      "Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information promptly. If you believe a child has provided us with personal data, please contact us immediately.",
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. We will notify you of material changes by posting the updated policy on this page with a revised effective date. We encourage you to review this policy periodically.",
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: Email: ractyshassociates@gmail.com. We are committed to addressing your concerns and resolving any issues in a timely manner.",
  },
];

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="h-px flex-1 bg-gradient-to-r from-[#E85D5D]/30 via-[#D4AF37]/20 to-transparent" />
      <span className="size-1.5 rounded-full bg-[#E85D5D]/50" />
      <span className="h-px flex-1 bg-gradient-to-l from-[#E85D5D]/30 via-[#D4AF37]/20 to-transparent" />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ea] text-[#16211c]">
      <NavbarDemo />

      <section className="relative overflow-hidden bg-[#f6f3ea] px-5 pt-36 pb-16 sm:px-8 lg:px-16 lg:pt-44 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,93,93,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-[#16211c]/60">
            <Link href="/" className="transition hover:text-[#E85D5D]">
              Home
            </Link>
            <span className="text-[#16211c]/30">/</span>
            <span className="font-medium text-[#16211c]/80">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-[#16211c] sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <div className="mt-4 h-1 w-20 bg-[#E85D5D]" />
          <p className="mt-4 text-base text-[#16211c]/60 sm:text-lg">
            Last Updated: June 2026
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#16211c]/8 bg-[#fffdf7] p-6 shadow-sm sm:p-10 lg:p-14">
            <p className="mb-10 text-base leading-8 text-[#16211c]/70">
              At Ractysh Associates Pvt Ltd, protecting your privacy is fundamental
              to everything we do. This policy describes how we collect, process,
              and safeguard your personal information.
            </p>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={section.id}>
                  {index > 0 && <SectionDivider />}
                  <h2 className="text-xl font-bold text-[#16211c] sm:text-2xl">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-[#16211c]/70">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 border-t border-[#16211c]/10 pt-10 sm:flex-row sm:justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#E85D5D] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#E85D5D]/25 transition hover:bg-[#F47575]"
              >
                &larr; Back to Home
              </Link>
              <p className="text-xs text-[#16211c]/50">
                For questions, email{" "}
                <a
                  href="mailto:ractyshassociates@gmail.com"
                  className="text-[#E85D5D] underline transition hover:text-[#F47575]"
                >
                  ractyshassociates@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
