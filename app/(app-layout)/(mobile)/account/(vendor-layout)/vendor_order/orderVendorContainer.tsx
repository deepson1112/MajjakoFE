"use client";
import ListLoader from "@/components/loaders/ListLoader";
import EmptyDepartment from "@/components/others/EmptyDepartment";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { columns } from "../../orders/columns";
import { DataTable } from "../../orders/data-table";
import { OrderType } from "@/lib/validators/order";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";
import { useQueryParamState } from "@/hooks/useQueryParamState";

interface OrderTypeResponse {
  count: number;
  next: string;
  previous: string;
  results: OrderType[];
  total_page: number;
}

const OrderVendorContainer = () => {
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const { data: orders, isLoading: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/retail-vendor-orders/?page=${page}`)
        .json<OrderTypeResponse>();
      return response;
    },
    queryKey: ["vendor-order"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log("Vendor Order", orders);

  return (
    <div>
      {orderLoader ? (
        <ListLoader />
      ) : !!orders && !!orders.results ? (
        <>
          <DataTable columns={columns} data={orders.results} />
          <PaginationWithLinks
            page={Number(page) || 1}
            pageSize={10}
            totalCount={orders.count}
            setPage={setPage}
          />
        </>
      ) : (
        <EmptyDepartment title="Vendor Order" />
      )}
    </div>
  );
};

export default OrderVendorContainer;
