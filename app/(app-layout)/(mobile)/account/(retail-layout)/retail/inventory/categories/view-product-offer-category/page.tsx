"use client";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { OfferCategory } from "../add-product-offer-category/AddProductOfferCategory";
import { DataTable } from "./DataTabel";
import { columns } from "./Columns";

const ViewProductOfferCategory = () => {
  const { data: offerCategory, isLoading: offerCategoryLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-offers/vendor/offer_category/?page=1")
        .json<OfferCategory[]>();
      return response;
    },
    queryKey: ["offer-cateogry"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return offerCategoryLoader ? (
    <div>Loading...</div>
  ) : !!offerCategory ? (
    <DataTable columns={columns} data={offerCategory} />
  ) : (
    <div>NO Offer Cateogry avaiable</div>
  );
};

export default ViewProductOfferCategory;
