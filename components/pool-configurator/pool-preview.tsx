"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { poolImages, type PoolType } from "@/lib/pool-data";

interface PoolPreviewProps {
  poolType: PoolType;
  exteriorFinish: string;
}

export function PoolPreview({ poolType, exteriorFinish }: PoolPreviewProps) {
  const images = poolImages[poolType]?.[exteriorFinish as keyof typeof poolImages[typeof poolType]]
    || poolImages[poolType]?.["terracotta"]
    || poolImages.miami.terracotta;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`${poolType} pool preview`}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "bg-foreground/30 hover:bg-foreground/50"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
