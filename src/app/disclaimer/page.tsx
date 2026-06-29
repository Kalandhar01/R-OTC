import type { Metadata } from "next";
import Link from "next/link";
import NavbarDemo from "@/components/navbar-menu-demo";
import SiteFooter from "@/components/site-footer";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/disclaimer"]);

const sections = [
  {
    id: "general-information",
    title: "General Information",
    content:
      "The information provided on this website by Ractysh Associates Pvt Ltd ('we', 'our', 'us') is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.",
  },
  {
    id: "professional-advice-disclaimer",
    title: "Professional Advice Disclaimer",
    content:
      "The content on this website does not constitute, and should not be construed as, financial, legal, tax, investment, or other professional advice. You should consult with appropriate qualified professionals for advice tailored to your specific circumstances. Reliance on any information appearing on this website is solely at your own risk.",
  },
  {
    id: "no-guarantees",
    title: "No Guarantees",
    content:
      "Ractysh Associates Pvt Ltd does not guarantee the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website. We expressly exclude liability for any errors or omissions in such information and materials to the fullest extent permitted by law.",
  },
  {
    id: "external-links",
    title: "External Links",
    content:
      "This website may contain links to external websites that are not provided or maintained by, nor affiliated with, Ractysh Associates Pvt Ltd. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any link does not imply endorsement by us.",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content:
      "All trademarks, logos, brand names, service marks, and trade dress appearing on this website are the property of Ractysh Associates Pvt Ltd or their respective owners. Nothing on this website grants any license or right to use any trademark displayed without the written permission of the owner.",
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content:
      "In no event shall Ractysh Associates Pvt Ltd, its directors, employees, or agents be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.",
  },
  {
    id: "contact-details",
    title: "Contact Details",
    content:
      "If you have any questions or concerns regarding this disclaimer or any other aspect of our website, please contact us at: Email: ractyshassociates@gmail.com. We welcome your feedback and will respond to inquiries promptly.",
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

export default function DisclaimerPage() {
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
            <span className="font-medium text-[#16211c]/80">Disclaimer</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-[#16211c] sm:text-5xl lg:text-6xl">
            Disclaimer
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
              This disclaimer governs your use of the Ractysh Associates Pvt Ltd
              website. By using this website, you accept this disclaimer in full.
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
