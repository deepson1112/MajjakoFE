"use client";
import CartImage from "@/app/(app-layout)/(mobile)/cart/CartImage";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import ListLoader from "@/components/loaders/ListLoader";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import { Minus, Trash2, X } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import WishlistCartCheckoutButton from "./WishlistCartCheckoutButton";
import Price from "@/components/Price";

type Product = {
  id: number;
  product_name: string;
  vendor_id: number;
  vendor_name: string;
};

type Variation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

type Specifications = {
  Size: string;
  Style: string;
  Colors: string;
  Material: string;
};

type VariationImage = {
  default_image: string;
};

type RetailProductVariation = {
  id: number;
  product: Product[];
  variation: Variation[];
  price: string;
  description: string;
  specifications: Specifications;
  stock_quantity: number;
  sku: string;
  tax_percentage: number;
  tax_amount: number;
  tax_exclusive_price: number;
  created_date: string;
  updated_date: string;
  variations_image: VariationImage[];
  customer_type: string;
  discount: string | null;
  discounted_amount: number;
};

type Item = {
  id: number;
  retail_product_variation: RetailProductVariation;
  cart_id: string;
  special_request: string | null;
  receiver_name: string | null;
  active: boolean;
  quantity: number;
  created_at: string;
  updated_at: string;
  user: number;
  shared_wishlist: number;
};

type Vendor = {
  vendor_id: number;
  vendor_name: string;
  vendor_coupon_details: string | null;
  items: Item[];
  subtotal: number;
  discount: number;
  "coupon-discount": number;
  total: number;
  vendor_coupon_discount: number;
  admin_coupon_discount: number;
};

export type WishlistCart = {
  vendors: Vendor[];
  subtotal: number;
  discount: number;
  "coupon-discount": number;
  total: number;
  coupon_details: string | null;
};

interface WishCartsProps {
  uuid: string;
}

const WishlistsCart = ({ uuid }: WishCartsProps) => {
  const { data: wishlistCartItems, isLoading: wishlistCartItemsLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(
            `/retail-marketplace/retail-sub-total-calculations/?shared_wishlist=${uuid}`
          )
          .json<WishlistCart>();
        return response;
      },
      queryKey: ["wishlists-cart"],
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  console.log("WishlistCart", wishlistCartItems);

  return wishlistCartItemsLoader ? (
    <ListLoader />
  ) : (
    <div className="flex flex-col gap-2">
      <ul className=" bg-gray-100 w-full max-h-[25rem] overflow-y-auto rounded-md py-2 px-3 divide-y">
        {!!wishlistCartItems?.vendors.length ? (
          wishlistCartItems?.vendors.map((vendor) =>
            vendor.items.map((item) => (
              <li
                className="flex py-6 relative"
                key={`retail-cart-list-${item.id}`}
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <CartImage
                    discount={Number(
                      `${item.retail_product_variation?.discount}`
                    )}
                    img={
                      item.retail_product_variation.variations_image[0]
                        .default_image
                    }
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="text-base font-semibold text-gray-900">
                        {item.retail_product_variation.product[0].product_name}
                      </h3>

                      <div className="shrink-0 w-28 sm:order-2 sm:ml-8 sm:text-right flex flex-col">
                        <Price
                          amount={
                            item.retail_product_variation?.discount
                              ? item.retail_product_variation?.discounted_amount
                              : item.retail_product_variation.price
                          }
                        />

                        {item.retail_product_variation.discount ? (
                          <span className="text-xs text-semibold text-gray-600 line-through">
                            <Price
                              amount={item.retail_product_variation.price}
                            />
                          </span>
                        ) : (
                          <div className="text-gray-100">No Discount</div>
                        )}
                      </div>
                    </div>
                    <p className="-mt-3 text-sm text-gray-500 line-clamp-2">
                      {item.retail_product_variation.variation
                        .map(
                          (item) =>
                            ` ${item.variation_type_name}: ${item.variation_name} `
                        )
                        .join(",")}
                    </p>
                  </div>
                </div>
                <DeleteConfirmation
                  deleteTitle={"Cart items"}
                  id={item.id}
                  tag="wishlists-cart"
                  url="/retail-marketplace/retail-cart/"
                  icon
                  iconJsx={<X className="w-2 h-2" />}
                />
              </li>
            ))
          )
        ) : (
          <div className="py-8 px-2">
            <div>No wishlist item accepted.</div>
          </div>
        )}
      </ul>

      <div className="flex flex-col items-stretch">
        <div className="border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Subtotal</p>
            <p className="text-sm font-semibold text-gray-900">
              <Price amount={wishlistCartItems?.subtotal} />
            </p>
          </div>

          {wishlistCartItems?.discount ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Discount</p>
              <p className="text-sm font-semibold text-gray-900">
                <span className="text-red-500">-</span>
                {wishlistCartItems.discount}
              </p>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total</p>
            <p className="text-sm font-semibold text-gray-900">
              <Price amount={wishlistCartItems?.total} />
            </p>
          </div>

          <WishlistCartCheckoutButton uuid={uuid} />
        </div>
      </div>
    </div>
  );
};

export default WishlistsCart;
