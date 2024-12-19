import React from "react";
import RefundedItems from "./RefundedItems";

const RefundedPage = () => {
  return (
    <div className="p-3">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Refunded Requests
      </h2>
      <RefundedItems />
    </div>
  );
};

export default RefundedPage;
