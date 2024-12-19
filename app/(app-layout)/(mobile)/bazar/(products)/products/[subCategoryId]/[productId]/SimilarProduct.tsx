import { api } from "@/lib/fetcher";
import React from "react";
import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import { Tags } from "lucide-react";
import { ProductShortResponse } from "../../Products";
import { Skeleton } from "@/components/ui/Skeleton";
import ProductRatings from "./ProductsRatings";
import Price from "@/components/Price";
import { Button } from "@/components/ui/Button";

interface SimilarProductProps {
  subId: string;
  id: string;
  isMobile?: boolean;
}

const SimilarProduct = ({ id, subId, isMobile }: SimilarProductProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryFn: async ({ pageParam = 1 }) => {
        const response = await api()
          .get(
            `/retails/retail-product-list/?category=${subId}&hide_product=${id}&page=${pageParam}`
          )

          .json<ProductShortResponse>();
        return response;
      },
      queryKey: [`infinite-similar-product-${id}`, id],
      getNextPageParam: (lastPage) => lastPage.next_page_number,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-2">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
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
        ) : (
          <>
            <h3 className="font-semibold text-xl mb-4 col-span-full">
              Similar <span className="text-brand">Products</span>
            </h3>
            <>
              {data?.pages?.map((page) =>
                page.results?.map((item) => {
                  const discountedPrice =
                    item.discounted_amount === 0
                      ? null
                      : item.discounted_amount;
                  return (
                    <Link
                      key={`landing-products-${item.name}`}
                      href={`/bazar/products/${item.category}/${item.id}`}
                      className="relative w-full max-w-sm p-4 mx-auto bg-white rounded-md border hover:shadow"
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
                })
              )}
            </>
          </>
        )}

        {isFetchingNextPage ? (
          Array.from({ length: 10 }).map((_, index) => (
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
        ) : hasNextPage ? (
          <div className="col-span-full flex my-2">
            <Button
              onClick={() => fetchNextPage()}
              className="md:max-w-fit w-full mx-auto bg-white border hover:text-white border-brand text-brand md:bg-brand md:text-white md:border-none"
            >
              Load More
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SimilarProduct;
