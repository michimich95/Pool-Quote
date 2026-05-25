import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const headers: Record<string, string> = {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };

  // 1. Search for existing contact by email
  const searchRes = await fetch(
    `https://services.leadconnectorhq.com/contacts/?email=${encodeURIComponent(body.email)}&locationId=${process.env.GHL_LOCATION_ID}`,
    { headers }
  );
  const searchText = await searchRes.text();
  let searchData: { contacts?: { id: string }[] } = {};
  try { if (searchText) searchData = JSON.parse(searchText); } catch { /* empty */ }
  const existingContact = searchData.contacts?.[0];

  // 2. Build contact payload
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
      { key: "pool_location",                                                                                       field_value: body.pool_location ?? "" },
      { key: "pool_type",                                                                                           field_value: body.pool_type ?? "" },
      { key: "pool_finishes_interior_(copy)_34gz",                                                                 field_value: body.pool_finishes_interior ?? "" },
      { key: "pool_finishes_exterior_(copy)_4um6",                                                                 field_value: body.pool_finishes_exterior ?? "" },
      { key: "which_led_lighting_do_you_prefer?_(copy)_142f5_15io6",                                              field_value: body.led_lighting ?? "" },
      { key: "select_the_premium_features_that_define_your_pool's_style_and_comfort_(copy)_4u3m",                 field_value: body.premium_features ?? "" },
      { key: "pool_dimensions",                                                                                    field_value: body.pool_dimensions ?? "" },
      { key: "pool_glass_size",                                                                                    field_value: body.pool_glass_size ?? "" },
      { key: "pool_led_light_35g_copy",                                                                           field_value: body.pool_led_light ?? "" },
      { key: "pool_premium_features",                                                                              field_value: body.pool_premium_features ?? "" },
      { key: "pool_expected_budget",                                                                               field_value: body.pool_expected_budget ?? "" },
      { key: "pool_installation_date",                                                                             field_value: body.pool_installation_date ?? "" },
      { key: "preferred_time_to_contact",                                                                          field_value: body.preferred_time_to_contact ?? "" },
    ],
  };

  // 3. Create or update contact
  let contactId: string;

  if (existingContact) {
    const updateRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/${existingContact.id}`,
      { method: "PUT", headers, body: JSON.stringify(contactData) }
    );
    const updateText = await updateRes.text();
    let updateData: Record<string, unknown> = {};
    try { if (updateText) updateData = JSON.parse(updateText); } catch { /* empty */ }
    if (!updateRes.ok) {
      return NextResponse.json({ error: updateData }, { status: 500 });
    }
    contactId = existingContact.id;
  } else {
    const createRes = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      { method: "POST", headers, body: JSON.stringify(contactData) }
    );
    const createText = await createRes.text();
    let createData: { contact?: { id: string } } = {};
    try { if (createText) createData = JSON.parse(createText); } catch { /* empty */ }
    if (!createRes.ok) {
      return NextResponse.json({ error: createData }, { status: 500 });
    }
    contactId = createData.contact!.id;
  }

  // 4. Save quote as a timeline note
  const premiumFeatures = Array.isArray(body.premium_features)
    ? body.premium_features.join(", ")
    : body.premium_features || "-";

  const quoteNote = `
🏊 NUEVO QUOTE SOLICITADO
────────────────────────
📅 Fecha: ${new Date().toLocaleString("es-ES", { timeZone: "America/New_York" })}

MODELO Y CONFIGURACIÓN
• Tipo de piscina: ${body.pool_type || "-"}
• Ubicación: ${body.pool_location || "-"}
• Dimensiones: ${body.pool_dimensions || "-"}

ACABADOS
• Interior: ${body.pool_finishes_interior || "-"}
• Exterior: ${body.pool_finishes_exterior || "-"}

EXTRAS
• Iluminación LED: ${body.led_lighting || "-"}
• Panel de cristal: ${body.pool_glass_size || "-"}
• Premium features: ${premiumFeatures}

PROYECTO
• Presupuesto esperado: ${body.pool_expected_budget || "-"}
• Fecha deseada: ${body.pool_installation_date || "-"}
• Horario de contacto: ${body.preferred_time_to_contact || "-"}

💰 PRECIO COTIZADO: ${body.precio_final || "-"}
  `.trim();

  const noteRes = await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
    { method: "POST", headers, body: JSON.stringify({ body: quoteNote }) }
  );

  if (!noteRes.ok) {
    // Contact saved fine — note failure is non-blocking
    console.error("Error saving note:", await noteRes.text());
  }

  return NextResponse.json({ success: true, contactId, isNew: !existingContact });
}
