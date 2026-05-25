// Pool Types and Data based on the Benigni Pools catalog

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
  category: "color" | "mosaic";
  color: string;
  price: number;
}

export interface ExteriorFinish {
  id: string;
  name: string;
  color: string;
  image?: string;
  price: number;
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: number;
  availableFor: PoolType[];
}

// Miami Model Sizes
export const miamiSizes: PoolSize[] = [
  {
    id: "miami-1",
    name: "Model 1",
    lengthFt: "13'",
    widthFt: "8'",
    heightFt: "4'",
    waterHeightFt: "3'7\"",
    volumeLiters: 11780,
    weightKg: 12100,
    basePrice: 19000,
  },
  {
    id: "miami-2",
    name: "Model 2",
    lengthFt: "19' 5\"",
    widthFt: "8'",
    heightFt: "4'",
    waterHeightFt: "3'7\"",
    volumeLiters: 17590,
    weightKg: 17630,
    basePrice: 25000,
  },
];

// Pool Spa Model Sizes
export const poolSpaSizes: PoolSize[] = [
  {
    id: "spa-1",
    name: "Model 1",
    lengthFt: "7' 11\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2'5\"",
    volumeLiters: 3583,
    weightKg: 4300,
    basePrice: 15000,
  },
  {
    id: "spa-2",
    name: "Model 2",
    lengthFt: "9' 11\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2'5\"",
    volumeLiters: 4489,
    weightKg: 5300,
    basePrice: 17500,
  },
  {
    id: "spa-3",
    name: "Model 3",
    lengthFt: "13' 2\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2'5\"",
    volumeLiters: 5960,
    weightKg: 6900,
    basePrice: 20000,
  },
  {
    id: "spa-4",
    name: "Model 4",
    lengthFt: "16' 5\"",
    widthFt: "7'",
    heightFt: "2' 8\"",
    waterHeightFt: "2'5\"",
    volumeLiters: 7431,
    weightKg: 8500,
    basePrice: 23000,
  },
];

// Inner Finish - Reinforced Laminate Options
export const innerFinishes: FinishOption[] = [
  { id: "pearl", name: "Pearl", category: "color", color: "#F5F5F0", price: 0 },
  { id: "platinum", name: "Platinum", category: "color", color: "#E8E8E8", price: 0 },
  { id: "turquoise", name: "Turquoise", category: "color", color: "#40E0D0", price: 500 },
  { id: "jade", name: "Jade", category: "color", color: "#00A86B", price: 500 },
  { id: "peach", name: "Peach", category: "color", color: "#FFCBA4", price: 500 },
  { id: "sable", name: "Sable", category: "color", color: "#8B7355", price: 500 },
  { id: "grey-mosaic", name: "Grey", category: "mosaic", color: "#808080", price: 1200 },
  { id: "caribbean-sands", name: "Caribbean Sands", category: "mosaic", color: "#F5DEB3", price: 1200 },
  { id: "white-mosaic", name: "White", category: "mosaic", color: "#FFFFFF", price: 1200 },
  { id: "beige-mosaic", name: "Beige", category: "mosaic", color: "#F5F5DC", price: 1200 },
  { id: "black-mosaic", name: "Black", category: "mosaic", color: "#1a1a1a", price: 1500 },
];

// Exterior Finish - Composite Wood Options
export const exteriorFinishes: ExteriorFinish[] = [
  { id: "terracotta", name: "Terracotta", color: "#9B7B6B", price: 0 },
  { id: "grey", name: "Grey", color: "#6B7B8B", price: 0 },
  { id: "light-grey", name: "Light Grey", color: "#B0B0B0", price: 0 },
  { id: "white", name: "White", color: "#E8E8E8", price: 500 },
];

// Extra Options
export const extraOptions: ExtraOption[] = [
  {
    id: "bubbles",
    name: "Bubble System",
    description: "Relaxing air bubble jets for spa experience",
    price: 2500,
    availableFor: ["miami", "pool-spa"],
  },
  {
    id: "salt-chlorinator",
    name: "Salt Chlorinator Kit",
    description: "Automatic salt-based water treatment system",
    price: 1800,
    availableFor: ["miami", "pool-spa"],
  },
  {
    id: "counter-current",
    name: "Counter-Current System",
    description: "Swim in place with adjustable water flow",
    price: 4500,
    availableFor: ["miami"],
  },
  {
    id: "handrail",
    name: "Exterior Stair Handrail",
    description: "Safety handrail for exterior stairs",
    price: 800,
    availableFor: ["miami"],
  },
  {
    id: "extra-bench",
    name: "Extra Interior Bench",
    description: "Additional seating inside the pool",
    price: 1200,
    availableFor: ["pool-spa"],
  },
  {
    id: "composite-exterior",
    name: "Composite Wood Exterior",
    description: "Premium composite wood cladding",
    price: 3500,
    availableFor: ["miami", "pool-spa"],
  },
];

// Pool Images mapping
export const poolImages = {
  miami: {
    terracotta: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011.png-wL5G8Ntb98TYCgn3ojmCJ5JurkO6v2.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2010_2.png-nn04GVxOn4scFGDeOPjnApJwAYgkJf.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011_2.png-QuUbsIaTWWzI0x22miRL2W942rHb7K.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012.png-vI8Hocpuz9Z5mTBX3bFk1c679VyfF7.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_3.png-zEY3OeG7lbUJ3dOfvgJdgrECldmXHl.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_3%201.png-yyDPRueASFlsWDaVcdbKuMmzYUW8YG.jpeg",
    ],
    grey: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_2%201.png-1YaeUu1dZSidXt5wMmXn1oZSFxAApA.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_2.png-i1kE0DkiaOwwQRYVErE9Ivp2WWJqNd.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012_1.png-3VtWfwVuaWB3TxfeXDswr9py3grBAh.jpeg",
    ],
    "light-grey": [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011_1.png-60IkjosNKvav0MrK8UNgg38Dmf8hjX.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2010_1.png-2TStWvSgXPCoktQejVkBRLyCnKOo9j.jpeg",
    ],
    white: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011_1.png-60IkjosNKvav0MrK8UNgg38Dmf8hjX.jpeg",
    ],
  },
  "pool-spa": {
    white: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2017.png-7pXpjTWHM3lq7lp0tyQOA0qWTfbwGt.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2013.png-wwQh1wZJ4OVciHFJVcLHbU7lCUIfdw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2014.png-M2aCCxKLk28AoYKj5LbvgqwqXWIXye.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2012%281%29.png-h92Y6BpBDWk17fIpaW5cshruI6Siyq.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2016.png-tBbppDo9YNjvBFFQZthNp4FlF7gb6z.jpeg",
    ],
    terracotta: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    ],
    grey: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    ],
    "light-grey": [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    ],
  },
};

export function getPoolImage(poolType: PoolType, exteriorId: string): string {
  const images = poolImages[poolType]?.[exteriorId as keyof typeof poolImages[typeof poolType]];
  return images?.[0] || poolImages[poolType]?.["terracotta"]?.[0] || poolImages.miami.terracotta[0];
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
  const exteriorFinish = exteriorFinishes.find((f) => f.id === exteriorFinishId);

  let total = size?.basePrice || 0;
  total += innerFinish?.price || 0;
  total += exteriorFinish?.price || 0;

  selectedExtras.forEach((extraId) => {
    const extra = extraOptions.find((e) => e.id === extraId);
    if (extra) {
      total += extra.price;
    }
  });

  return total;
}
