"use client";

import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./product-reviews-table/data-table";
import { columns } from "./product-reviews-table/columns";
import ListLoader from "@/components/loaders/ListLoader";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  image: string | null;
};

export type Review = {
  id: number;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  description: string;
  rating: number;
  reply: string | null;
  is_approved: boolean;
  created_date: string;
  updated_date: string;
  ordered_product: {
    ordered_product_id: number;
    product_id: number;
    product_name: string;
  };
  user: User;
};

const ProductReviews = () => {
  const { data: productReviews, isLoading: productReviewsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/review/vendor-review/")
        .json<Review[]>();
      return response;
    },
    queryKey: ["vendor-review"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return productReviewsLoader ? (
    <ListLoader />
  ) : !!productReviews?.length ? (
    <DataTable columns={columns} data={productReviews} />
  ) : (
    <div className="text-center py-12">
      <h6>No Reviews available.</h6>
    </div>
  );
};

export default ProductReviews;
