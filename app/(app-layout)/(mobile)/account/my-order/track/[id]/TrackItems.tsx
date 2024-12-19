"use client";
import Price from "@/components/Price";
import { buttonVariants } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Order } from "../../my-order/MyOrdersTable";
import { useQueryParamState } from "@/hooks/useQueryParamState";

type ProductVariation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

type ProductImage = {
  default_image: string;
  image: string;
};

type RetailProductVariationDetails = {
  id: number;
  product: {
    name: string;
  };
  description: string;
  price: string;
  specifications: Record<string, string>;
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  variation: ProductVariation[];
  variations_image: ProductImage[];
};

type StatusDetail = {
  status: string;
};

export type DeliveryDriverDetail = {
  id: number;
  name: string;
  primary_phone_number: string;
  secondary_phone_number: string;
  vehicle_model: string;
  vehicle_number: string;
  license_number: string;
};

type Status = {
  id: number;
  status: StatusDetail;
  description: string;
  created_at: string;
  updated_at: string;
  ordered_product: number;
  closed: boolean;
  delivery_driver: DeliveryDriverDetail;
};

export type OrderItem = {
  id: number;
  retail_product_variation_details: RetailProductVariationDetails;
  status: Status[];
  quantity: number;
  price: number;
  discount_amount: number;
  discounted_amount: number;
  coupon_discount: number;
  tax_amount: number;
  total_discounted_amount: number;
  tax_rate: number;
  tax_exclusive_amount: number;
  created_at: string;
  updated_at: string;
  order: number;
  vendor_order: number;
};

// type RetailOrderVendor = {
//   id: number;
//   ordered_product_details: OrderItem[];
//   tax_exclusive_amount: number;
//   total_amount: number;
//   total_discount_amount: number;
//   total_tax: number;
//   vendor_coupon_discount: number;
//   admin_coupon_discount: number;
//   vendor: number;
//   order: number;
//   coupon_used: any | null;
// };

// type Variation = {
//   id: number;
//   variation_name: string;
//   variation_type: number;
//   variation_type_name: string;
// };

// type Product = {
//   id: number;
//   vendor_id: number;
//   vendor_name: string;
//   product_name: string;
// };

// type RetailProductVariation = {
//   id: number;
//   sku: string;
//   price: string;
//   product: Product[];
//   discount: any | null;
//   variation: Variation[];
//   tax_amount: number;
//   description: string;
//   created_date: string;
//   updated_date: string;
//   customer_type: string;
//   specifications: {
//     [key: string]: string;
//   };
//   stock_quantity: number;
//   tax_percentage: number;
//   variations_image: {
//     default_image: string;
//   }[];
//   tax_exclusive_price: number;
// };

// type CartItem = {
//   id: number;
//   user: number;
//   active: boolean;
//   cart_id: string;
//   quantity: number;
//   created_at: string;
//   updated_at: string;
//   receiver_name: string | null;
//   shared_wishlist: string | null;
//   special_request: string | null;
//   retail_product_variation: RetailProductVariation;
// };

// type Vendor = {
//   items: CartItem[];
//   total: number;
//   discount: number;
//   subtotal: number;
//   vendor_id: number;
//   vendor_name: string;
//   coupon_discount: number;
//   admin_coupon_discount: number;
//   vendor_coupon_details: any | null;
//   vendor_coupon_discount: number;
// };

// type CartData = {
//   total: number;
//   vendors: Vendor[];
//   discount: number;
//   subtotal: number;
//   coupon_details: any | null;
//   coupon_discount: number;
//   loyalty_discount_amount: number;
// };

// type Order = {
//   id: number;
//   retail_order_vendor: RetailOrderVendor[];
//   order_number: string;
//   first_name: string;
//   last_name: string;
//   phone: string;
//   email: string;
//   address: string | null;
//   country: string | null;
//   state: string | null;
//   city: string | null;
//   pin_code: string | null;
//   order_payment_code: string;
//   total: number;
//   tax_data: any | null;
//   total_data: any | null;
//   total_tax: number;
//   delivery_charge: number;
//   is_ordered: boolean;
//   status: string;
//   payment_method: string;
//   loyalty_points_received: number;
//   cart_data: CartData;
//   created_at: string;
//   updated_at: string;
//   user: number;
//   payment: any | null;
//   loyalty_program: any | null;
//   vendors: number[];
//   carts: number[];
// };

const TrackItems = ({ id }: { id: string }) => {
  const { data: retailOrder, isLoading: retailOrderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/grouped-ordered-product-user/?order=${id}`)
        .json<Order[]>();
      return response;
    },
    queryKey: [`retail-order-${id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("ReailOrder", retailOrder);

  return retailOrderLoader ? (
    <div>Loading...</div>
  ) : !!retailOrder ? (
    <>
      <ul className="space-y-3">
        {retailOrder &&
          retailOrder[0]?.ordered_products.length &&
          retailOrder[0]?.ordered_products?.map((vendor, index) => (
            <li
              key={`refundable-list-${index}`}
              className="border border-dotted rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex items-start space-x-4">
                <picture>
                  <Image
                    src={
                      vendor.retail_product_variation_details
                        .variations_image[0].default_image ||
                      vendor.retail_product_variation_details
                        .variations_image[0].image
                    }
                    alt="image"
                    width={1000}
                    height={1000}
                    className="aspect-square w-32 object-cover object-center rounded-lg"
                  />
                </picture>
                <div className="space-y-2">
                  <h3 className="text-xl">
                    {vendor.retail_product_variation_details.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {vendor.retail_product_variation_details.variation
                      .map(
                        (value) =>
                          ` ${value.variation_type_name}: ${value.variation_name} `
                      )
                      .join(",")}
                  </p>
                  <span className="text-gray-600 text-sm">
                    <Price
                      amount={vendor.retail_product_variation_details.price}
                    />
                  </span>
                </div>
              </div>

              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href={`/account/my-order/track/${id}/${vendor.id}`}
              >
                Track
              </Link>
            </li>
          ))}
      </ul>
      {/* <PaginationWithLinks
        page={Number(page) || 1}
        pageSize={10}
        totalCount={retailOrder.count}
        setPage={setPage}
      /> */}
    </>
  ) : null;
};

export default TrackItems;
