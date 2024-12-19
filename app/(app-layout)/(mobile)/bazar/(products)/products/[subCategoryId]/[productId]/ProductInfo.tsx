import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ProductVariation, Product } from "@/types";
import Reviews from "./Reviews";
import ProductOverallRating, {
  OverallProductRating,
} from "./ProductOverallRating";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import ListLoader from "@/components/loaders/ListLoader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

interface ProductInfoProps {
  currentVariation: ProductVariation;
  currentProduct: Product;
}

export const ProductInfo = ({
  currentVariation,
  currentProduct,
}: ProductInfoProps) => {
  const [tabValue, setTabValue] = useState<string>("description");

  const { data: productOverallRating, isLoading: productOverallRatingLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(`/review/average-review/${currentProduct.id}/`)
          .json<OverallProductRating>();
        return response;
      },
      queryKey: [
        `overall-product-ratings-${currentProduct.id}`,
        currentProduct.id,
      ],
      onSuccess: (data) => {
        if (!!data?.total_review) {
          setTabValue("reviews");
        }
      },
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const parseString = (str: string) => {
    console.log("String", str);
    const withLineBreaks = str.split("\\");
    console.log("Withlinebreaks", withLineBreaks);

    return (
      <div className="flex flex-col ">
        {withLineBreaks.map((line, index) => {
          const processedLine = line
            .split(/(\*\*.*?\*\*|\*.*?\*)/)
            .map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong className="font-semibold" key={i}>
                    {part.slice(2, -2)}
                  </strong>
                );
              } else if (part.startsWith("*") && part.endsWith("*")) {
                return <em key={i}>{part.slice(1, -1)}</em>;
              }
              return part;
            });
          return <React.Fragment key={index}>{processedLine}</React.Fragment>;
        })}
      </div>
    );
  };

  return productOverallRatingLoader ? (
    <ListLoader />
  ) : (
    <div className="border rounded-lg my-4">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
        <ul className="flex flex-wrap -mb-px max-w-fit mx-auto">
          <li className="mr-2">
            <div
              className={cn(
                "cursor-pointer inline-block p-4 border-b-2 rounded-t-lg",
                tabValue === "description"
                  ? "text-brand border-brand"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              )}
              onClick={() => setTabValue("description")}
            >
              Product Description
            </div>
          </li>

          <li className="mr-2">
            <div
              className={cn(
                "cursor-pointer inline-block p-4 border-b-2 rounded-t-lg",
                tabValue === "reviews"
                  ? "text-brand border-brand"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              )}
              onClick={() => setTabValue("reviews")}
            >
              Reviews ({productOverallRating?.total_review || 0})
            </div>
          </li>

          <li className="mr-2">
            <div
              className={cn(
                "cursor-pointer inline-block p-4 border-b-2 rounded-t-lg",
                tabValue === "specification"
                  ? "text-brand border-brand"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              )}
              onClick={() => setTabValue("specification")}
              aria-current="page"
            >
              Product Specifications
            </div>
          </li>
        </ul>
      </div>

      {tabValue === "reviews" ? (
        productOverallRating?.total_rating ? (
          <div className="flex lg:flex-row flex-col items-start divide-y-2">
            <ProductOverallRating id={currentProduct.id} />
            <Reviews id={currentProduct.id} />
          </div>
        ) : (
          <div className="py-12 text-center">
            <h6>No Reviews Available for this product.</h6>
          </div>
        )
      ) : null}

      {tabValue === "description" ? (
        <div className="my-3 p-3">
          {/* <p className="mb-6">{currentProduct?.description}</p> */}
          {parseString(currentProduct?.description)}
        </div>
      ) : null}

      {tabValue === "specification" ? (
        <>
          <div className="my-3 grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto">
            <dl className="text-center py-1 bg-gray-100 rounded-lg text-xs md:text-sm">
              <dt className="inline-block max-w-[6rem] w-full font-semibold text-gray-700">
                SKU
              </dt>
              <dd className="inline-block text-gray-500">
                {currentVariation.sku}
              </dd>
            </dl>

            {currentVariation?.specifications &&
            !!currentVariation?.specifications.length &&
            !!currentVariation.specifications[0]?.field?.length
              ? currentVariation.specifications.map((value, index) => (
                  <dl
                    className="flex items-center text-xs md:text-sm"
                    key={`specification-details-${index}`}
                  >
                    <dt className="inline-block max-w-[6rem] w-full font-semibold text-gray-700">
                      {value.field}:
                    </dt>

                    <dd className="inline-block text-gray-500">
                      {value.value}
                    </dd>
                  </dl>
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export const MobileProductInfo = ({
  currentVariation,
  currentProduct,
}: ProductInfoProps) => {
  const [defaultInfoValue, setDefaultInfoValue] = useState("description");

  const { data: productOverallRating, isLoading: productOverallRatingLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(`/review/average-review/${currentProduct.id}/`)
          .json<OverallProductRating>();
        return response;
      },
      queryKey: [
        `overall-product-ratings-${currentProduct.id}`,
        currentProduct.id,
      ],
      onSuccess: (data) => {
        if (!!data.total_review) {
          setDefaultInfoValue("reviews");
        }
      },
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="description"
    >
      <AccordionItem value="description">
        <AccordionTrigger className="font-semibold">
          Product Description
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-xs">{currentProduct?.description}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="reviews">
        <AccordionTrigger className="font-semibold">
          Reviews ({productOverallRating?.total_review || 0})
        </AccordionTrigger>
        <AccordionContent>
          {defaultInfoValue === "description" ? (
            <div className="w-full h-full flex items-center justify-center py-20">
              <h6>No Reviews Available for this product.</h6>
            </div>
          ) : (
            <div className="flex lg:flex-row flex-col items-start divide-y-2">
              <ProductOverallRating id={currentProduct.id} />
              <Reviews id={currentProduct.id} />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="specifications">
        <AccordionTrigger className="font-semibold">
          Product Specification
        </AccordionTrigger>
        <AccordionContent>
          <div className="my-3 grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto">
            <dl className="text-center py-1 bg-gray-100 rounded-lg text-xs md:text-sm">
              <dt className="inline-block max-w-[6rem] w-full font-semibold text-gray-700">
                SKU
              </dt>
              <dd className="inline-block text-gray-500">
                {currentVariation.sku}
              </dd>
            </dl>

            {currentVariation?.specifications &&
            !!currentVariation?.specifications.length &&
            !!currentVariation.specifications[0]?.field?.length
              ? currentVariation.specifications.map((value, index) => (
                  <dl
                    className="flex items-center text-xs md:text-sm"
                    key={`specification-details-${index}`}
                  >
                    <dt className="inline-block max-w-[6rem] w-full font-semibold text-gray-700">
                      {value.field}:
                    </dt>

                    <dd className="inline-block text-gray-500">
                      {value.value}
                    </dd>
                  </dl>
                ))
              : null}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
