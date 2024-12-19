import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReviewType } from "@/app/(app-layout)/(mobile)/account/(delivered)/delivered/[id]/ReviewDialog";

export default function Ratings({ form }: { form: UseFormReturn<ReviewType> }) {
  const [rating, setRating] = useState(form.getValues("rating") || 0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    form.setValue("rating", newRating);
  };

  return (
    <div className="flex items-center gap-1 cursor-pointer text max-w-fit">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-6 h-6 ${
            star <= rating
              ? "fill-[#FFA500] stroke-[#FFA500]"
              : "fill-muted stroke-gray-300"
          }`}
          onClick={() => handleRatingChange(star)}
        />
      ))}
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
