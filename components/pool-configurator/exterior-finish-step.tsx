"use client";

import { cn } from "@/lib/utils";
import { exteriorFinishes, type ExteriorFinish } from "@/lib/pool-data";

interface ExteriorFinishStepProps {
  selectedFinish: string | null;
  onSelect: (finishId: string) => void;
}

export function ExteriorFinishStep({ selectedFinish, onSelect }: ExteriorFinishStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Exterior Finish</h2>
        <p className="text-muted-foreground text-lg">
          Choose the composite wood cladding color
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {exteriorFinishes.map((finish) => (
            <ExteriorSwatch
              key={finish.id}
              finish={finish}
              isSelected={selectedFinish === finish.id}
              onSelect={() => onSelect(finish.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExteriorSwatch({
  finish,
  isSelected,
  onSelect,
}: {
  finish: ExteriorFinish;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-3 group"
      )}
    >
      <div
        className={cn(
          "relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl transition-all duration-300 overflow-hidden",
          isSelected
            ? "ring-4 ring-primary ring-offset-2 ring-offset-background scale-105"
            : "hover:scale-105"
        )}
        style={{
          backgroundColor: finish.color,
        }}
      >
        {/* Wood grain texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.15) 3px,
              rgba(0,0,0,0.15) 4px
            )`,
          }}
        />

        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="text-center">
        <span className={cn(
          "text-sm font-medium transition-colors",
          isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}>
          {finish.name}
        </span>
        {finish.price > 0 && (
          <span className="block text-xs text-primary">+${finish.price}</span>
        )}
      </div>
    </button>
  );
}
