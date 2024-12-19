import React from "react";

interface PriceProps {
  amount: string | number | undefined;
}

const Price = ({ amount }: PriceProps) => {
  return <span>Rs.{amount ?? "__"}</span>;
};

export default Price;
