"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface ProductContextType {
  currentProduct: Product | null;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
