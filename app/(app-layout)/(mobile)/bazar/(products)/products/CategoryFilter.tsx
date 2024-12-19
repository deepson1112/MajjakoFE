"use client";

import Image from "next/image";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { encodeFiltersToURLSafe } from "@/lib/utils";

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

export function CategoryFilter() {
  const { data: retailCategories, isLoading: retailCategoriesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          // .get(`/retails/sub-categories/?limit=${limit}`)
          // .get(`/retails/category/?limit=12`)
          .get(`/retails/category/`)
          .json<
            {
              age_restriction: boolean;
              department_name: string;
              department_slug: string;
              hours_schedule?: string;
              id: number;
              tax_exempt: boolean;
              tax_rate: number;
              image: string | null;
            }[]
          >();
        return response;
      },
      queryKey: [`retail-sub-categories`],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  // const [numItems, setNumItems] = React.useState(6);

  // React.useEffect(() => {
  //   const updateNumItems = () => {
  //     if (window.innerWidth >= 1024) setNumItems(12);
  //     else if (window.innerWidth >= 768) setNumItems(8);
  //     else setNumItems(6);
  //   };

  //   updateNumItems();
  //   window.addEventListener("resize", updateNumItems);
  //   return () => window.removeEventListener("resize", updateNumItems);
  // }, []);

  return (
    <Carousel
      className="my-2"
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent>
        {retailCategoriesLoader
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                className="w-full pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
                key={`retail-category-loader-${index}`}
              >
                <div className="inline-flex flex-col items-center gap-3 cursor-pointer">
                  <Skeleton className="relative h-32 w-32 2xl:h-36 2xl:w-36 overflow-hidden bg-gray-200 rounded-lg" />

                  <Skeleton className="text-sm font-semibold text-center h-8 w-full max-w-[200px] line-clamp-1" />
                </div>
              </div>
            ))
          : retailCategories?.map((cat) => (
              <CarouselItem
                key={`data-vendor-${cat.id}`}
                className="min-w-0 shrink-0 grow-0 pl-3 lg:pl-4 basis-1/4 md:basis-1/6 lg:basis-[12.5%]"
              >
                <div
                  // href={`/bazar/products?vendor=${vendor.id}`}
                  className="w-full p-1 bg-gray-100 rounded-lg hover:shadow"
                >
                  <Link
                    // href={`/bazar/products/?category=${cat.id}&subcategory=${cat.id}`}
                    href={`/bazar/products?dqs=${encodeFiltersToURLSafe(
                      `category=${cat.id}&category_name=${cat.department_name}`
                    )}`}
                  >
                    <div className="flex flex-col items-center gap-3 cursor-pointer max-w-fit w-full mx-auto py-1 lg:py-2">
                      <picture className="relative h-16 w-16 sm:h-28 sm:w-28 overflow-hidden bg-gray-100 rounded-lg">
                        <Image
                          src={cat.image || ""}
                          alt={`vendor-category-img-${cat.department_name}`}
                          width={1000}
                          height={1000}
                          className="h-full w-full object-cover object-center"
                        />
                      </picture>

                      <h3 className="text-xs md:text-sm font-medium text-center max-w-[200px] line-clamp-1">
                        {cat.department_name}
                      </h3>
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
