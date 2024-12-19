"use client";

import React from "react";
import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import Orderhead from "../account/orders/[order_id]/orderhead";
import Orderfooter from "../account/orders/[order_id]/orderfooter";
import { Skeleton } from "@/components/ui/Skeleton";
import RetailOrderBody from "../account/orders/retail/RetailOrderBody";
import { useSearchParams } from "next/navigation";
import { RetailOrderConfirmation } from "../account/orders/retail-orders/[order_id]/page";

export default function RetailOrderConfirmationPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchParamsHook = useSearchParams();
  const orderParam = searchParamsHook.get("order_number");

  const { data: order, isLoading: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/retail-orders?order_number=${orderParam}`)
        .json<RetailOrderConfirmation>();
      return response;
    },
    queryKey: ["order"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (orderLoader) return <Skeleton className="w-full h-[270px]" />;
  return (
    order && (
      <div className="lg:mx-56 md:mx-32 sm:mx-8 overflow-hidden">
        <div className="bg-[white] rounded-b-md">
          <Orderhead data={order} />
          <div className="p-9">
            <div className="flex flex-col mx-0 mt-8">
              <table className="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="font-bold py-3.5 pl-4 pr-3 text-left text-sm text-slate-700 sm:pl-6 md:pl-0"
                    >
                      Name & Description
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm font-bold text-slate-700 sm:table-cell"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right text-sm font-bold text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <RetailOrderBody data={order} />
                </tbody>

                <Orderfooter data={order} />
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
