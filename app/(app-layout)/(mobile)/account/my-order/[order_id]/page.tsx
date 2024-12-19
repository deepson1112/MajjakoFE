"use client";

import { api } from "@/lib/fetcher";
import { OrderDetails } from "@/types";
import { useQuery } from "react-query";
import Orderhead from "../../orders/[order_id]/orderhead";
import RetailOrderBody from "../../orders/retail/RetailOrderBody";
import Orderfooter from "../../orders/[order_id]/orderfooter";
import { RetailOrderConfirmation } from "../../orders/retail-orders/[order_id]/page";

interface MyOrderDetailsPageProps {
  params: {
    order_id: string;
  };
}

const MyOrderDetailsPage = ({ params }: MyOrderDetailsPageProps) => {
  const { order_id } = params;
  const { data: order, isLoading: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/retail-orders/${order_id}`)
        .json<RetailOrderConfirmation>();
      return response;
    },
    queryKey: [`my-orders-${order_id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return !orderLoader ? (
    !!order ? (
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

                <Orderfooter data={order} />
              </table>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Not Found</div>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default MyOrderDetailsPage;
