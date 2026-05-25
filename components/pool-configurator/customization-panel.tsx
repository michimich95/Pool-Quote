"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  type PoolType,
  getSizes,
  innerFinishes,
  exteriorFinishes,
  extraOptions,
  calculateTotal,
} from "@/lib/pool-data";

const poolTypeCards = [
  {
    id: "miami" as PoolType,
    name: "Miami",
    startingPrice: 19000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011.png-wL5G8Ntb98TYCgn3ojmCJ5JurkO6v2.jpeg",
  },
  {
    id: "pool-spa" as PoolType,
    name: "Pool Spa",
    startingPrice: 15000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
  },
];

const STEPS = [
  { id: 1, title: "Pool Type" },
  { id: 2, title: "Model" },
  { id: 3, title: "Interior Finish" },
  { id: 4, title: "Exterior Finish" },
  { id: 5, title: "Extras" },
];

interface CustomizationPanelProps {
  poolType: PoolType | null;
  sizeId: string | null;
  innerFinishId: string | null;
  exteriorFinishId: string | null;
  selectedExtras: string[];
  onPoolTypeChange: (t: PoolType) => void;
  onSizeChange: (id: string) => void;
  onInnerFinishChange: (id: string) => void;
  onExteriorFinishChange: (id: string) => void;
  onExtraToggle: (id: string) => void;
  onRequestQuote: () => void;
}

export function CustomizationPanel({
  poolType,
  sizeId,
  innerFinishId,
  exteriorFinishId,
  selectedExtras,
  onPoolTypeChange,
  onSizeChange,
  onInnerFinishChange,
  onExteriorFinishChange,
  onExtraToggle,
  onRequestQuote,
}: CustomizationPanelProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const sizes = poolType ? getSizes(poolType) : [];
  const size = sizes.find((s) => s.id === sizeId);
  const innerFinish = innerFinishes.find((f) => f.id === innerFinishId);
  const exteriorFinish = exteriorFinishes.find((f) => f.id === exteriorFinishId);
  const availableExtras = poolType
    ? extraOptions.filter((e) => e.availableFor.includes(poolType))
    : [];

  const quoteTotal =
    poolType && sizeId && innerFinishId && exteriorFinishId
      ? calculateTotal(poolType, sizeId, innerFinishId, exteriorFinishId, selectedExtras)
      : 0;

  const canRequest = !!(poolType && sizeId && innerFinishId && exteriorFinishId);

  const stepSummary = (id: number): string | null => {
    switch (id) {
      case 1: return poolType ? (poolType === "miami" ? "Miami" : "Pool Spa") : null;
      case 2: return size ? `${size.name} · ${size.lengthFt} × ${size.widthFt}` : null;
      case 3: return innerFinish?.name ?? null;
      case 4: return exteriorFinish?.name ?? null;
      case 5:
        return selectedExtras.length > 0
          ? `${selectedExtras.length} add-on${selectedExtras.length > 1 ? "s" : ""}`
          : currentStep > 5 ? "None" : null;
      default: return null;
    }
  };

  const canProceed = (id: number): boolean => {
    switch (id) {
      case 1: return !!poolType;
      case 2: return !!sizeId;
      case 3: return !!innerFinishId;
      case 4: return !!exteriorFinishId;
      case 5: return true;
      default: return false;
    }
  };

  const handleStepClick = (id: number) => {
    if (id < currentStep) setCurrentStep(id);
  };

  const handleContinue = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const colorFinishes = innerFinishes.filter((f) => f.category === "color");
  const mosaicFinishes = innerFinishes.filter((f) => f.category === "mosaic");

  return (
    <>
      {/* Scrollable stepper */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-1">
          {STEPS.map((step) => {
            const status =
              step.id < currentStep ? "completed"
              : step.id === currentStep ? "current"
              : "upcoming";
            const summary = stepSummary(step.id);

            return (
              <div key={step.id} className="rounded-xl overflow-hidden">
                {/* Step header */}
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={status === "upcoming"}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    status === "current" && "bg-muted/60",
                    status === "completed" && "hover:bg-muted/40 cursor-pointer",
                    status === "upcoming" && "cursor-default"
                  )}
                >
                  {/* Step circle */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all",
                      status === "completed" && "bg-primary text-primary-foreground",
                      status === "current" && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      status === "upcoming" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {status === "completed" ? (
                      <Check className="w-4 h-4" strokeWidth={3} />
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Title + summary */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold leading-tight",
                        status === "upcoming" && "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    {summary && status === "completed" && (
                      <p className="text-xs text-primary mt-0.5">{summary}</p>
                    )}
                  </div>

                  {/* Edit hint */}
                  {status === "completed" && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Step content — only when current */}
                {status === "current" && (
                  <div className="px-4 pb-4 space-y-4 bg-muted/60">
                    {/* --- Step 1: Pool Type --- */}
                    {step.id === 1 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {poolTypeCards.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => onPoolTypeChange(type.id)}
                            className={cn(
                              "relative overflow-hidden rounded-xl border-2 transition-all duration-200",
                              poolType === type.id
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-border hover:border-primary/40"
                            )}
                          >
                            <div className="aspect-[4/3] relative">
                              <Image
                                src={type.image}
                                alt={type.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                              {poolType === type.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                                <p className="text-white text-sm font-bold leading-tight">{type.name}</p>
                                <p className="text-white/65 text-xs">from ${type.startingPrice.toLocaleString()}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* --- Step 2: Model --- */}
                    {step.id === 2 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {sizes.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => onSizeChange(s.id)}
                            className={cn(
                              "p-3 rounded-xl border-2 text-left transition-all duration-200",
                              sizeId === s.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/40 bg-card"
                            )}
                          >
                            <p className="text-xs text-muted-foreground">{s.name}</p>
                            <p className="text-base font-bold text-primary leading-tight">
                              ${s.basePrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {s.lengthFt} × {s.widthFt}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* --- Step 3: Interior Finish --- */}
                    {step.id === 3 && (
                      <div className="space-y-3 pt-1">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                            Solid Colors
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {colorFinishes.map((f) => (
                              <FinishDot
                                key={f.id}
                                name={f.name}
                                color={f.color}
                                price={f.price}
                                selected={innerFinishId === f.id}
                                onSelect={() => onInnerFinishChange(f.id)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                            Mosaics
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {mosaicFinishes.map((f) => (
                              <FinishDot
                                key={f.id}
                                name={f.name}
                                color={f.color}
                                price={f.price}
                                selected={innerFinishId === f.id}
                                onSelect={() => onInnerFinishChange(f.id)}
                                isMosaic
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- Step 4: Exterior Finish --- */}
                    {step.id === 4 && (
                      <div className="flex gap-3 flex-wrap pt-1">
                        {exteriorFinishes.map((f) => (
                          <ExteriorSwatch
                            key={f.id}
                            name={f.name}
                            color={f.color}
                            price={f.price}
                            selected={exteriorFinishId === f.id}
                            onSelect={() => onExteriorFinishChange(f.id)}
                          />
                        ))}
                      </div>
                    )}

                    {/* --- Step 5: Extras --- */}
                    {step.id === 5 && (
                      <div className="space-y-2 pt-1">
                        {availableExtras.map((extra) => {
                          const active = selectedExtras.includes(extra.id);
                          return (
                            <button
                              key={extra.id}
                              onClick={() => onExtraToggle(extra.id)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border-2 w-full text-left transition-all duration-200",
                                active
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/40 bg-card"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center",
                                  active ? "bg-primary border-primary" : "border-muted-foreground/30"
                                )}
                              >
                                {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium leading-tight">{extra.name}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{extra.description}</p>
                              </div>
                              <span className="text-sm font-semibold text-primary flex-shrink-0">
                                +${extra.price.toLocaleString()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Continue button */}
                    <Button
                      size="sm"
                      className="w-full gap-1.5"
                      disabled={!canProceed(step.id)}
                      onClick={handleContinue}
                    >
                      {step.id === 5 ? "Review Quote" : "Continue"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pinned quote + CTA */}
      <div className="border-t border-border p-5 space-y-3 bg-card/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Estimated total</p>
            <p className="text-2xl font-bold text-primary">
              {quoteTotal > 0 ? `$${quoteTotal.toLocaleString()}` : "—"}
            </p>
          </div>
          <Button
            onClick={onRequestQuote}
            disabled={!canRequest}
            size="lg"
            className="gap-2"
          >
            Request Quote
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        {!canRequest && (
          <p className="text-xs text-muted-foreground">Complete all steps to request a quote</p>
        )}
      </div>
    </>
  );
}

function FinishDot({
  name, color, price, selected, onSelect, isMosaic = false,
}: {
  name: string; color: string; price: number;
  selected: boolean; onSelect: () => void; isMosaic?: boolean;
}) {
  return (
    <button onClick={onSelect} className="group flex flex-col items-center gap-1 w-9">
      <div
        className={cn(
          "w-9 h-9 rounded-full transition-all duration-200 relative flex items-center justify-center",
          selected
            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
            : "hover:scale-110",
          (color === "#FFFFFF" || color === "#F5F5F0" || color === "#E8E8E8" || color === "#F5DEB3" || color === "#F5F5DC")
            ? "border border-border/50" : ""
        )}
        style={{
          backgroundColor: color,
          backgroundImage: isMosaic
            ? "repeating-linear-gradient(45deg,transparent,transparent 2px,rgba(255,255,255,0.12) 2px,rgba(255,255,255,0.12) 4px)"
            : undefined,
        }}
      >
        {selected && (
          <div className="w-5 h-5 rounded-full bg-primary/90 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      <span className="text-[9px] text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center">
        {name}
        {price > 0 && <span className="block text-primary">+${price}</span>}
      </span>
    </button>
  );
}

function ExteriorSwatch({
  name, color, price, selected, onSelect,
}: {
  name: string; color: string; price: number; selected: boolean; onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="group flex flex-col items-center gap-1.5 w-14">
      <div
        className={cn(
          "w-14 h-10 rounded-lg overflow-hidden relative transition-all duration-200",
          selected
            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
            : "hover:scale-105"
        )}
        style={{ backgroundColor: color }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)",
          }}
        />
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>
      <span className="text-[9px] text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
        {name}
        {price > 0 && <span className="block text-primary">+${price}</span>}
      </span>
    </button>
  );
}
