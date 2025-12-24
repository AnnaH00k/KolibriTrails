"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { getImagePath } from "../../utils/imagePath";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  if (!images || images.length === 0) {
    return (
      <div className="relative h-48 w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
        <span className="text-slate-500 text-sm">Keine Bilder</span>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div
      ref={carouselRef}
      className="relative h-48 w-full overflow-hidden bg-black group touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Bilder */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={getImagePath(image)}
              alt={`${alt} - Bild ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons - nur sichtbar wenn mehr als 1 Bild */}
      {images.length > 1 && (
        <>
          {/* Vorheriger Button - sichtbar auf Mobile, hover auf Desktop */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white opacity-100 md:opacity-0 transition-opacity group-hover:md:opacity-100 hover:bg-black/70 active:bg-black/80 touch-manipulation"
            aria-label="Vorheriges Bild"
          >
            <svg
              className="h-5 w-5 md:h-4 md:w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Nächster Button - sichtbar auf Mobile, hover auf Desktop */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white opacity-100 md:opacity-0 transition-opacity group-hover:md:opacity-100 hover:bg-black/70 active:bg-black/80 touch-manipulation"
            aria-label="Nächstes Bild"
          >
            <svg
              className="h-5 w-5 md:h-4 md:w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Indikatoren */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Gehe zu Bild ${index + 1}`}
              />
            ))}
          </div>

          {/* Bild-Zähler */}
          <div className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
