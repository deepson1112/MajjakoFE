import { Label } from "@/components/ui/Label";
import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import useUser from "@/lib/useUser";
import { LoyaltyType } from "@/types";
import { HeartHandshake, Sparkles, Ticket } from "lucide-react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { useQuery } from "react-query";

interface RetailLoyaltyContainerProps {
  loyalty: string;
  setLoyalty: Dispatch<SetStateAction<string>>;
  handleCheckoutWishlistLoader: boolean;
}

const RetailLoyaltyContainer = ({
  loyalty: currentLoyalty,
  setLoyalty,
  handleCheckoutWishlistLoader,
}: RetailLoyaltyContainerProps) => {
  const { user, isLoading } = useUser();
  const { data: loyalties, isLoading: loyaltiesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-offers/retail-loyalty-programs/")
        .json();
      return response as LoyaltyType[];
    },
    queryKey: ["loyalty"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (loyaltiesLoader || isLoading)
    return (
      <div className="flex max-w-[40rem] w-full items-center overflow-y-auto gap-2 rounded-xl bg-gray-50 p-2">
        <Skeleton className="h-7 rounded-md" />

        <Skeleton className="h-7 rounded-md" />

        <Skeleton className="h-7 rounded-md" />

        <Skeleton className="h-7 rounded-md" />
      </div>
    );

  if (user?.guest_user)
    return (
      <span className="my-3 px-2 p-1 py-2 flex items-center gap-2 text-black bg-brand/10 font-semibold text-base">
        <Sparkles className="text-brand" />
        Join our loyalty program by Signing Up and get exciting discounts
      </span>
    );

  return (
    <div className="flex flex-col items-start gap-2 px-1">
      <Label className="font-semibold md:text-lg text-sm">
        Loyalty <span className="text-brand">Discounts</span>
      </Label>
      <div className="flex max-w-[20rem] md:max-w-[34rem] w-full items-start py-4 flex-[0_0_30%] overflow-y-auto gap-4 rounded-xl bg-gray-50 p-2">
        {!!loyalties && !!loyalties.length
          ? loyalties.map((loyalty) => (
              <Fragment key={`retail-loyalty-${loyalty.id}`}>
                <input
                  type="radio"
                  value={loyalty.program_code}
                  id={loyalty.program_code}
                  name={loyalty.program_code}
                  className="peer hidden"
                  disabled={!loyalty.valid || handleCheckoutWishlistLoader}
                  onChange={(e) => {
                    setLoyalty(e.target.value);
                  }}
                  checked={`${currentLoyalty}` === `${loyalty.program_code}`}
                />

                <label
                  htmlFor={loyalty.program_code}
                  className={`min-w-[10rem] relative border-2 p-4 rounded-lg text-white hover:border-gray-300 bg-gradient-to-r  ${
                    !loyalty.valid
                      ? `cursor-not-allowed from-gray-300 to-gray-400`
                      : "cursor-pointer bg-gray-100 from-red-500/80 to-orange-500/80"
                  } ${
                    `${currentLoyalty}` === `${loyalty.program_code}`
                      ? "border-black"
                      : "border"
                  }`}
                >
                  <div>
                    <h6 className="font-semibold text-lg line-clamp-1">
                      {loyalty.program_name}
                    </h6>
                    <span>points: {loyalty.no_of_points}</span>
                  </div>
                  <span className="[clipPath:circle(50.2% at 100% 49%)] w-4 h-4 absolute -left-2 bottom-4 bg-gray-50 rounded-full"></span>
                  <span className="w-4 h-4 absolute -right-2 bottom-4 bg-gray-50 rounded-full"></span>
                </label>
              </Fragment>
            ))
          : null}
      </div>
    </div>
  );
};

export default RetailLoyaltyContainer;
