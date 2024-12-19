"use client";
import Image from "next/image";
import { api } from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import FoodAddonsListContainer from "./FoodAddonsList";
import { OrderDetails, SubTotalcalculationType } from "@/types";
import Price from "@/components/Price";

type checkouttype = {
  checkoutData: SubTotalcalculationType | undefined;
  checkoutDataLoader: boolean;
  itemId: string | string[] | null | undefined;
};

const PaymentItems = ({
  checkoutData,
  checkoutDataLoader,
  itemId,
}: checkouttype) => {
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderData, setOrderData] = useState<OrderDetails[]>([]);
  const [datas, setDatas] = useState<SubTotalcalculationType[]>([]);
  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await api()
        .get(`/orders/orders?order_number=${itemId}`)
        .json<OrderDetails[]>();
      if (response) {
        setOrderData(response);
      }
    };
    fetchOrderData();
  }, [itemId]);
  useEffect(() => {
    if (checkoutData) {
      let totalCouponDiscount = 0;
      checkoutData.vendors.forEach((vendor) => {
        console.log("Coupons Discount", vendor.calculate_coupons);
        totalCouponDiscount += vendor.calculate_coupons;
      });
      setCouponDiscount(totalCouponDiscount);
    }
  }, [checkoutData]);
  useEffect(() => {
    if (orderData) {
      console.log("BeforeMap", orderData);
      const transformedData = orderData.map((order) => {
        const orderDetails = {
          id: order.id,
          order_number: order.order_number,
          delivery_date: order.delivery_date,
          status: order.status,
          sub_total: (order.total - order.total_tax).toFixed(2) || 0,
          total_tax: order.total_tax.toFixed(2) || 0,
          total_amount: order.total.toFixed(2) || 0,
          vendors: [],
        };
        order.order_vendor.forEach((vendor) => {
          const vendorDetails = {
            vendor_name: vendor.vendor_name || "",
            food_items: [],
          };
          //@ts-ignore
          vendor.ordered_food.forEach((food) => {
            const foodItem = {
              id: food.id,
              fooditem: food.food_item,
              cart_addons:
                food.food_item.order_food_addons &&
                food.food_item.order_food_addons.map((z: any) => {
                  return {
                    customization_set: z.customization,
                  };
                }),
              quantity: food.quantity,
              discounted_amount: 0,
              addons_cost: food.food_item.order_food_addons
                ? food.food_item.order_food_addons.map((z: any) => {
                    return z.amount || 0;
                  })
                : [{ price: 0 }],
              actual_amount: food.price,
            };
            //@ts-ignore
            vendorDetails.food_items.push(foodItem);
          });
          //@ts-ignore
          orderDetails.vendors.push(vendorDetails);
        });

        return orderDetails;
      });
      console.log("AfterMap", transformedData);
      //@ts-ignore
      transformedData.length > 0 && setDatas(transformedData);
    }
  }, [orderData]);
  if (checkoutDataLoader)
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );

  if (!checkoutData) return <div>NO ITEMS IN THE CHEKCOUT</div>;

  return (
    <div className="mx-auto w-full max-w-lg">
      <h2 className="sr-only">Order summary</h2>

      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {!!checkoutData && checkoutData.total_amount !== 0 ? (
            <>
              {checkoutData.vendors.map((vendor) => (
                <>
                  {vendor.food_items.map((item) => (
                    <li key={item.id} className="flex space-x-6 py-6">
                      <Image
                        src={item.fooditem.image ? item.fooditem.image : ""}
                        alt={`${item.id}`}
                        className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                        width={1000}
                        height={1000}
                      />
                      <div className="flex-auto">
                        <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                          <div className="flex-auto space-y-1 text-sm font-medium  max-w-[10rem] w-full">
                            <h3 className="text-gray-900">
                              <span>{item.fooditem.food_title}</span>
                            </h3>
                            <p className="text-gray-900">
                              <Price
                                amount={
                                  !!item.discounted_amount
                                    ? item.discounted_amount + item.addons_cost
                                    : item.actual_amount + item.addons_cost
                                }
                              />
                            </p>
                            <p className="hidden text-gray-500 sm:block font-semibold">
                              {vendor.vendor_name}
                            </p>
                            <FoodAddonsListContainer
                              cartAddons={item.cart_addons}
                            />
                          </div>

                          <div className="flex-auto space-x-4 text-xs text-gray-600">
                            x{item.quantity}
                          </div>
                          <div className="flex-auto space-x-4 text-xs text-gray-600 text-right">
                            <Price
                              amount={
                                item.quantity *
                                (item.actual_amount + item.addons_cost)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ))}
            </>
          ) : !!datas && !!datas.length ? (
            <>
              {datas[0].vendors.map((vendor) => (
                <>
                  {vendor.food_items.map((item) => (
                    <li key={item.id} className="flex space-x-6 py-6">
                      <Image
                        src={item.fooditem.image ? item.fooditem.image : ""}
                        alt={`${item.id}`}
                        className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                        width={1000}
                        height={1000}
                      />
                      <div className="flex-auto">
                        <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                          <div className="flex-auto space-y-1 text-sm font-medium  max-w-[10rem] w-full">
                            <h3 className="text-gray-900">
                              <span>{item.fooditem.food_title}</span>
                            </h3>
                            <p className="text-gray-900">
                              {!!item.discounted_amount
                                ? item.discounted_amount +
                                  //@ts-ignore
                                  item.addons_cost.reduce(
                                    //@ts-ignore
                                    (acc, curr) => acc + curr,
                                    0
                                  )
                                : item.actual_amount +
                                  //@ts-ignore
                                  item.addons_cost.reduce(
                                    //@ts-ignore
                                    (acc, curr) => acc + curr,
                                    0
                                  )}
                            </p>
                            <p className="hidden text-gray-500 sm:block font-semibold">
                              {vendor.vendor_name}
                            </p>
                            {item.cart_addons && (
                              <FoodAddonsListContainer
                                cartAddons={item.cart_addons}
                              />
                            )}
                          </div>

                          <div className="flex-auto space-x-4 text-xs text-gray-600">
                            x{item.quantity}
                          </div>
                          <div className="flex-auto space-x-4 text-xs text-gray-600 text-right">
                            <Price
                              amount={
                                item.quantity *
                                (item.actual_amount +
                                  //@ts-ignore
                                  item.addons_cost.reduce(
                                    //@ts-ignore
                                    (acc, curr) => acc + curr,
                                    0
                                  ))
                              }
                            />
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

      <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="text-gray-900">
            $
            {checkoutData?.sub_total
              ? checkoutData?.sub_total
              : datas.length > 0
              ? datas[0].sub_total
              : 0.0}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Coupon Discounts</dt>
          <dd className="text-gray-900">${couponDiscount || 0.0}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Total Tax</dt>
          <dd className="text-gray-900">
            $
            {checkoutData.total_tax
              ? checkoutData.total_tax.toFixed(2)
              : datas.length > 0
              ? datas[0].total_tax
              : 0.0}
          </dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
          <dt className="text-base">Total</dt>
          <dd className="text-base">
            $
            {checkoutData?.total_amount
              ? checkoutData?.total_amount.toFixed(2)
              : datas.length > 0
              ? datas[0].total_amount
              : 0.0}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PaymentItems;
