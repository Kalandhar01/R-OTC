import { after, NextResponse, type NextRequest } from "next/server";
import { sendOtcContactAdminEmail } from "@/lib/otc-contact-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  services?: string[];
  sourcePage?: string;
};

const service = "OTC Exchange";

function clean(value: unknown, limit = 1000) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, limit)
    : "";
}

function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function ipAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return clean(
    request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-client-ip") ||
      forwardedFor ||
      "",
    120,
  );
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid contact form payload." },
      { status: 400 },
    );
  }

  const name = clean(payload.name, 160);
  const email = clean(payload.email, 180).toLowerCase();
  const phone = clean(payload.phone, 40);
  const services = Array.isArray(payload.services) ? payload.services.filter(s => typeof s === "string").map(s => clean(s, 120)).filter(Boolean) : [];
  const referer = clean(request.headers.get("referer"), 600);
  const sourcePage = clean(payload.sourcePage, 600) || referer || "/";

  if (!name || !emailOk(email)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please share your name and a valid email.",
      },
      { status: 400 },
    );
  }

  const projectDescription = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Services: ${services.length ? services.join(", ") : "Not specified"}`,
    `Service: ${service}`,
    `Source page: ${sourcePage}`,
  ].join("\n");

  const metadata = {
    sourcePage,
    submittedFrom: "ractysh-associates-otc",
    inquiryType: "OTC Contact Form",
    service,
    phone: phone || null,
    services: services.length ? services : null,
    userAgent: clean(request.headers.get("user-agent"), 600) || null,
    ipAddress: ipAddress(request) || null,
  };

  try {
    const records = {
      leadId: `otc_lead_${crypto.randomUUID()}`,
      contactInquiryId: `otc_inquiry_${crypto.randomUUID()}`,
      createdAt: new Date(),
      metadata,
      projectDescription,
    };

    after(() =>
      sendOtcContactAdminEmail({
        inquiryId: records.contactInquiryId,
        leadId: records.leadId,
        name,
        email,
        phone: phone || null,
        services: services.length ? services : null,
        sourcePage,
        createdAt: records.createdAt,
      }).catch((error) => {
        console.error("[otc-contact-email] Admin email failed.", {
          inquiryId: records.contactInquiryId,
          error,
        });
      }),
    );

    return NextResponse.json({
      ok: true,
      records: {
        leadId: records.leadId,
        contactInquiryId: records.contactInquiryId,
      },
      message: "Mandate note received. The OTC team will review it shortly.",
    });
  } catch (error) {
    console.error("[otc-contact] Failed to create contact submission.", error);
    return NextResponse.json(
      { ok: false, message: "Unable to receive this mandate note right now." },
      { status: 500 },
    );
  }
}
