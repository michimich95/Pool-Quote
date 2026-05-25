"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./step-indicator";
import { PoolTypeStep } from "./pool-type-step";
import { PoolSizeStep } from "./pool-size-step";
import { InnerFinishStep } from "./inner-finish-step";
import { ExteriorFinishStep } from "./exterior-finish-step";
import { ExtrasStep } from "./extras-step";
import { PoolPreview } from "./pool-preview";
import { QuoteSummary } from "./quote-summary";
import { ContactFormModal } from "./contact-form-modal";
import { type PoolType, calculateTotal, getSizes, innerFinishes, exteriorFinishes, extraOptions } from "@/lib/pool-data";

const steps = [
  { id: 1, name: "Pool Type" },
  { id: 2, name: "Size" },
  { id: 3, name: "Inner Finish" },
  { id: 4, name: "Exterior" },
  { id: 5, name: "Extras" },
];

export function PoolConfigurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [poolType, setPoolType] = useState<PoolType | null>(null);
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [innerFinishId, setInnerFinishId] = useState<string | null>(null);
  const [exteriorFinishId, setExteriorFinishId] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return poolType !== null;
      case 2:
        return sizeId !== null;
      case 3:
        return innerFinishId !== null;
      case 4:
        return exteriorFinishId !== null;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePoolTypeSelect = (type: PoolType) => {
    setPoolType(type);
    setSizeId(null);
    setSelectedExtras([]);
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const buildQuoteNote = () => {
    const sizes = getSizes(poolType!);
    const size = sizes.find((s) => s.id === sizeId);
    const inner = innerFinishes.find((f) => f.id === innerFinishId);
    const exterior = exteriorFinishes.find((f) => f.id === exteriorFinishId);
    const extras = selectedExtras.map((id) => extraOptions.find((e) => e.id === id)?.name).filter(Boolean);
    const total = calculateTotal(poolType!, sizeId!, innerFinishId!, exteriorFinishId!, selectedExtras);

    return [
      "Pool Quote Request",
      "",
      `Model: ${poolType === "miami" ? "Miami" : "Pool Spa"} — ${size?.name}`,
      `Size: ${size?.lengthFt} × ${size?.widthFt}`,
      `Inner Finish: ${inner?.name} (${inner?.category === "mosaic" ? "Mosaic" : "Solid Color"})`,
      `Exterior Finish: ${exterior?.name}`,
      `Extras: ${extras.length > 0 ? extras.join(", ") : "None"}`,
      "",
      `Estimated Total: $${total.toLocaleString()}`,
    ].join("\n");
  };

  const quoteTotal = poolType && sizeId && innerFinishId && exteriorFinishId
    ? calculateTotal(poolType, sizeId, innerFinishId, exteriorFinishId, selectedExtras)
    : 0;

  const handleRequestQuote = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">BENIGNI POOLS</span>
          </div>

          <div className="hidden md:block text-sm text-muted-foreground">
            Premium Elevated Pools
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left: Step Content */}
          <div className="space-y-8">
            {/* Pool Preview (shown after step 1) */}
            {poolType && currentStep > 1 && (
              <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                <PoolPreview
                  poolType={poolType}
                  exteriorFinish={exteriorFinishId || "terracotta"}
                />
              </div>
            )}

            {/* Step Content */}
            <div className="animate-in fade-in-50 duration-300">
              {currentStep === 1 && (
                <PoolTypeStep
                  selectedType={poolType}
                  onSelect={handlePoolTypeSelect}
                />
              )}
              {currentStep === 2 && poolType && (
                <PoolSizeStep
                  poolType={poolType}
                  selectedSize={sizeId}
                  onSelect={setSizeId}
                />
              )}
              {currentStep === 3 && (
                <InnerFinishStep
                  selectedFinish={innerFinishId}
                  onSelect={setInnerFinishId}
                />
              )}
              {currentStep === 4 && (
                <ExteriorFinishStep
                  selectedFinish={exteriorFinishId}
                  onSelect={setExteriorFinishId}
                />
              )}
              {currentStep === 5 && poolType && (
                <ExtrasStep
                  poolType={poolType}
                  selectedExtras={selectedExtras}
                  onToggle={handleExtraToggle}
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canGoNext()}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleRequestQuote}
                  disabled={!canGoNext()}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Right: Quote Summary (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <QuoteSummary
                poolType={poolType}
                sizeId={sizeId}
                innerFinishId={innerFinishId}
                exteriorFinishId={exteriorFinishId}
                selectedExtras={selectedExtras}
              />
            </div>
          </div>
        </div>

        {/* Mobile Quote Summary */}
        <div className="lg:hidden mt-8">
          <QuoteSummary
            poolType={poolType}
            sizeId={sizeId}
            innerFinishId={innerFinishId}
            exteriorFinishId={exteriorFinishId}
            selectedExtras={selectedExtras}
          />
        </div>
      </main>

      <ContactFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        quoteTotal={quoteTotal}
        quoteNote={modalOpen ? buildQuoteNote() : ""}
      />
    </div>
  );
}
