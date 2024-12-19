"use client";

import React, { useState } from "react";
import CartItemsList from "./CartItemsList";
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import CheckOutCalculations from "./CheckOutCalculations";
import { SubTotalcalculationType } from "@/types";
import { toast } from "sonner";

const CheckOutItems = () => {
  const [couponCode, setCouponCode] = useState("");
  const [tip, setTip] = useState("");
  const [loyalty, setLoyalty] = useState("");
  const [userCarts, setUserCarts] = useState<SubTotalcalculationType>();

  const { data: userCart, isLoading: userCartLoader } =
    useQuery<SubTotalcalculationType>({
      queryFn: async () => {
        const response = await api()
          .get("/marketplace/sub_total_calculations/")
          .json();
        return response as SubTotalcalculationType;
      },
      queryKey: ["user-checkout-data"],
      onError: (error: any) => {
        console.error(error);
      },
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      onSuccess: (data) => {
        setUserCarts(data);
      },
    });

  const {
    mutate: handleApplyCouponCodeTip,
    isLoading: handleApplyCouponCodeTipLoader,
  } = useMutation({
    mutationFn: async (payload: {
      code: string;
      tipValue: string;
      loyaltyCode: string;
    }) => {
      const response = await api()
        .get(
          `/marketplace/sub_total_calculations/?tip=${payload.tipValue}&coupon=${payload.code}&loyalty_code=${payload.loyaltyCode}`
        )
        .json();
      return response as SubTotalcalculationType;
    },
    onSuccess: (data: SubTotalcalculationType) => {
      setUserCarts(data);
      toast.success("Applied");
    },
    onError: (error: any) => {
      toast.error("Somethieng went wrgon", {
        description: "destructive",
      });
    },
  });

  if (userCartLoader) return <h6>Loading...</h6>;
  return (
    <div className="flex lg:items-start items-stretch flex-col lg:flex-row gap-8 max-w-7xl w-full mx-auto px-6">
      {userCarts ? (
        <>
          <div className="flex-1">
            <CartItemsList
              handleApplyCouponCodeTip={handleApplyCouponCodeTip}
              handleApplyCouponCodeTipLoader={handleApplyCouponCodeTipLoader}
              userCart={userCarts}
              userCartLoader={userCartLoader}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              tip={tip}
              loyalty={loyalty}
            />
          </div>

          <div className="flex-1">
            <CheckOutCalculations
              userCartData={userCarts}
              handleApplyCouponCodeTip={handleApplyCouponCodeTip}
              handleApplyCouponCodeTipLoader={handleApplyCouponCodeTipLoader}
              tip={tip}
              setTip={setTip}
              loyalty={loyalty}
              setLoyalty={setLoyalty}
              couponCode={couponCode}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CheckOutItems;
