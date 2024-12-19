"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { Bookmark } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

interface LoyaltyProgram {
  program_name: string;
  program_code: string;
  no_of_points: number;
  valid: boolean;
  discount_percentages: number;
}

function LoyaltyCard() {
  const { data: loyality, isLoading: loyalityLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/offers/loyalty-programs/")
        .json<LoyaltyProgram[]>();
      return response;
    },
    queryKey: ["loyality-offers"],
    onError: (error) => {
      toast.error("Error While fetching Offers!!", {
        description: "Please Try Again",
      });
    },
  });
  if (loyalityLoader) return <Skeleton className="w-full h-[270px]" />;
  return loyality && loyality.length > 0
    ? loyality.map((loyal, index) => (
        <div
          key={index}
          className={`border-2 border-gray-300 bg-white mb-4 rounded-lg overflow-hidden cursor-pointer hover:border-gray-600 ${
            loyal.valid ? "" : "brightness-50"
          }`}
        >
          <div className="w-full h-full flex px-4 backdrop-brightness-10">
            <div className="w-3/4 py-8 h-full flex flex-col">
              <h6 className="text-lg font-semibolf text-slate-700 uppercase">
                {loyal.program_name}
              </h6>
              <h4
                className={`text-xl font-bold ${
                  loyal.valid ? "text-red-700" : "text-gray-200"
                } uppercase`}
              >
                {loyal.program_code}
              </h4>
              <p className="text-sm font-semibold text-slate-800 uppercase">
                Points: {loyal.no_of_points}
              </p>
            </div>
            <div className="w-1/4 !h-full flex flex-col justify-center items-center">
              <Bookmark
                className={`relative top-0 right-0 h-32 w-24 pl-2 ${
                  loyal.valid ? "text-red-500 fill-red-500" : "text-transparent"
                } `}
              />
              <p
                className={`absolute font-bold ml-2 mx-auto ${
                  loyal.valid ? "text-white" : "text-red-500"
                }`}
              >
                {loyal.valid ? loyal.discount_percentages + "%" : "Invalid"}
              </p>
            </div>
          </div>
        </div>
      ))
    : null;
}

export default LoyaltyCard;
