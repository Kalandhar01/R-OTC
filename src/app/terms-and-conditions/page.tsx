import type { Metadata } from "next";
import Link from "next/link";
import NavbarDemo from "@/components/navbar-menu-demo";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ractysh Associates Pvt Ltd",
  description:
    "Terms and Conditions of Ractysh Associates Pvt Ltd. Please read these terms carefully before using our website or services.",
};

const sections = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    content:
      "By accessing or using the website of Ractysh Associates Pvt Ltd ('we', 'our', 'us'), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services. These terms apply to all visitors, users, and others who access or use our services.",
  },
  {
    id: "website-usage",
    title: "Website Usage",
    content:
      "You agree to use our website only for lawful purposes and in accordance with these Terms and Conditions. You must not use our website in any way that breaches applicable laws or regulations, infringes upon the rights of others, or impedes the normal operation of the website. We reserve the right to restrict or terminate access to our website at our sole discretion.",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content:
      "All content, materials, trademarks, logos, designs, text, graphics, and software on this website are the intellectual property of Ractysh Associates Pvt Ltd or its licensors and are protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, or exploit any content without our prior written consent.",
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    content:
      "As a user of our website, you agree to provide accurate and complete information when interacting with us, maintain the confidentiality of any account credentials, promptly notify us of any unauthorized use, and accept responsibility for all activities conducted under your account. You must not attempt to gain unauthorized access to any part of our systems.",
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    content:
      "While we strive to ensure that all information on our website is accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information. We reserve the right to correct any errors or omissions without prior notice.",
  },
  {
    id: "third-party-links",
    title: "Third Party Links",
    content:
      "Our website may contain links to third-party websites or services that are not owned or controlled by Ractysh Associates Pvt Ltd. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. Your interaction with third-party sites is at your own risk.",
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by applicable law, Ractysh Associates Pvt Ltd shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or relating to your use of our website or services. This includes, but is not limited to, damages for loss of profits, data, or business interruption.",
  },
  {
    id: "service-availability",
    title: "Service Availability",
    content:
      "We strive to maintain uninterrupted access to our website but do not guarantee that access will be available at all times. We reserve the right to suspend, modify, or discontinue any aspect of our website or services at any time without notice. We are not liable for any loss or inconvenience caused by service interruptions.",
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content:
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, India, unless otherwise agreed in writing.",
  },
  {
    id: "termination",
    title: "Termination",
    content:
      "We reserve the right to terminate or suspend your access to our website and services at any time, without prior notice or liability, for any reason, including breach of these Terms and Conditions. Upon termination, your right to use the website will immediately cease. Provisions that by their nature should survive termination shall survive.",
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content:
      "If you have any questions or concerns regarding these Terms and Conditions, please contact us at: Email: ractyshassociates@gmail.com. We will make reasonable efforts to address your inquiries within a timely manner.",
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

export default function TermsConditionsPage() {
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
            <span className="font-medium text-[#16211c]/80">
              Terms &amp; Conditions
            </span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-[#16211c] sm:text-5xl lg:text-6xl">
            Terms &amp; Conditions
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
              Please read these Terms and Conditions carefully before using the
              Ractysh Associates Pvt Ltd website or engaging our services.
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
                Questions? Email{" "}
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
