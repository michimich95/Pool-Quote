"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronRight, ArrowRight, Pencil } from "lucide-react";
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
    tagline: "Piscina elevada práctica y elegante",
    startingPrice: 19000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2011.png-wL5G8Ntb98TYCgn3ojmCJ5JurkO6v2.jpeg",
  },
  {
    id: "pool-spa" as PoolType,
    name: "Pool Spa",
    tagline: "Perfecta para espacios reducidos",
    startingPrice: 15000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Escena%2015.png-p6J7iWSHTyvLyCncQr8bm5TRuNxdez.jpeg",
  },
];

const STEPS = [
  { id: 1, title: "Tipo de Piscina",   subtitle: "Elige tu modelo" },
  { id: 2, title: "Dimensiones",       subtitle: "Selecciona el tamaño" },
  { id: 3, title: "Lámina Interior",   subtitle: "Revestimiento interior" },
  { id: 4, title: "Madera Exterior",   subtitle: "Revestimiento compuesto" },
  { id: 5, title: "Extras",            subtitle: "Opciones adicionales" },
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
  poolType, sizeId, innerFinishId, exteriorFinishId, selectedExtras,
  onPoolTypeChange, onSizeChange, onInnerFinishChange, onExteriorFinishChange,
  onExtraToggle, onRequestQuote,
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
      case 3: return innerFinish ? `${innerFinish.name} (${innerFinish.collection})` : null;
      case 4: return exteriorFinish?.name ?? null;
      case 5: return selectedExtras.length > 0 ? `${selectedExtras.length} extras` : "Sin extras";
      default: return null;
    }
  };

  const canProceed = (id: number) => {
    switch (id) {
      case 1: return !!poolType;
      case 2: return !!sizeId;
      case 3: return !!innerFinishId;
      case 4: return !!exteriorFinishId;
      case 5: return true;
      default: return false;
    }
  };

  const handleContinue = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  // Group inner finishes by collection
  const collections = ["Touch", "Vogue", "Relief", "Alive", "Kolos"];
  const byCollection = collections.map((col) => ({
    name: col,
    finishes: innerFinishes.filter((f) => f.collection === col),
  }));

  return (
    <>
      {/* Scrollable stepper */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-4">
          {STEPS.map((step, idx) => {
            const status =
              step.id < currentStep ? "completed"
              : step.id === currentStep ? "current"
              : "upcoming";
            const isLast = idx === STEPS.length - 1;

            return (
              <div key={step.id} className="flex gap-3">
                {/* ── Left rail: circle + connecting line ── */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <button
                    onClick={() => status === "completed" && setCurrentStep(step.id)}
                    disabled={status !== "completed"}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 font-bold text-sm",
                      status === "completed" && "bg-primary text-primary-foreground cursor-pointer hover:bg-primary/80",
                      status === "current"   && "bg-primary text-primary-foreground ring-4 ring-primary/25 shadow-md",
                      status === "upcoming"  && "border-2 border-border text-muted-foreground bg-background"
                    )}
                  >
                    {status === "completed"
                      ? <Check className="w-4 h-4" strokeWidth={3} />
                      : <span>{step.id}</span>
                    }
                  </button>

                  {!isLast && (
                    <div className={cn(
                      "w-0.5 flex-1 min-h-3 my-1 rounded-full transition-colors duration-300",
                      status === "completed" ? "bg-primary/40" : "bg-border"
                    )} />
                  )}
                </div>

                {/* ── Right: header + content ── */}
                <div className={cn("flex-1 min-w-0", !isLast && "pb-1")}>
                  {/* Step header */}
                  <div
                    className={cn(
                      "flex items-start justify-between gap-2 py-1 min-h-[2rem]",
                      status === "completed" && "cursor-pointer group"
                    )}
                    onClick={() => status === "completed" && setCurrentStep(step.id)}
                  >
                    <div className="min-w-0">
                      <p className={cn(
                        "font-semibold leading-tight transition-colors",
                        status === "current"   && "text-foreground text-base",
                        status === "completed" && "text-foreground text-sm group-hover:text-primary",
                        status === "upcoming"  && "text-muted-foreground text-sm"
                      )}>
                        {step.title}
                      </p>

                      {/* Completed: show selection badge */}
                      {status === "completed" && stepSummary(step.id) && (
                        <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {stepSummary(step.id)}
                        </span>
                      )}

                      {/* Current: show subtitle */}
                      {status === "current" && (
                        <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                      )}

                      {/* Upcoming: show subtitle dimmed */}
                      {status === "upcoming" && (
                        <p className="text-xs text-muted-foreground/50 mt-0.5">{step.subtitle}</p>
                      )}
                    </div>

                    {status === "completed" && (
                      <Pencil className="w-3 h-3 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
                    )}
                  </div>

                  {/* Step content — current only */}
                  {status === "current" && (
                    <div className="mt-3 mb-4 space-y-4">

                      {/* ── Step 1: Pool Type ── */}
                      {step.id === 1 && (
                        <div className="grid grid-cols-2 gap-2">
                          {poolTypeCards.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => onPoolTypeChange(type.id)}
                              className={cn(
                                "relative overflow-hidden rounded-xl border-2 text-left transition-all duration-200",
                                poolType === type.id
                                  ? "border-primary ring-2 ring-primary/20"
                                  : "border-border hover:border-primary/40"
                              )}
                            >
                              <div className="aspect-[4/3] relative">
                                <Image src={type.image} alt={type.name} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                                {poolType === type.id && (
                                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                  </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <p className="text-white text-sm font-bold leading-tight">{type.name}</p>
                                  <p className="text-white/60 text-xs mt-0.5">{type.tagline}</p>
                                  <p className="text-white/80 text-xs font-semibold mt-1">
                                    desde ${type.startingPrice.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* ── Step 2: Size ── */}
                      {step.id === 2 && (
                        <div className="grid grid-cols-2 gap-2">
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
                              <div className="flex items-start justify-between gap-1 mb-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  {s.name}
                                </span>
                                {sizeId === s.id && (
                                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                                )}
                              </div>
                              <p className="text-lg font-bold text-primary leading-none">
                                ${s.basePrice.toLocaleString()}
                              </p>
                              <p className="text-xs text-foreground font-medium mt-1.5">
                                {s.lengthFt} × {s.widthFt} × {s.heightFt}
                              </p>
                              <div className="mt-2 pt-2 border-t border-border/60 grid grid-cols-2 gap-x-2 gap-y-0.5">
                                <span className="text-[10px] text-muted-foreground">Volumen</span>
                                <span className="text-[10px] text-muted-foreground text-right">{s.volumeLiters.toLocaleString()}L</span>
                                <span className="text-[10px] text-muted-foreground">Peso</span>
                                <span className="text-[10px] text-muted-foreground text-right">~{s.weightKg.toLocaleString()}kg</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* ── Step 3: Interior Finish ── */}
                      {step.id === 3 && (
                        <div className="space-y-4">
                          {byCollection.map(({ name: col, finishes }) => (
                            <div key={col}>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                {col}
                              </p>
                              <div className="flex flex-wrap gap-2.5">
                                {finishes.map((f) => (
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
                          ))}
                        </div>
                      )}

                      {/* ── Step 4: Exterior Wood ── */}
                      {step.id === 4 && (
                        <div className="flex gap-3 flex-wrap">
                          {exteriorFinishes.map((f) => (
                            <ExteriorSwatch
                              key={f.id}
                              name={f.name}
                              color={f.color}
                              selected={exteriorFinishId === f.id}
                              onSelect={() => onExteriorFinishChange(f.id)}
                            />
                          ))}
                        </div>
                      )}

                      {/* ── Step 5: Extras ── */}
                      {step.id === 5 && (
                        <div className="space-y-2">
                          {availableExtras.length === 0 ? (
                            <p className="text-xs text-muted-foreground">Selecciona un tipo de piscina primero</p>
                          ) : (
                            availableExtras.map((extra) => {
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
                                  <div className={cn(
                                    "w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all",
                                    active ? "bg-primary border-primary" : "border-muted-foreground/30"
                                  )}>
                                    {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold leading-tight">{extra.name}</p>
                                    <p className="text-xs text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                                      {extra.description}
                                    </p>
                                  </div>
                                  <span className="text-sm font-bold text-primary flex-shrink-0">
                                    +${extra.price.toLocaleString()}
                                  </span>
                                </button>
                              );
                            })
                          )}
                        </div>
                      )}

                      {/* Continue button */}
                      <Button
                        size="sm"
                        className="w-full gap-1.5 mt-1"
                        disabled={!canProceed(step.id)}
                        onClick={handleContinue}
                      >
                        {step.id === 5 ? "Review" : "Next"}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pinned quote + CTA ── */}
      <div className="border-t border-border p-5 bg-card/90 backdrop-blur-sm flex-shrink-0 space-y-4">
        {/* Mini price breakdown */}
        {canRequest && (
          <div className="space-y-1">
            {size && (
              <QuoteLine
                label={`${poolType === "miami" ? "Miami" : "Pool Spa"} ${size.name}`}
                value={`$${size.basePrice.toLocaleString()}`}
              />
            )}
            {innerFinish && innerFinish.price > 0 && (
              <QuoteLine label={`Lámina ${innerFinish.name}`} value={`+$${innerFinish.price.toLocaleString()}`} />
            )}
            {selectedExtras.map((id) => {
              const e = extraOptions.find((x) => x.id === id);
              return e ? <QuoteLine key={id} label={e.name} value={`+$${e.price.toLocaleString()}`} /> : null;
            })}
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Estimated total</p>
            <p className={cn(
              "font-bold leading-none transition-all",
              quoteTotal > 0 ? "text-2xl text-primary" : "text-xl text-muted-foreground"
            )}>
              {quoteTotal > 0 ? `$${quoteTotal.toLocaleString()}` : "—"}
            </p>
          </div>
          <Button
            onClick={onRequestQuote}
            disabled={!canRequest}
            size="lg"
            className="gap-2 flex-shrink-0"
          >
            Request Quote
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {!canRequest && (
          <p className="text-xs text-muted-foreground/70">
            Complete all steps to request a quote
          </p>
        )}
      </div>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FinishDot({
  name, color, price, selected, onSelect,
}: {
  name: string; color: string; price: number; selected: boolean; onSelect: () => void;
}) {
  const isLight = ["#ede9e3", "#e2d8c8", "#f0eeec", "#eeeef0", "#c0bfba", "#c8b898", "#c4bba8"].includes(color);
  return (
    <button onClick={onSelect} title={price > 0 ? `${name} +$${price}` : name}
      className="group flex flex-col items-center gap-1 w-10"
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full transition-all duration-200 relative flex items-center justify-center flex-shrink-0",
          selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 shadow-md"
                   : "hover:scale-110 hover:shadow-sm",
          isLight && "border border-border/40"
        )}
        style={{ backgroundColor: color }}
      >
        {selected && (
          <div className="w-5 h-5 rounded-full bg-primary/90 flex items-center justify-center shadow">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      <span className={cn(
        "text-[9px] leading-tight text-center transition-colors line-clamp-1 w-full",
        selected ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {name}
      </span>
    </button>
  );
}

function ExteriorSwatch({
  name, color, selected, onSelect,
}: {
  name: string; color: string; selected: boolean; onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="group flex flex-col items-center gap-1.5 w-[68px]">
      <div
        className={cn(
          "w-[68px] h-12 rounded-xl overflow-hidden relative transition-all duration-200",
          selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-md"
                   : "hover:scale-105 hover:shadow-sm"
        )}
        style={{ backgroundColor: color }}
      >
        {/* Wood grain */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,0.10) 3px,rgba(0,0,0,0.10) 4px)",
        }} />
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/15">
            <div className="w-6 h-6 rounded-full bg-primary shadow flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>
      <span className={cn(
        "text-[10px] leading-tight text-center transition-colors",
        selected ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {name}
      </span>
    </button>
  );
}

function QuoteLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span className="truncate mr-4">{label}</span>
      <span className="font-medium text-foreground flex-shrink-0">{value}</span>
    </div>
  );
}
