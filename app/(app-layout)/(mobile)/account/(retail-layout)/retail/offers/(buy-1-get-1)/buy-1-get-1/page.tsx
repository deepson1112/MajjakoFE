"use client";
import ListLoader from "@/components/loaders/ListLoader";
import React from "react";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { BuyOneGetOneType } from "@/lib/validators/offers";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BuyOneGetOneRetail } from "../..";

const BuyOneGetOnePage = () => {
  const { data, isLoading: buyOneGetOneLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-offers/retail-get-one-free-offer/")
        .json<BuyOneGetOneRetail[]>();
      return response;
    },
    queryKey: ["retail-buy-one-get-one"],
    onSuccess: (data) => {
      console.log("This is the response ", data);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="py-3">
      <h2 className="text-3xl font-semibold tracking-tight mb-4">
        Buy 1, Get 1 Free
      </h2>
      {buyOneGetOneLoader ? (
        <ListLoader />
      ) : !!data?.length ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <div>
          <h6 className="text-center">No Offers Available</h6>
        </div>
      )}
    </div>
  );
};

export default BuyOneGetOnePage;
