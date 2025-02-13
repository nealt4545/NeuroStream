// src/components/Carousel.tsx
"use client";
import React, { useRef } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  visibleCount?: number;
  gap?: number; // in pixels (default: 16)
}

export default function Carousel({
  children,
  visibleCount = 3,
  gap = 16,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Each tile's width is calculated as a percentage so that exactly visibleCount tiles fit
  // accounting for the gap between them.
  // Formula: (100% - (visibleCount - 1) * gapInPx) / visibleCount.
  const tileWidthCalc = `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`;

  return (
    <div className="relative w-full">
      {/* Left Arrow Button */}
      <button
        onClick={scrollPrev}
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full hover:bg-gray-200"
      >
        &larr;
      </button>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto w-full scroll-snap-x-mandatory hide-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex" style={{ gap: `${gap}px` }}>
          {children.map((child, index) => (
            <div
              key={index}
              className="scroll-snap-align-start flex-shrink-0"
              style={{ width: tileWidthCalc }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={scrollNext}
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full hover:bg-gray-200"
      >
        &rarr;
      </button>
    </div>
  );
}
