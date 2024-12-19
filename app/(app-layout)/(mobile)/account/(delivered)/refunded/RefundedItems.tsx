"use client";

import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import { DataTable } from "./refunded-table/data-table";
import { columns } from "./refunded-table/columns";
import { DeliveryDriverDetail } from "../../my-order/track/[id]/TrackItems";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import ListLoader from "@/components/loaders/ListLoader";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";

type RefundStatusDetail = {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
};

type RefundStatus = {
  id: number;
  status_detail: RefundStatusDetail;
  description: string;
  created_at: string;
  updated_at: string;
  refund_product: number;
  closed: boolean;
  delivery_driver: DeliveryDriverDetail;
};

type ProductVariationDetail = {
  product_name: string | null;
  price: number | null;
  discounted_amount: number | null;
  refund_policies: Array<{
    created_at: string;
    description: string;
    id: number;
    policy: string;
    updated_at: string;
  }>;
};

type RefundProductDetail = {
  id: number;
  product_variation_detail: ProductVariationDetail;
  quantity: number;
  reason: string;
  status: string;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  created_at: string;
  updated_at: string;
  refund_status: RefundStatus[];
};

interface ReducedRefundItems {
  refund_products_detail: string;
  reason: string;
  quantity: number;
  status: string;
  id: number;
  refund_id: number;
}

export type Refund = {
  id: number;
  refund_products_detail: RefundProductDetail[];
  created_at: string;
  updated_at: string;
  order: number;
  user: number;
};

export type ReducedRefund = {
  quantity: number;
  reason: string;
  refund_products_detail: string;
  status: string;
  id?: number;
  refund_id?: number;
};

const RefundedItems = () => {
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const { data: refundedItems, isLoading: refundedItemsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-refund/retail-refund/?page=${page}`)
        .json<{ results: Refund[]; count: number }>();
      return response;
    },
    queryKey: ["retail-refund", page],
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return refundedItemsLoader ? (
    <ListLoader />
  ) : !!refundedItems && !!refundedItems.results.length ? (
    <>
      <DataTable
        columns={columns}
        data={
          refundedItems &&
          refundedItems.results.reduce<ReducedRefund[]>((acc, items) => {
            const newItem = items.refund_products_detail.map((detail) => ({
              refund_products_detail:
                detail?.product_variation_detail?.product_name || "",
              reason: detail.reason,
              quantity: detail.quantity,
              status: detail.status,
              id: detail.id,
              refund_id: items.id,
            }));

            acc = [...acc, ...newItem];

            return acc;
          }, [])
        }
      />
      <PaginationWithLinks
        page={Number(page) || 1}
        pageSize={10}
        totalCount={refundedItems.count}
        setPage={setPage}
      />
    </>
  ) : (
    <div>No Refunded Items</div>
  );
};

export default RefundedItems;
