"use client";

import { cn } from "@/lib/utils";
import { innerFinishes, type FinishOption } from "@/lib/pool-data";

interface InnerFinishStepProps {
  selectedFinish: string | null;
  onSelect: (finishId: string) => void;
}

export function InnerFinishStep({ selectedFinish, onSelect }: InnerFinishStepProps) {
  const colorFinishes = innerFinishes.filter((f) => f.category === "color");
  const mosaicFinishes = innerFinishes.filter((f) => f.category === "mosaic");

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Inner Finish</h2>
        <p className="text-muted-foreground text-lg">
          Select the interior reinforced laminate finish
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Solid Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            Solid Colors
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {colorFinishes.map((finish) => (
              <FinishSwatch
                key={finish.id}
                finish={finish}
                isSelected={selectedFinish === finish.id}
                onSelect={() => onSelect(finish.id)}
              />
            ))}
          </div>
        </div>

        {/* Mosaics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            Mosaics
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {mosaicFinishes.map((finish) => (
              <FinishSwatch
                key={finish.id}
                finish={finish}
                isSelected={selectedFinish === finish.id}
                onSelect={() => onSelect(finish.id)}
                isMosaic
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinishSwatch({
  finish,
  isSelected,
  onSelect,
  isMosaic = false,
}: {
  finish: FinishOption;
  isSelected: boolean;
  onSelect: () => void;
  isMosaic?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-2 group"
      )}
    >
      <div
        className={cn(
          "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300",
          isSelected
            ? "ring-4 ring-primary ring-offset-2 ring-offset-background scale-110"
            : "hover:scale-105"
        )}
        style={{
          backgroundColor: finish.color,
          backgroundImage: isMosaic
            ? `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`
            : undefined,
        }}
      >
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
        {finish.color === "#1a1a1a" && !isSelected && (
          <div className="absolute inset-0 rounded-full border border-border" />
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
