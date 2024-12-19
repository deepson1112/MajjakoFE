// "use client";

// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/Input";
// import { Label } from "@/components/ui/Label";
// import { api } from "@/lib/fetcher";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import { DualRangeSlider } from "./PriceSlider";
// import PromotionSideContainer from "./promotionSideContainer";
// import { RotateCcw } from "lucide-react";
// import { string } from "zod";

// type Variation = {
//   created_date: string;
//   description: string;
//   id: number;
//   name: string;
//   updated_date: string;
//   variation_type: number;
// };

// type VariationType = {
//   created_date: string;
//   description: string;
//   id: number;
//   name: string;
//   updated_date: string;
//   variation: Variation[];
// };

// const FilterProductContainer = ({
//   router,
//   submitFilter,
//   variationParams,
//   categoryParams,
//   subCategoryParams,
//   bazarParams,
//   vendorParams,
//   maxPriceParams,
//   minPriceParams,
// }: {
//   router: AppRouterInstance;
//   submitFilter: any;
//   variationParams: string[];
//   categoryParams: string[];
//   subCategoryParams: string[];
//   bazarParams: string;
//   vendorParams: string;
//   maxPriceParams: string[];
//   minPriceParams: string[];
// }) => {
//   const [filter, setFilter] = useState<string[]>([]);
//   const [price, setPrice] = useState<(number | string)[]>(["", ""]);
//   console.log(categoryParams);
//   const {
//     data: retailVariationTypes,
//     isLoading: retailVariationTypesLoader,
//     refetch,
//   } = useQuery({
//     queryFn: async () => {
//       const url = `/retails/retail-variation-types/?${
//         categoryParams
//           ? `${
//               categoryParams
//                 ? categoryParams.map((id) => `category=${id}`).join("&")
//                 : ""
//             }`
//           : ""
//       }${`&${
//         subCategoryParams
//           ? subCategoryParams.map((id) => `sub_category=${id}`).join("&")
//           : ""
//       }`}${vendorParams ? "vendor=" + vendorParams : ""}`;
//       const response = await api().get(url).json<VariationType[]>();
//       return response;
//     },
//     queryKey: ["retail-variation-types"],
//     retry: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//   });

//   useEffect(() => {
//     refetch();
//   }, [categoryParams[0], subCategoryParams[0], refetch]);

//   const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     const newPrice = [...price];
//     newPrice[0] = parseInt(value);
//     setPrice(newPrice);
//   };
//   const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     console.log("This is max price", value);
//     const newPrice = [...price];
//     newPrice[1] = parseInt(value);
//     setPrice(newPrice);
//   };
//   return retailVariationTypesLoader ? (
//     <div>Loading...</div>
//   ) : (
//     <div className="border p-3 rounded-xl">
//       {/* <Button
//         variant={"subtle"}
//         className="ml-auto w-fit flex justify-end"
//         onClick={() => setFilter([])}
//       >
//         <RotateCcw className="w-3 h-3 mr-2" />
//         Reset
//       </Button> */}

//       <div>
//         <div className="flex items-center justify-between">
//           <Label className="font-sans text-base text-black font-semibold uppercase tracking-wide">
//             Price Range
//           </Label>

//           {!!maxPriceParams.length || !!minPriceParams.length ? (
//             <Button
//               onClick={() => {
//                 const params = variationParams
//                   .map((option) => `products_variations__variation=${option}`)
//                   .join("&");
//                 router.push(
//                   `?${params ? params : ""}${
//                     categoryParams[0] ? "&category=" + categoryParams[0] : ""
//                   }${
//                     subCategoryParams[0]
//                       ? "&subcategory=" + subCategoryParams[0]
//                       : ""
//                   }`
//                 );
//                 setPrice(["", ""]);
//                 submitFilter();
//               }}
//             >
//               <RotateCcw className="w-3 h-3 mr-1" />
//               Reset
//             </Button>
//           ) : null}
//         </div>
//         {/* <div className="w-full pb-1 mt-4">
//           <DualRangeSlider
//             value={price}
//             onValueChange={setPrice}
//             min={0}
//             max={10000}
//             step={600}
//           />
//         </div> */}
//         <div className="mt-4 flex items-center gap-4 pr-4">
//           <div>
//             <Input
//               className="my-2"
//               value={price[0]}
//               placeholder="Min Price"
//               onChange={handleMinPriceChange}
//             />
//           </div>
//           <div>
//             <Input
//               className="my-2"
//               value={price[1]}
//               placeholder="Max Price"
//               onChange={handleMaxPriceChange}
//             />
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <p className="text-sm font-medium">
//             Price: Rs.{price[0]} - Rs.{price[1]}
//           </p>

//           <Button
//             className="bg-transparent text-brand underline uppercase tracking-widest mr-1 font-semibold hover:bg-transparent focus:bg-transparent"
//             onClick={() => {
//               const params = variationParams
//                 .map((option) => `products_variations__variation=${option}`)
//                 .join("&");
//               router.push(
//                 `?${params ? params : ""}${
//                   categoryParams[0] ? "&category=" + categoryParams[0] : ""
//                 }${
//                   subCategoryParams[0]
//                     ? "&subcategory=" + subCategoryParams[0]
//                     : ""
//                 }&minimum_price=${price[0]}&maximum_price=${price[1]}`
//               );
//               submitFilter();
//             }}
//           >
//             Filter
//           </Button>
//         </div>
//       </div>

//       {!!subCategoryParams.length && !!categoryParams.length
//         ? retailVariationTypes &&
//           retailVariationTypes?.map(
//             (retailVariationType, retailVariationTypeIndex) => (
//               <div key={`retail-variation-type-${retailVariationTypeIndex}`}>
//                 <div>
//                   <h6 className="py-2 border-t-2 border-gray-300 mt-2 font-sans text-lg text-black font-semibold uppercase tracking-wide">
//                     {retailVariationType.name}
//                   </h6>
//                   <div className="my-3 flex flex-col gap-2">
//                     {retailVariationType.name === "Color" && (
//                       <div className="flex flex-wrap items-center gap-3 mb-4 order-0">
//                         {retailVariationType.variation.map(
//                           (available_variation) => (
//                             <Button
//                               key={`variations-data-${available_variation.id}`}
//                               variant={"outline"}
//                               style={{ background: available_variation.name }}
//                               className={`h-8 w-7 rounded-md`}
//                               onClick={() => {}}
//                             />
//                           )
//                         )}
//                       </div>
//                     )}
//                     {retailVariationType.variation.map((item) => (
//                       <div key={`type-variations-${item.id}`}>
//                         <div className="max-w-md font-medium text-gray-700 text-sm tracking-wider">
//                           <Checkbox
//                             value={`${item.id}`}
//                             filter={filter}
//                             setFilter={setFilter}
//                             name={`variations-type-${item.id}`}
//                             index={retailVariationTypeIndex}
//                             router={router!}
//                             price={price}
//                             submitFilter={submitFilter}
//                             variationParams={variationParams}
//                             subCategoryParams={subCategoryParams}
//                             categoryParams={categoryParams}
//                             bazarParams={bazarParams}
//                             vendorParams={vendorParams}
//                           >
//                             {item.name}
//                           </Checkbox>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )
//           )
//         : null}

//       <div className="border-t-2 border-gray-300 py-2">
//         <PromotionSideContainer
//           image={
//             "https://images.unsplash.com/photo-1569961384048-0001b31bb6f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           }
//           className="pt-44 2xl:pt-56"
//         />

//         <PromotionSideContainer
//           image={"/products/image.png"}
//           className="pt-80 xl:pt-96 2xl:pt-[30rem]"
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterProductContainer;

// interface CheckboxProps {
//   value: string;
//   children: React.ReactNode;
//   name: string;
//   setFilter: Dispatch<SetStateAction<string[]>>;
//   index: number;
//   filter: string[];
//   router: AppRouterInstance;
//   submitFilter: any;
//   variationParams: string[];
//   categoryParams: string[];
//   subCategoryParams: string[];
//   price: (number | string)[];
//   bazarParams: string;
//   vendorParams: string;
// }

// const Checkbox = ({
//   children,
//   setFilter,
//   filter,
//   value,
//   name,
//   router,
//   submitFilter,
//   variationParams,
//   categoryParams,
//   subCategoryParams,
//   price,
//   bazarParams,
//   vendorParams,
// }: CheckboxProps) => {
//   const queryParams = filter
//     .map((option) => `products_variations__variation=${option}`)
//     .join("&");
//   useEffect(() => {
//     router.push(
//       `?${queryParams}${
//         categoryParams[0] ? "&category=" + categoryParams[0] : ""
//       }${
//         subCategoryParams[0] ? "&subcategory=" + subCategoryParams[0] : ""
//       }&minimum_price=${price[0]}&maximum_price=${
//         price[1]
//       }&bazar=${bazarParams}&vendor=${vendorParams}`
//     );
//   }, [queryParams]);
//   return (
//     <label className="checkbox" htmlFor={name}>
//       <input
//         type="checkbox"
//         className="mr-2"
//         name={name}
//         id={name}
//         checked={filter.includes(value)}
//         onChange={() => {
//           filter.includes(value)
//             ? setFilter((prev) => prev.filter((checked) => checked != value))
//             : setFilter((prev) => [...prev, value]);
//           submitFilter();
//         }}
//       />
//       {children}
//     </label>
//   );
// };
"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { api } from "@/lib/fetcher";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import PromotionSideContainer from "./promotionSideContainer";
import { RotateCcw } from "lucide-react";
import { encodeFiltersToURLSafe } from "@/lib/utils";

type Variation = {
  created_date: string;
  description: string;
  id: number;
  name: string;
  updated_date: string;
  variation_type: number;
};

type VariationType = {
  created_date: string;
  description: string;
  id: number;
  name: string;
  updated_date: string;
  variation: Variation[];
};

const FilterProductContainer = ({
  router,
  submitFilter,
  variationParams,
  categoryParams,
  subCategoryParams,
  bazarParams,
  vendorParams,
  maxPriceParams,
  minPriceParams,
}: {
  router: AppRouterInstance;
  submitFilter: any;
  variationParams: string[];
  categoryParams: string[];
  subCategoryParams: string[];
  bazarParams: string;
  vendorParams: string;
  maxPriceParams: string[];
  minPriceParams: string[];
}) => {
  const [filter, setFilter] = useState<string[]>([]);
  const [price, setPrice] = useState<(number | string)[]>(["", ""]);
  const {
    data: retailVariationTypes,
    isLoading: retailVariationTypesLoader,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const url = `/retails/retail-variation-types/?${
        categoryParams
          ? `${
              categoryParams
                ? categoryParams.map((id) => `category=${id}`).join("&")
                : ""
            }`
          : ""
      }${`&${
        subCategoryParams
          ? subCategoryParams.map((id) => `sub_category=${id}`).join("&")
          : ""
      }`}${vendorParams ? "vendor=" + vendorParams : ""}`;
      const response = await api().get(url).json<VariationType[]>();
      return response;
    },
    queryKey: ["retail-variation-types"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    refetch();
  }, [categoryParams[0], subCategoryParams[0], refetch]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newPrice = [...price];
    newPrice[0] = parseInt(value);
    setPrice(newPrice);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("This is max price", value);
    const newPrice = [...price];
    newPrice[1] = parseInt(value);
    setPrice(newPrice);
  };
  return retailVariationTypesLoader ? (
    <div>Loading...</div>
  ) : (
    <div className="border p-3 rounded-xl">
      <div>
        <div className="flex items-center justify-between">
          <Label className="font-sans text-base text-black font-semibold uppercase tracking-wide">
            Price Range
          </Label>

          {!!maxPriceParams.length || !!minPriceParams.length ? (
            <Button
              onClick={() => {
                const buildQueryString = () => {
                  const variationParamsString = variationParams
                    .map((option) => `products_variations__variation=${option}`)
                    .join("&");

                  const categoryParam = categoryParams[0]
                    ? `&category=${categoryParams[0]}`
                    : "";
                  const subCategoryParam = subCategoryParams[0]
                    ? `&subcategory=${subCategoryParams[0]}`
                    : "";

                  return `${variationParamsString}${categoryParam}${subCategoryParam}`;
                };

                const queryString = buildQueryString();
                router.push(`?dqs=${encodeFiltersToURLSafe(queryString)}`);
                setPrice(["", ""]);
                submitFilter();
              }}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          ) : null}
        </div>
        <div className="mt-4 flex items-center gap-4 pr-4">
          <div>
            <Input
              className="my-2"
              value={price[0]}
              placeholder="Min Price"
              onChange={handleMinPriceChange}
            />
          </div>
          <div>
            <Input
              className="my-2"
              value={price[1]}
              placeholder="Max Price"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">
            Price: Rs.{price[0]} - Rs.{price[1]}
          </p>

          <Button
            className="bg-transparent text-brand underline uppercase tracking-widest mr-1 font-semibold hover:bg-transparent focus:bg-transparent"
            onClick={() => {
              const variationParamsString = variationParams
                .map((option) => `products_variations__variation=${option}`)
                .join("&");

              const categoryParamString = categoryParams[0]
                ? `&category=${categoryParams[0]}`
                : "";

              const subCategoryParamString = subCategoryParams[0]
                ? `&subcategory=${subCategoryParams[0]}`
                : "";

              const priceParams = `&minimum_price=${price[0]}&maximum_price=${price[1]}`;

              const queryString = `${variationParamsString}${categoryParamString}${subCategoryParamString}${priceParams}`;

              router.push(`?dqs=${encodeFiltersToURLSafe(queryString)}`);
              submitFilter();
            }}
          >
            Filter
          </Button>
        </div>
      </div>

      {!!subCategoryParams.length && !!categoryParams.length
        ? retailVariationTypes &&
          retailVariationTypes?.map(
            (retailVariationType, retailVariationTypeIndex) => (
              <div key={`retail-variation-type-${retailVariationTypeIndex}`}>
                <div>
                  <h6 className="py-2 border-t-2 border-gray-300 mt-2 font-sans text-lg text-black font-semibold uppercase tracking-wide">
                    {retailVariationType.name}
                  </h6>
                  <div className="my-3 flex flex-col gap-2">
                    {retailVariationType.name === "Color" && (
                      <div className="flex flex-wrap items-center gap-3 mb-4 order-0">
                        {retailVariationType.variation.map(
                          (available_variation) => (
                            <Button
                              key={`variations-data-${available_variation.id}`}
                              variant={"outline"}
                              style={{ background: available_variation.name }}
                              className={`h-8 w-7 rounded-md`}
                              onClick={() => {}}
                            />
                          )
                        )}
                      </div>
                    )}
                    {retailVariationType.variation.map((item) => (
                      <div key={`type-variations-${item.id}`}>
                        <div className="max-w-md font-medium text-gray-700 text-sm tracking-wider">
                          <Checkbox
                            value={`${item.id}`}
                            filter={filter}
                            setFilter={setFilter}
                            name={`variations-type-${item.id}`}
                            index={retailVariationTypeIndex}
                            router={router!}
                            price={price}
                            submitFilter={submitFilter}
                            variationParams={variationParams}
                            subCategoryParams={subCategoryParams}
                            categoryParams={categoryParams}
                            bazarParams={bazarParams}
                            vendorParams={vendorParams}
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )
        : null}

      <div className="border-t-2 border-gray-300 py-2">
        <PromotionSideContainer
          image={"/products-banner/sq-banner.jpg"}
          className="pt-44 2xl:pt-56"
        />

        <PromotionSideContainer
          image={"/products-banner/banner.jpg"}
          className="pt-80 xl:pt-96 2xl:pt-[30rem]"
        />
      </div>
    </div>
  );
};

export default FilterProductContainer;

interface CheckboxProps {
  value: string;
  children: React.ReactNode;
  name: string;
  setFilter: Dispatch<SetStateAction<string[]>>;
  index: number;
  filter: string[];
  router: AppRouterInstance;
  submitFilter: any;
  variationParams: string[];
  categoryParams: string[];
  subCategoryParams: string[];
  price: (number | string)[];
  bazarParams: string;
  vendorParams: string;
}

const Checkbox = ({
  children,
  setFilter,
  filter,
  value,
  name,
  router,
  submitFilter,
  variationParams,
  categoryParams,
  subCategoryParams,
  price,
  bazarParams,
  vendorParams,
}: CheckboxProps) => {
  const queryParams = filter
    .map((option) => `products_variations__variation=${option}`)
    .join("&");
  useEffect(() => {
    const buildQueryString = () => {
      const categoryParam = categoryParams[0]
        ? `&category=${categoryParams[0]}`
        : "";
      const subCategoryParam = subCategoryParams[0]
        ? `&subcategory=${subCategoryParams[0]}`
        : "";
      const priceParams = `&minimum_price=${price[0]}&maximum_price=${price[1]}`;
      const bazarParam = `&bazar=${bazarParams}`;
      const vendorParam = `&vendor=${vendorParams}`;

      return `${queryParams}${categoryParam}${subCategoryParam}${priceParams}${bazarParam}${vendorParam}`;
    };

    router.push(`?dqs=${encodeFiltersToURLSafe(buildQueryString())}`);
  }, [queryParams]);
  return (
    <label className="checkbox" htmlFor={name}>
      <input
        type="checkbox"
        className="mr-2"
        name={name}
        id={name}
        checked={filter.includes(value)}
        onChange={() => {
          filter.includes(value)
            ? setFilter((prev) => prev.filter((checked) => checked != value))
            : setFilter((prev) => [...prev, value]);
          submitFilter();
        }}
      />
      {children}
    </label>
  );
};
