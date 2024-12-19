import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { VendorFilter } from "./products/VendorsFilter";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "./products/CategoryFilter";

enum Filter {
  category = "category",
  vendor = "vendor",
}
const FilterProductBy = () => {
  const [currentFilterValue, setCurrentFilterValue] = useState<Filter>(
    Filter.category
  );
  return (
    <>
      <div className="flex items-center justify-between my-1 border-b-[3px] border-gray-200/60">
        <div className="flex items-center gap-6">
          <h2
            onClick={() => setCurrentFilterValue(Filter.category)}
            className={cn(
              currentFilterValue === Filter.category
                ? "border-b-[3px] border-brand text-brand"
                : "",
              " font-semibold tracking-wider -mb-[0.2rem] pb-3 border-b-[3px] cursor-pointer"
            )}
          >
            Category
          </h2>

          <h2
            onClick={() => setCurrentFilterValue(Filter.vendor)}
            className={cn(
              currentFilterValue === Filter.vendor
                ? "border-b-[3px] border-brand text-brand"
                : "",
              " font-semibold tracking-wider -mb-[0.2rem] pb-3 border-b-[3px] cursor-pointer"
            )}
          >
            Vendors
          </h2>
        </div>

        {/* <div className="flex items-center gap-6 -mt-2">
          <Link href={"/"} className="text-sm flex items-center">
            See All <ChevronRight className="text-brand" />
          </Link>
        </div> */}
      </div>
      {currentFilterValue === "category" ? <CategoryFilter /> : null}

      {currentFilterValue === "vendor" ? <VendorFilter /> : null}
    </>
  );
};

export default FilterProductBy;
