"use client";
import Image from "next/image";
import { api } from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  OrderDetails,
  RetailPaymentItemsType,
  SubTotalcalculationType,
} from "@/types";
import { useQuery } from "react-query";
import CartImage from "../../cart/CartImage";
import Price from "@/components/Price";

type checkouttype = {
  checkoutData?: RetailPaymentItemsType[] | undefined;
  checkoutDataLoader?: boolean;
  itemId: string | string[] | null | undefined;
};

const RetailPaymentItems = ({ itemId }: checkouttype) => {
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderData, setOrderData] = useState<RetailPaymentItemsType | null>(
    null
  );
  const [datas, setDatas] = useState<SubTotalcalculationType[]>([]);

  const { data: checkoutData, isLoading: checkoutDataLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/retail-orders?order_number=${itemId}`)
        .json<RetailPaymentItemsType>();
      return response;
    },
    onSuccess: (data) => {
      console.log("This is data", data);
      setOrderData(data);
    },
    queryKey: ["retail-payment-items"],
  });

  console.log("Order Data", orderData);

  return checkoutDataLoader ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  ) : (
    <div className="mx-auto w-full max-w-lg">
      <h2 className="sr-only">Order summary</h2>

      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {!!checkoutData && checkoutData?.total !== 0 ? (
            <>
              {checkoutData.cart_data.vendors.map((vendor) => (
                <>
                  {vendor.items.map((item) => (
                    <li key={item.id} className="flex space-x-6 py-6">
                      <CartImage
                        discount={Number(
                          `${item.retail_product_variation?.discount?.discount_percentages}`
                        )}
                        img={
                          item.retail_product_variation.variations_image[0]
                            .default_image ||
                          item.retail_product_variation.variations_image[0]
                            .image
                        }
                      />
                      <div className="flex-auto">
                        <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                          <div className="flex-auto space-y-1 text-sm font-medium  max-w-[10rem] w-full">
                            <h3 className="text-gray-900">
                              <span>
                                {
                                  item.retail_product_variation.product[0]
                                    .product_name
                                }
                              </span>
                            </h3>
                            <p className="italic text-xs text-gray-500 sm:block">
                              {vendor.vendor_name}
                            </p>

                            <p className="mx-0 mt-1 mb-0 text-xs text-gray-500 font-semibold">
                              {item.retail_product_variation.variation
                                .map(
                                  (item) =>
                                    ` ${item.variation_type_name}: ${item.variation_name} `
                                )
                                .join(",")}
                            </p>
                          </div>

                          <div className="flex-auto space-x-4 text-xs text-gray-600">
                            x{item.quantity}
                          </div>
                          <div className="flex-auto space-x-4 text-xs text-gray-600 text-right">
                            <span className="text-sm text-semibold text-gray-600 font-semibold flex flex-col items-end">
                              {item.retail_product_variation.discount_amount ? (
                                <span className="flex items-center gap-1">
                                  <span className="line-through font-thin">
                                    <Price
                                      amount={
                                        item.retail_product_variation.price
                                      }
                                    />
                                  </span>
                                  <span className="text-sm">
                                    <Price
                                      amount={
                                        item.retail_product_variation
                                          .discounted_amount
                                      }
                                    />
                                  </span>
                                </span>
                              ) : (
                                <Price
                                  amount={item.retail_product_variation.price}
                                />
                              )}
                              <span className="font-light text-[0.65rem]">
                                (
                                {
                                  item.retail_product_variation
                                    .tax_exclusive_price
                                }
                                + {item.retail_product_variation.tax_amount}{" "}
                                tax)
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ))}
            </>
          ) : (
            <div>NO ITEMS IN THE CHEKCOUT</div>
          )}
        </ul>
      </div>
      {!!checkoutData ? (
        <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="text-gray-900">
              <Price amount={checkoutData?.cart_data?.subtotal} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Loyalty Discount</dt>
            <dd className="text-gray-900">
              <span className="text-red-500">-</span>
              <Price
                amount={checkoutData?.cart_data?.["loyalty-discount-amount"]}
              />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Coupon Discounts</dt>
            <dd className="text-gray-900">
              <span className="text-red-500">-</span>
              <Price amount={checkoutData.cart_data["coupon-discount"]} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Delivery Charge</dt>
            <dd className="text-gray-900">
              {!!checkoutData.cart_data["delivery_charge"] ? (
                <span className="text-green-500">+</span>
              ) : null}
              <Price amount={checkoutData.cart_data["delivery_charge"]} />
            </dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt className="text-base">Total</dt>
            <dd className="text-base">
              <Price amount={checkoutData.cart_data.total} />
            </dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
};

export default RetailPaymentItems;
