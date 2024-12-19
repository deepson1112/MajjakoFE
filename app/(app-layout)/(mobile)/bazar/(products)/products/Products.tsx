// "use client";

// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { api } from "@/lib/fetcher";
// import Image from "next/image";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useQuery } from "react-query";
// import { FilterProductSheet } from "./FilterProductSheet";
// import FilterProductContainer from "./FilterProductContainer";
// import debounce from "lodash.debounce";
// import { useRouter, useSearchParams } from "next/navigation";
// import ProductSkeleton from "./ProductSkeleton";
// import PromotionMainContainer from "./promotionMainContainer";
// import ProductsCard from "./productsCard";
// import { useForm } from "react-hook-form";
// import { RotateCcw, X } from "lucide-react";
// import { useQueryParamState } from "@/hooks/useQueryParamState";
// import { PaginationWithLinks } from "@/components/PaginationWithLinks";
// import FilterProductBy from "../FilterProductBy";
// import useRefreshCount from "@/hooks/use-refreshcount";
// import qs from "qs";
// import OtherProducts from "./[subCategoryId]/[productId]/OtherProducts";
// import { Skeleton } from "@/components/ui/Skeleton";

// export interface ProductShort {
//   id: number;
//   name: string;
//   description: string;
//   default_image: string;
//   image_1: string | null;
//   price: string;
//   sub_category: number;
//   discount_percentage: number;
//   discounted_amount: number;
//   total_rating: number;
//   category: number;
//   total_review: number;
// }

// export interface ProductShortResponse {
//   results: ProductShort[];
//   count: number;
//   total_pages: number;
//   next: string;
//   previous: string;
//   next_page_number: number;
// }

// const Products = () => {
//   useRefreshCount();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const variationParams = searchParams.getAll("products_variations__variation");
//   const categoryParams = searchParams.getAll("category");
//   const subcategoryParams = searchParams.getAll("subcategory");
//   const maxPriceParams = searchParams.getAll("maximum_price");
//   const minPriceParams = searchParams.getAll("minimum_price");
//   const bazarParams = searchParams.get("bazar");
//   const pageParams = searchParams.get("page");
//   const vendorParams = searchParams.get("vendor");
//   const [search, setSearch] = useQueryParamState<string>("bazar", "");
//   const [page, setPage] = useQueryParamState<string>("page", "1");
//   const { reset } = useForm<any>();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;
//   const productsContainerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const refreshCount =
//     typeof window !== "undefined" ? localStorage.getItem("refreshId") : "1";
//   const {
//     data: products,
//     isFetching: productsLoader,
//     refetch,
//   } = useQuery({
//     queryFn: async () => {
//       const queryParams = {
//         category: categoryParams.length ? categoryParams : undefined,
//         sub_category: subcategoryParams.length ? subcategoryParams : undefined,
//         vendor: vendorParams || undefined,
//         availability: "unknown",
//         maximum_price: maxPriceParams[0]
//           ? parseInt(maxPriceParams[0])
//           : undefined,
//         minimum_price: minPriceParams[0]
//           ? parseInt(minPriceParams[0])
//           : undefined,
//         search: bazarParams || undefined,
//         page: pageParams || "1",
//         variations: variationParams.length ? variationParams : undefined,
//         seed: refreshCount,
//       };

//       const queryString = qs.stringify(queryParams, {
//         arrayFormat: "repeat",
//         skipNulls: true,
//       });

//       const response = await api()
//         .get(`/retails/retail-product-list/?${queryString}`)
//         .json<ProductShortResponse>();
//       return response;

//       // const apiJoint = `${
//       //   categoryParams
//       //     ? `${
//       //         !!categoryParams.length
//       //           ? categoryParams.map((id) => `category=${id}`).join("&")
//       //           : ""
//       //       }`
//       //     : ""
//       // }${`${
//       //   !!subcategoryParams.length
//       //     ? subcategoryParams.map((id) => `&sub_category=${id}`).join("")
//       //     : ""
//       // }`}&vendor=&availability=unknown&${
//       //   maxPriceParams[0]
//       //     ? "maximum_price=" + parseInt(maxPriceParams[0])
//       //     : "maximum_price="
//       // }${
//       //   maxPriceParams[0]
//       //     ? "&minimum_price=" + parseInt(minPriceParams[0]) + "&"
//       //     : "&minimum_price=&"
//       // }${bazarParams ? "search=" + bazarParams : ""}&page=${pageParams || "1"}${
//       //   vendorParams ? "&vendor=" + vendorParams : ""
//       // }`;
//       // const params = variationParams
//       //   .map((option) => `variations=${option}`)
//       //   .join("&");
//       // const response = await api()
//       //   .get(
//       //     `/retails/retail-product-list/?${apiJoint}&${params}seed=${refreshCount}`
//       //   )
//       //   .json<ProductShortResponse>();
//       // return response;
//     },
//     queryKey: [
//       `retail-product-display-${page || "1"}`,
//       {
//         search,
//         variationParams,
//         categoryParams,
//         subcategoryParams,
//         maxPriceParams,
//         minPriceParams,
//         bazarParams,
//         page,
//         vendorParams,
//         refreshCount,
//       },
//     ],
//     retry: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//   });

//   const onSubmit = () => {
//     refetch();
//   };

//   const debouncedSubmit = debounce(onSubmit, 400);
//   const _debouncedSubmit = useCallback(debouncedSubmit, []);

//   const searchSubmit = (data: any) => {
//     console.log("Triggered");
//     const searchValue = data.search || "";
//     setPage("1");
//     setSearch(searchValue);
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const paginatedProducts = products?.results?.slice(startIndex, endIndex);

//   useEffect(() => {
//     if (
//       !!bazarParams?.length ||
//       !!subcategoryParams?.length ||
//       !!categoryParams?.length ||
//       !!vendorParams?.length
//     ) {
//       productsContainerRef?.current?.scrollIntoView();
//     }
//   }, [bazarParams, categoryParams, subcategoryParams, vendorParams]);

//   useEffect(() => {
//     const updateNumItems = () => {
//       if (window.innerWidth >= 768) setIsMobile(false);
//       else setIsMobile(true);
//     };
//     window.addEventListener("resize", updateNumItems);
//     return () => window.removeEventListener("resize", updateNumItems);
//   }, []);

//   useEffect(() => {
//     console.log("MOunted");
//   }, []);
//   console.log(products);
//   return (
//     <MaxWidthWrapper>
//       <FilterProductBy />

//       <div className="flex justify-end">
//         <FilterProductSheet
//           variationParams={variationParams}
//           categoryParams={categoryParams}
//           subCategoryParams={subcategoryParams}
//           submitFilter={_debouncedSubmit}
//           router={router}
//           bazarParams={bazarParams || ""}
//           vendorParams={vendorParams || ""}
//           maxPriceParams={maxPriceParams || ""}
//           minPriceParams={minPriceParams || ""}
//         />
//       </div>

//       <div
//         ref={productsContainerRef}
//         className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"
//       >
//         <div className="hidden lg:block overflow-y-auto">
//           <FilterProductContainer
//             router={router}
//             submitFilter={_debouncedSubmit}
//             variationParams={variationParams}
//             categoryParams={categoryParams}
//             subCategoryParams={subcategoryParams}
//             bazarParams={bazarParams || ""}
//             vendorParams={vendorParams || ""}
//             maxPriceParams={maxPriceParams || ""}
//             minPriceParams={minPriceParams || ""}
//           />
//         </div>

//         <ul className="lg:col-span-3">
//           <li className="col-span-full mb-4">
//             <div className="flex items-center justify-between my-2">
//               <div className="flex items-center">
//                 <h1 className="text-gray-600 text-sm font-semibold tracking-wider pb-1.5">
//                   {startIndex + 1}-
//                   {Math.min(endIndex, products?.results?.length || 0)}{" "}
//                   <span className="font-normal">
//                     of {products?.count} results
//                   </span>
//                 </h1>
//                 {search && (
//                   <div className="border flex flex-wrap px-2 mx-2 rounded gap-x-2">
//                     <p className="text-sm font-semibold text-brand">{search}</p>
//                     <button
//                       onClick={() => {
//                         setSearch("");
//                         reset();
//                         refetch();
//                       }}
//                     >
//                       <X className="text-brand h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//                 {categoryParams.length || subcategoryParams.length ? (
//                   <button
//                     onClick={() =>
//                       router.push(
//                         "/bazar/products?products_variations__variation=&category=&subcategory=&maximum_price=&minimum_price=&bazar="
//                       )
//                     }
//                     className="border flex items-center flex-wrap px-2 mx-2 rounded gap-x-2 text-sm font-semibold text-brand"
//                   >
//                     Reset Filter{" "}
//                     <RotateCcw className="w-3 h-3" strokeWidth={"3px"} />
//                   </button>
//                 ) : null}
//               </div>

//               {/* <form onSubmit={handleSubmit(searchSubmit)}>
//                 <div className="relative max-w-[200px] lg:min-w-[300px]">
//                   <input
//                     className="appearance-none border border-gray-400 rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     type="text"
//                     placeholder="Search"
//                     {...registerForm("search")}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer bg-brand rounded"
//                   >
//                     <Search className="w-5 h-5 text-white" />
//                   </button>
//                 </div>
//               </form> */}
//             </div>
//           </li>

//           {products && products.results.length > 3 && (
//             <li className="w-full my-3">
//               <PromotionMainContainer />
//             </li>
//           )}

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {productsLoader ? (
//               new Array(12)
//                 .fill(null)
//                 .map((_, i) => <ProductSkeleton key={i} />)
//             ) : !!paginatedProducts?.length ? (
//               paginatedProducts
//                 ?.slice(0, 3)
//                 ?.map((product, idx) => (
//                   <ProductsCard
//                     key={`${product.id}-${idx}-${product.sub_category}`}
//                     productid={product.id}
//                     productsubcategory={product.sub_category}
//                     productname={product.name}
//                     productprice={product.price}
//                     productCategoryId={product.category}
//                     discountedPrice={
//                       parseFloat(product.price) - product.discounted_amount
//                     }
//                     productdescription={product.description}
//                     productimage={product.default_image}
//                     discountPercentage={product.discount_percentage}
//                   />
//                 ))
//             ) : (
//               <div className="relative col-span-full mt-5 w-full py-24 flex flex-col items-center justify-center">
//                 <Image
//                   src={"/search.png"}
//                   width={512}
//                   height={512}
//                   alt="filter-combination-not-found"
//                   className="aspect-square w-24 object-center"
//                 />
//                 <h3 className="font-semibold text-xl">No products found</h3>
//                 <p className="text-zinc-500 text-sm">
//                   We found no search results for these filters.
//                 </p>
//               </div>
//             )}

//             {paginatedProducts?.slice(3)?.map((product, idx) => (
//               <ProductsCard
//                 key={`${product.id}-${idx}`}
//                 productid={product.id}
//                 productsubcategory={product.sub_category}
//                 productname={product.name}
//                 productprice={product.price}
//                 discountedPrice={
//                   parseFloat(product.price) - product.discounted_amount
//                 }
//                 productCategoryId={product.category}
//                 productdescription={product.description}
//                 productimage={product.default_image}
//                 discountPercentage={product.discount_percentage}
//               />
//             ))}
//           </div>
//           {productsLoader ? (
//             <div className="grid grid-cols-6 max-w-xs w-full mx-auto  my-4 ">
//               <Skeleton className="h-6 w-full rounded-lg" />
//               <Skeleton className="h-6 w-full rounded-lg" />
//               <Skeleton className="h-6 w-full rounded-lg" />
//               <Skeleton className="h-6 w-full rounded-lg" />
//               <Skeleton className="h-6 w-full rounded-lg" />
//               <Skeleton className="h-6 w-full rounded-lg" />
//               <Skeleton className="h-6 w-full rounded-lg" />
//             </div>
//           ) : !!products?.results.length ? (
//             <div className="py-2 flex items-end justify-end bg-brand/10 my-4 rounded-lg">
//               <PaginationWithLinks
//                 page={Number(page) || 1}
//                 pageSize={12}
//                 totalCount={products.count}
//                 setPage={setPage}
//               />
//             </div>
//           ) : null}
//           <OtherProducts />
//         </ul>
//       </div>
//     </MaxWidthWrapper>
//   );
// };

// export default Products;
"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { api } from "@/lib/fetcher";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { FilterProductSheet } from "./FilterProductSheet";
import FilterProductContainer from "./FilterProductContainer";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import ProductSkeleton from "./ProductSkeleton";
import PromotionMainContainer from "./promotionMainContainer";
import ProductsCard from "./productsCard";
import { useForm } from "react-hook-form";
import { RotateCcw, X } from "lucide-react";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";
import FilterProductBy from "../FilterProductBy";
import useRefreshCount from "@/hooks/use-refreshcount";
import qs from "qs";
import OtherProducts from "./[subCategoryId]/[productId]/OtherProducts";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  decodeURLSafeToFilters,
  encodeFiltersToURLSafe,
  parseQueryString,
} from "@/lib/utils";

export interface ProductShort {
  id: number;
  name: string;
  description: string;
  default_image: string;
  image_1: string | null;
  price: string;
  sub_category: number;
  discount_percentage: number;
  discounted_amount: number;
  total_rating: number;
  category: number;
  total_review: number;
  average_rating: number;
}

export interface ProductShortResponse {
  results: ProductShort[];
  count: number;
  total_pages: number;
  next: string;
  previous: string;
  next_page_number: number;
}

const hashQueryString = (queryString: string): string => {
  return encodeFiltersToURLSafe(queryString);
};

const decodeHash = (hash: string): Record<string, string | string[]> => {
  const decoded = decodeURLSafeToFilters(hash);
  return parseQueryString(decoded);
};

const Products = () => {
  useRefreshCount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get("dqs");
  let decodedParams: Record<string, string | string[]> = {};

  if (hash) {
    decodedParams = decodeHash(hash);
  }

  const variationParams =
    (decodedParams.products_variations__variation as string[]) ||
    searchParams.getAll("products_variations__variation");
  const categoryNameParams =
    (decodedParams.category_name as string[]) ||
    searchParams.getAll("category_name");
  console.log("THi is is", categoryNameParams);
  const categoryParams =
    (decodedParams.category as string[]) || searchParams.getAll("category");
  const subcategoryParams =
    (decodedParams.subcategory as string[]) ||
    searchParams.getAll("subcategory");
  const maxPriceParams =
    (decodedParams.maximum_price as string[]) ||
    searchParams.getAll("maximum_price");
  const minPriceParams =
    (decodedParams.minimum_price as string[]) ||
    searchParams.getAll("minimum_price");
  const bazarParams =
    (decodedParams.bazar as string) || searchParams.get("bazar");
  const pageParams = (decodedParams.page as string) || searchParams.get("page");
  const vendorParams =
    (decodedParams.vendor as string) || searchParams.get("vendor");
  const [search, setSearch] = useQueryParamState<string>(
    "bazar",
    (decodedParams.bazar as string) || ""
  );
  const [page, setPage] = useQueryParamState<string>(
    "page",
    (decodedParams.page as string) || "1"
  );
  const { reset } = useForm<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const refreshCount =
    typeof window !== "undefined" ? localStorage.getItem("refreshId") : "1";

  const {
    data: products,
    isFetching: productsLoader,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const queryParams = {
        category: categoryParams.length ? categoryParams : undefined,
        sub_category: subcategoryParams.length ? subcategoryParams : undefined,
        vendor: vendorParams || undefined,
        availability: "unknown",
        maximum_price: maxPriceParams[0]
          ? parseInt(maxPriceParams[0])
          : undefined,
        minimum_price: minPriceParams[0]
          ? parseInt(minPriceParams[0])
          : undefined,
        search: bazarParams || undefined,
        page: pageParams || "1",
        variations: variationParams.length ? variationParams : undefined,
        seed: bazarParams ? undefined : refreshCount,
      };

      const queryString = qs.stringify(queryParams, {
        arrayFormat: "repeat",
        skipNulls: true,
      });

      const response = await api()
        .get(`/retails/retail-product-list/?${queryString}`)
        .json<ProductShortResponse>();
      return response;
    },
    queryKey: [
      `retail-product-display-${page || "1"}`,
      {
        search,
        variationParams,
        categoryParams,
        subcategoryParams,
        maxPriceParams,
        minPriceParams,
        bazarParams,
        page,
        vendorParams,
        refreshCount,
      },
    ],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const onSubmit = () => {
    refetch();
  };

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = products?.results?.slice(startIndex, endIndex);

  useEffect(() => {
    if (
      !!bazarParams?.length ||
      !!subcategoryParams?.length ||
      !!categoryParams?.length ||
      !!vendorParams?.length
    ) {
      productsContainerRef?.current?.scrollIntoView();
    }
  }, [bazarParams, categoryParams, subcategoryParams, vendorParams]);

  useEffect(() => {
    const updateNumItems = () => {
      if (window.innerWidth >= 768) setIsMobile(false);
      else setIsMobile(true);
    };
    window.addEventListener("resize", updateNumItems);
    return () => window.removeEventListener("resize", updateNumItems);
  }, []);

  useEffect(() => {
    console.log("MOunted");
  }, []);
  console.log(products);

  return (
    <MaxWidthWrapper className="relative">
      <FilterProductBy />

      <div className="flex justify-end">
        <FilterProductSheet
          variationParams={variationParams}
          categoryParams={categoryParams}
          subCategoryParams={subcategoryParams}
          submitFilter={_debouncedSubmit}
          router={router}
          bazarParams={bazarParams || ""}
          vendorParams={vendorParams || ""}
          maxPriceParams={maxPriceParams || ""}
          minPriceParams={minPriceParams || ""}
        />
      </div>

      <div
        ref={productsContainerRef}
        className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"
      >
        <div className="hidden lg:block overflow-y-auto">
          <FilterProductContainer
            router={router}
            submitFilter={_debouncedSubmit}
            variationParams={variationParams}
            categoryParams={categoryParams}
            subCategoryParams={subcategoryParams}
            bazarParams={bazarParams || ""}
            vendorParams={vendorParams || ""}
            maxPriceParams={maxPriceParams || ""}
            minPriceParams={minPriceParams || ""}
          />
        </div>
        <ul className="lg:col-span-3">
          <li className="col-span-full mb-4">
            <div className="flex items-end justify-between my-2">
              <div className="flex flex-col w-full">
                <h3 className="text-brand text-xl font-semibold tracking-wider pb-1.5">
                  {categoryNameParams[0]} {bazarParams}
                </h3>

                <div className="flex items-center">
                  <p className="text-gray-600 text-sm font-semibold tracking-wider pb-1.5">
                    {startIndex + 1}-
                    {Math.min(endIndex, products?.results?.length || 0)}{" "}
                    <span className="font-normal">
                      of {products?.count} results
                    </span>
                  </p>

                  {search && (
                    <div className="border flex px-2 mx-2 rounded gap-x-2">
                      <p className="text-sm font-semibold text-brand">
                        {search}
                      </p>
                      <button
                        onClick={() => {
                          setSearch("");
                          reset();
                          refetch();
                        }}
                      >
                        <X className="text-brand h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {categoryParams.length || subcategoryParams.length ? (
                <button
                  onClick={() => {
                    const resetQueryString =
                      "products_variations__variation=&category=&subcategory=&maximum_price=&minimum_price=&bazar=";
                    const hash = hashQueryString(resetQueryString);
                    router.push(`/bazar/products?dqs=${hash}`);
                  }}
                  className="border flex items-center px-2 mx-2 rounded whitespace-nowrap text-sm font-semibold text-brand"
                >
                  Reset Filter{" "}
                  <RotateCcw className="w-3 h-3 ml-1" strokeWidth={"3px"} />
                </button>
              ) : null}
            </div>
          </li>

          {products && products?.results?.length > 3 && (
            <li className="w-full my-3">
              <PromotionMainContainer />
            </li>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsLoader ? (
              new Array(12)
                .fill(null)
                .map((_, i) => <ProductSkeleton key={i} />)
            ) : paginatedProducts && paginatedProducts?.length > 0 ? (
              paginatedProducts
                ?.slice(0, 3)
                ?.map((product, idx) => (
                  <ProductsCard
                    key={`${product.id}-${idx}-${product.sub_category}`}
                    productid={product.id}
                    productsubcategory={product.sub_category}
                    productname={product.name}
                    productprice={product.price}
                    productCategoryId={product.category}
                    discountedPrice={product.discounted_amount}
                    productdescription={product.description}
                    productimage={product.default_image}
                    discountPercentage={product.discount_percentage}
                    average_rating={product.average_rating}
                  />
                ))
            ) : (
              <div className="relative col-span-full mt-5 w-full py-24 flex flex-col items-center justify-center">
                <Image
                  src={"/search.png"}
                  width={512}
                  height={512}
                  alt="filter-combination-not-found"
                  className="aspect-square w-24 object-center"
                />
                <h3 className="font-semibold text-xl">No products found</h3>
                <p className="text-zinc-500 text-sm">
                  We found no search results for these filters.
                </p>
              </div>
            )}

            {paginatedProducts?.slice(3)?.map((product, idx) => (
              <ProductsCard
                key={`${product.id}-${idx}`}
                productid={product.id}
                productsubcategory={product.sub_category}
                productname={product.name}
                productprice={product.price}
                discountedPrice={product.discounted_amount}
                productCategoryId={product.category}
                productdescription={product.description}
                productimage={product.default_image}
                discountPercentage={product.discount_percentage}
                average_rating={product.average_rating}
              />
            ))}
          </div>
          {productsLoader ? (
            <div className="grid grid-cols-6 max-w-xs w-full mx-auto  my-4 ">
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
            </div>
          ) : !!products?.next ? (
            <div className="py-2 flex items-end justify-end bg-brand/10 my-4 rounded-lg">
              <PaginationWithLinks
                page={Number(page) || 1}
                pageSize={12}
                totalCount={products.count}
                setPage={setPage}
              />
            </div>
          ) : null}
          <OtherProducts />
        </ul>
      </div>
    </MaxWidthWrapper>
  );
};

export default Products;
