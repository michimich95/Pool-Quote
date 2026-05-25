export type PoolType = "miami" | "pool-spa";

export interface PoolSize {
  id: string;
  name: string;
  lengthFt: string;
  widthFt: string;
  heightFt: string;
  waterHeightFt: string;
  volumeLiters: number;
  weightKg: number;
  basePrice: number;
}

export interface FinishOption {
  id: string;
  name: string;
  collection: string;
  color: string;
  image?: string;
  price: number;
}

export interface ExteriorFinish {
  id: string;
  name: string;
  color: string;
  price: number;
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: number;
  availableFor: PoolType[];
}

// ─── Miami Model Sizes ────────────────────────────────────────────────────────
export const miamiSizes: PoolSize[] = [
  {
    id: "miami-1",
    name: "Modelo 1",
    lengthFt: "13'",
    widthFt: "8'",
    heightFt: "4'",
    waterHeightFt: "3' 7\"",
    volumeLiters: 11780,
    weightKg: 12100,
    basePrice: 19000,
  },
  {
    id: "miami-2",
    name: "Modelo 2",
    lengthFt: "19' 5\"",
    widthFt: "8'",
    heightFt: "4'",
    waterHeightFt: "3' 7\"",
    volumeLiters: 17590,
    weightKg: 17630,
    basePrice: 25000,
  },
];

// ─── Pool Spa Model Sizes ─────────────────────────────────────────────────────
export const poolSpaSizes: PoolSize[] = [
  {
    id: "spa-1",
    name: "Modelo 1",
    lengthFt: "7' 11\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2' 5\"",
    volumeLiters: 3583,
    weightKg: 4300,
    basePrice: 15000,
  },
  {
    id: "spa-2",
    name: "Modelo 2",
    lengthFt: "9' 11\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2' 5\"",
    volumeLiters: 4489,
    weightKg: 5300,
    basePrice: 17500,
  },
  {
    id: "spa-3",
    name: "Modelo 3",
    lengthFt: "13' 2\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2' 5\"",
    volumeLiters: 5960,
    weightKg: 6900,
    basePrice: 20000,
  },
  {
    id: "spa-4",
    name: "Modelo 4",
    lengthFt: "16' 5\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2' 5\"",
    volumeLiters: 7431,
    weightKg: 8500,
    basePrice: 23000,
  },
];

// ─── Interior Lámina Reforzada ────────────────────────────────────────────────
// Collections: Touch · Vogue · Relief · Alive · Kolos
export const innerFinishes: FinishOption[] = [
  // TOUCH
  { id: "elegance",  name: "Elegance",  collection: "Touch", color: "#1e1e1e", image: "/materials/elegance.png",      price: 0 },
  { id: "prestige",  name: "Prestige",  collection: "Touch", color: "#636363", image: "/materials/prestige.png",      price: 0 },
  { id: "origin",    name: "Origin",    collection: "Touch", color: "#c0bfba", image: "/materials/origin.png",        price: 0 },
  { id: "vanity",    name: "Vanity",    collection: "Touch", color: "#ede9e3", image: "/materials/vanity.png",        price: 0 },
  { id: "relax",     name: "Relax",     collection: "Touch", color: "#d4a85a", image: "/materials/relax.png",         price: 500 },
  { id: "authentic", name: "Authentic", collection: "Touch", color: "#8a5840", image: "/materials/authentic.png",     price: 500 },
  { id: "sublime",   name: "Sublime",   collection: "Touch", color: "#c8b898", image: "/materials/sublime.png",       price: 0 },
  // VOGUE
  { id: "urban",     name: "Urban",     collection: "Vogue", color: "#9da4a7", image: "/materials/urban.png",         price: 0 },
  { id: "tropical",  name: "Tropical",  collection: "Vogue", color: "#3c6b5c", image: "/materials/tropical.png",      price: 0 },
  { id: "summer",    name: "Summer",    collection: "Vogue", color: "#00b4c4", image: "/materials/summer.png",        price: 0 },
  { id: "vintage",   name: "Vintage",   collection: "Vogue", color: "#e2d8c8", image: "/materials/vintage.png",       price: 0 },
  // RELIEF
  { id: "r-black",       name: "Black",          collection: "Relief", color: "#1a1a1a", image: "/materials/black.png",         price: 0 },
  { id: "r-dark-grey",   name: "Dark Grey",       collection: "Relief", color: "#484848", image: "/materials/dark-grey.png",     price: 0 },
  { id: "r-light-grey",  name: "Light Grey",      collection: "Relief", color: "#b2b4b6", image: "/materials/light-grey.png",    price: 0 },
  { id: "caribbean",     name: "Caribbean Green", collection: "Relief", color: "#3ed0be", image: "/materials/caribbean-green.png", price: 500 },
  { id: "adriatic",      name: "Adriatic Blue",   collection: "Relief", color: "#1a82d6", image: "/materials/adriatic-blue.png", price: 500 },
  { id: "r-white",       name: "White",           collection: "Relief", color: "#f0eeec", image: "/materials/white.png",         price: 0 },
  // ALIVE
  { id: "chandra", name: "Chandra", collection: "Alive", color: "#7c9fb0", image: "/materials/chandra.png", price: 800 },
  { id: "prana",   name: "Prana",   collection: "Alive", color: "#2e5c48", image: "/materials/prana.png",   price: 800 },
  { id: "dhyana",  name: "Dhyana",  collection: "Alive", color: "#3574b8", image: "/materials/dhyana.png",  price: 800 },
  { id: "bhumi",   name: "Bhumi",   collection: "Alive", color: "#b89868", image: "/materials/bhumi.png",   price: 800 },
  // KOLOS
  { id: "delos",  name: "Delos",  collection: "Kolos", color: "#6ab2d2", image: "/materials/delos.png",  price: 500 },
  { id: "zephir", name: "Zephir", collection: "Kolos", color: "#eeeef0", image: "/materials/zephir.png", price: 500 },
];

// ─── Exterior Composite Wood (Madera Tecnológica) ─────────────────────────────
export const exteriorFinishes: ExteriorFinish[] = [
  { id: "chocolate",   name: "Chocolate",   color: "#5c3d2e", price: 0 },
  { id: "cafe",        name: "Café",        color: "#8c6448", price: 0 },
  { id: "gris-carbon", name: "Gris Carbón", color: "#5a5f63", price: 0 },
  { id: "vanilla",     name: "Vanilla",     color: "#c4bba8", price: 0 },
];

// ─── Extras ───────────────────────────────────────────────────────────────────
export const extraOptions: ExtraOption[] = [
  {
    id: "bubbles",
    name: "Sistema de Burbujas",
    description: "Jets de aire relajantes para una experiencia spa",
    price: 2500,
    availableFor: ["miami"],
  },
  {
    id: "salt-chlorinator",
    name: "Kit Clorador Salino",
    description: "Sistema automático de tratamiento de agua con sal",
    price: 1800,
    availableFor: ["miami", "pool-spa"],
  },
  {
    id: "counter-current",
    name: "Nado Contracorriente",
    description: "Nada en el sitio con caudal regulable",
    price: 4500,
    availableFor: ["miami"],
  },
  {
    id: "handrail",
    name: "Barandilla Escalera Exterior",
    description: "Barandilla de seguridad para la escalera exterior",
    price: 800,
    availableFor: ["miami"],
  },
  {
    id: "extra-bench",
    name: "Banco Interior Extra",
    description: "Asiento adicional en el interior de la piscina",
    price: 1200,
    availableFor: ["pool-spa"],
  },
];

// ─── Pool Images ──────────────────────────────────────────────────────────────
export const poolImages = {
  miami: {
    chocolate: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011.png-wL5G8Ntb98TYCgn3ojmCJ5JurkO6v2.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2010_2.png-nn04GVxOn4scFGDeOPjnApJwAYgkJf.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011_2.png-QuUbsIaTWWzI0x22miRL2W942rHb7K.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012.png-vI8Hocpuz9Z5mTBX3bFk1c679VyfF7.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_3.png-zEY3OeG7lbUJ3dOfvgJdgrECldmXHl.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_3%201.png-yyDPRueASFlsWDaVcdbKuMmzYUW8YG.jpeg",
    ],
    "gris-carbon": [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_2%201.png-1YaeUu1dZSidXt5wMmXn1oZSFxAApA.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_2.png-i1kE0DkiaOwwQRYVErE9Ivp2WWJqNd.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_1.png-3VtWfwVuaWB3TxfeXDswr9py3grBAh.jpeg",
    ],
    vanilla: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011_1.png-60IkjosNKvav0MrK8UNgg38Dmf8hjX.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2010_1.png-2TStWvSgXPCoktQejVkBRLyCnKOo9j.jpeg",
    ],
    cafe: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011_1.png-60IkjosNKvav0MrK8UNgg38Dmf8hjX.jpeg",
    ],
  },
  "pool-spa": {
    vanilla: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2017.png-7pXpjTWHM3lq7lp0tyQOA0qWTfbwGt.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2013.png-wwQh1wZJ4OVciHFJVcLHbU7lCUIfdw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2014.png-M2aCCxKLk28AoYKj5LbvgqwqXWIXye.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012%281%29.png-h92Y6BpBDWk17fIpaW5cshruI6Siyq.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2016.png-tBbppDo9YNjvBFFQZthNp4FlF7gb6z.jpeg",
    ],
    chocolate: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    ],
    "gris-carbon": [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    ],
    cafe: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    ],
  },
};

export function getPoolImage(poolType: PoolType, exteriorId: string): string {
  const typeImages = poolImages[poolType] as Record<string, string[]>;
  const images = typeImages?.[exteriorId];
  return images?.[0] || poolImages.miami.chocolate[0];
}

export function getSizes(poolType: PoolType): PoolSize[] {
  return poolType === "miami" ? miamiSizes : poolSpaSizes;
}

export function calculateTotal(
  poolType: PoolType,
  sizeId: string,
  innerFinishId: string,
  exteriorFinishId: string,
  selectedExtras: string[]
): number {
  const sizes = getSizes(poolType);
  const size = sizes.find((s) => s.id === sizeId);
  const innerFinish = innerFinishes.find((f) => f.id === innerFinishId);
  const exteriorFinish =
    exteriorFinishes.find((f) => f.id === exteriorFinishId) ??
    innerFinishes.find((f) => f.id === exteriorFinishId);

  let total = size?.basePrice ?? 0;
  total += innerFinish?.price ?? 0;
  total += exteriorFinish?.price ?? 0;

  selectedExtras.forEach((extraId) => {
    const extra = extraOptions.find((e) => e.id === extraId);
    if (extra) total += extra.price;
  });

  return total;
}
