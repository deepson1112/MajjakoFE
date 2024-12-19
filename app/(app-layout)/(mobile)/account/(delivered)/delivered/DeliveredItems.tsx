"use client";

import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import Image from "next/image";
import { RefundDialog } from "./[id]/RefundDialog";
import { ReviewDialog } from "./[id]/ReviewDialog";
import ListLoader from "@/components/loaders/ListLoader";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";

type RetailProductVariationDetails = {
  id: number;
  product: {
    name: string;
  };
  description: string | null;
  price: string;
  specifications: string | null;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  disabled: boolean;
  variation: any[];
  variations_image: {
    default_image: string;
    image: string;
  }[];
};

type Status = {
  id: number;
  status: {
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    status_code: string;
  };
  delivery_driver: {
    id: number;
    name: string;
    primary_phone_number: string;
    secondary_phone_number: string;
    vehicle_model: string;
    vehicle_number: string;
    license_number: string;
  } | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  closed: boolean;
  ordered_product: number;
  created_by: number;
};

type LoyaltyDiscount = {
  program_name: string;
  program_code: string;
  no_of_points: number | null;
  discount_percentages: number | null;
  maximum_redeem_amount: number | null;
  minimum_spend_amount: number | null;
  disabled: boolean;
};

export type ProductDetails = {
  id: number;
  retail_product_variation_details: RetailProductVariationDetails;
  status: Status[];
  loyalty_discount: LoyaltyDiscount;
  coupon_discount: number;
  total_discounted_amount: number;
  tax_amount: number;
  quantity: number;
  price: number;
  discount_amount: number;
  discounted_amount: number;
  tax_rate: number;
  tax_exclusive_amount: number;
  created_at: string;
  updated_at: string;
  ordered_product_status: string;
  order: number;
  vendor_order: number;
  review: {
    created_date: string;
    description: string;
    id: number;
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    is_approved: boolean;
    ordered_product: number;
    rating: number;
    reply: string | null;
    updated_date: string;
    user: number;
  } | null;
};

const DeliveredItems = () => {
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const { data: orders, isRefetching: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          `/retail-orders/ordered-product-user/?ordered_product_status=Completed&page=${page}`
        )
        .json<{ results: ProductDetails[]; count: number }>();
      return response;
    },
    queryKey: [`ordered-product-completed`, page],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return orderLoader ? (
    <ListLoader />
  ) : orders && !!orders?.results.length ? (
    <div>
      <ul className="space-y-12">
        <>
          {orders.results.map((item, index) => (
            <li
              key={`refundable-list-${index}`}
              className="border border-dotted rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex items-start space-x-4">
                <picture>
                  <Image
                    src={
                      item?.retail_product_variation_details
                        ?.variations_image[0].default_image ||
                      item?.retail_product_variation_details
                        ?.variations_image[0].image ||
                      ""
                    }
                    alt="image"
                    width={1000}
                    height={1000}
                    className="aspect-square w-24 md:w-32 rounded-lg"
                  />
                </picture>

                <div className="space-y-2">
                  <h3 className="text-base md:text-xl">
                    {item?.retail_product_variation_details?.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item?.retail_product_variation_details?.variation
                      .map(
                        (item) =>
                          ` ${item.variation_type_name}: ${item.variation_name} `
                      )
                      .join(",")}
                  </p>
                  <span className="text-gray-600 text-sm">
                    Rs.
                    {item?.retail_product_variation_details?.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-between h-full">
                <RefundDialog
                  quantity={item.quantity}
                  product_variation={item?.retail_product_variation_details?.id}
                  order_id={item?.order}
                />

                <ReviewDialog id={item?.id} review={item.review} />
              </div>
            </li>
          ))}
          <PaginationWithLinks
            page={Number(page) || 1}
            pageSize={10}
            totalCount={orders.count}
            setPage={setPage}
          />
        </>
      </ul>
    </div>
  ) : (
    <div>No Delivered Items</div>
  );
};

export default DeliveredItems;
