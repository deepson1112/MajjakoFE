import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import FilterProductContainer from "./FilterProductContainer";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface FilterProductSheetProps {
  submitFilter: any;
  router: AppRouterInstance;
  variationParams: string[];
  categoryParams: string[];
  subCategoryParams: string[];
  bazarParams: string;
  vendorParams: string;
  maxPriceParams: string[];
  minPriceParams: string[];
}

export function FilterProductSheet({
  submitFilter,
  router,
  variationParams,
  categoryParams,
  subCategoryParams,
  bazarParams,
  vendorParams,
  maxPriceParams,
  minPriceParams,
}: FilterProductSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <Filter className="w-4 h-4 mr-1" /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        {/* <ScrollArea className="h-full px-4"> */}
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Adjust the filters as per the variations
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-8 py-3 my-2">
          <FilterProductContainer
            variationParams={variationParams}
            categoryParams={categoryParams}
            subCategoryParams={subCategoryParams}
            submitFilter={submitFilter}
            router={router}
            bazarParams={bazarParams}
            vendorParams={vendorParams}
            maxPriceParams={maxPriceParams || ""}
            minPriceParams={minPriceParams || ""}
          />
        </div>
        <SheetFooter className="mt-5">
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              See results
            </Button>
          </SheetClose>
        </SheetFooter>
        {/* </ScrollArea> */}
      </SheetContent>
    </Sheet>
  );
}
