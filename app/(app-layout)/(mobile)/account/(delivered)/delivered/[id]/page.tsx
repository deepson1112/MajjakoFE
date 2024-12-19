import React from "react";
import RefundableItem from "./RefundableItem";

interface RefundItemProps {
  params: {
    id: string;
  };
}

const RefundItem = ({ params }: RefundItemProps) => {
  const { id } = params;

  return (
    <div className="my-4 md:my-6">
      <RefundableItem id={id} />
    </div>
  );
};

export default RefundItem;
