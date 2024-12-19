"use client";
import React from "react";
import { DataTable } from "./variations-table/data-table";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { ProductVariationType } from "@/lib/validators/fooditems";
import { columns } from "./variations-table/columns";

const VariationType = () => {
  const {
    data: productVariationTypes,
    isLoading: productVariationTypesLoader,
  } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/retail-variation-types/")
        .json<ProductVariationType[]>();
      return response;
    },
    queryKey: ["retail-variation-types"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return productVariationTypesLoader ? (
    <div>Loading</div>
  ) : productVariationTypes ? (
    <div>
      <DataTable columns={columns} data={productVariationTypes} />
    </div>
  ) : (
    <div>No variation type avaiable</div>
  );
};

export default VariationType;
