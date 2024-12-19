"use client";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { RetailSubTotalCalculation, SubTotalcalculationType } from "@/types";
import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import CartContainer from "@/app/(app-layout)/(mobile)/cart/CartContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import CartImage from "@/app/(app-layout)/(mobile)/cart/CartImage";
import RetailQuantityButton from "./RetailQuantityButton";
import { queryClient } from "@/lib/queryClient";
import Price from "../Price";

export const SideCartResturantContainer = ({
  handleNavigatePage,
}: {
  handleNavigatePage: ({ url }: { url: string }) => void;
}) => {
  const { data: userCart, isLoading: userCartLoader } =
    useQuery<SubTotalcalculationType>({
      queryFn: async () => {
        const response = await api()
          .url("/marketplace/sub_total_calculations/")
          .get()
          .json();
        return response as SubTotalcalculationType;
      },
      queryKey: ["user-sidecart-data"],
      onError: (error) => {
        console.error(error);
      },
    });

  if (userCartLoader)
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="w-full h-24 rounded-md" />
        <Skeleton className="w-full h-24 rounded-md" />
        <Skeleton className="w-full h-24 rounded-md" />
        <Skeleton className="w-full h-24 rounded-md" />
      </div>
    );
  return (
    <section className="h-full">
      {userCart?.vendors.length ? (
        <>
          <Accordion
            type="multiple"
            className="w-full max-h-[30rem] overflow-y-auto"
            defaultValue={userCart?.vendors.map((vendor) => vendor.vendor_name)}
          >
            {userCart?.vendors.map((vendor, index) => (
              <AccordionItem value={vendor.vendor_name} key={index}>
                <AccordionTrigger>{vendor.vendor_name}</AccordionTrigger>
                <AccordionContent>
                  <CartContainer
                    // @ts-ignore
                    userCart={vendor.food_items!}
                    userCartLoader={userCartLoader}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex flex-col items-stretch">
            <div className="border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price
                    amount={(
                      userCart?.discounted_price! +
                      userCart?.discount_amount! +
                      userCart?.addons_cost!
                    ).toFixed(2)}
                  />
                </p>
              </div>
              {userCart?.discount_amount ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Discount</p>
                  <p className="text-sm font-semibold text-red-600">
                    -<Price amount={(userCart?.discount_amount).toFixed(2)} />
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Tax</p>
                <p className="text-sm font-semibold text-gray-900">
                  +
                  {userCart?.sub_total ? (
                    <Price amount={(userCart?.total_tax).toFixed(2)} />
                  ) : (
                    0
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Subtotal</p>
                <p className="text-sm font-semibold text-gray-900">
                  {userCart?.sub_total ? (
                    <Price amount={(userCart?.sub_total).toFixed(2)} />
                  ) : (
                    0
                  )}
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                handleNavigatePage({ url: "/checkout" });
              }}
              // href={"/checkout"}
              // className={cn(buttonVariants({ variant: "default" }))}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full h-full grid place-items-center">
          <div className="-mt-24">
            <Image
              src={"/empty-cart.png"}
              alt="empty-cart-image"
              width={512}
              height={512}
              className="h-64 w-64 max-auto object-cover  object-center"
            />
            <p>
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
    </section>
  );
};

export const SideCartBazarContainer = ({
  handleNavigatePage,
}: {
  handleNavigatePage: ({ url }: { url: string }) => void;
}) => {
  const {
    data: retailCarts,
    isLoading: retailCartsLoader,
    isFetching: retailCartsFetcher,
  } = useQuery({
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

  const { mutate: handleUpdateCartQuantity } = useMutation({
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
    <section className="h-full">
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
        <ul className="max-h-[25rem] overflow-y-auto scrollBar px-2">
          {retailCarts.vendors.map((vendor) =>
            vendor.items.map((cart_item) => (
              <li
                className="flex py-6"
                key={`retail-cart-list-${cart_item.id}`}
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                        {
                          cart_item.retail_product_variation.product[0]
                            .product_name
                        }
                      </h3>

                      <div className="shrink-0 w-28 sm:order-2 sm:ml-8 sm:text-right flex flex-col">
                        <Price
                          amount={
                            cart_item.retail_product_variation?.discount
                              ? cart_item.retail_product_variation
                                  ?.discounted_amount
                              : cart_item.retail_product_variation.price
                          }
                        />
                        {/* {!!cart_item.retail_product_variation.discount ? ( */}
                        {cart_item.retail_product_variation.discount ? (
                          <span className="text-xs text-semibold text-gray-600 line-through">
                            <Price
                              amount={cart_item.retail_product_variation.price}
                            />
                          </span>
                        ) : null}
                        {/*  ) : null} */}
                      </div>
                    </div>

                    <div>
                      {!!cart_item.special_request ? (
                        <p className="line-clamp-1 clear-none text-sm text-gray-600">
                          <span className="font-medium">Special Request:</span>{" "}
                          {cart_item.special_request}
                        </p>
                      ) : null}

                      <p className=" text-sm text-gray-500 line-clamp-2">
                        {cart_item.retail_product_variation.variation
                          .map(
                            (item) =>
                              ` ${item.variation_type_name}: ${item.variation_name} `
                          )
                          .join(",")}
                      </p>
                    </div>
                  </div>

                  <RetailQuantityButton
                    cart_item={cart_item}
                    mutationFn={handleUpdateCartQuantity}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      ) : (
        <div className="w-full h-full grid place-items-center">
          <div className="-mt-24 flex flex-col items-center space-y-6">
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
                // onClick={() => handleNavigatePage({ url: "/marketplace" })}
                onClick={() => handleNavigatePage({ url: "/bazar/products" })}
                className="text-brand hover:text-brand_hover underline outline-none border-none"
              >
                Add Items
              </button>{" "}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-stretch space-y-2">
        {retailCartsFetcher ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        ) : (
          <div className="border-t border-b py-2">
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
                  `Rs.0.00`
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
        )}

        <Button
          onClick={() => {
            handleNavigatePage({ url: "/bazar/checkout" });
          }}
        >
          Proceed to Checkout
        </Button>
      </div>
    </section>
  );
};
