import React from "react";
import AddWishListToCart from "./AddWishListToCart";
import Image from "next/image";
import { WishlistItem } from "@/types";
import Price from "@/components/Price";

interface WishlistBodyProps {
  wishlist: WishlistItem;
  id: number;
  isAccepted: boolean;
}

const WishlistBody = ({ wishlist, id, isAccepted }: WishlistBodyProps) => {
  console.log("IsAccepted", isAccepted);
  return (
    <>
      <tr key={`whislist-item-${wishlist.id}`}>
        <td className="py-4 px-6 border-b border-gray-200 flex items-center gap-6">
          <Image
            src={
              wishlist.retail_product_variation_details.variations_image[0]
                .default_image ||
              wishlist.retail_product_variation_details.variations_image[0]
                .image
            }
            alt="product-image"
            width={1000}
            height={100}
            className="w-28 aspect-[1/1] object-cover object-center rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <h6>{wishlist.product_name}</h6>
            <p className="-mt-3 text-sm text-gray-500 line-clamp-2">
              {wishlist.retail_product_variation_details.variation
                .map(
                  (item) =>
                    ` ${item.variation_type_name}: ${item.variation_name} `
                )
                .join(",")}
            </p>
          </div>
        </td>
        <td className="py-4 px-6 border-b border-gray-200 truncate">
          <Price amount={wishlist.retail_product_variation_details.price} />
        </td>
        {/* <td className="py-4 px-6 border-b border-gray-200">
          {!!wishlist.retail_product_variation_details.stock_quantity ? (
            <span className="bg-green-500 text-white rounded-full px-3">
              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white rounded-full px-3">
              Out of stock
            </span>
          )}
        </td> */}
        <td className="py-4 px-6 border-b border-gray-200">
          <span className="text-black py-1 px-2 rounded-full text-xs">
            <AddWishListToCart
              shared_wishlist={id}
              retail_product={
                wishlist.retail_product_variation_details
                  .product as unknown as number
              }
              retail_product_variation={
                wishlist.retail_product_variation_details.id
              }
              isAccepted={isAccepted}
              isBought={!!wishlist.buyer}
            />
          </span>
        </td>
      </tr>
    </>
  );
};

export default WishlistBody;
