import React from "react";
import MyOrdersTable from "./my-order/MyOrdersTable";

const MyOrderPage = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-900">My Orders</h2>
      </div>
      <MyOrdersTable />
    </div>
  );
};

export default MyOrderPage;
