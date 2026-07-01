import { after, NextResponse, type NextRequest } from "next/server";
import { sendOtcContactAdminEmail } from "@/lib/otc-contact-email";
import { connectDB } from "@/lib/db";
import OtcLead from "@/models/OtcLead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const service = "OTC Exchange";

function display(value: string | undefined | null): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not provided";
}

function clean(value: unknown, limit = 1000) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, limit)
    : "";
}

function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

function renderAutoReplyHtml(payload: {
  name: string; email: string; phone: string; company: string;
  services: string[]; projectType: string; location: string;
  budget: string; message: string;
}): string {
  const fields = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", display(payload.phone)],
    ["Company", display(payload.company)],
    ["Services", payload.services.length ? payload.services.join(", ") : "Not specified"],
    ["Service Type", service],
    ["Project Type", display(payload.projectType)],
    ["Location", display(payload.location)],
    ["Budget Range", display(payload.budget)],
  ];

  const fieldRows = fields
    .filter(([, v]) => v && v !== "Not provided" && v !== "Not specified")
    .map(([label, value]) => `
    <tr><td style="padding:6px 0;font-size:14px;line-height:20px;color:#62584e;border-bottom:1px solid #f0ebe2">
      <span style="font-weight:600;color:#20130f;display:inline-block;width:120px">${escapeHtml(label)}</span>
      <span style="color:#4a3f35">${escapeHtml(value)}</span>
    </td></tr>`)
    .join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thank You — RACTYSH Associates</title></head>
<body style="margin:0;padding:0;background-color:#f8f3ea;font-family:Georgia,'Times New Roman',serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f3ea"><tr><td align="center" style="padding:40px 16px">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%">
<tr><td style="background:linear-gradient(135deg,#0a0806,#1c120e);border-radius:12px 12px 0 0;padding:32px 40px 24px;text-align:center">
<table cellpadding="0" cellspacing="0" style="margin:0 auto">
<tr><td style="font-size:28px;font-weight:700;letter-spacing:2px;color:#d9bd7a;font-family:Georgia,'Times New Roman',serif">RACTYSH</td></tr>
<tr><td style="font-size:11px;font-weight:400;letter-spacing:4px;color:#d9bd7a;padding-top:4px;text-transform:uppercase">Associates Private Limited — OTC Exchange</td></tr>
</table></td></tr>
<tr><td style="background-color:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8ddca;border-right:1px solid #e8ddca">
<table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="font-size:28px;font-weight:700;color:#20130f;padding-bottom:8px;font-family:Georgia,'Times New Roman',serif">Thank You, ${escapeHtml(payload.name)}</td></tr>
<tr><td style="height:3px;width:48px;background-color:#d9bd7a;margin:0 0 24px;display:block"></td></tr>
<tr><td style="font-size:16px;line-height:26px;color:#62584e;padding-bottom:16px">We have received your mandate note. A member of our OTC desk will reach out within <strong style="color:#20130f">24–48 business hours</strong>.</td></tr>
<tr><td><table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="padding:16px 0 8px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a47a2d;font-family:Arial,sans-serif">Your Submission Details</td></tr>
${fieldRows}
</table></td></tr>
${payload.message ? `<tr><td style="padding:16px 0 0">
<div style="padding:16px;border-left:3px solid #a47a2d;background:#fcf9f4;border-radius:8px">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a47a2d;font-family:Arial,sans-serif">Your Message</p>
<p style="margin:0;font-size:14px;line-height:22px;color:#4a3f35">${escapeHtml(payload.message)}</p>
</div></td></tr>` : ""}
</table></td></tr>
<tr><td style="background:linear-gradient(135deg,#0a0806,#1c120e);border-radius:0 0 12px 12px;padding:24px 40px;text-align:center">
<p style="font-size:12px;line-height:18px;color:#9d8a74;margin:0;font-family:Arial,Helvetica,sans-serif">RACTYSH ASSOCIATES PRIVATE LIMITED</p>
<p style="font-size:11px;line-height:18px;color:#7a6a58;margin:4px 0 0;font-family:Arial,Helvetica,sans-serif">This is an automated acknowledgement.</p>
</td></tr>
</table></td></tr></table></body></html>`
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid contact form payload." }, { status: 400 });
  }

  const name = clean(payload.name, 160);
  const email = clean(payload.email, 180).toLowerCase();
  const phone = clean(payload.phone, 40);
  const company = clean(payload.company, 200);
  const services = Array.isArray(payload.services)
    ? payload.services.filter(s => typeof s === "string").map(s => clean(s, 120)).filter(Boolean)
    : [];
  const projectType = clean(payload.projectType, 140);
  const location = clean(payload.location, 160);
  const budget = clean(payload.budget, 120);
  const message = clean(payload.message, 4000);
  const referer = clean(request.headers.get("referer"), 600);
  const sourcePage = clean(payload.sourcePage, 600) || referer || "/";

  if (!name || !emailOk(email)) {
    return NextResponse.json({ ok: false, message: "Please share your name and a valid email." }, { status: 400 });
  }

  try {
    await connectDB();

    const lead = await OtcLead.create({
      name, email, phone: phone || undefined,
      services, projectType: projectType || undefined,
      location: location || undefined, budget: budget || undefined,
      message: message || undefined, company: company || undefined,
      sourcePage, status: "new",
    });

    const leadId = `otc_lead_${lead._id}`;
    const contactInquiryId = `otc_inquiry_${lead._id}`;

    after(() =>
      sendOtcContactAdminEmail({
        inquiryId: contactInquiryId, leadId, name, email,
        phone: phone || null,
        services: services.length ? services : null,
        sourcePage, createdAt: new Date(),
      }).catch((error) => {
        console.error("[otc-contact-email] Admin email failed.", { inquiryId: contactInquiryId, error });
      }),
    );

    after(() =>
      (async () => {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        resend.emails.send({
          from: process.env.OTC_RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "RACTYSH ASSOCIATES PVT LTD <onboarding@resend.dev>",
          to: [email],
          subject: `Thank You, ${name} — RACTYSH Associates`,
          html: renderAutoReplyHtml({ name, email, phone, company, services, projectType, location, budget, message }),
        }).catch((err) => console.error("[otc-contact] Auto-reply failed:", err));
      })().catch((err) => console.error("[otc-contact] Auto-reply wrapper failed:", err)),
    );

    return NextResponse.json({
      ok: true,
      records: { leadId, contactInquiryId },
      message: "Mandate note received. The OTC team will review it shortly.",
    });
  } catch (error) {
    console.error("[otc-contact] Failed to create contact submission.", error);
    return NextResponse.json({ ok: false, message: "Unable to receive this mandate note right now." }, { status: 500 });
  }
}
