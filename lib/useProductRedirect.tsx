"use client";

import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

export interface ProductContext {
  product_id: string | undefined;
  product: string | undefined;
  subCat: string | undefined;
}

const ProductContext = createContext<ProductContext | null>(null);

export const ProductRedirectContext = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const product = searchParams.get("is_product") || undefined;
  const product_id = searchParams.get("product__id") || undefined;
  const subCat = searchParams.get("sub__category") || undefined;

  const values: ProductContext = useMemo(
    () => ({ product, product_id, subCat }),
    [product, product_id, subCat]
  );

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

const useProductRedirect = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error(
      "Product Context must be used inside ProductRedirectContext"
    );
  }
  return context;
};

export default useProductRedirect;
