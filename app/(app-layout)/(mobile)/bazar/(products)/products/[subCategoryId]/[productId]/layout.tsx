export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MajjakoDeals | Products",
  description: "Best Retail Online Shop",
};

import { Metadata } from "next";
import React, { Suspense } from "react";
import ProductsLoader from "./ProductsLoader";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<ProductsLoader />}>{children}</Suspense>;
};

export default ProductLayout;
