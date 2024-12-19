import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MajjakoDeals | Products",
  description: "Best Retail Online Shop",
};

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ProductsLayout;
