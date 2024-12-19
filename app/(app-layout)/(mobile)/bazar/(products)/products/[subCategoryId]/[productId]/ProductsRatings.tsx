import { cn } from "@/lib/utils";
import React from "react";

interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
  sm?: boolean;
}

export default function ProductRatings({
  rating,
  sm,
}: {
  rating: number;
  sm?: boolean;
}) {
  return (
    <div className="flex items-center gap-[0.15rem] ">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={cn(
            sm ? "w-4 h-4" : "w-5 h-5",
            `${
              star <= rating
                ? "fill-[#FFA500] stroke-[#FFA500]"
                : "fill-muted stroke-gray-300"
            }`
          )}
          sm={sm}
        />
      ))}
    </div>
  );
}

function StarIcon(props: CustomSVGProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={"24"}
      height={"24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
