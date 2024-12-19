import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./embla";

export function EmblaMain() {
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
  };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="mt-6 px-1 sm:px-8 md:gap-x-16 lg:hidden">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
