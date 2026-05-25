import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const nameParts = (body.full_name ?? "").trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const contactData = {
    firstName,
    lastName,
    phone: body.phone,
    email: body.email,
    city: body.city,
    postalCode: body.postal_code,
    locationId: process.env.GHL_LOCATION_ID,
    tags: ["cotizador-piscinas"],
    customFields: [
      { key: "pool_location",                                                                                        field_value: body.pool_location ?? "" },
      { key: "pool_type",                                                                                            field_value: body.pool_type ?? "" },
      { key: "pool_finishes_interior_(copy)_34gz",                                                                  field_value: body.pool_finishes_interior ?? "" },
      { key: "pool_finishes_exterior_(copy)_4um6",                                                                  field_value: body.pool_finishes_exterior ?? "" },
      { key: "which_led_lighting_do_you_prefer?_(copy)_142f5_15io6",                                               field_value: body.led_lighting ?? "" },
      { key: "select_the_premium_features_that_define_your_pool's_style_and_comfort_(copy)_4u3m",                  field_value: body.premium_features ?? "" },
      { key: "pool_dimensions",                                                                                     field_value: body.pool_dimensions ?? "" },
      { key: "pool_glass_size",                                                                                     field_value: body.pool_glass_size ?? "" },
      { key: "pool_led_light_35g_copy",                                                                            field_value: body.pool_led_light ?? "" },
      { key: "pool_premium_features",                                                                               field_value: body.pool_premium_features ?? "" },
      { key: "pool_expected_budget",                                                                                field_value: body.pool_expected_budget ?? "" },
      { key: "pool_installation_date",                                                                              field_value: body.pool_installation_date ?? "" },
      { key: "preferred_time_to_contact",                                                                           field_value: body.preferred_time_to_contact ?? "" },
    ],
  };

  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(contactData),
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    if (text) data = JSON.parse(text);
  } catch {
    // GHL returned non-JSON body
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: { message: (data as { message?: string }).message ?? `GHL error ${res.status}`, raw: data } },
      { status: 500 }
    );
  }

  const contact = (data as { contact?: { id?: string } }).contact;
  return NextResponse.json({ success: true, contactId: contact?.id ?? null });
}
