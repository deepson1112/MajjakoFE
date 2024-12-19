"use client";
import ListLoader from "@/components/loaders/ListLoader";
import EmptyDepartment from "@/components/others/EmptyDepartment";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { OrderType } from "@/lib/validators/order";

const OrdersContainer = () => {
  const { data: orders, isLoading: orderLoader } = useQuery<OrderType[]>({
    queryFn: async () => {
      const response = await api().get("/orders/orders").json();
      return response as OrderType[];
    },
    queryKey: ["order"],
  });
  console.log("Order", orders);

  return (
    <div>
      {orderLoader ? (
        <ListLoader />
      ) : !!orders && !!orders.length ? (
        <DataTable columns={columns} data={orders} />
      ) : (
        <EmptyDepartment title="Order" />
      )}
    </div>
  );
};

export default OrdersContainer;
