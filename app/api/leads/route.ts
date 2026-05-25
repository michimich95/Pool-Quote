import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_HEADERS = {
  Authorization: `Bearer ${process.env.GHL_API_KEY}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
};

const NOTIFY_EMAIL = "michelly.perez@lystos.com";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phone, quoteNote } = await req.json();

  // 1. Create contact in GoHighLevel
  const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: "POST",
    headers: GHL_HEADERS,
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      locationId: process.env.GHL_LOCATION_ID,
      source: "Pool Quote Website",
      tags: ["pool-quote"],
    }),
  });

  const contactData = await contactRes.json();

  if (!contactRes.ok) {
    return NextResponse.json(
      { error: contactData?.message ?? "Failed to create contact" },
      { status: contactRes.status }
    );
  }

  const contactId = contactData.contact?.id;

  // 2. Add note to GHL contact
  if (contactId && quoteNote) {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify({ body: quoteNote }),
    });
  }

  // 3. Send email notification
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Benigni Pools <onboarding@resend.dev>",
    to: NOTIFY_EMAIL,
    replyTo: email || undefined,
    subject: `New Pool Quote Request — ${firstName} ${lastName}`,
    html: buildEmailHtml({ firstName, lastName, email, phone, quoteNote }),
  });

  return NextResponse.json({ success: true, contactId });
}

function buildEmailHtml({
  firstName,
  lastName,
  email,
  phone,
  quoteNote,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quoteNote: string;
}) {
  const lines = quoteNote.split("\n");
  const detailLines = lines.slice(2, lines.length - 2); // skip header + blank + blank + total
  const totalLine = lines[lines.length - 1];

  const rows = detailLines
    .filter((l) => l.trim())
    .map((line) => {
      const [label, ...rest] = line.split(": ");
      return `
        <tr>
          <td style="padding:8px 0;color:#a1a1aa;font-size:14px;border-bottom:1px solid #27272a;">${label.trim()}</td>
          <td style="padding:8px 0;color:#fafafa;font-size:14px;font-weight:500;text-align:right;border-bottom:1px solid #27272a;">${rest.join(": ").trim()}</td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#18181b;border-radius:16px 16px 0 0;padding:28px 32px;border-bottom:1px solid #27272a;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="display:inline-block;background:#7c3aed;border-radius:10px;width:36px;height:36px;line-height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:white;font-size:18px;">⬡</span>
                  </div>
                  <span style="color:#fafafa;font-size:16px;font-weight:700;letter-spacing:1px;margin-left:12px;vertical-align:middle;">BENIGNI POOLS</span>
                </td>
                <td align="right">
                  <span style="background:#7c3aed22;color:#a78bfa;font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;border:1px solid #7c3aed44;">New Quote Request</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style="background:#18181b;padding:28px 32px;">
            <p style="margin:0 0 4px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</p>
            <h2 style="margin:0 0 16px;color:#fafafa;font-size:22px;font-weight:700;">${firstName} ${lastName}</h2>
            <table cellpadding="0" cellspacing="0">
              ${email ? `<tr><td style="color:#71717a;font-size:13px;padding:2px 0;">📧</td><td style="color:#a1a1aa;font-size:14px;padding:2px 0 2px 8px;">${email}</td></tr>` : ""}
              ${phone ? `<tr><td style="color:#71717a;font-size:13px;padding:2px 0;">📱</td><td style="color:#a1a1aa;font-size:14px;padding:2px 0 2px 8px;">${phone}</td></tr>` : ""}
            </table>
          </td>
        </tr>

        <!-- Quote details -->
        <tr>
          <td style="background:#18181b;padding:0 32px 8px;">
            <p style="margin:0 0 12px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:1px;border-top:1px solid #27272a;padding-top:24px;">Configuration</p>
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          </td>
        </tr>

        <!-- Total -->
        <tr>
          <td style="background:#18181b;padding:24px 32px;border-top:1px solid #27272a;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#a1a1aa;font-size:15px;">Estimated Total</td>
                <td align="right" style="color:#a78bfa;font-size:28px;font-weight:800;">${totalLine.replace("Estimated Total: ", "")}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#09090b;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
            <p style="margin:0;color:#52525b;font-size:12px;">Reply to this email to respond directly to the customer.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
