"use client";

import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import * as React from "react";
import SectionHeader from "@/components/SectionHeader";
import Price from "@/components/Price";
import { Tags } from "lucide-react";
import { ProductShortResponse } from "./(products)/products/Products";
import ProductRatings from "./(products)/products/[subCategoryId]/[productId]/ProductsRatings";

export function BazarProducts() {
  const { data: retailCategories, isLoading: retailCategoriesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get("/retails/retail-product-list/?page=1")
          .json<ProductShortResponse>();
        return response;
      },
      queryKey: ["retail-product-list"],
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

  const filteredCategories = retailCategories?.results
    ? retailCategories.results.slice(0, numItems)
    : [];

  return (
    <>
      <SectionHeader
        prefixText="Popular"
        highlightText="Products"
        href="/bazar/products"
      />

      <div
        className={`-ml-1 w-full py-2 grid gap-3 ${
          numItems === 12
            ? "grid-cols-6"
            : numItems === 8
            ? "grid-cols-4"
            : "grid-cols-3"
        }`}
      >
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
          : filteredCategories.map((item, index) => {
              const discountedPrice =
                item.discounted_amount === 0 ? null : item.discounted_amount;
              return (
                <Link
                  key={`landing-products-${item.name}`}
                  href={`/bazar/products/${item.category}/${item.id}`}
                  className="relative w-full max-w-sm p-2 md:p-4 mx-auto bg-white rounded-md border hover:shadow"
                >
                  {!!item.discount_percentage ? (
                    <div className="absolute top-2 left-0 flex items-center gap-2 px-2 py-1 text-xs sm:text-base border-[1px] text-white bg-[#009900] rounded-3xl font-medium">
                      <Tags className="text-white h-5 w-5" />
                      <span className="text-sm">
                        <span className="font-semibold">
                          {item.discount_percentage}%
                        </span>{" "}
                        OFF
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-center">
                    <img
                      src={item.default_image || item.image_1 || ""}
                      alt="Product Image"
                      width={200}
                      height={200}
                      className="aspect-square object-cover bg-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-sm font-medium text-left max-w-[200px] line-clamp-2 tracking-wide">
                      {item.name}
                    </h2>
                    <div className="flex justify-between">
                      <p className="mt-1 text-brand text-[0.860rem] line-clamp-1">
                        <Price
                          amount={
                            discountedPrice ? discountedPrice : item.price
                          }
                        />
                      </p>
                      {discountedPrice &&
                        discountedPrice !== parseFloat(item.price) && (
                          <p className="hidden md:block mt-1 text-gray-400 text-[0.860rem] line-through line-clamp-1">
                            <Price amount={item.price} />
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="mt-2">
                    {false ? <ProductRatings rating={0} sm /> : null}
                  </div>
                </Link>
              );
            })}
      </div>
    </>
  );
}
