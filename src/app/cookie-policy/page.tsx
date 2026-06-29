import type { Metadata } from "next";
import Link from "next/link";
import NavbarDemo from "@/components/navbar-menu-demo";
import SiteFooter from "@/components/site-footer";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/cookie-policy"]);

const sections = [
  {
    id: "what-cookies-are",
    title: "What Cookies Are",
    content:
      "Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, enhance user experience, and provide information to website owners. Cookies may be set by the website you visit ('first-party cookies') or by third-party services integrated into the website ('third-party cookies').",
  },
  {
    id: "essential-cookies",
    title: "Essential Cookies",
    content:
      "Essential cookies, also known as 'strictly necessary' cookies, are required for the basic functionality of our website. These cookies enable core features such as security, network management, and accessibility. Without these cookies, certain parts of our website may not function properly. These cookies do not collect personal information for marketing purposes and are typically session-based.",
  },
  {
    id: "analytics-cookies",
    title: "Analytics Cookies",
    content:
      "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to count visits, track traffic sources, and measure engagement with our content. This data helps us improve the performance and relevance of our website. We may use analytics services provided by third parties, subject to their privacy commitments.",
  },
  {
    id: "functional-cookies",
    title: "Functional Cookies",
    content:
      "Functional cookies enable enhanced functionality and personalization, such as remembering your preferences or settings. These cookies may be set by us or by third-party providers whose services we have integrated into our pages. If you do not allow these cookies, some or all of these services may not function properly.",
  },
  {
    id: "managing-cookies",
    title: "Managing Cookies",
    content:
      "You have the right to choose whether to accept or reject cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Please note that disabling certain cookies may affect the functionality and performance of our website. You can manage your cookie preferences at any time through your browser settings.",
  },
  {
    id: "browser-settings",
    title: "Browser Settings",
    content:
      "You can control and manage cookies in various ways through your browser settings. Most browsers allow you to view, delete, or block cookies for specific websites or all websites. You can typically find these settings in the 'Preferences' or 'Privacy' menu of your browser. Instructions for managing cookies on popular browsers can be found on their respective support pages.",
  },
  {
    id: "cookie-updates",
    title: "Cookie Updates",
    content:
      "We may update this Cookie Policy from time to time to reflect changes in our use of cookies, legal requirements, or operational needs. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we use cookies.",
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

export default function CookiePolicyPage() {
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
              Cookie Policy
            </span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-[#16211c] sm:text-5xl lg:text-6xl">
            Cookie Policy
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
              This Cookie Policy explains how Ractysh Associates Pvt Ltd uses
              cookies and similar tracking technologies on our website.
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
