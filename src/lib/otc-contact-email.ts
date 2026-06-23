import { Resend } from "resend";

const defaultAdminEmail = "kalandars2004@gmsil.com";
const defaultSender = "RACTYSH ASSOCIATES PVT LTD <onboarding@resend.dev>";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type OtcContactEmailInput = {
  inquiryId: string;
  leadId: string;
  name: string;
  email: string;
  phone: string | null;
  services: string[] | null;
  sourcePage: string | null;
  createdAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function present(value: string | null | undefined) {
  const cleaned = value?.trim();
  return cleaned || "Not provided";
}

function paragraph(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function formatSubmittedAt(value: Date) {
  return `${new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(value)} IST`;
}

function getAdminEmail() {
  const configured =
    process.env.OTC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || defaultAdminEmail;

  return emailPattern.test(configured) ? configured : defaultAdminEmail;
}

function getSender() {
  return (
    process.env.OTC_RESEND_FROM_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    process.env.RESEND_FROM ||
    process.env.MAIL_FROM ||
    defaultSender
  );
}

function getAdminUrl() {
  const configured =
    process.env.ADMIN_APP_URL ||
    process.env.NEXT_PUBLIC_ADMIN_APP_URL ||
    process.env.ADMIN_URL;
  const base = (configured || "https://ractysh.com").replace(/\/$/, "");

  return `${base}/import-export/dashboard`;
}

function dataRow(label: string, value: string | null | undefined) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #d8d2c5;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:#69655d;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 0;border-bottom:1px solid #d8d2c5;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#151512;vertical-align:top;">${paragraph(present(value))}</td>
    </tr>
  `;
}

function buildText(input: OtcContactEmailInput) {
  const servicesList = input.services?.length ? input.services.join(", ") : "Not specified";

  return `New RACTYSH ASSOCIATES PVT LTD Contact Form Submission

Submitted: ${formatSubmittedAt(input.createdAt)}
Inquiry ID: ${input.inquiryId}
Lead ID: ${input.leadId}

Name: ${present(input.name)}
Email: ${present(input.email)}
Phone: ${present(input.phone)}
Services: ${servicesList}
Source Page: ${present(input.sourcePage)}

Admin: ${getAdminUrl()}`;
}

function buildHtml(input: OtcContactEmailInput) {
  const adminUrl = getAdminUrl();

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#050806;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#050806;">
          <tr>
            <td align="center" style="padding:32px 18px;">
              <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="width:680px;max-width:100%;border-collapse:separate;border-spacing:0;background:#f3f1ea;border:1px solid #d8d2c5;border-radius:24px;overflow:hidden;">
                <tr>
                    <td style="padding:32px;background:#1A0505;color:#ffffff;">
                    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#E85D5D;">RACTYSH ASSOCIATES PVT LTD</p>
                    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:34px;line-height:40px;color:#ffffff;">New Contact Submission</h1>
                    <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:rgba(255,255,255,0.68);">A mandate note was submitted through the OTC exchange landing page.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 34px 22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                      ${dataRow("Submitted", formatSubmittedAt(input.createdAt))}
                      ${dataRow("Name", input.name)}
                      ${dataRow("Email", input.email)}
                      ${dataRow("Phone", input.phone)}
                      ${dataRow("Services", input.services?.length ? input.services.join(", ") : "Not specified")}
                      ${dataRow("Source Page", input.sourcePage)}
                      ${dataRow("Inquiry ID", input.inquiryId)}
                    </table>
                    <p style="margin:26px 0 0;">
                      <a href="${escapeHtml(adminUrl)}" style="display:inline-block;border-radius:8px;background:#11140f;padding:13px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">Open Admin Panel</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendOtcContactAdminEmail(input: OtcContactEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[otc-contact-email] RESEND_API_KEY is not configured.");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);

  return resend.emails.send({
    from: getSender(),
    to: getAdminEmail(),
    replyTo: input.email,
    subject: `New RACTYSH ASSOCIATES PVT LTD contact - ${present(input.name)}`,
    text: buildText(input),
    html: buildHtml(input),
  });
}
