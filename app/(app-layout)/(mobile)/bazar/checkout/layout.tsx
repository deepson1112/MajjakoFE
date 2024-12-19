import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MajjakoDeals | Checkout",
  description: "Best Retail Online Shop",
};

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default CheckoutLayout;
