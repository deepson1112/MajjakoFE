import React from "react";
import { Discount, RetailDiscount } from "@/types";
import Price from "@/components/Price";

interface ProductPriceProps {
  productPrice: string;
  discount: RetailDiscount;
  discount_amount: number;
  discounted_amount: number;
}

const ProductPrice = ({
  discount,
  discount_amount,
  discounted_amount,
  productPrice,
}: ProductPriceProps) => {
  return discount ? (
    <div className="flex items-center gap-2">
      <span className="text-gray-800 font-semibold text-xl">
        <Price amount={discounted_amount} />
      </span>{" "}
      <span className="flex items-center gap-4 text-sm">
        <span className="line-through text-gray-600 font-medium">
          <Price amount={productPrice} />
        </span>

        <span className="bg-brand font-semibold text-white p-2 rounded-xl text-xs">
          {discount?.discount_percentages}% OFF
        </span>
      </span>
    </div>
  ) : (
    <span className="text-[#484848] font-semibold text-2xl">
      <Price amount={productPrice} />
    </span>
  );
};

export default ProductPrice;
