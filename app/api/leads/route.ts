import { NextRequest, NextResponse } from "next/server";

const GHL_BASE = "https://services.leadconnectorhq.com";
const HEADERS = {
  Authorization: `Bearer ${process.env.GHL_API_KEY}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
};

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phone, quoteNote } = await req.json();

  const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: "POST",
    headers: HEADERS,
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

  if (contactId && quoteNote) {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ body: quoteNote }),
    });
  }

  return NextResponse.json({ success: true, contactId });
}
