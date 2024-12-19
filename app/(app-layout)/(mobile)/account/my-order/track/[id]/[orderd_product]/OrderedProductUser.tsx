"use client";
import RouterBack from "@/app/(app-layout)/(mobile)/account/orders/retail-orders/[order_id]/RouterBack";
import { api } from "@/lib/fetcher";
import { capitalizeWord, formattedDate } from "@/lib/utils";
import { Check, ChevronLeft, PackageCheck } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { OrderItem } from "../TrackItems";
import Image from "next/image";
import DeliveryDetails from "@/components/DeliveryDetails";
import Price from "@/components/Price";

interface OrderdProductUserProps {
  orderd_product: string;
}

const OrderedProductUser = ({ orderd_product }: OrderdProductUserProps) => {
  // let lastIndex: null | number = null;

  const [lastIndex, setLastIndex] = useState<null | number>(null);

  const { data: orderedProduct, isLoading: orderedProductLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/ordered-product-user/${orderd_product}/`)
        .json<OrderItem>();
      return response;
    },
    onSuccess: (data) => {
      setLastIndex(data.status.length);
    },
    queryKey: [`ordered-product-user-${orderd_product}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return orderedProductLoader ? (
    <div>Loading...</div>
  ) : !!orderedProduct ? (
    <div>
      <div className="p-4">
        {/* <RouterBack>
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span className="mr-2">Back</span>
        </RouterBack> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border rounded-lg border-dotted p-4 ">
            <div className="flex gap-6">
              <figure>
                <Image
                  src={
                    orderedProduct.retail_product_variation_details
                      .variations_image[0].default_image ||
                    orderedProduct.retail_product_variation_details
                      .variations_image[0].image
                  }
                  alt={`${orderedProduct.retail_product_variation_details.product.name}-image`}
                  width={1000}
                  height={1000}
                  className="aspect-square w-36 rounded-lg object-center object-cover"
                />
              </figure>

              <div className="w-full flex items-start justify-between">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">
                    {
                      orderedProduct.retail_product_variation_details.product
                        .name
                    }
                  </h4>
                  <p className="text-sm max-w-sm line-clamp-2">
                    {
                      orderedProduct.retail_product_variation_details
                        .description
                    }
                  </p>
                </div>
                <span className="text-xs">
                  Quantity: {orderedProduct.quantity}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-dotted border-brand rounded-lg p-4">
            <div className="space-y-2">
              <h6 className="text-xl font-semibold">Order Summary</h6>

              <ul className="space-y-1 divide-y-1 divide-gray-100">
                <li className="text-gray-500 font-semibold flex items-center justify-between">
                  Original Price:{" "}
                  <span className="text-gray-700 font-normal">
                    <Price amount={orderedProduct.price} />
                  </span>
                </li>
                <li className="text-gray-500 flex items-center justify-between font-semibold">
                  Discount Amount:{" "}
                  <span className="text-gray-700 font-normal">
                    <Price amount={orderedProduct.discount_amount} />
                  </span>
                </li>
                <li className="text-gray-500 flex items-center justify-between font-semibold">
                  Discounted Amount:{" "}
                  <span className="text-gray-700 font-normal">
                    <Price amount={orderedProduct.discounted_amount} />
                  </span>
                </li>
                {/* <li className="text-gray-500 flex items-center justify-between font-semibold">
                  Tax Amount:{" "}
                  <span className="text-gray-700 font-normal">
                    Rs.{orderedProduct.tax_amount}
                  </span>
                </li> */}
                {/* <li className="text-gray-500 flex items-center justify-between font-semibold">
                  Coupon Discount:{" "}
                  <span className="text-gray-700 font-normal">
                    Rs.{orderedProduct.coupon_discount}
                  </span>
                </li> */}

                {/* <li className="text-gray-500 font-semibold flex items-center justify-between">
                  Total Discounted Amount:{" "}
                  <span className="text-gray-700 font-normal">
                    Rs.{orderedProduct.total_discounted_amount}
                  </span>
                </li> */}
                <li className="text-gray-500 font-semibold flex items-center justify-between">
                  Tax Break-down:{" "}
                  <span className="text-gray-700 font-normal">
                    <Price amount={orderedProduct.tax_exclusive_amount} />
                    + <Price amount={orderedProduct.tax_amount} /> (Tax)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 my-6 flex flex-col md:flex-row justify-between items-start">
          <ul className="p-4">
            {orderedProduct.status.map((status, index) => (
              <>
                <li
                  key={`refund-status-list-${status.id}`}
                  className={`${
                    !(index + 1 === lastIndex && status.closed)
                      ? "border-l-2 border-brand"
                      : ""
                  }  px-6 pl-8 pt-4 pb-16 relative flex flex-col space-y-2`}
                >
                  <div className="-mt-11">
                    <span className="text-sm">
                      {formattedDate(status.updated_at)}
                    </span>
                    <h6 className="text-brand font-semibold">
                      {capitalizeWord(status.status.status)}
                    </h6>
                    <span className="text-gray-600 text-xs">
                      {status.description}
                    </span>
                  </div>
                  <span
                    className={`${
                      !(index + 1 === lastIndex && status.closed)
                        ? "h-5 w-5 -top-2 -left-[0.65rem]"
                        : "h-8 w-8 -top-2 -left-[0.90rem]"
                    } absolute flex items-center justify-center  rounded-full bg-brand`}
                  >
                    {index + 1 === lastIndex && status.closed ? (
                      <PackageCheck className="text-white w-4 h-4" />
                    ) : (
                      <Check
                        className="text-white w-3 h-3"
                        strokeWidth={"4px"}
                      />
                    )}
                  </span>
                </li>

                {index + 1 === lastIndex ? (
                  !status.closed ? (
                    <li className="px-6 pt-6 pb-8 relative flex flex-col space-y-2">
                      <span className="absolute h-5 w-5 rounded-full bg-brand -top-2 -left-[0.65rem]">
                        <span className="animate-ping absolute h-5 w-5 rounded-full bg-brand"></span>
                      </span>
                    </li>
                  ) : null
                ) : null}
              </>
            ))}
          </ul>
          <DeliveryDetails
            deliveryDetails={
              orderedProduct &&
              orderedProduct.status &&
              [...orderedProduct.status]
                .reverse()
                .find((delivery) => delivery?.delivery_driver?.name !== "N/A")
                ?.delivery_driver
            }
          />
        </div>
      </div>
    </div>
  ) : (
    <div>Not Found</div>
  );
};

export default OrderedProductUser;
