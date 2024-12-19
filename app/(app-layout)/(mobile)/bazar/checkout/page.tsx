import React, { Suspense } from "react";
import CheckoutRender from "./CheckoutRender";
import ProductsLoader from "../(products)/products/[subCategoryId]/[productId]/ProductsLoader";

const CheckoutPage = () => {
  return (
    <Suspense fallback={<ProductsLoader />}>
      <CheckoutRender />;
    </Suspense>
  );
};

export default CheckoutPage;
