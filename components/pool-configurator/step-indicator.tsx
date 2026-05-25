"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: { id: number; name: string }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple dots */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepClick?.(step.id)}
            disabled={step.id > currentStep}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              step.id === currentStep
                ? "w-6 bg-primary"
                : step.id < currentStep
                ? "bg-primary/60"
                : "bg-muted"
            )}
            aria-label={`Step ${step.id}: ${step.name}`}
          />
        ))}
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick?.(step.id)}
              disabled={step.id > currentStep}
              className="flex flex-col items-center group"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  step.id === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : step.id < currentStep
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-muted bg-transparent text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium transition-colors",
                  step.id === currentStep
                    ? "text-foreground"
                    : step.id < currentStep
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                )}
              >
                {step.name}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-300",
                  step.id < currentStep ? "bg-primary/60" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
