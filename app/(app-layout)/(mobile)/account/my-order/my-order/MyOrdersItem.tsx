import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Order } from "./MyOrdersTable";

const MyOrdersItem = ({
  order_id,
  order_number,
  ordered_products,
  id,
}: Order) => {
  return (
    <li
      key={`delivered-items-${order_id}`}
      className="border border-dotted rounded-lg space-y-3 shadow"
    >
      <div className="p-6">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-80000">Order id:</span>{" "}
          {order_number}
        </p>
        <span className="text-xs font-semibold text-gray-500">
          Number of ordered items: {ordered_products.length}
        </span>
        <div className="flex gap-3 mt-2">
          {ordered_products.map((product) => (
            <div key={`delivered-item-${product.id}`} className="flex flex-row">
              <div key={`product-delivered-${product.id}`}>
                <Image
                  src={
                    product.retail_product_variation_details.variations_image[0]
                      .default_image ||
                    product.retail_product_variation_details.variations_image[0]
                      .image ||
                    ""
                  }
                  alt={`product-image-${product.id}`}
                  height={1000}
                  width={1000}
                  className="aspect-square w-44 rounded-lg object-cover object-center"
                />
              </div>
              {/* )
              )} */}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-t p-4 flex justify-end">
        <div className="space-x-3">
          <Link
            href={`/account/my-order/track/${order_id}`}
            className="border border-red-500 py-1 px-4 rounded-full font-semibold text-red-500"
          >
            Track
          </Link>
          <Link
            href={`/account/my-order/${order_id}`}
            className="border border-green-500 text-green-500 font-semibold py-1 px-4 rounded-full"
          >
            Invoice
          </Link>
        </div>
      </div>
    </li>
  );
};

export default MyOrdersItem;
