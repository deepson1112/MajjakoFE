import { Label } from "@/components/ui/Label";
import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { LoyaltyType } from "@/types";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { useQuery } from "react-query";

interface LoyaltyContainerProps {
  register: UseFormRegister<{
    tip: string;
    loyalty: string;
    tipAmount: number;
  }>;
}

const LoyaltyContainer = ({ register }: LoyaltyContainerProps) => {
  const { data: loyalties, isLoading: loyaltiesLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get("/offers/loyalty-programs/").json();
      return response as LoyaltyType[];
    },
    queryKey: ["loyalty"],
  });

  if (loyaltiesLoader)
    return (
      <div className="grid max-w-[40rem] w-full grid-cols-4 gap-2 rounded-xl bg-gray-50 p-2">
        <Skeleton className="h-7 rounded-md" />

        <Skeleton className="h-7 rounded-md" />

        <Skeleton className="h-7 rounded-md" />

        <Skeleton className="h-7 rounded-md" />
      </div>
    );

  return (
    <div>
      <Label>Loyalty Discounts</Label>
      <div className="grid max-w-[40rem] w-full grid-cols-4 gap-2 rounded-xl bg-gray-50 p-2">
        {!!loyalties && !!loyalties.length
          ? loyalties.map((loyalty) => (
              <>
                <input
                  type="radio"
                  {...register("loyalty")}
                  value={loyalty.program_code}
                  id={loyalty.program_code}
                  className="peer hidden"
                  disabled={!loyalty.valid}
                />
                <label
                  htmlFor={loyalty.program_code}
                  className={`border-2 border-gray-200 p-4 rounded-lg hover:border-gray-300 ${
                    !loyalty.valid
                      ? `cursor-not-allowed bg-gray-100`
                      : "cursor-pointer"
                  }`}
                >
                  <div>
                    <h6>{loyalty.program_name}</h6>
                    <span className="text-gray-500">
                      points: {loyalty.no_of_points}
                    </span>
                  </div>
                </label>
              </>
            ))
          : null}
      </div>
    </div>
  );
};

export default LoyaltyContainer;
