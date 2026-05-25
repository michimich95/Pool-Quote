"use client";

import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
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
  const sizes = poolType ? getSizes(poolType) : [];
  const availableExtras = poolType
    ? extraOptions.filter((e) => e.availableFor.includes(poolType))
    : [];

  const size = sizes.find((s) => s.id === sizeId);
  const innerFinish = innerFinishes.find((f) => f.id === innerFinishId);
  const exteriorFinish = exteriorFinishes.find((f) => f.id === exteriorFinishId);

  const quoteTotal =
    poolType && sizeId && innerFinishId && exteriorFinishId
      ? calculateTotal(poolType, sizeId, innerFinishId, exteriorFinishId, selectedExtras)
      : 0;

  const canRequest = !!(poolType && sizeId && innerFinishId && exteriorFinishId);

  const colorFinishes = innerFinishes.filter((f) => f.category === "color");
  const mosaicFinishes = innerFinishes.filter((f) => f.category === "mosaic");

  return (
    <>
      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-6">

          {/* Pool Type */}
          <Section title="Pool Type">
            <div className="grid grid-cols-2 gap-2">
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
                    <Image src={type.image} alt={type.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    {poolType === type.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="text-white text-sm font-bold leading-tight">{type.name}</p>
                      <p className="text-white/65 text-xs">
                        from ${type.startingPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* Model / Size */}
          <Section title="Model" dimmed={!poolType}>
            {poolType ? (
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
            ) : (
              <p className="text-xs text-muted-foreground">Select a pool type first</p>
            )}
          </Section>

          {/* Inner Finish */}
          <Section title="Interior Finish">
            <div className="space-y-3">
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
          </Section>

          {/* Exterior Finish */}
          <Section title="Exterior Finish">
            <div className="flex gap-3 flex-wrap">
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
          </Section>

          {/* Extras */}
          <Section title="Extras" dimmed={!poolType}>
            {poolType ? (
              <div className="space-y-2">
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
                          "w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all",
                          active ? "bg-primary border-primary" : "border-muted-foreground/30"
                        )}
                      >
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">{extra.name}</p>
                        <p className="text-xs text-muted-foreground leading-tight line-clamp-1">
                          {extra.description}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary flex-shrink-0">
                        +${extra.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Select a pool type first</p>
            )}
          </Section>
        </div>
      </div>

      {/* Pinned quote + CTA */}
      <div className="border-t border-border p-5 space-y-3 bg-card/80 backdrop-blur-sm flex-shrink-0">
        {canRequest ? (
          <div className="space-y-1 text-sm">
            {size && (
              <QuoteLine
                label={`${poolType === "miami" ? "Miami" : "Pool Spa"} ${size.name}`}
                value={`$${size.basePrice.toLocaleString()}`}
              />
            )}
            {innerFinish && innerFinish.price > 0 && (
              <QuoteLine label={`Interior: ${innerFinish.name}`} value={`+$${innerFinish.price.toLocaleString()}`} />
            )}
            {exteriorFinish && exteriorFinish.price > 0 && (
              <QuoteLine label={`Exterior: ${exteriorFinish.name}`} value={`+$${exteriorFinish.price.toLocaleString()}`} />
            )}
            {selectedExtras.map((id) => {
              const e = extraOptions.find((x) => x.id === id);
              return e ? <QuoteLine key={id} label={e.name} value={`+$${e.price.toLocaleString()}`} /> : null;
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Complete your configuration to see the total
          </p>
        )}

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
      </div>
    </>
  );
}

function Section({
  title,
  children,
  dimmed = false,
}: {
  title: string;
  children: React.ReactNode;
  dimmed?: boolean;
}) {
  return (
    <div className={cn("space-y-2.5 transition-opacity duration-200", dimmed && "opacity-40")}>
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FinishDot({
  name,
  color,
  price,
  selected,
  onSelect,
  isMosaic = false,
}: {
  name: string;
  color: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
  isMosaic?: boolean;
}) {
  return (
    <button onClick={onSelect} className="group flex flex-col items-center gap-1 w-9">
      <div
        className={cn(
          "w-9 h-9 rounded-full transition-all duration-200 relative flex items-center justify-center",
          selected
            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
            : "hover:scale-110",
          color === "#FFFFFF" || color === "#E8E8E8" || color === "#F5F5F0" || color === "#E8E8E8"
            ? "border border-border"
            : ""
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
  name,
  color,
  price,
  selected,
  onSelect,
}: {
  name: string;
  color: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
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

function QuoteLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span className="truncate mr-4">{label}</span>
      <span className="font-medium text-foreground flex-shrink-0">{value}</span>
    </div>
  );
}
