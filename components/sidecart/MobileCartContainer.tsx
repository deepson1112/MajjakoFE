"use client";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { RetailSubTotalCalculation } from "@/types";
import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import CartImage from "@/app/(app-layout)/(mobile)/cart/CartImage";
import RetailQuantityButton from "./RetailQuantityButton";
import { queryClient } from "@/lib/queryClient";
import Price from "../Price";
import RetailRemoveCartItem from "@/app/(app-layout)/(mobile)/cart/RetailRemoveCart";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

export const MobileCartContainer = ({
  handleNavigatePage,
  setIsCartOpen,
}: {
  handleNavigatePage: ({ url }: { url: string }) => void;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentRetailCartQuantity, setRetailCurrentCartQuantity] = useState(0);

  const { data: retailCarts, isLoading: retailCartsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          "/retail-marketplace/retail-sub-total-calculations/?vendor_id=&coupon="
        )
        .json<RetailSubTotalCalculation>();
      return response;
    },
    queryKey: ["retail-cart-data"],
    onError: (error: any) => {
      console.error(error);
    },
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });

  const { isLoading: retailCartsCounterLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          "/retail-marketplace/retail-sub-total-calculations/?vendor_id=&coupon="
        )
        .json<RetailSubTotalCalculation>();
      return response;
    },
    onSuccess: (data) => {
      const count = data?.vendors?.reduce((acc, vendor) => {
        let counter = 0;
        vendor.items.map((v) => (counter += v.quantity));
        acc += counter;
        return acc;
      }, 0);
      setRetailCurrentCartQuantity(count || 0);
    },
    queryKey: ["retail-cart-data"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: handleUpdateCartQuantity, isLoading } = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      id: number;
      payload: { quantity: number };
    }) => {
      const response = await api()
        .patch(payload, `/retail-marketplace/retail-cart/${id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("retail-cart-data");
    },
  });

  return (
    <>
      <SheetClose asChild>
        <button className="rounded-full z-50 absolute top-4 left-4">
          <ArrowLeft className="w-8 h-8 text-gray-500" />
        </button>
      </SheetClose>

      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
        <SheetDescription className="text-sm text-muted-foreground">
          {currentRetailCartQuantity} Items
        </SheetDescription>
      </SheetHeader>

      <section className="h-full w-full">
        {retailCartsLoader ? (
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-16" />
          </div>
        ) : !!retailCarts?.vendors.length ? (
          <div>
            <ul className="scrollBar px-2 divide-y-2">
              {retailCarts.vendors.map((vendor) =>
                vendor.items.map((cart_item) => (
                  <li
                    className="flex py-6"
                    key={`retail-cart-list-${cart_item.id}`}
                  >
                    <div className="h-[98px] w-[98px] flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                      <CartImage
                        discount={Number(
                          `${cart_item.retail_product_variation?.discount?.discount_percentages}`
                        )}
                        img={
                          cart_item.retail_product_variation.variations_image[0]
                            .default_image ||
                          cart_item.retail_product_variation.variations_image[0]
                            .image
                        }
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-1">
                          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 max-w-[11rem]">
                            {
                              cart_item.retail_product_variation.product[0]
                                .product_name
                            }
                          </h3>
                          {!!cart_item.special_request ? (
                            <p className="line-clamp-1 clear-none text-sm text-gray-600">
                              <span className="font-medium">
                                Special Request:
                              </span>{" "}
                              {cart_item.special_request}
                            </p>
                          ) : null}
                          <p className="-mt-3 text-sm text-gray-500 line-clamp-2">
                            {cart_item.retail_product_variation.variation
                              .map(
                                (item) =>
                                  ` ${item.variation_type_name}: ${item.variation_name} `
                              )
                              .join(",")}
                          </p>
                        </div>

                        <RetailRemoveCartItem cart_item={cart_item} isMobile />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-brand font-semibold">
                          <Price
                            amount={
                              cart_item.retail_product_variation?.discount
                                ? cart_item.retail_product_variation
                                    ?.discounted_amount
                                : cart_item.retail_product_variation.price
                            }
                          />
                        </span>

                        <RetailQuantityButton
                          isMobile
                          cart_item={cart_item}
                          mutationFn={handleUpdateCartQuantity}
                        />
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <div className="w-full h-full grid place-items-center my-6">
            <div className="md:-mt-24 flex flex-col items-center space-y-6">
              <Image
                src={"/empty-bag.svg"}
                alt="No Cart Items"
                width={200}
                height={200}
                className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
              />
              <p className="text-center">
                Your Cart is empty{" "}
                <button
                  onClick={() => handleNavigatePage({ url: "/bazar/products" })}
                  className="text-brand hover:text-brand_hover underline outline-none border-none"
                >
                  Add Items
                </button>{" "}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col items-stretch rounded-t-xl border-t border-b py-4 px-2 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Subtotal</p>
            <p className="text-sm font-semibold text-gray-900">
              <Price amount={retailCarts?.subtotal} />
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Discount</p>
            <p className="text-sm font-semibold text-gray-900">
              <span className="text-red-500">-</span>{" "}
              {retailCarts?.discount ? (
                <Price amount={retailCarts.discount} />
              ) : (
                `Rs 00.00`
              )}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total</p>
            <p className="text-sm font-semibold text-gray-900">
              <Price amount={retailCarts?.total} />
            </p>
          </div>
        </div>
      </section>
      <SheetFooter>
        <Button
          onClick={() => {
            if (!!retailCarts?.vendors.length)
              handleNavigatePage({ url: "/bazar/checkout" });
          }}
          disabled={!retailCarts?.vendors.length}
        >
          Proceed to Checkout
        </Button>
      </SheetFooter>
    </>
  );
};
