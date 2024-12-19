// "use client";
// import React from "react";
// import { DataTable } from "./data-table";
// import { columns } from "./columns";
// import { useQuery } from "react-query";
// import { api } from "@/lib/fetcher";
// import { OrderDetails } from "@/types";
// import { Skeleton } from "@/components/ui/Skeleton";

// interface OrderDetailsResponse {
//   count: number;
//   next: string;
//   previous: string;
//   results: OrderDetails[];
//   total_page: number;
// }

// const MyOrdersTable = () => {
//   const { data: myOrders, isLoading: myOrdersLoader } = useQuery({
//     queryFn: async () => {
//       const response = await api()
//         .get("/retail-orders/retail-orders/")
//         .json<OrderDetailsResponse>();
//       return response;
//     },
//     queryKey: ["my-orders"],
//     retry: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//   });

//   return (
//     <div>
//       {myOrdersLoader ? (
//         <div className="w-full flex flex-col space-y-3">
//           <Skeleton className="h-24 w-full" />
//           <Skeleton className="h-24 w-full" />
//           <Skeleton className="h-24 w-full" />
//           <Skeleton className="h-24 w-full" />
//         </div>
//       ) : !!myOrders ? (
//         <DataTable columns={columns} data={myOrders.results} />
//       ) : (
//         <div>NO Orders Available</div>
//       )}
//     </div>
//   );
// };

// export default MyOrdersTable;

"use client";

import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { useSearchParams } from "next/navigation";
import MyOrdersItem from "./MyOrdersItem";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";
import ListLoader from "@/components/loaders/ListLoader";

export type Order = {
  id: number;
  order_id: number;
  order_number: string;
  ordered_products: OrderedProduct[];
};

export interface PaginationOrder {
  count: number;
  total_pages: number;
  next: string;
  previous: string;
  results: Order[];
}

export type OrderedProduct = {
  id: number;
  retail_product_variation_details: RetailProductVariationDetails;
  quantity: number;
  price: number;
  discount_amount: number;
  discounted_amount: number;
  tax_rate: number;
  tax_exclusive_amount: number;
  created_at: string;
  updated_at: string;
  order: number;
  vendor_order: number;
};

export type RetailProductVariationDetails = {
  id: number;
  product: Product;
  description: string;
  price: string;
  specifications: Specifications;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  variation: Variation[];
  variations_image: VariationImage[];
};

type Product = {
  name: string;
};

type Specifications = {
  [key: string]: string;
};

type Variation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

type VariationImage = {
  default_image: string;
  image: string;
};

const DeliveredItems = () => {
  const [page, setPage] = useQueryParamState<string>("page", "1");

  const { data: orders, isLoading: orderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/grouped-ordered-product-user/?page=${page}`)
        .json<PaginationOrder>();
      return response;
    },
    queryKey: [`group-ordered-product`, page],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return orderLoader ? (
    <ListLoader />
  ) : orders && !!orders?.results.length ? (
    <div className="py-4">
      <ul className="space-y-12 mb-2">
        {orders &&
          orders.results.map((order) =>
            !!order?.ordered_products?.length ? (
              <MyOrdersItem
                key={`delivered-order-${order.order_id}`}
                {...order}
              />
            ) : null
          )}
      </ul>
      <PaginationWithLinks
        page={Number(page) || 1}
        pageSize={10}
        totalCount={orders.count}
        setPage={setPage}
      />
    </div>
  ) : (
    <div>No Delivered Items</div>
  );
};

export default DeliveredItems;
