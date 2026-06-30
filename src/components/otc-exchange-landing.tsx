"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import DeferredDither from "@/components/deferred-dither";
import NavbarDemo from "@/components/navbar-menu-demo";
import ConnectedContactSection from "@/components/connected-contact-section";
import SiteFooter from "@/components/site-footer";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import {
  ArrowRight,
  Building2,
  Camera,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  Flashlight,
  Globe2,
  Handshake,
  Landmark,
  LockKeyhole,
  Network,
  ReceiptText,
  Scale,
  ShieldCheck,
  Timer,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

const trustPoints = [
  "Verified service desk",
  "Process discipline",
  "Documented outcomes",
];

const heroHeadlineSentences = [
  "RACTYSH ASSOCIATES PVT LTD for business services.",
  "Your intermediary platform for growth.",
  "Connecting businesses with the right opportunities.",
  "Professional services, simplified and reliable.",
];

const HERO_HEADLINE_REVEAL_DELAY_MS = 42;
const HERO_HEADLINE_CONCEAL_DELAY_MS = 30;
const HERO_HEADLINE_HOLD_MS = 10000;
const HERO_HEADLINE_SWITCH_PAUSE_MS = 180;

const heroStats: Array<[value: string, label: string]> = [
  ["100+", "Business Partners"],
  ["15+", "Service Verticals"],
  ["98%", "Client Satisfaction"],
];

const phoneNotifications = [
  {
    app: "RACTYSH ASSOCIATES",
    icon: "R",
    time: "now",
    title: "Who We Are",
    body: "A professional intermediary business service platform connecting clients with verified service providers and strategic opportunities.",
  },
  {
    app: "Mission",
    icon: "M",
    time: "",
    title: "Our Purpose",
    body: "Simplify complex business processes by providing reliable intermediary services, corporate consulting, and professional coordination.",
  },
  {
    app: "Values",
    icon: "V",
    time: "",
    title: "How We Operate",
    body: "Integrity-led service delivery, verified partner networks, transparent communication, and professional standards across every engagement.",
  },
];

const projectFaqs = [
  {
    question: "What types of business intermediary services does RACTYSH ASSOCIATES offer?",
    answer:
      "We offer a comprehensive range of intermediary business services including corporate consulting, trade assistance, business networking, vendor coordination, investment facilitation, documentation support, client representation, business partnerships, and general corporate support services.",
  },
  {
    question: "How does RACTYSH ASSOCIATES connect businesses with opportunities?",
    answer:
      "Our platform maintains a verified network of partners, service providers, and business contacts across multiple industries. We assess client requirements, identify suitable matches, facilitate introductions, and support the relationship through to successful collaboration.",
  },
  {
    question: "Can clients keep their business requirements confidential?",
    answer:
      "Yes. All client information, business requirements, and engagement details are handled with strict confidentiality. Information is shared only on a need-to-know basis and with explicit client consent.",
  },
  {
    question: "What happens after a service requirement is submitted?",
    answer:
      "Our team reviews the requirement, identifies suitable partners or service providers from our verified network, presents options to the client, facilitates discussions, and supports the engagement through documentation and follow-through.",
  },
  {
    question: "Do you provide documentation and records for each engagement?",
    answer:
      "Every engagement includes professional documentation including service agreements, progress records, transaction summaries, and closure reports so clients have a complete record of the engagement.",
  },
];

const trustComplianceCards = [
  {
    title: "Verified Partner Network",
    description:
      "Our network of business partners and service providers is verified through a structured assessment process to ensure reliability, capability, and professional standards.",
    icon: ShieldCheck,
  },
  {
    title: "Professional Service Standards",
    description:
      "Every engagement follows structured service protocols with clear communication, defined milestones, and professional documentation from initial consultation through completion.",
    icon: Landmark,
  },
  {
    title: "Transparent Business Practices",
    description:
      "We maintain transparency in all engagements with clear service terms, open communication channels, and honest assessment of capabilities and outcomes.",
    icon: ReceiptText,
  },
  {
    title: "Confidential & Secure",
    description:
      "Client information, business strategies, and engagement details are protected through secure communication channels and strict confidentiality protocols.",
    icon: LockKeyhole,
  },
  {
    title: "Dedicated Service Coordination",
    description:
      "Each engagement is assigned a dedicated coordinator who manages communication, documentation, and service delivery from start to finish.",
    icon: Handshake,
  },
  {
    title: "Professional & Ethical Approach",
    description:
      "Our operations are built on integrity, professional ethics, and a commitment to serving the best interests of our clients in every engagement.",
    icon: Building2,
  },
];

const intermediaryServices: Array<{
  title: string;
  description: string;
  benefits: string[];
  cta: string;
  icon: LucideIcon;
  image: string;
}> = [
  {
    title: "Business Intermediary Services",
    description:
      "Comprehensive intermediary support connecting businesses with verified partners, service providers, and strategic opportunities. We assess requirements, identify suitable matches, and facilitate productive business relationships across industries and geographies.",
    benefits: [
      "Requirement assessment & matching",
      "Verified partner introductions",
      "End-to-end facilitation support",
    ],
    cta: "Explore intermediary services",
    icon: Handshake,
    image: "/images/otc/crypto-exchange.webp",
  },
  {
    title: "Corporate Consulting",
    description:
      "Strategic corporate consulting services including business planning, market entry strategy, operational improvement, and organizational development. Our consultants bring practical experience across multiple business domains.",
    benefits: [
      "Business strategy & planning",
      "Market entry support",
      "Operational improvement",
    ],
    cta: "Discuss consulting needs",
    icon: Building2,
    image: "/images/otc/institutional.webp",
  },
  {
    title: "Trade Assistance",
    description:
      "Professional trade assistance services including market research, partner identification, trade documentation support, and cross-border coordination. We help businesses navigate complex trade requirements efficiently.",
    benefits: [
      "Market research & analysis",
      "Trade partner identification",
      "Documentation coordination",
    ],
    cta: "Request trade assistance",
    icon: Globe2,
    image: "/images/otc/cross-border.webp",
  },
  {
    title: "Business Networking",
    description:
      "Structured business networking services connecting entrepreneurs, professionals, and organizations with relevant contacts, industry peers, and potential collaborators through curated introductions and events.",
    benefits: [
      "Curated introductions",
      "Industry peer connections",
      "Networking event access",
    ],
    cta: "Expand your network",
    icon: Users,
    image: "/images/otc/corporate.webp",
  },
  {
    title: "Vendor Coordination",
    description:
      "End-to-end vendor coordination services including vendor identification, capability assessment, contract facilitation, and performance monitoring. We help businesses build reliable vendor relationships.",
    benefits: [
      "Vendor identification & vetting",
      "Contract facilitation",
      "Performance monitoring",
    ],
    cta: "Coordinate vendors",
    icon: ClipboardCheck,
    image: "/images/otc/kyc-verification.webp",
  },
  {
    title: "Investment Facilitation",
    description:
      "Investment facilitation services connecting investors with verified opportunities across real estate, infrastructure, business ventures, and financial instruments. We support due diligence, documentation, and transaction coordination.",
    benefits: [
      "Opportunity identification",
      "Due diligence support",
      "Transaction coordination",
    ],
    cta: "Explore investment options",
    icon: Landmark,
    image: "/images/otc/security-processing.webp",
  },
  {
    title: "Documentation Support",
    description:
      "Comprehensive documentation support including business proposals, service agreements, compliance documents, and project reports. Our team ensures professional, accurate, and timely documentation.",
    benefits: [
      "Business proposals & agreements",
      "Compliance documentation",
      "Project reporting",
    ],
    cta: "Request documentation help",
    icon: FileCheck2,
    image: "/images/otc/stablecoin.webp",
  },
  {
    title: "Client Representation",
    description:
      "Professional client representation services for meetings, negotiations, and business discussions. Our representatives act in your best interest with clear authority, preparation, and professional conduct.",
    benefits: [
      "Meeting representation",
      "Negotiation support",
      "Professional advocacy",
    ],
    cta: "Arrange representation",
    icon: UserCheck,
    image: "/images/otc/compliance.webp",
  },
  {
    title: "Business Partnerships",
    description:
      "Strategic business partnership facilitation including partner search, compatibility assessment, joint venture structuring, and partnership agreement support. We help build lasting and productive business relationships.",
    benefits: [
      "Partner search & assessment",
      "Joint venture structuring",
      "Agreement facilitation",
    ],
    cta: "Find business partners",
    icon: Network,
    image: "/images/otc/institutional.webp",
  },
  {
    title: "Corporate Support Services",
    description:
      "A suite of corporate support services including administrative assistance, compliance coordination, regulatory guidance, and operational support to help businesses run smoothly and efficiently.",
    benefits: [
      "Administrative assistance",
      "Compliance coordination",
      "Operational support",
    ],
    cta: "Explore support services",
    icon: ShieldCheck,
    image: "/images/otc/crypto-exchange.webp",
  },
];

const serviceAdvantages: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Reliable Service Delivery",
    description:
      "Structured service delivery processes with clear milestones, regular updates, and professional follow-through on every engagement.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Account Support",
    description:
      "Clients receive focused coordination from a dedicated service manager from initial consultation through engagement completion.",
    icon: UserCheck,
  },
  {
    title: "Timely Response",
    description:
      "We prioritize prompt communication and timely responses to ensure your business requirements move forward without unnecessary delays.",
    icon: Timer,
  },
  {
    title: "Confidentiality Assured",
    description:
      "All client information, business strategies, and engagement details are treated with strict confidentiality and professional discretion.",
    icon: LockKeyhole,
  },
  {
    title: "Verified Partner Ecosystem",
    description:
      "Our network of partners and service providers is carefully vetted to ensure capability, reliability, and professional standards.",
    icon: ClipboardCheck,
  },
  {
    title: "Ethical Business Conduct",
    description:
      "Every engagement is guided by professional ethics, transparency, and a genuine commitment to client success.",
    icon: Scale,
  },
  {
    title: "Trusted Industry Connections",
    description:
      "We leverage our established network of industry contacts, professional associations, and business relationships to serve our clients effectively.",
    icon: Handshake,
  },
  {
    title: "Clear Communication",
    description:
      "Clients receive clear, professional communication around service scope, progress, requirements, and outcomes at every stage.",
    icon: ReceiptText,
  },
];

const initialPhoneStatusTime = "9:41";
const initialPhoneLockDate = "Thursday, June 11";

function formatPhoneStatusTime() {
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date());

  const hour = parts.find((part) => part.type === "hour")?.value ?? "9";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "41";

  return `${hour}:${minute}`;
}

function formatPhoneLockDate() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function ScrollRevealSection({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function OtcExchangeLanding() {
  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
  const [headlinePhase, setHeadlinePhase] = useState<"reveal" | "conceal">("reveal");
  const [phoneStatusTime, setPhoneStatusTime] = useState(initialPhoneStatusTime);
  const [phoneLockDate, setPhoneLockDate] = useState(initialPhoneLockDate);
  const activeHeadline = heroHeadlineSentences[activeHeadlineIndex] ?? heroHeadlineSentences[0];

  useEffect(() => {
    const letterDelay =
      headlinePhase === "reveal"
        ? HERO_HEADLINE_REVEAL_DELAY_MS
        : HERO_HEADLINE_CONCEAL_DELAY_MS;
    const animationDuration = activeHeadline.length * letterDelay + 240;
    const phaseDelay =
      headlinePhase === "reveal"
        ? animationDuration + HERO_HEADLINE_HOLD_MS
        : animationDuration + HERO_HEADLINE_SWITCH_PAUSE_MS;

    const rotateHeadline = window.setTimeout(() => {
      if (headlinePhase === "reveal") {
        setHeadlinePhase("conceal");
        return;
      }
      setActiveHeadlineIndex(
        (currentIndex) => (currentIndex + 1) % heroHeadlineSentences.length,
      );
      setHeadlinePhase("reveal");
    }, phaseDelay);

    return () => window.clearTimeout(rotateHeadline);
  }, [activeHeadline, headlinePhase]);

  useEffect(() => {
    const updatePhoneStatusTime = () => {
      setPhoneStatusTime(formatPhoneStatusTime());
      setPhoneLockDate(formatPhoneLockDate());
    };
    updatePhoneStatusTime();
    const clockInterval = window.setInterval(updatePhoneStatusTime, 15_000);
    return () => window.clearInterval(clockInterval);
  }, []);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[#070b08] text-white"
      aria-label="RACTYSH ASSOCIATES landing background"
    >
      <div className="fixed inset-0 scale-110">
        <DeferredDither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          pixelSize={2}
          waveAmplitude={0.42}
          waveFrequency={3.4}
          waveSpeed={0.11}
          pauseWhenPastHero
        />
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(232,93,93,0.28),transparent_28%),linear-gradient(120deg,rgba(4,9,7,0.84),rgba(7,11,8,0.52)_46%,rgba(4,7,10,0.9))]" />
      <div className="fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      <NavbarDemo />

      <section
        id="home"
        className="relative z-10 mx-auto grid min-h-svh w-full max-w-7xl items-center gap-12 px-6 pt-32 pb-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] lg:px-12 lg:pt-28"
      >
        <div className="max-w-3xl">
          <h1
            className="relative min-h-[18rem] max-w-4xl text-[2.5rem] font-semibold leading-[1.05] text-white sm:min-h-[14.25rem] sm:text-6xl lg:min-h-[17.25rem] lg:text-7xl"
            aria-label={activeHeadline}
          >
            <EncryptedText
              key={`${activeHeadlineIndex}-${headlinePhase}`}
              text={activeHeadline}
              direction={headlinePhase}
              className="absolute left-0 top-0 inline-block max-w-[16ch] whitespace-normal break-words font-mono tracking-normal sm:max-w-[12ch] lg:max-w-[13ch]"
              encryptedClassName="text-[#F5C2C2]/55"
              revealedClassName="text-white"
              revealDelayMs={
                headlinePhase === "reveal"
                  ? HERO_HEADLINE_REVEAL_DELAY_MS
                  : HERO_HEADLINE_CONCEAL_DELAY_MS
              }
              flipDelayMs={34}
              animateOnView={false}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.62, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:mt-7 sm:text-lg sm:leading-8 lg:text-xl"
          >
            A professional intermediary business service platform connecting
            clients with verified partners, strategic opportunities, and
            corporate support services. RACTYSH ASSOCIATES PVT LTD acts as a
            trusted intermediary, helping businesses find the right partners,
            access the right services, and achieve their goals with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.62, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#E85D5D] px-6 text-sm font-bold text-[#FFF0F0] shadow-[0_18px_50px_rgba(232,93,93,0.3)] transition hover:bg-[#F47575]"
            >
              Start a consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#otc-services"
              className="inline-flex min-h-12 items-center rounded-full border border-white/16 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/28 hover:bg-white/12"
            >
              View our services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.62, ease: "easeOut" }}
            className="mt-8 grid max-w-2xl grid-cols-3 border border-white/10 bg-black/24 backdrop-blur-md"
          >
            {heroStats.map(([value, label]) => (
              <div
                key={label}
                className="border-r border-white/10 px-4 py-4 last:border-r-0"
              >
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-white/46">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08, duration: 0.62, ease: "easeOut" }}
            className="mt-10 hidden max-w-2xl gap-3 sm:grid sm:grid-cols-3"
          >
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex min-h-14 items-center gap-3 border border-white/12 bg-black/22 px-4 py-3 backdrop-blur-md"
              >
                <ShieldCheck
                  className="size-4 shrink-0 text-[#D4AF37]"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/78">
                  {point}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 54, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ delay: 0.42, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-[390px] justify-center lg:justify-end"
        >
          <div
            className="absolute top-10 -right-8 h-72 w-44 rotate-12 bg-[#E85D5D]/18 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 -left-12 h-56 w-52 -rotate-12 bg-[#E85D5D]/12 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative aspect-[1290/2796] w-[min(78vw,335px)] rounded-[3.35rem] bg-[linear-gradient(135deg,#a8adab_0%,#252b2b_18%,#070908_48%,#727977_78%,#d5dad7_100%)] p-[5px] shadow-[0_32px_100px_rgba(0,0,0,0.62),inset_0_0_0_1px_rgba(255,255,255,0.22)]">
            <span className="absolute -left-[7px] top-[7.3rem] h-14 w-[4px] rounded-l-full bg-[#858b89]" aria-hidden="true" />
            <span className="absolute -left-[7px] top-[10.9rem] h-10 w-[4px] rounded-l-full bg-[#858b89]" aria-hidden="true" />
            <span className="absolute -right-[7px] top-[9.8rem] h-20 w-[4px] rounded-r-full bg-[#858b89]" aria-hidden="true" />
            <div className="relative h-full rounded-[3.05rem] bg-[#050706] p-[8px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_0_30px_rgba(255,255,255,0.05)]">
              <div className="absolute left-1/2 top-[1.08rem] z-30 flex h-[2.15rem] w-[7.2rem] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2 shadow-[0_9px_22px_rgba(0,0,0,0.42)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#101819] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_10px_rgba(232,93,93,0.12)]" />
              </div>
              <div className="relative h-full overflow-hidden rounded-[2.58rem] border border-white/10 bg-[#1A0505]">
                <div
                  id="desk"
                  className="absolute inset-0 overflow-hidden px-3.5 pb-4 pt-4"
                  aria-label="RACTYSH ASSOCIATES phone interface"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_15%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_78%_24%,rgba(232,93,93,0.68),transparent_34%),linear-gradient(160deg,#0d1514_0%,#09251f_40%,#050403_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-black/18 backdrop-blur-[0.5px]" />

                  <div
                    className="relative flex h-full min-h-0 flex-col px-1"
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
                    }}
                  >
                    <div className="flex h-8 items-center justify-between px-2 text-white">
                      <span
                        className="text-[13px] font-semibold tracking-normal"
                        aria-label={`Current time ${phoneStatusTime}`}
                        suppressHydrationWarning
                      >
                        {phoneStatusTime}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="hidden h-3.5 items-end gap-[2px] sm:flex" aria-hidden="true">
                          <i className="block h-1.5 w-[3px] rounded-sm bg-white/86" />
                          <i className="block h-2 w-[3px] rounded-sm bg-white/86" />
                          <i className="block h-2.5 w-[3px] rounded-sm bg-white/86" />
                          <i className="block h-3 w-[3px] rounded-sm bg-white/86" />
                        </span>
                        <span className="relative hidden h-3.5 w-4 sm:block" aria-hidden="true">
                          <i className="absolute bottom-0 left-0 h-3.5 w-4 rounded-t-full border-2 border-b-0 border-white/86" />
                          <i className="absolute bottom-0 left-[4px] h-2.5 w-2 rounded-t-full border-2 border-b-0 border-white/86" />
                        </span>
                        <span className="relative h-3.5 w-6 rounded-[4px] border border-white/86" aria-hidden="true">
                          <i className="absolute -right-[3px] top-[3px] h-1.5 w-[2px] rounded-r-sm bg-white/86" />
                          <i className="absolute inset-y-[2px] left-[2px] w-[15px] rounded-[2px] bg-white/86" />
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-center">
                      <LockKeyhole
                        className="size-4 text-white/88"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-2 text-center text-white">
                      <p
                        className="text-[14px] font-medium leading-none text-white/86"
                        suppressHydrationWarning
                      >
                        {phoneLockDate}
                      </p>
                      <p
                        className="mt-1 text-[4.35rem] font-semibold leading-none text-white max-[420px]:text-[3.78rem]"
                        suppressHydrationWarning
                      >
                        {phoneStatusTime}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2.5 max-[420px]:mt-4 max-[420px]:space-y-2">
                      {phoneNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.title}
                          initial={{ opacity: 0, y: 18, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.9 + index * 0.14,
                            duration: 0.42,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`rounded-[1.45rem] border border-white/45 bg-white/[0.78] p-3.5 text-[#111314] shadow-[0_18px_45px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl max-[420px]:p-3 ${
                            index === 2 ? "max-[420px]:hidden" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="grid size-7 shrink-0 place-items-center rounded-[0.65rem] bg-[linear-gradient(135deg,#E85D5D,#C94A4A)] text-[12px] font-bold text-white shadow-[0_6px_14px_rgba(0,0,0,0.18)]">
                              {notification.icon}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[12px] font-semibold leading-none text-black/74">
                              {notification.app}
                            </span>
                            <span className="text-[12px] font-medium leading-none text-black/42">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-2 text-[14px] font-semibold leading-5 text-black/90">
                            {notification.title}
                          </p>
                          <p className="mt-0.5 text-[13px] font-medium leading-5 text-black/64">
                            {notification.body}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto pb-4 max-[420px]:pb-3">
                      <p className="mb-4 text-center text-[12px] font-medium text-white/66 max-[420px]:mb-3">
                        Swipe up to open
                      </p>
                      <div className="flex items-center justify-between px-7">
                        <button
                          type="button"
                          aria-label="Flashlight"
                          className="grid size-12 place-items-center rounded-full bg-black/28 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
                        >
                          <Flashlight className="size-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="Camera"
                          className="grid size-12 place-items-center rounded-full bg-black/28 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
                        >
                          <Camera className="size-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/74" />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <ScrollRevealSection>
        <TrustComplianceSection />
      </ScrollRevealSection>
      <ConnectedPageBackground>
        <ScrollRevealSection>
          <IntermediaryServicesSection />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <WhyChooseUsSection />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <ClientTestimonialsSection />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <ConnectedContactSection />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <ServicesFaqSection />
        </ScrollRevealSection>
      </ConnectedPageBackground>
      <ScrollRevealSection>
        <SiteFooter />
      </ScrollRevealSection>
    </main>
  );
}

function IntermediaryServicesSection() {
  return (
    <section
      id="otc-services"
      className="relative z-20 overflow-hidden bg-transparent px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      <div className="relative mx-auto max-w-[92rem]">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C2C2]">
              Our Services
            </p>
            <h2 className="max-w-4xl text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              Comprehensive intermediary business services for enterprises and professionals.
            </h2>
          </div>
          <div className="border-l border-white/12 pl-5 lg:pl-8">
            <p className="max-w-2xl text-base leading-8 text-white/58">
              RACTYSH ASSOCIATES PVT LTD provides a full spectrum of intermediary
              business services designed to connect clients with verified partners,
              streamline complex processes, and deliver professional outcomes
              across multiple service verticals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Verified network", "Professional delivery", "End-to-end support"].map(
                (indicator) => (
                  <span
                    key={indicator}
                    className="border border-white/12 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/66"
                  >
                    {indicator}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {intermediaryServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
              <article
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-[#F5C2C2]/30"
              >
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 flex size-8 items-center justify-center rounded-lg border border-[#F5C2C2]/25 bg-black/50 text-[#F5C2C2] backdrop-blur-sm">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative flex flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold leading-5 tracking-tight text-white">
                      {service.title}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] font-semibold text-white/24">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm leading-6 text-white/50">
                      {service.description}
                    </p>

                    <div className="mt-4 border-t border-white/8 pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5C2C2]/60">
                        Key benefits
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex gap-2 text-sm leading-5 text-white/60"
                          >
                            <Check
                              className="mt-0.5 size-3.5 shrink-0 text-[#D4AF37]"
                              aria-hidden="true"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="mt-4 inline-flex h-8 w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-[10px] font-semibold text-white/70 transition hover:border-[#F5C2C2]/40 hover:bg-[#F5A3A3]/15 hover:text-white"
                  >
                    {service.cta}
                    <ArrowRight className="size-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section
      id="why-otc-desk"
      className="relative z-20 overflow-hidden bg-transparent px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="relative mx-auto max-w-[92rem]">
        <div className="grid gap-10 lg:grid-cols-[0.58fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C2C2]">
              Why choose us
            </p>
            <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Professional standards for every business engagement.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/58">
              We are built for clients who value reliability, confidentiality,
              professional coordination, and transparent processes over
              unstructured approaches.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-[#E85D5D] px-5 text-sm font-bold text-[#FFF0F0] shadow-[0_18px_50px_rgba(232,93,93,0.22)] transition hover:bg-[#F47575]"
            >
              Start a consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid border border-white/10 bg-black/24 backdrop-blur-xl sm:grid-cols-2">
            {serviceAdvantages.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/10 p-5 last:border-b-0 sm:border-r sm:p-6 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="mb-6 grid size-11 place-items-center border border-white/12 bg-white/[0.045] text-[#FDE8E8]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/56">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustComplianceSection() {
  return (
    <section
      id="otc-trust"
      className="relative z-20 overflow-hidden bg-transparent px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="relative mx-auto max-w-[92rem]">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Why Work With <span className="text-[#E85D5D]">RACTYSH ASSOCIATES PVT LTD</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/58">
            Every engagement is backed by professional standards, verified networks,
            and a commitment to delivering reliable outcomes for our clients.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustComplianceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-[#E85D5D]/20 hover:-translate-y-0.5"
              >
                <div className="mb-5 grid size-11 place-items-center rounded-lg bg-[#E85D5D]/12 text-[#FFF0F0]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-white/56">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClientTestimonialsSection() {
  const testimonials = [
    {
      quote: "RACTYSH ASSOCIATES PVT LTD helped us find the right business partner for our expansion into South India. Their network and professional approach saved us months of searching and the partnership continues to deliver value.",
      name: "Rajesh Mehta",
      role: "Director, Meridian Enterprises, Mumbai",
    },
    {
      quote: "As a growing company, we needed reliable intermediary support for vendor coordination and documentation. RACTYSH ASSOCIATES delivered professional service with clear communication and timely results.",
      name: "Anita Krishnan",
      role: "CEO, Surya Solutions, Bengaluru",
    },
    {
      quote: "The corporate consulting support we received was exceptional. The team took time to understand our business, presented practical recommendations, and supported us through implementation.",
      name: "Vikram Patel",
      role: "Founder, Lotus Group, Ahmedabad",
    },
  ];

  return (
    <section
      id="otc-trust"
      className="relative z-20 overflow-hidden bg-transparent px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(232,93,93,0.1),transparent_31%)]" />

      <div className="relative mx-auto max-w-[92rem]">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C2C2]">
            What Our Clients Say
          </p>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Trusted by businesses <br />
            <span className="text-[#F5C2C2]">across industries.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-[#F5C2C2]/30 hover:-translate-y-1"
            >
              <svg className="mb-4 h-6 w-6 text-[#F5C2C2]/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-7 text-white/60">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-white/8 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="mt-0.5 text-xs text-white/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-2 border border-[#F5C2C2]/30 bg-[#F5A3A3]/15 px-6 text-sm font-bold text-[#FFF5F5] transition hover:border-[#F5C2C2]/50 hover:bg-[#F5A3A3]/22"
          >
            Discuss your requirements
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ConnectedPageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-20 overflow-hidden bg-black">
      <StarsBackground
        className="pointer-events-none opacity-65"
        starDensity={0.00018}
        minTwinkleSpeed={0.65}
        maxTwinkleSpeed={1.3}
      />
      <ShootingStars
        className="pointer-events-none opacity-85"
        minSpeed={8}
        maxSpeed={18}
        minDelay={700}
        maxDelay={1600}
        starColor="#D4AF37"
        trailColor="#E85D5D"
        starWidth={14}
        starCount={5}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.5)_32%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.78)),radial-gradient(circle_at_16%_34%,rgba(232,93,93,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ServicesFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="project-faq"
      className="relative z-20 overflow-hidden bg-transparent px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(232,93,93,0.025),rgba(4,7,6,0)_42%)]" />

      <div className="relative mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#F5C2C2]">
            Frequently asked questions
          </p>
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            Common questions about our intermediary business services.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/56">
            Clear answers about how we work, what we offer, and how we can
            help your business grow through professional intermediary support.
          </p>
        </div>

        <div className="border-y border-white/10">
          {projectFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `project-faq-answer-${index}`;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-white/10 last:border-b-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center gap-4 py-6 text-left transition hover:bg-white/[0.03] sm:gap-6 sm:px-4"
                >
                  <span className="hidden text-sm font-semibold text-[#F5C2C2]/70 sm:block">
                    0{index + 1}
                  </span>
                  <span className="flex-1 text-lg font-medium leading-7 text-white sm:text-xl">
                    {item.question}
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center border border-white/12 bg-white/[0.04] text-white/72 transition group-hover:border-[#F5C2C2]/40 group-hover:text-[#FDE8E8]">
                    <ChevronDown
                      className={`size-4 transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <div
                  id={answerId}
                  className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="max-w-3xl px-0 pb-6 text-sm leading-7 text-white/58 sm:px-14 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
