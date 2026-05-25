# Benigni Pools — Pool Quote Configurator

Interactive pool configurator built with Next.js. Guides users through a 5-step accordion stepper, shows a live price estimate, and submits leads directly to GoHighLevel CRM.

**Live:** https://pool-quote-dun.vercel.app

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| CRM | GoHighLevel (LeadConnector API) |
| Hosting | Vercel |
| Package manager | pnpm |

---

## Project structure

```
app/
  page.tsx                          Root page — renders PoolConfigurator
  layout.tsx                        Global layout + fonts
  api/
    leads/route.ts                  POST handler — sends contact to GHL CRM

components/
  pool-configurator/
    pool-configurator.tsx           Top-level state manager + split layout
    customization-panel.tsx         5-step accordion stepper + sticky CTA
    pool-preview.tsx                Left-panel image carousel
    contact-form-modal.tsx          Quote request form modal

lib/
  pool-data.ts                      Catalog data: sizes, finishes, extras, pricing
  utils.ts                          cn() helper

components/ui/
  button.tsx                        shadcn Button
  ...
```

---

## Environment variables

Create `.env.local` at the project root:

```env
GHL_API_KEY=your_ghl_private_integration_token
GHL_LOCATION_ID=your_ghl_location_id
```

Both values come from GoHighLevel → Settings → Integrations → Private Integrations.

---

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build check
```

> **Note:** pnpm v11 requires `.npmrc` with `onlyBuiltDependencies[]=sharp` to allow the sharp image processing package to build.

---

## Configurator flow

1. **Tipo de Piscina** — Choose Miami or Pool Spa model
2. **Dimensiones** — Select size (base price shown per option)
3. **Lámina Interior** — Pick interior finish from 23 options across 5 collections (Touch, Vogue, Relief, Alive, Kolos)
4. **Madera Exterior** — Choose composite wood color (Chocolate, Café, Gris Carbón, Vanilla)
5. **Extras** — Optional add-ons filtered by pool type

The estimated total updates live at the top of the panel. On step 5 the sticky CTA becomes **Request Quote**, which opens the contact form modal.

---

## CRM integration

The contact form modal (`contact-form-modal.tsx`) posts to `/api/leads`. The route:

1. Splits `full_name` into `firstName` / `lastName`
2. Maps all pool configuration and contact fields to GHL custom field keys
3. Creates a contact via `POST https://services.leadconnectorhq.com/contacts/` with tag `cotizador-piscinas`
4. Returns `{ success: true, contactId }` on success

GHL custom field keys used:

| Field | GHL key |
|---|---|
| Pool location | `pool_location` |
| Pool type | `pool_type` |
| Interior finish | `pool_finishes_interior_(copy)_34gz` |
| Exterior finish | `pool_finishes_exterior_(copy)_4um6` |
| Premium features | `select_the_premium_features...(copy)_4u3m` |
| Dimensions | `pool_dimensions` |
| Glass size | `pool_glass_size` |
| Expected budget | `pool_expected_budget` |
| Installation date | `pool_installation_date` |
| Preferred contact time | `preferred_time_to_contact` |

---

## Deployment

The project is connected to GitHub (`michimich95/Pool-Quote`). Every push to `main` triggers an automatic Vercel deployment under `michellys-projects-8dc3be3c`.

To deploy manually:

```bash
vercel --prod --scope michellys-projects-8dc3be3c
```
