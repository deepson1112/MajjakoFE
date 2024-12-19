import Price from "@/components/Price";
import React from "react";

interface CartPriceProps {
  addonsPrice?: number;
  actualPrice: number;
  addonsCost: number;
  discountedAmount: number;
  discount?: number;
}

const CartPrice = ({
  addonsPrice,
  discount,
  actualPrice,
  addonsCost,
  discountedAmount,
}: CartPriceProps) => {
  if (discount) {
    const originalPrice = actualPrice + addonsCost;
    const discountedPrice = discountedAmount + addonsCost;

    return (
      <p
        className=" text
      -sm text-gray-900 text-right"
      >
        <span className="font-semibold">
          <Price amount={discountedPrice.toFixed(2)} />{" "}
        </span>{" "}
        <span className="line-through text-gray-400 text-sm">
          <Price amount={originalPrice.toFixed(2)} />
        </span>
      </p>
    );
  }
  return (
    <p
      className="text
    -sm font-semibold text-gray-900 text-right"
    >
      <Price amount={(actualPrice + addonsCost).toFixed(2)} />
    </p>
  );
};

export default CartPrice;
