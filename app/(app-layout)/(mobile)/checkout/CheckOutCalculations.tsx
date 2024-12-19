"use client";

import { api } from "@/lib/fetcher";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseMutateFunction, useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { ExistingOrderAddress } from "./OrderLocation/ExistingOrderAddress";
import LoyaltyContainer from "./LoyaltyContainer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RotateCcw } from "lucide-react";
import Price from "@/components/Price";
import { SubTotalcalculationType } from "@/types";
import { toast } from "sonner";

interface checkoutResponse {
  clientSecret: string;
  order_number: string;
}

const CheckOutCalculations = ({
  userCartData,
  handleApplyCouponCodeTip,
  setTip,
  couponCode,
  loyalty,
  handleApplyCouponCodeTipLoader,
  setLoyalty,
}: {
  userCartData: SubTotalcalculationType;
  handleApplyCouponCodeTipLoader: boolean;
  handleApplyCouponCodeTip: UseMutateFunction<
    SubTotalcalculationType,
    any,
    { code: string; tipValue: string; loyaltyCode: string },
    unknown
  >;
  tip: string;
  setTip: Dispatch<SetStateAction<string>>;
  loyalty: string;
  setLoyalty: Dispatch<SetStateAction<string>>;
  couponCode: string;
}) => {
  const [currentDeliveryDT, setCurrentDeliveryDT] = useState({
    date: "",
    time: "",
    deliveryTime: "",
  });

  const form = useForm({
    defaultValues: {
      tip: "",
      loyalty: "",
      tipAmount: 0,
    },
    mode: "onChange",
  });
  const { register, watch } = form;

  const tipValue = watch("tip");
  const loyaltyValue = watch("loyalty");
  const tipAmount = watch("tipAmount");

  const router = useRouter();

  const allCoupons = userCartData.vendors

    .map((vendor) => {
      if (!!vendor.coupons_offer) {
        return `${vendor.coupons_offer} ($${vendor.calculate_coupons})`;
      }
    })
    .join(", ")
    .slice(0, -2);

  useEffect(() => {
    if (tipValue || loyaltyValue) {
      setTip(tipValue);
      setLoyalty(loyaltyValue);
      handleApplyCouponCodeTip({
        code: !!couponCode ? couponCode : "",
        tipValue: ((Number(tipValue) / 100) * userCartData?.sub_total).toFixed(
          2
        ),
        loyaltyCode: !!loyaltyValue ? loyaltyValue : "",
      });
    }
  }, [tipValue, loyaltyValue, handleApplyCouponCodeTip]);

  return (
    <>
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>

        <div className="rounded-lg py-2 sm:py-4 lg:py-8 mt-2">
          <h2 className="sr-only">Order summary</h2>

          <div className="flex flex-col items-stretch">
            <div className="border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price
                    amount={(
                      userCartData?.discounted_price! +
                      userCartData?.addons_cost!
                    ).toFixed(2)}
                  />
                </p>
              </div>
              {/* Discounted AMount */}

              {userCartData?.discount_amount ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Discount</p>
                  <p className="text-sm font-semibold text-red-600">
                    - {(userCartData?.discount_amount).toFixed(2)}
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Tax</p>
                <p className="text-sm font-semibold text-gray-900">
                  +
                  {userCartData?.sub_total ? (
                    <Price amount={(userCartData?.total_tax).toFixed(2)} />
                  ) : (
                    0
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Subtotal</p>
                <p className="text-sm font-semibold text-gray-900">
                  {userCartData?.sub_total ? (
                    <Price amount={(userCartData?.sub_total).toFixed(2)} />
                  ) : (
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex flex-col gap-6 md:gap-4 items-stretch mt-2">
        <div className="w-full flex flex-col gap-6 md:gap-4 items-stretch">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-600 block">
              Select Tip
            </label>

            {!!tipAmount || !!tipValue ? (
              <Button
                variant={"subtle"}
                onClick={() =>
                  form.reset({
                    tip: undefined,
                    tipAmount: 0,
                  })
                }
              >
                Reset Value
                <RotateCcw className="w-3 h-3 ml-1" />
              </Button>
            ) : null}
          </div>

          <div className="grid max-w-[40rem] w-full grid-cols-4 gap-2 rounded-xl bg-gray-50 p-2">
            <div>
              <input
                type="radio"
                {...register("tip")}
                value="15"
                id="15"
                className="peer hidden"
                disabled={!!tipAmount}
              />
              <label
                htmlFor="15"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-brand peer-checked:font-bold peer-checked:text-white"
              >
                15%
              </label>
            </div>

            <div>
              <input
                type="radio"
                {...register("tip")}
                value="20"
                id="20"
                className="peer hidden"
                disabled={!!tipAmount}
              />
              <label
                htmlFor="20"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-brand peer-checked:font-bold peer-checked:text-white"
              >
                20%
              </label>
            </div>

            <div>
              <input
                type="radio"
                {...register("tip")}
                value="25"
                id="25"
                className="peer hidden"
                disabled={!!tipAmount}
              />
              <label
                htmlFor="25"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-brand peer-checked:font-bold peer-checked:text-white"
              >
                25%
              </label>
            </div>

            <div>
              <input
                type="radio"
                {...register("tip")}
                value="30"
                id="30"
                className="peer hidden"
                disabled={!!tipAmount}
              />
              <label
                htmlFor="30"
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-brand peer-checked:font-bold peer-checked:text-white"
              >
                30%
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <hr className="flex-grow border-t border-red-300" />
            <span className="px-3 text-red-500">or</span>
            <hr className="flex-grow border-t border-red-300" />
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              id="custom-tip-amt"
              placeholder="Custom tip amount"
              className={`${!!tipValue ? "cursor-not-allowed]" : ""}`}
              min="0"
              step="1"
              disabled={!!tipValue}
              {...register("tipAmount", {
                valueAsNumber: true,
                validate: (value) => value > 0,
              })}
            />

            <Button
              type="button"
              isLoading={handleApplyCouponCodeTipLoader}
              onClick={() => {
                setTip(`${tipAmount}`);
                setLoyalty(loyaltyValue);
                handleApplyCouponCodeTip({
                  code: !!couponCode ? couponCode : "",
                  tipValue: `${tipAmount}`,
                  loyaltyCode: !!loyaltyValue ? loyaltyValue : "",
                });
              }}
              disabled={!!tipValue || handleApplyCouponCodeTipLoader}
            >
              Confirm
            </Button>
          </div>

          <LoyaltyContainer register={register} />

          <div id="coupon-container" className="hidden">
            <div>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <span className="price flex-1"></span>
                  <button
                    id="apply-coupon-button"
                    type="button"
                    className="block text-white bg-[#ff4500] hover:bg-[#e03e02] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm md:px-5 px-3 py-2.5 text-center hover:no-underline"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span id="coupon-discount-label"> Coupon Discount</span>
              <div className="price flex items-center gap-2 font-semibold">
                <span className="currency">Rs.</span>
                <span id="cDiscount">0.00</span>
              </div>
            </div>
          </div>

          {!!allCoupons ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Coupons</p>
              <p className="text-sm font-semibold text-red-600">
                - {allCoupons}
              </p>
            </div>
          ) : null}

          {userCartData?.tip ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Tip</p>
              <p className="text-sm font-semibold text-gray-900">
                +<Price amount={Number(userCartData?.tip).toFixed(2)} />
              </p>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total</p>
            <p className="text-sm font-semibold text-gray-900">
              <Price amount={(userCartData?.total_amount).toFixed(2)} />
            </p>
          </div>

          <ExistingOrderAddress />
        </div>
      </div>
    </>
  );
};

export default CheckOutCalculations;
