import React from "react";
import OrdersContainer from "./ordersContainer";

const CouponPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold tracking-tight mb-4">Orders</h2>
      <OrdersContainer />
    </div>
  );
};

export default CouponPage;
