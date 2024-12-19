import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import ProductRatings from "./ProductsRatings";

interface ProductRating {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface OverallProductRating {
  average_rating: number;
  default_image: string;
  description: string;
  id: number;
  name: string;
  rating: ProductRating;
  total_rating: number;
  total_review: number;
}

const ProductOverallRating = ({ id }: { id: number }) => {
  const { data: productOverallRating, isLoading: productOverallRatingLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(`/review/average-review/${id}/`)
          .json<OverallProductRating>();
        return response;
      },
      queryKey: [`overall-product-ratings-${id}`, id],
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  return productOverallRatingLoader ? (
    <div className="flex items-center flex-col md:flex-row gap-4">
      <Skeleton className="h-14 w-full rounded-lg" />
      <Skeleton className="h-14 w-full rounded-lg" />
    </div>
  ) : !!productOverallRating?.total_review ? (
    <section className="py-8 px-4 md:px-5 relative w-full lg:max-w-sm md:border-t">
      <div className="w-full">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="p-2 rounded-3xl flex flex-col space-y-2">
              <h2 className="font-manrope font-bold text-5xl">
                {productOverallRating?.average_rating}
                <span className="text-3xl text-gray-500">/5</span>
              </h2>

              <ProductRatings
                rating={productOverallRating?.average_rating || 0}
              />
              <span className="text-xs text-gray-500">
                {productOverallRating?.total_rating || 0} ratings
              </span>
              <p className="font-medium text-xl leading-8 text-gray-900">
                {productOverallRating?.total_review}{" "}
                {productOverallRating?.total_review &&
                productOverallRating?.total_review === 1
                  ? "Review"
                  : "Reviews"}
              </p>
            </div>

            {/* 5 stars rating */}
            <div className="box flex flex-col gap-y-4 w-full ">
              <div className="flex items-center w-full">
                <p className="font-medium text-lg text-black mr-0.5">5</p>
                <ProductRatings sm rating={5} />
                <p className="h-5 w-full sm:min-w-[200px] rounded-sm bg-gray-100 ml-5 mr-3">
                  <span
                    style={{ width: `${productOverallRating?.rating["5"]}%` }}
                    className="h-full bg-brand flex rounded-sm"
                  ></span>
                </p>
                <p className="font-medium text-base  text-black mr-0.5">
                  {productOverallRating?.rating["5"]}
                </p>
              </div>

              {/* 4 stars rating */}
              <div className="flex items-center w-full">
                <p className="font-medium text-lg text-black mr-0.5">4</p>

                <ProductRatings sm rating={4} />

                <p className="h-5 w-full xl:min-w-[200px] rounded-sm bg-gray-100 ml-5 mr-3">
                  <span
                    style={{ width: `${productOverallRating?.rating["4"]}%` }}
                    className="h-full rounded-sm bg-brand flex"
                  ></span>
                </p>
                <p className="font-medium text-base text-black mr-0.5">
                  {productOverallRating?.rating["4"]}
                </p>
              </div>

              {/* 3 stars rating */}
              <div className="flex items-center">
                <p className="font-medium text-lg text-black mr-0.5">3</p>

                <ProductRatings sm rating={3} />

                <p className="h-5 w-full xl:min-w-[200px] rounded-sm bg-gray-100 ml-5 mr-3">
                  <span
                    style={{ width: `${productOverallRating?.rating["3"]}%` }}
                    className="h-full rounded-sm bg-brand flex"
                  ></span>
                </p>
                <p className="font-medium text-base text-black mr-0.5">
                  {productOverallRating?.rating["3"]}
                </p>
              </div>

              {/* 2 stars rating */}
              <div className="flex items-center">
                <p className="font-medium text-lg text-black mr-0.5">2</p>

                <ProductRatings sm rating={2} />

                <p className="h-5 w-full xl:min-w-[200px] rounded-sm bg-gray-100 ml-5 mr-3">
                  <span
                    style={{ width: `${productOverallRating?.rating["2"]}%` }}
                    className="h-full rounded-sm bg-brand flex"
                  ></span>
                </p>
                <p className="font-medium text-base text-black mr-0.5">
                  {productOverallRating?.rating["2"]}
                </p>
              </div>

              {/* 1 stars rating */}
              <div className="flex items-center">
                <p className="font-medium text-lg text-black mr-0.5">1</p>

                <ProductRatings sm rating={1} />

                <p className="h-5 w-full xl:min-w-[200px] rounded-sm bg-gray-100 ml-5 mr-3">
                  <span
                    style={{ width: `${productOverallRating?.rating["1"]}%` }}
                    className="h-full rounded-sm bg-brand flex"
                  ></span>
                </p>
                <p className="font-medium text-base py-[1px] text-black mr-0.5">
                  {productOverallRating?.rating["1"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="w-full h-full flex items-center justify-center py-36">
      <h6>No Reviews Available for this product.</h6>
    </div>
  );
};

export default ProductOverallRating;
