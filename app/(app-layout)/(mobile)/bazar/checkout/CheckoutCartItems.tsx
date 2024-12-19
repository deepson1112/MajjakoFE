import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

import CartImage from "@/app/(app-layout)/(mobile)/cart/CartImage";

import { Pen, Ticket } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import ListLoader from "@/components/loaders/ListLoader";
import { RetailSubTotalCalculation } from "@/types";
import Price from "@/components/Price";
import CouponField from "./CouponField";
import useUser from "@/lib/useUser";
import RetailQuantityButton from "@/components/sidecart/RetailQuantityButton";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { SpecialRequest } from "../(products)/products/[subCategoryId]/[productId]/SpecialRequest";
import { Badge } from "@/components/ui/Badge";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";

interface CheckoutCartItemsProps {
  retailCarts: RetailSubTotalCalculation;
  retailCartsLoader: boolean;
  retailCartsLoader2: boolean;
  handleAddRetailCoupon: (data: { coupon: string; vendor: number }) => void;
  handleRemoveCoupon: (vendor: number) => void;
}

const CheckoutCartItems = ({
  retailCarts,
  retailCartsLoader,
  retailCartsLoader2,
  handleAddRetailCoupon,
  handleRemoveCoupon,
}: CheckoutCartItemsProps) => {
  const { user, isLoading } = useUser();
  const [isSpecialRequestModalOpen, setIsSpecialRequestModalOpen] =
    useState(false);

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
    <section>
      {retailCartsLoader2 ? (
        <div className="space-y-4">
          <Skeleton className="h-[50px] w-[200px]" />
          <ListLoader />
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-xl">Cart Items</h2>
          <ul className="px-2 divide-y border rounded-lg mt-2">
            <div className="max-h-[25rem] overflow-y-auto scrollBar px-4">
              {retailCarts?.vendors.map((vendor) => (
                <Accordion
                  key={`cart-items-chekcout-${vendor.vendor_id}`}
                  type="multiple"
                  className="w-full"
                  defaultValue={retailCarts?.vendors.map(
                    (vendor) => `${vendor.vendor_id}`
                  )}
                >
                  <AccordionItem
                    value={`${vendor.vendor_id}`}
                    key={`retail-cart-${vendor.vendor_id}`}
                  >
                    <AccordionTrigger>{vendor.vendor_name}</AccordionTrigger>
                    <AccordionContent>
                      {vendor.items.map((cart_item) => (
                        <li key={`vendor-cart-list-${cart_item.id}`}>
                          <div className="flex flex-col space-y-3 py-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                            <CartImage
                              discount={Number(
                                `${cart_item.retail_product_variation?.discount?.discount_percentages}`
                              )}
                              img={
                                cart_item.retail_product_variation
                                  .variations_image[0].default_image ||
                                cart_item.retail_product_variation
                                  .variations_image[0].image
                              }
                            />
                            <div className="relative flex flex-1 flex-col justify-between">
                              <div className="">
                                <div className="pr-8 sm:pr-5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                      <p className="text-base font-semibold text-gray-900">
                                        {
                                          cart_item.retail_product_variation
                                            .product[0].product_name
                                        }
                                      </p>
                                      {!!cart_item.special_request ? (
                                        <SpecialRequest
                                          defaultRequest={
                                            cart_item.special_request
                                          }
                                          id={cart_item.id}
                                          isSpecialRequestModalOpen={
                                            isSpecialRequestModalOpen
                                          }
                                          setIsSpecialRequestModalOpen={
                                            setIsSpecialRequestModalOpen
                                          }
                                        >
                                          <Badge className="bg-brand py-0 px-1.5">
                                            Special Request
                                            <Pen className="w-3 h-3 ml-1" />
                                          </Badge>
                                        </SpecialRequest>
                                      ) : null}
                                    </div>
                                    <div className="no-underline text-xs px-2 font-light flex flex-col space-y-1 items-center rounded-full text-right">
                                      <span>Quantity</span>

                                      <RetailQuantityButton
                                        cart_item={cart_item}
                                        mutationFn={handleUpdateCartQuantity}
                                        isMobile
                                      />
                                    </div>
                                  </div>
                                  <p className="mx-0 mt-1 mb-0 text-sm text-gray-500 font-medium">
                                    {cart_item.retail_product_variation.variation
                                      .map(
                                        (item) =>
                                          ` ${item.variation_type_name}: ${item.variation_name} `
                                      )
                                      .join(",")}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-end justify-between">
                                  <div className="sm:text-right flex flex-col">
                                    <span className="text-xs text-semibold text-gray-600 font-semibold flex items-center gap-1">
                                      {cart_item.retail_product_variation
                                        .discounted_amount ? (
                                        <span className="flex items-center gap-1">
                                          <span className="line-through font-thin">
                                            <Price
                                              amount={
                                                cart_item
                                                  .retail_product_variation
                                                  .price
                                              }
                                            />
                                          </span>
                                          <span className="text-sm">
                                            <Price
                                              amount={
                                                cart_item
                                                  .retail_product_variation
                                                  .discounted_amount
                                              }
                                            />
                                          </span>
                                        </span>
                                      ) : (
                                        <span className="text-brand">
                                          <Price
                                            amount={
                                              cart_item.retail_product_variation
                                                .price
                                            }
                                          />
                                        </span>
                                      )}{" "}
                                      <span className="font-light">
                                        (
                                        {
                                          cart_item.retail_product_variation
                                            .tax_exclusive_price
                                        }{" "}
                                        +{" "}
                                        {
                                          cart_item.retail_product_variation
                                            .tax_amount
                                        }{" "}
                                        tax)
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full border-none"
                        defaultValue={
                          vendor?.vendor_coupon_details?.coupon_code || "none-1"
                        }
                      >
                        <AccordionItem
                          value={
                            vendor?.vendor_coupon_details?.coupon_code || `none`
                          }
                          className="border-none"
                        >
                          <AccordionTrigger className="bg-white border p-2">
                            <div className="flex items-center gap-2">
                              <Ticket /> Apply Product Coupon Code
                            </div>
                          </AccordionTrigger>
                          {isLoading ? (
                            <div className="space-y-2">
                              <Skeleton className="h-6 w-14" />
                              <Skeleton className="h-8 w-full" />
                            </div>
                          ) : (
                            <AccordionContent>
                              <CouponField
                                vendor={vendor.vendor_id}
                                vendorTitle={vendor.vendor_name}
                                handleAddRetailCoupon={handleAddRetailCoupon}
                                retailCartsLoader={retailCartsLoader}
                                isCouponActive={!!vendor.vendor_coupon_details}
                                handleRemoveCoupon={handleRemoveCoupon}
                                vendorCoupon={vendor.vendor_coupon_details}
                                guest={!!user?.guest_user}
                              />
                            </AccordionContent>
                          )}
                        </AccordionItem>
                      </Accordion>
                      <div className="flex flex-col items-stretch gap-2 py-2">
                        <span className="text-gray-600 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Subtotal for {vendor.vendor_name}:
                          </span>{" "}
                          <Price amount={vendor.subtotal} />
                        </span>
                        <span className="text-gray-600 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Delivery Charge for {vendor.vendor_name}:
                          </span>{" "}
                          <Price amount={vendor.vendor_delivery_charge} />
                        </span>

                        {!!vendor["coupon-discount"] ? (
                          <span className="text-gray-600 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Coupon Discount:
                            </span>{" "}
                            <Price amount={vendor["coupon-discount"]} />
                          </span>
                        ) : null}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            <div className="py-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Subtotal</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price amount={retailCarts?.subtotal} />
                </p>
              </div>

              {!!retailCarts?.discount ? (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">Discount</p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-red-500">-</span>
                    <Price amount={retailCarts?.discount} />
                  </p>
                </div>
              ) : null}

              {!!retailCarts?.["coupon-discount"] ? (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">Coupon Discount</p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-red-500">-</span>
                    <Price amount={retailCarts["coupon-discount"]} />
                  </p>
                </div>
              ) : null}

              {!!retailCarts?.["loyalty-discount-amount"] ? (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">
                    Loyalty Discount
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-red-500">-</span>
                    <Price amount={retailCarts?.["loyalty-discount-amount"]} />
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Delivery Charge</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price amount={retailCarts?.delivery_charge} />
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Totals</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price amount={retailCarts?.total.toFixed(2)} />
                </p>
              </div>
            </div>
          </ul>
        </>
      )}
    </section>
  );
};

export default CheckoutCartItems;
