"use client";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { RefundDialog } from "./RefundDialog";
import { ReviewDialog } from "./ReviewDialog";

type RetailOrderVendor = {
  id: number;
  ordered_product_details: any[];
  tax_exclusive_amount: number;
  total_amount: number;
  total_discount_amount: number;
  total_tax: number;
  vendor_coupon_discount: number;
  admin_coupon_discount: number;
  vendor: number;
  order: number;
  coupon_used: any | null;
};

type Variation = {
  id: number;
  variation_name: string;
  variation_type: number;
  variation_type_name: string;
};

type Product = {
  id: number;
  vendor_id: number;
  vendor_name: string;
  product_name: string;
};

type RetailProductVariation = {
  id: number;
  sku: string;
  price: string;
  product: Product[];
  discount: any | null;
  variation: Variation[];
  tax_amount: number;
  description: string;
  created_date: string;
  updated_date: string;
  customer_type: string;
  specifications: {
    [key: string]: string;
  };
  stock_quantity: number;
  tax_percentage: number;
  variations_image: {
    default_image: string;
  }[];
  tax_exclusive_price: number;
};

type CartItem = {
  id: number;
  user: number;
  active: boolean;
  cart_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  receiver_name: string | null;
  shared_wishlist: string | null;
  special_request: string | null;
  retail_product_variation: RetailProductVariation;
};

type Vendor = {
  items: CartItem[];
  total: number;
  discount: number;
  subtotal: number;
  vendor_id: number;
  vendor_name: string;
  coupon_discount: number;
  admin_coupon_discount: number;
  vendor_coupon_details: any | null;
  vendor_coupon_discount: number;
};

type CartData = {
  total: number;
  vendors: Vendor[];
  discount: number;
  subtotal: number;
  coupon_details: any | null;
  coupon_discount: number;
  loyalty_discount_amount: number;
};

export type Order = {
  id: number;
  retail_order_vendor: RetailOrderVendor[];
  order_number: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  pin_code: string | null;
  order_payment_code: string;
  total: number;
  tax_data: any | null;
  total_data: any | null;
  total_tax: number;
  delivery_charge: number;
  is_ordered: boolean;
  status: string;
  payment_method: string;
  loyalty_points_received: number;
  cart_data: CartData;
  created_at: string;
  updated_at: string;
  user: number;
  payment: any | null;
  loyalty_program: any | null;
  vendors: number[];
  carts: number[];
};

const RefundableItem = ({ id }: { id: string }) => {
  const { data: retailOrder, isLoading: retailOrderLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-orders/retail-orders/?order_number=${id}`)
        .json<Order>();
      return response;
    },
    queryKey: [`retail-order-${id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("Retail Order", retailOrder);

  return retailOrderLoader ? (
    <div>Loading...</div>
  ) : !!retailOrder ? (
    <ul className="space-y-3">
      {retailOrder.cart_data.vendors.map((vendor, index) =>
        vendor.items.map((item) => (
          <li
            key={`refundable-list-${index}`}
            className="border border-dotted rounded-lg p-4 flex items-start justify-between"
          >
            <div className="flex items-start space-x-4">
              <picture>
                <Image
                  src={
                    item.retail_product_variation.variations_image[0]
                      .default_image
                  }
                  alt="image"
                  width={1000}
                  height={1000}
                  className="aspect-square w-24 md:w-32 rounded-lg"
                />
              </picture>

              <div className="space-y-2">
                <h3 className="text-base md:text-xl">
                  {item.retail_product_variation.product[0].product_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.retail_product_variation.variation
                    .map(
                      (item) =>
                        ` ${item.variation_type_name}: ${item.variation_name} `
                    )
                    .join(",")}
                </p>
                <span className="text-gray-600 text-sm">
                  ${item.retail_product_variation.price}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-between h-full">
              <RefundDialog
                quantity={item.quantity}
                product_variation={item.retail_product_variation.id}
                order_id={retailOrder.id}
              />
              {/* @ts-ignore */}
              <ReviewDialog id={item.retail_product_variation.product[0].id} />
            </div>
          </li>
        ))
      )}
    </ul>
  ) : null;
};

export default RefundableItem;
