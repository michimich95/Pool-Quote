"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PoolType } from "@/lib/pool-data";

interface PoolTypeStepProps {
  selectedType: PoolType | null;
  onSelect: (type: PoolType) => void;
}

const poolTypes = [
  {
    id: "miami" as PoolType,
    name: "Miami",
    description: "Our most practical elevated pool. Elegant, high-quality, and ready to enjoy without construction or permits.",
    features: ["Interior stairs", "Built-in bench", "Filtration system", "LED lights", "Heating ready"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011.png-wL5G8Ntb98TYCgn3ojmCJ5JurkO6v2.jpeg",
    startingPrice: 19000,
  },
  {
    id: "pool-spa" as PoolType,
    name: "Pool Spa",
    description: "The most desired pool for smaller spaces with all the functionality. Combines relaxation with heating technology.",
    features: ["Exterior step", "Cushioned lounger", "Bubble system", "Integrated heating", "Padded mat"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
    startingPrice: 15000,
  },
];

export function PoolTypeStep({ selectedType, onSelect }: PoolTypeStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Choose Your Pool</h2>
        <p className="text-muted-foreground text-lg">Select the perfect model for your space</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {poolTypes.map((pool) => (
          <button
            key={pool.id}
            onClick={() => onSelect(pool.id)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left",
              selectedType === pool.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={pool.image}
                alt={pool.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {selectedType === pool.id && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{pool.name}</h3>
                <span className="text-muted-foreground">
                  from <span className="text-xl font-semibold text-foreground">${pool.startingPrice.toLocaleString()}</span>
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">{pool.description}</p>

              <ul className="grid grid-cols-2 gap-2">
                {pool.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
