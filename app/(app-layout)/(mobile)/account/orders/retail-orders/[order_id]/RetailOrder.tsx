"use client";

import React from "react";
import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import Orderhead from "../../[order_id]/orderhead";
import Orderfooter from "../../[order_id]/orderfooter";
import { Skeleton } from "@/components/ui/Skeleton";
import { RetailSubTotalCalculation } from "@/types";
import RetailOrderBody from "../../retail/RetailOrderBody";
import { RetailOrderConfirmation } from "./page";

export interface RetailOrder {
  address: string;
  cart_data: RetailSubTotalCalculation;
  city: string;
  country: string;
  created_at: string;
  delivery_charge: number;
  delivery_date: string;
  email: string;
  first_name: string;
  id: number;
  is_ordered: boolean;
  last_name: string;
  loyalty_points_received: number;
  order_number: string;
  order_payment_code: string;
  payment: any;
  payment_method: string;
  phone: string;
  pin_code: string;
  state: string;
  status: string;
  tax_data: any;
  total: number;
  total_data: any;
  total_tax: number;
  updated_at: string;
  user: number;
  vendors: any[];
}

export default function RetailOrderDetail({ order_id }: { order_id: string }) {
  const { data: order, isLoading: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/retail-vendor-orders/?order_number=${order_id}`)
        .json<RetailOrderConfirmation>();
      return response;
    },
    queryKey: [`vendor-order-${order_id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("Order tis ", order);

  if (orderLoader) return <Skeleton className="w-full h-[270px]" />;
  return (
    order && (
      <div>
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
                {/* @ts-ignore */}
                <Orderfooter data={order} />
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
