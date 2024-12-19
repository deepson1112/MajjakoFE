import ListLoader from "@/components/loaders/ListLoader";
import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { VendorCategoriesSet } from "@/types/retail";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

type props = {
  router: AppRouterInstance;
  submitFilter: any;
  variationParams: string[];
};
// export default function FilteredCategoryProducts({
//   router,
//   submitFilter,
// }: props) {
//   const { data: retailCategories, isLoading: retailCategoriesLoader } =
//     useQuery({
//       queryFn: async () => {
//         const response = await api()
//           .get("/retails/retail-categories/")
//           .json<VendorCategoriesSet[]>();
//         return response;
//       },
//       queryKey: ["retail-categories"],
//       retry: false,
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//     });

//   const limitedItems = retailCategories
//     ? retailCategories.flatMap((retailCategory) =>
//         retailCategory.vendorcategories_set.map((itm) => ({
//           ...itm,
//           categoryId: retailCategory.id,
//         }))
//       )
//     : [];

//   return retailCategoriesLoader ? (
//     <div className="w-full no-visible-scrollbar gap-x-6 lg:gap-x-12 grid grid-flow-col overflow-x-auto">
//       {Array.from({ length: 7 }).map((_, index) => (
//         <div
//           className="w-full pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
//           key={`retail-category-loader-${index}`}
//         >
//           <div className="inline-flex flex-col items-center gap-3 cursor-pointer">
//             <Skeleton className="relative h-32 w-32 2xl:h-36 2xl:w-36 overflow-hidden bg-gray-200 rounded-full" />

//             <Skeleton className="text-sm font-semibold text-center h-8 w-full max-w-[200px] line-clamp-1" />
//           </div>
//         </div>
//       ))}
//     </div>
//   ) : (
//     limitedItems && (
//       <section className="w-full py-12">
//         <div className="w-full no-visible-scrollbar gap-x-6 lg:gap-x-12 grid grid-flow-col overflow-x-auto">
//           {limitedItems.map((itm, idx) => (
//             <div
//               onClick={() => {
//                 router.push(
//                   `?category=${itm.categoryId}&subcategory=${itm.id}`
//                 );
//                 submitFilter();
//               }}
//               key={`cata-${itm.category_name}`}
//               className="inline-flex flex-col items-center gap-3 cursor-pointer"
//             >
//               <div className="relative h-20 w-20 sm:h-32 sm:w-32 2xl:h-36 2xl:w-36 overflow-hidden bg-gray-200 rounded-full">
//                 {itm.image ? (
//                   <Image
//                     src={itm.image}
//                     alt={itm.category_name || `category-${idx}`}
//                     width={1000}
//                     height={1000}
//                     className="h-full w-full object-cover object-center"
//                   />
//                 ) : (
//                   <div className="rounded-full h-full w-full bg-gray-200"></div>
//                 )}
//               </div>
//               <h3 className="text-sm font-medium md:font-bold text-center max-w-[100px] line-clamp-1">
//                 {itm.category_name}
//               </h3>
//               <p className="text-xs -mt-2 line-clamp-1 font-medium text-slate-500">
//                 {itm.retail_products.length} Products
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     )
//   );
// }

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Category = {
  id: number;
  category_name: string;
  category_slug: string;
  category_description: string | null;
  tax_rate: number;
  tax_exempt: boolean;
  age_restriction: boolean;
  active: boolean;
  categories_order: number;
  image: string | null;
  vendor_type: number;
  department: number | null;
  vendor: number | null;
  hours_schedule: string | null;
};

export function FilteredCategoryProducts({
  router,
  submitFilter,
  variationParams,
}: props) {
  const { data: retailCategories, isLoading: retailCategoriesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get("/retails/sub-categories/")
          .json<Category[]>();
        return response;
      },
      queryKey: ["retail-sub-categories"],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  return (
    <Carousel className="w-full">
      <div className="flex items-center justify-between my-1 border-b-[3px] border-gray-200/60">
        <h2 className="text-gray-600 font-semibold tracking-wider -mb-[0.2rem] pb-3 border-b-[3px] border-brand">
          Shop From <span className="text-brand"> Top Categories</span>
        </h2>

        <div className="flex items-center gap-6 -mt-2">
          <span className="text-sm hidden md:inline-block">See All</span>
          <div className="flex items-center justify-end gap-4">
            <CarouselPrevious className="static translate-x-0 translate-y-0 left" />
            <CarouselNext className="static translate-x-0 translate-y-0" />
          </div>
        </div>
      </div>

      <CarouselContent className="-ml-1 w-full py-2">
        {retailCategoriesLoader
          ? Array.from({ length: 7 }).map((_, index) => (
              <div
                className="w-full pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
                key={`retail-category-loader-${index}`}
              >
                <div className="inline-flex flex-col items-center gap-3 cursor-pointer">
                  <Skeleton className="relative h-32 w-32 2xl:h-36 2xl:w-36 overflow-hidden bg-gray-200 rounded-full" />

                  <Skeleton className="text-sm font-semibold text-center h-8 w-full max-w-[200px] line-clamp-1" />
                </div>
              </div>
            ))
          : !!retailCategories &&
            retailCategories
              .filter((item) => !!item.image)
              .map((item) => (
                <CarouselItem
                  key={`data-${item.id}`}
                  className="w-full pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div
                    onClick={() => {
                      router.push(
                        `?category=${item.department}&subcategory=${item.id}`
                      );
                      submitFilter();
                    }}
                    className="inline-flex flex-col items-center gap-3 cursor-pointer "
                  >
                    <div className="relative h-20 w-20 sm:h-32 sm:w-32 2xl:h-36 2xl:w-36 overflow-hidden bg-gray-200 rounded-full">
                      <Image
                        src={item.image || ""}
                        alt={`retail-category-img-${item.category_name}`}
                        width={1000}
                        height={1000}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <h3 className="text-sm font-medium md:font-bold text-center max-w-[200px] line-clamp-1">
                      {item.category_name}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
      </CarouselContent>
    </Carousel>
  );
}
