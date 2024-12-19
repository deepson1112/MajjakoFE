import React, { Suspense } from "react";
import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { retailMenuFoodTabNavigation } from "@/lib/Constants";

const ProductsItemsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <Suspense fallback={<p>Loading...</p>}>
    <div>
      <div className="overflow-hidden">
        <AnimatedTabs tabs={retailMenuFoodTabNavigation} />
      </div>
      {children}
    </div>
    // </Suspense>
  );
};

export default ProductsItemsLayout;
