import type { Metadata } from "next";
import Link from "next/link";
import NavbarDemo from "@/components/navbar-menu-demo";
import SiteFooter from "@/components/site-footer";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Handshake,
  HeartHandshake,
  LucideIcon,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Founder & Director | Ashok Kumar M | Ractysh Associates Pvt Ltd",
  description:
    "Meet Ashok Kumar M, B.Sc. Physics — Founder & Director of Ractysh Associates Private Limited. Leading business strategy, financial operations, and enterprise management.",
  alternates: { canonical: "https://associates.ractysh.com/founder" },
  openGraph: {
    title: "Founder & Director | Ashok Kumar M | Ractysh Associates Pvt Ltd",
    description:
      "Meet Ashok Kumar M, B.Sc. Physics — Founder & Director of Ractysh Associates Private Limited.",
    url: "https://associates.ractysh.com/founder",
    siteName: "Ractysh Associates Pvt Ltd",
    locale: "en_IN",
    type: "profile",
  },
};

const expertise: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Business Strategy",
    description:
      "Strategic planning and roadmap development for enterprise growth, market positioning, and long-term value creation.",
    icon: Target,
  },
  {
    title: "Financial Operations",
    description:
      "Managing financial systems, capital allocation, risk assessment, and operational efficiency across engagements.",
    icon: BarChart3,
  },
  {
    title: "Enterprise Management",
    description:
      "Leadership of organizational structures, team coordination, process optimization, and governance frameworks.",
    icon: Building2,
  },
  {
    title: "Client Relations",
    description:
      "Building trusted partnerships through transparent communication, reliable service, and genuine commitment to client success.",
    icon: Handshake,
  },
  {
    title: "Market Development",
    description:
      "Identifying opportunities, forging strategic alliances, and expanding business reach across diverse industry verticals.",
    icon: TrendingUp,
  },
  {
    title: "Team Leadership",
    description:
      "Mentoring professionals, fostering a culture of excellence, and driving collective performance toward shared goals.",
    icon: Users,
  },
];

const values: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "Every relationship is built on a foundation of reliability and consistent delivery. Trust is earned through action, not words.",
  },
  {
    icon: HeartHandshake,
    title: "Integrity",
    description:
      "Honest dealings, transparent processes, and ethical conduct guide every decision and engagement we undertake.",
  },
  {
    icon: Building2,
    title: "Professional Service",
    description:
      "Structured approaches, clear communication, and documented outcomes define the standard of service clients can expect.",
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

export default async function FounderPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ea] text-[#16211c]">
      <NavbarDemo />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f6f3ea] px-5 pt-36 pb-16 sm:px-8 lg:px-16 lg:pt-44 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,93,93,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl">
          <nav className="mb-8 flex items-center gap-2 text-sm text-[#16211c]/60">
            <Link href="/" className="transition hover:text-[#E85D5D]">
              Home
            </Link>
            <span className="text-[#16211c]/30">/</span>
            <span className="font-medium text-[#16211c]/80">Founder</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E85D5D]">
                Founder &amp; Director
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-[#16211c] sm:text-5xl lg:text-6xl">
                Ashok Kumar. M
              </h1>
              <p className="mt-1 text-lg font-medium text-[#D4AF37] sm:text-xl">
                B.Sc. Physics
              </p>
              <div className="mt-4 h-1 w-20 bg-[#E85D5D]" />
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#16211c]/70 sm:text-lg">
                Director — RACTYSH Associates Private Limited. Ashok leads the
                OTC Exchange and business consulting division, bringing deep
                expertise in business strategy, financial operations, enterprise
                management, and client relations to every engagement.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E85D5D] px-6 text-sm font-bold text-white shadow-lg shadow-[#E85D5D]/25 transition hover:bg-[#F47575]"
                >
                  Start a consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="#expertise"
                  className="inline-flex min-h-11 items-center rounded-full border border-[#16211c]/12 bg-white px-6 text-sm font-semibold text-[#16211c]/80 shadow-sm transition hover:border-[#16211c]/20 hover:text-[#16211c]"
                >
                  View expertise
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#16211c]/8 bg-[#fffdf7] p-6 shadow-sm sm:p-10 lg:p-14">
            <h2 className="text-2xl font-bold text-[#16211c] sm:text-3xl">
              Background
            </h2>
            <div className="mt-4 h-px w-16 bg-[#E85D5D]/60" />
            <div className="mt-6 space-y-5 text-base leading-8 text-[#16211c]/70">
              <p>
                Ashok Kumar M founded RACTYSH Associates Private Limited with a
                vision to create a professional intermediary platform that
                connects businesses with the right opportunities, partners, and
                services. His journey spans business development, financial
                operations, and enterprise management across multiple sectors.
              </p>
              <p>
                With a background in Physics that sharpened his analytical
                thinking and problem-solving abilities, Ashok applies a
                structured, evidence-based approach to business strategy and
                decision-making. He believes that clear thinking, disciplined
                execution, and genuine relationships are the cornerstones of
                sustainable business growth.
              </p>
              <p>
                Under his leadership, RACTYSH Associates has grown into a
                trusted intermediary service provider, serving clients across
                India and international markets. Ashok personally oversees the
                OTC Exchange desk, ensuring that every engagement meets the
                firm&rsquo;s standards of professionalism, confidentiality, and
                service excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section id="expertise" className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E85D5D]">
              Core Expertise
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#16211c] sm:text-4xl">
              Areas of focus
            </h2>
            <p className="mt-3 text-base leading-7 text-[#16211c]/60">
              Key disciplines that drive the firm&rsquo;s approach to business
              advisory and client service.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-[#16211c]/8 bg-[#fffdf7] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E85D5D]/20 hover:shadow-md"
                >
                  <div className="mb-4 grid size-11 place-items-center rounded-lg bg-[#E85D5D]/10 text-[#E85D5D]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#16211c]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#16211c]/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <SectionDivider />

          <div className="mx-auto mb-12 mt-8 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Business Philosophy
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#16211c] sm:text-4xl">
              Principles that guide us
            </h2>
            <p className="mt-3 text-base leading-7 text-[#16211c]/60">
              The values that shape every decision, relationship, and
              engagement at RACTYSH Associates.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#16211c]/8 bg-[#fffdf7] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/30 hover:shadow-md"
                >
                  <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#16211c]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#16211c]/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-5 pb-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-[#16211c]/8 bg-[#fffdf7] p-8 shadow-sm sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.06),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(232,93,93,0.05),transparent_50%)]" />
            <div className="relative text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#16211c] sm:text-4xl">
                Let&rsquo;s work together
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[#16211c]/60">
                Whether you need strategic guidance, intermediary services, or a
                trusted partner for your next business engagement — reach out and
                start the conversation.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="mailto:ractyshassociates@gmail.com"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#E85D5D] px-8 text-sm font-bold text-white shadow-lg shadow-[#E85D5D]/25 transition hover:bg-[#F47575]"
                >
                  Send an email
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:+918300660698"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#16211c]/12 bg-white px-8 text-sm font-semibold text-[#16211c]/80 shadow-sm transition hover:border-[#16211c]/20 hover:text-[#16211c]"
                >
                  +91 83006 60698
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#16211c]/50">
                <ShieldCheck className="size-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Confidential consultations. Professional standards.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
