import { Ticket } from "lucide-react";
import React from "react";

interface CouponAppliedMessageProps {
  discount_percentages: number;
  discount_amount: number;
  vendorTitle: string;
}

const CouponAppliedMessage = ({
  discount_percentages,
  discount_amount,
  vendorTitle,
}: CouponAppliedMessageProps) => {
  return (
    <span className="px-2 p-1 text-sm flex items-center gap-2 bg-brand/10">
      <Ticket className="text-brand" />
      You got <span className="text-green-600">
        {discount_percentages}%
      </span>{" "}
      discount of <span className="text-green-600">${discount_amount}</span>{" "}
      from {vendorTitle}.
    </span>
  );
};

export default CouponAppliedMessage;
