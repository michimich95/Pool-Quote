"use client";

import { cn } from "@/lib/utils";
import {
  getSizes,
  innerFinishes,
  exteriorFinishes,
  extraOptions,
  calculateTotal,
  type PoolType,
} from "@/lib/pool-data";

interface QuoteSummaryProps {
  poolType: PoolType | null;
  sizeId: string | null;
  innerFinishId: string | null;
  exteriorFinishId: string | null;
  selectedExtras: string[];
}

export function QuoteSummary({
  poolType,
  sizeId,
  innerFinishId,
  exteriorFinishId,
  selectedExtras,
}: QuoteSummaryProps) {
  if (!poolType) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <p className="text-muted-foreground text-center">
          Select a pool type to see your quote
        </p>
      </div>
    );
  }

  const sizes = getSizes(poolType);
  const size = sizeId ? sizes.find((s) => s.id === sizeId) : null;
  const innerFinish = innerFinishId ? innerFinishes.find((f) => f.id === innerFinishId) : null;
  const exteriorFinish = exteriorFinishId ? exteriorFinishes.find((f) => f.id === exteriorFinishId) : null;

  const total = calculateTotal(
    poolType,
    sizeId || "",
    innerFinishId || "",
    exteriorFinishId || "",
    selectedExtras
  );

  return (
    <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
      <h3 className="text-lg font-semibold">Your Configuration</h3>

      <div className="space-y-4">
        {/* Pool Type */}
        <SummaryLine
          label="Pool Type"
          value={poolType === "miami" ? "Miami" : "Pool Spa"}
        />

        {/* Size */}
        {size && (
          <SummaryLine
            label={`${size.name} (${size.lengthFt} x ${size.widthFt})`}
            value={`$${size.basePrice.toLocaleString()}`}
          />
        )}

        {/* Inner Finish */}
        {innerFinish && (
          <SummaryLine
            label={`Inner: ${innerFinish.name}`}
            value={innerFinish.price > 0 ? `+$${innerFinish.price.toLocaleString()}` : "Included"}
            isIncluded={innerFinish.price === 0}
          />
        )}

        {/* Exterior Finish */}
        {exteriorFinish && (
          <SummaryLine
            label={`Exterior: ${exteriorFinish.name}`}
            value={exteriorFinish.price > 0 ? `+$${exteriorFinish.price.toLocaleString()}` : "Included"}
            isIncluded={exteriorFinish.price === 0}
          />
        )}

        {/* Extras */}
        {selectedExtras.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Extras</span>
            <div className="mt-2 space-y-2">
              {selectedExtras.map((extraId) => {
                const extra = extraOptions.find((e) => e.id === extraId);
                if (!extra) return null;
                return (
                  <SummaryLine
                    key={extraId}
                    label={extra.name}
                    value={`+$${extra.price.toLocaleString()}`}
                    isSmall
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Estimated Total</span>
          <span className="text-3xl font-bold text-primary">
            ${total.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          * Final price may vary. Contact us for a detailed quote.
        </p>
      </div>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  isIncluded = false,
  isSmall = false,
}: {
  label: string;
  value: string;
  isIncluded?: boolean;
  isSmall?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between", isSmall && "text-sm")}>
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", isIncluded && "text-muted-foreground")}>
        {value}
      </span>
    </div>
  );
}
