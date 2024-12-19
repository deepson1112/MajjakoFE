"use client";

import ListLoader from "@/components/loaders/ListLoader";
import { axiosInstance } from "@/lib/axiosInstance";
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const BuyOneGetOnePage = () => {
  const { data, isLoading: buyOneGetOneLoader } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("/offers/get-one-free-offer/");
      return data;
    },
    queryKey: ["buy-one-get-one"],
    onSuccess: (data) => {
      // console.log("This is the response ", data);
    },
    onError: (error: any) => [console.error(error)],
  });

  return (
    <div className="py-3">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Buy 1, Get 1 Free
      </h2>
      {buyOneGetOneLoader ? (
        <ListLoader />
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default BuyOneGetOnePage;
