import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";
import ProductSkeleton from "../../ProductSkeleton";

const ProductsLoader = () => {
  return (
    <MaxWidthWrapper className="my-6 md:my-8 lg:my-10 space-y-10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col items-start gap-5">
          <Skeleton className="max-w-[auto] w-full aspect-[1/1] h-96" />
          <div className="w-full grid grid-cols-5 gap-2">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col gap-4">
          <Skeleton className="w-20 h-7" />
          <Skeleton className="w-36 h-7" />
          <Skeleton className="w-full h-28" />
          <Skeleton className="w-20 h-7" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="max-w-md w-full mx-auto grid grid-cols-3 gap-2">
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-9" />
        </div>
        <Skeleton className="w-full h-28" />
      </div>

      <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {new Array(5).fill(null).map((_, i) => (
          <div
            className="basis-1/3 md:basis-1/4 lg:basis-1/5"
            key={`product-${i}`}
          >
            <div>
              <ProductSkeleton key={`ProductSkeleton-${i}`} />
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsLoader;
