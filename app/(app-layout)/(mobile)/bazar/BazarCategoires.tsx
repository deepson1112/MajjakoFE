"use client";

import Image from "next/image";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import * as React from "react";
import SectionHeader from "@/components/SectionHeader";
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

interface BazarCategoiresProps {
  limit: number;
  onlyContainer?: boolean;
}

export function BazarCategoires({
  limit,
  onlyContainer,
}: BazarCategoiresProps) {
  const { data: retailCategories, isLoading: retailCategoriesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          // .get(`/retails/sub-categories/?limit=${limit}`)
          .get(`/retails/category/?limit=${limit}`)
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
      queryKey: [`vendor-department`],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const [numItems, setNumItems] = React.useState(6);

  React.useEffect(() => {
    const updateNumItems = () => {
      if (window.innerWidth >= 1024) setNumItems(16);
      else if (window.innerWidth >= 768) setNumItems(8);
      else setNumItems(8);
    };

    updateNumItems();
    window.addEventListener("resize", updateNumItems);
    return () => window.removeEventListener("resize", updateNumItems);
  }, []);

  const filteredCategories = retailCategories
    ? retailCategories.filter((item) => !!item.image).slice(0, numItems)
    : [];

  return (
    <>
      {onlyContainer ? null : (
        <SectionHeader
          prefixText="Popular"
          highlightText="Categories"
          // href="/bazar/products"
        />
      )}

      <div
        className={`-ml-1 w-full py-2 grid gap-3 ${
          numItems === 16
            ? "grid-cols-8"
            : numItems === 8
            ? "grid-cols-4"
            : "grid-cols-4"
        }`}
      >
        {retailCategoriesLoader
          ? Array.from({ length: numItems }).map((_, index) => (
              <div
                className="w-full pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
                key={`retail-category-loader-${index}`}
              >
                <Skeleton className="inline-flex flex-col items-center gap-3 cursor-pointer">
                  <Skeleton className="relative h-32 w-32 2xl:h-36 2xl:w-36 overflow-hidden bg-gray-200 rounded-lg" />
                  <Skeleton className="text-sm font-semibold text-center h-8 w-full max-w-[200px] line-clamp-1 bg-gray-200" />
                </Skeleton>
              </div>
            ))
          : filteredCategories.map((item) => (
              <Link
                // href={`/bazar/products/?category=${item.id}&subcategory=${item.id}`}
                href={`/bazar/products/?dqs=${encodeFiltersToURLSafe(
                  `category=${item.id}&category_name=${item.department_name}`
                )}`}
                key={`data-${item.id}`}
                className="w-full pl-1 bg-gray-100 rounded-lg hover:shadow hover:shadow-brand"
              >
                <div className="flex flex-col items-center gap-3 cursor-pointer max-w-fit w-full mx-auto py-2">
                  <picture className="relative h-16 w-16 sm:h-28 sm:w-28 overflow-hidden bg-gray-100 rounded-lg">
                    <Image
                      src={item.image || ""}
                      alt={`retail-category-img-${item.department_name}`}
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover object-center"
                    />
                  </picture>

                  <h3 className="text-sm font-medium text-center max-w-[200px] line-clamp-1">
                    {item.department_name}
                  </h3>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
}
