"use client";

import React from "react";
import { api } from "@/lib/fetcher";
import { OrderType } from "@/lib/validators/order";
import { useQuery } from "react-query";
import Orderhead from "../account/orders/[order_id]/orderhead";
import OrderBody from "../account/orders/[order_id]/orderbody";
import Orderfooter from "../account/orders/[order_id]/orderfooter";
import { Skeleton } from "@/components/ui/Skeleton";
import { RetailOrderConfirmation } from "../account/orders/retail-orders/[order_id]/page";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = searchParams ? searchParams : null;
  const { data: data, isLoading: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/orders/orders?order_number=${params?.order_number?.toString()}`)
        .json<RetailOrderConfirmation[]>();
      return response;
    },
    queryKey: ["order"],
  });
  if (orderLoader) return <Skeleton className="w-full h-[270px]" />;
  return (
    data &&
    data.map((d, i) => (
      <div key={i} className="lg:mx-56 md:mx-32 sm:mx-8 overflow-hidden">
        <div className="bg-[white] rounded-b-md">
          <Orderhead data={d} />
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
                  <OrderBody data={d} />
                </tbody>
                <Orderfooter data={d} />
              </table>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
