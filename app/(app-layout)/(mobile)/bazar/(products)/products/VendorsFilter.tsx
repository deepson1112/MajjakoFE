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
import { Vendor } from "@/components/mainlanding/BazarSection";
import Link from "next/link";
import { encodeFiltersToURLSafe } from "@/lib/utils";

export function VendorFilter() {
  const { data: retailCategories, isLoading: retailCategoriesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          // .get(`/vendor/vendor/?vendor_type=2&limit=10`)
          .get(`/vendor/vendor/?vendor_type=2`)
          .json<Vendor[]>();
        return response;
      },
      queryKey: [`retail-vendors-vendor`],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const [numItems, setNumItems] = React.useState(6);

  React.useEffect(() => {
    const updateNumItems = () => {
      if (window.innerWidth >= 1024) setNumItems(12);
      else if (window.innerWidth >= 768) setNumItems(8);
      else setNumItems(6);
    };

    updateNumItems();
    window.addEventListener("resize", updateNumItems);
    return () => window.removeEventListener("resize", updateNumItems);
  }, []);

  // const filteredCategories = retailCategories
  //   ? retailCategories
  //       .filter((item) => !!item.vendor_cover_image)
  //       .slice(0, numItems)
  //   : [];

  return (
    <Carousel
      className="my-2"
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent>
        {retailCategoriesLoader
          ? Array.from({ length: numItems }).map((_, index) => (
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
          : retailCategories &&
            retailCategories.map((vendor) => (
              <CarouselItem
                key={`data-vendor-${vendor.vendor_name}`}
                className="min-w-0 shrink-0 grow-0 pl-3 lg:pl-4 basis-1/4 md:basis-1/6 lg:basis-[12.5%]"
              >
                <div className="w-full p-1 bg-gray-100 rounded-lg hover:shadow">
                  <Link
                    href={`/bazar/products/?dqs=${encodeFiltersToURLSafe(
                      "vendor=" + vendor.id
                    )}`}
                  >
                    <div className="flex flex-col items-center gap-3 cursor-pointer max-w-fit w-full mx-auto py-1 lg:py-2">
                      <picture className="relative h-16 w-16 sm:h-28 sm:w-28 overflow-hidden bg-gray-100 rounded-lg">
                        <Image
                          src={vendor.vendor_cover_image || ""}
                          alt={`retail-vendor-img-${vendor.vendor_name}`}
                          width={1000}
                          height={1000}
                          className="h-full w-full object-cover object-center"
                        />
                      </picture>

                      <h3 className="text-xs md:text-sm font-medium text-center max-w-[200px] line-clamp-1">
                        {vendor.vendor_name}
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
