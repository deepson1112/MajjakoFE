"use client";
import { api } from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Refund } from "../RefundedItems";
import { capitalizeWord, formattedDate } from "@/lib/utils";
import RouterBack from "../../../orders/retail-orders/[order_id]/RouterBack";
import { Check, CheckCheck, ChevronLeft } from "lucide-react";
import Image from "next/image";
import DeliveryDetails from "@/components/DeliveryDetails";

const RefundedItemDetails = ({ id }: { id: string }) => {
  const [lastIndex, setLastIndex] = useState<null | number>(null);
  const { data: refundedItem, isLoading: refundedItemLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-refund/retail-refund/${id}`)
        .json<Refund>();
      return response;
    },
    onSuccess: (data) => {
      setLastIndex(data.refund_products_detail[0].refund_status.length);
    },
    queryKey: [`retail-refund-${id}`, id],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (refundedItem) {
      setLastIndex(refundedItem.refund_products_detail[0].refund_status.length);
    }
  }, [refundedItem]);

  return !refundedItemLoader ? (
    !!refundedItem ? (
      <div className="p-4">
        <RouterBack>
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span className="mr-2">Back</span>
        </RouterBack>
        <div className="border rounded-lg border-dotted p-4">
          <div className="flex gap-6">
            <figure>
              <Image
                src={
                  refundedItem.refund_products_detail[0]?.image_1 ||
                  refundedItem.refund_products_detail[0]?.image_2 ||
                  refundedItem.refund_products_detail[0]?.image_3 ||
                  ""
                }
                alt={`${refundedItem.id}-image`}
                width={1000}
                height={1000}
                className="aspect-square w-36 rounded-lg object-center object-cover"
              />
            </figure>

            <div className="w-full flex items-start justify-between">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">
                  {
                    refundedItem.refund_products_detail[0]
                      .product_variation_detail.product_name
                  }
                </h4>
                <p className="text-sm">
                  <span className="text-gray-500">Reason: </span>
                  {refundedItem.refund_products_detail[0].reason}
                </p>
              </div>
              <span className="text-xs">
                Quantity: {refundedItem.refund_products_detail[0].quantity}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 my-6 flex flex-col md:flex-row justify-between items-start">
          <ul>
            {refundedItem.refund_products_detail[0].refund_status.map(
              (status, index) => (
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
                        {capitalizeWord(status.status_detail.status)}
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
                        <CheckCheck
                          className="text-white w-5 h-5"
                          strokeWidth={"2px"}
                        />
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
              )
            )}
          </ul>

          <DeliveryDetails
            deliveryDetails={
              refundedItem &&
              refundedItem.refund_products_detail[0].refund_status &&
              [...refundedItem.refund_products_detail[0].refund_status]
                .reverse()
                .find(
                  (delivery) =>
                    delivery?.delivery_driver &&
                    delivery?.delivery_driver?.name !== "N/A"
                )?.delivery_driver
            }
          />
        </div>
      </div>
    ) : (
      <div>Item Not Found</div>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default RefundedItemDetails;
