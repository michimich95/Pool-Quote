"use client";

import { cn } from "@/lib/utils";
import type { PoolType, PoolSize } from "@/lib/pool-data";
import { getSizes } from "@/lib/pool-data";

interface PoolSizeStepProps {
  poolType: PoolType;
  selectedSize: string | null;
  onSelect: (sizeId: string) => void;
}

export function PoolSizeStep({ poolType, selectedSize, onSelect }: PoolSizeStepProps) {
  const sizes = getSizes(poolType);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Select Size</h2>
        <p className="text-muted-foreground text-lg">
          Choose the dimensions that best fit your space
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {sizes.map((size) => (
          <SizeCard
            key={size.id}
            size={size}
            isSelected={selectedSize === size.id}
            onSelect={() => onSelect(size.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SizeCard({
  size,
  isSelected,
  onSelect,
}: {
  size: PoolSize;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group",
        isSelected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border hover:border-primary/50 bg-card"
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">{size.name}</h3>
          <p className="text-2xl font-bold text-primary mt-1">
            ${size.basePrice.toLocaleString()}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Length</span>
            <span className="font-medium">{size.lengthFt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Width</span>
            <span className="font-medium">{size.widthFt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height</span>
            <span className="font-medium">{size.heightFt}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Volume</span>
            <span className="font-medium">{size.volumeLiters.toLocaleString()}L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight (full)</span>
            <span className="font-medium">~{size.weightKg.toLocaleString()}kg</span>
          </div>
        </div>
      </div>
    </button>
  );
}
