"use client";

import React from "react";
import EmptyDepartment from "@/components/others/EmptyDepartment";
import ListLoader from "@/components/loaders/ListLoader";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Order } from "../../../(delivered)/delivered/[id]/RefundableItem";
import { DataTable } from "./retail-loyality-table/data-table";
import { columns } from "./retail-loyality-table/columns";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";
import { useQueryParamState } from "@/hooks/useQueryParamState";

interface RetailOrderResponse {
  count: number;
  next: string;
  previous: string;
  results: Order[];
  total_pages: number;
}

const RetailLoyalityContainer = () => {
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const { data: loyality, isLoading: loyalityloader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/user-retail-orders/?page=${page}`)
        // .get(`/retail-orders/retail-orders?page=${page}`)
        .json<RetailOrderResponse>();
      return response;
    },
    queryKey: ["user-retail-orders"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  function formatDate(date: Date) {
    const offset = -date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, "0");
    const offsetMinutes = (offset % 60).toString().padStart(2, "0");
    const offsetSign = offset < 0 ? "-" : "+";

    const formattedDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      "T" +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0") +
      offsetSign +
      offsetHours +
      ":" +
      offsetMinutes;

    return formattedDate;
  }

  return (
    <div>
      {loyalityloader ? (
        <ListLoader />
      ) : !!loyality && !!loyality.results ? (
        <>
          <DataTable columns={columns} data={loyality.results} />
          <PaginationWithLinks
            page={Number(page) || 1}
            pageSize={10}
            totalCount={loyality.count}
            setPage={setPage}
          />
        </>
      ) : (
        <EmptyDepartment title="Loyality" />
      )}
    </div>
  );
};

export default RetailLoyalityContainer;
