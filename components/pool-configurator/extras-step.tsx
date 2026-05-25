"use client";

import { cn } from "@/lib/utils";
import { extraOptions, type PoolType, type ExtraOption } from "@/lib/pool-data";

interface ExtrasStepProps {
  poolType: PoolType;
  selectedExtras: string[];
  onToggle: (extraId: string) => void;
}

export function ExtrasStep({ poolType, selectedExtras, onToggle }: ExtrasStepProps) {
  const availableExtras = extraOptions.filter((extra) =>
    extra.availableFor.includes(poolType)
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Extras</h2>
        <p className="text-muted-foreground text-lg">
          Enhance your pool with premium add-ons
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid gap-4">
          {availableExtras.map((extra) => (
            <ExtraCard
              key={extra.id}
              extra={extra}
              isSelected={selectedExtras.includes(extra.id)}
              onToggle={() => onToggle(extra.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExtraCard({
  extra,
  isSelected,
  onToggle,
}: {
  extra: ExtraOption;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left w-full",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 bg-card"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
          isSelected
            ? "bg-primary border-primary"
            : "border-muted-foreground/30"
        )}
      >
        {isSelected && (
          <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg">{extra.name}</h3>
        <p className="text-muted-foreground text-sm">{extra.description}</p>
      </div>

      <div className="flex-shrink-0 text-right">
        <span className="text-xl font-bold text-primary">
          +${extra.price.toLocaleString()}
        </span>
      </div>
    </button>
  );
}
