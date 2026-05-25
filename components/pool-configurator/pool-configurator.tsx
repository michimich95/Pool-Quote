"use client";

import { useState } from "react";
import { CustomizationPanel } from "./customization-panel";
import { ContactFormModal } from "./contact-form-modal";
import { PoolPreview } from "./pool-preview";
import {
  type PoolType,
  calculateTotal,
  getSizes,
  innerFinishes,
  exteriorFinishes,
  extraOptions,
} from "@/lib/pool-data";
import { type QuoteData } from "./contact-form-modal";

export function PoolConfigurator() {
  const [poolType, setPoolType] = useState<PoolType | null>(null);
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [innerFinishId, setInnerFinishId] = useState<string | null>(null);
  const [exteriorFinishId, setExteriorFinishId] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePoolTypeSelect = (type: PoolType) => {
    setPoolType(type);
    setSizeId(null);
    setSelectedExtras([]);
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const buildQuoteData = (): QuoteData => {
    const sizes = getSizes(poolType!);
    const size = sizes.find((s) => s.id === sizeId);
    const inner = innerFinishes.find((f) => f.id === innerFinishId);
    const exteriorWood = exteriorFinishes.find((f) => f.id === exteriorFinishId);
    const exteriorLamina = innerFinishes.find((f) => f.id === exteriorFinishId);
    const exteriorName = exteriorWood?.name ?? (exteriorLamina ? `${exteriorLamina.name} (${exteriorLamina.collection})` : "");
    const extras = selectedExtras
      .map((id) => extraOptions.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    return {
      pool_type: poolType === "miami" ? "Miami" : "Pool Spa",
      pool_dimensions: size ? `${size.lengthFt} × ${size.widthFt} × ${size.heightFt}` : "",
      pool_glass_size: poolType === "miami" ? "6' 7\" × 10\"" : "5' × 10\"",
      pool_finishes_interior: inner ? `${inner.name} (${inner.collection})` : "",
      pool_finishes_exterior: exteriorName,
      pool_premium_features: extras,
      pool_expected_budget: "",
    };
  };

  const quoteTotal =
    poolType && sizeId && innerFinishId && exteriorFinishId
      ? calculateTotal(poolType, sizeId, innerFinishId, exteriorFinishId, selectedExtras)
      : 0;

  const currentExterior = exteriorFinishId || "chocolate";
  const currentType = poolType || "miami";

  return (
    <div className="bg-background flex flex-col lg:h-screen lg:overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 h-14 border-b border-border bg-background z-40 flex items-center px-6 gap-3">
        <span className="text-lg font-black tracking-widest uppercase text-foreground">BENIGNI POOLS</span>
        <span className="hidden md:block ml-auto text-xs font-bold uppercase tracking-widest text-primary">
          Premium Elevated Pools
        </span>
      </header>

      {/* Two-panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">

        {/* Left: full-height pool preview — desktop only */}
        <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-muted">
          <PoolPreview
            key={`${currentType}-${currentExterior}`}
            poolType={currentType}
            exteriorFinish={currentExterior}
          />

          {/* Info overlay */}
          {poolType && (
            <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
              <div className="inline-flex flex-col gap-1 bg-black/40 backdrop-blur-md rounded-2xl px-5 py-3 text-white">
                <span className="text-xs uppercase tracking-widest opacity-60">
                  {poolType === "miami" ? "Miami" : "Pool Spa"}
                </span>
                {sizeId && (() => {
                  const sizes = getSizes(poolType);
                  const s = sizes.find((x) => x.id === sizeId);
                  return s ? (
                    <span className="text-sm font-semibold">
                      {s.name} &middot; {s.lengthFt} × {s.widthFt} &middot; {s.volumeLiters.toLocaleString()}L
                    </span>
                  ) : null;
                })()}
              </div>
            </div>
          )}

          {/* Placeholder when nothing selected */}
          {!poolType && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-center space-y-2">
                <p className="text-white/80 text-lg font-semibold drop-shadow">
                  Configure your pool
                </p>
                <p className="text-white/50 text-sm drop-shadow">
                  Select options on the right →
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: customization panel */}
        <div className="w-full lg:w-2/5 lg:border-l border-border flex flex-col lg:overflow-hidden">
          <CustomizationPanel
            poolType={poolType}
            sizeId={sizeId}
            innerFinishId={innerFinishId}
            exteriorFinishId={exteriorFinishId}
            selectedExtras={selectedExtras}
            onPoolTypeChange={handlePoolTypeSelect}
            onSizeChange={setSizeId}
            onInnerFinishChange={setInnerFinishId}
            onExteriorFinishChange={setExteriorFinishId}
            onExtraToggle={handleExtraToggle}
            onRequestQuote={() => setModalOpen(true)}
          />
        </div>
      </div>

      <ContactFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        quoteTotal={quoteTotal}
        quoteData={modalOpen && poolType && sizeId && innerFinishId && exteriorFinishId
          ? buildQuoteData()
          : { pool_type: "", pool_dimensions: "", pool_glass_size: "", pool_finishes_interior: "", pool_finishes_exterior: "", pool_premium_features: "", pool_expected_budget: "" }
        }
      />
    </div>
  );
}
