"use client";
import React, { Suspense } from "react";
import ProductDetail from "./ProductDetail";
import useScreenWidth from "@/hooks/useScreenWidth";
import MobileProductDetails from "./MobileProductDetails";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Product } from "@/types";

interface ProductPageProps {
  params: {
    subCategoryId: string;
    productId: string;
  };
  product: Product;
}

const ProductPage = ({ params, product }: ProductPageProps) => {
  const { productId, subCategoryId } = params;
  const { isMobileView } = useScreenWidth();

  return isMobileView ? (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="fixed inset-0 z-50 bg-black/50" />
      <div className="slide-in-top fixed top-10 left-0 w-full h-full bg-white z-[500] shadow-[0_-14px_15px_-3px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="relative h-full w-full">
          <ScrollArea className="h-full overflow-y-auto">
            <MobileProductDetails id={productId} subId={subCategoryId} />
          </ScrollArea>
        </div>
      </div>
    </Suspense>
  ) : (
    <ProductDetail
      id={productId}
      subId={subCategoryId}
      currentProduct={product}
    />
  );
};

export default ProductPage;
