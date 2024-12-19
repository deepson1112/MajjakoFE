import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import React from "react";
interface CarouselIndicatorProps {
  count: number;
  current: number;
}
const CarouselIndicator = ({ count, current }: CarouselIndicatorProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: count || 1 }).map((_, index) => (
        <Dot
          key={`dot-indication-${index}`}
          className={cn(
            current === index + 1 ? "text-brand" : "text-gray-300",
            "w-8 h-8"
          )}
        />
      ))}
    </div>
  );
};

export default CarouselIndicator;
