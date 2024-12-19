"use client";

import { Button } from "@/components/ui/Button";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "@/components/ui/Input";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useMutation, useQuery } from "react-query";
import {
  Product,
  ProductVariation,
  ProductVariation2,
  VariationCollections,
} from "@/lib/validators/fooditems";
import ListLoader from "@/components/loaders/ListLoader";
import { api } from "@/lib/fetcher";
import { Minus, Plus, RotateCw, Search, Trash2, X } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Textarea } from "@/components/ui/Textarea";
import VariantFields from "./VariantFields";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { EditProduct } from "@/types";
import Image from "next/image";
import EditVariationImage from "./EditVariationImage";
import { queryClient } from "@/lib/queryClient";
import { useQueryParamState } from "@/hooks/useQueryParamState";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { PaginationController } from "@/app/(app-layout)/(mobile)/account/(delivered)/delivered/PaginationController";
import { toast } from "sonner";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";

export const foodAddonSchema = z
  .object({
    add_on_category: z.string().min(1, "Addon title is required!"),
    select_type: z.string().min(1, "Select type is required!"),
    minimum_quantity: z.coerce.number(),
    maximum_quantity: z.coerce.number(),
    multiple_selection: z.boolean().optional(),
    description: z.string(),
  })
  .refine(
    (data) => {
      return data.select_type === "MULTIPLE" || data.select_type === "SINGLE"
        ? true
        : false;
    },
    {
      message: "Addon requires Select Type",
      path: ["select_type"],
    }
  )
  .refine(
    (data) => {
      return data.maximum_quantity <= 1 && data.select_type === "MULTIPLE"
        ? false
        : true;
    },
    {
      message:
        "Cannot have multiple selection when maximum order is only One or less than One.",
      path: ["select_type"],
    }
  )
  .refine(
    (data) => {
      return data.minimum_quantity > 1 && data.select_type === "SINGLE"
        ? false
        : true;
    },
    {
      message:
        "Cannot have single selection when minimum requirement is more than One.",
      path: ["select_type"],
    }
  );

export type FoodAddonsType = z.infer<typeof foodAddonSchema>;

type overviewprops = {
  is_retail?: boolean;
};

interface ProductVariationResponse {
  count: number;
  total_pages: number;
  next: string;
  previous: string;
  results: ProductVariation[];
}

export const AddonOverViewTabContent = ({ is_retail }: overviewprops) => {
  const [search, setSearch] = useQueryParamState<string>("variation", "");
  const [page, setPage] = useQueryParamState<string>("page", "1");
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("variation");

  const {
    data: variationsAddons,
    refetch,
    isLoading: variationsAddonsLoader,
  } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          `/retails/retail-products-variation/?${
            searchValue ? `search=${searchValue}` : ""
          }&page=${page}`
        )
        .json<ProductVariationResponse>();
      return response;
    },
    queryKey: ["retail-products-variation", { search, page }],
    onError: (error: any) => {
      console.error(error);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 400),
    [refetch]
  );

  useEffect(() => {
    debouncedRefetch();
  }, [debouncedRefetch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        {is_retail ? "Product Variations" : "Food Addons"}
      </h2>

      <div className="relative py-4">
        <Search className="absolute inset-y-0 w-6 h-6 my-auto left-3" />
        <Input
          className="bg-gray-100 border-none pl-12"
          placeholder={`Filter variation...`}
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {variationsAddonsLoader ? (
        <ListLoader />
      ) : variationsAddons && !!variationsAddons.results! ? (
        <>
          <DataTable columns={columns} data={variationsAddons.results} />
          <PaginationWithLinks
            page={Number(page) || 1}
            pageSize={10}
            totalCount={variationsAddons.count}
            setPage={setPage}
          />
        </>
      ) : (
        <div>No {is_retail ? "Variations" : "Addons"} found</div>
      )}
    </div>
  );
};

interface VariationDetail {
  id: number;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
  variation_type: number;
}

export interface ProductVariationType {
  id: number;
  variation: VariationDetail[];
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
}

interface VariationDetail {
  id: number;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
  variation_type: number;
}

export interface ProductVariationType {
  id: number;
  variation: VariationDetail[];
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
}

export interface FinalType {
  color: string;
  id: string;
  price: string;
  size: string;
  sku: string;
  stock_quantity: string;
  variations_image: string[];
}

interface Specification {
  field: string;
  value: string;
}

interface SpecificationList {
  [key: string]: string | number;
}

export const AddCustomizationTabContent = ({
  is_retail,
  defaultValues,
  is_edit,
  setIsOpen,
}: {
  is_retail?: boolean;
  defaultValues?: EditProduct;
  is_edit?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>("");
  const [globalPrice, setGlobalPrice] = useState<string | undefined>("");
  const [globalSku, setGlobalSku] = useState<string | undefined>("");
  const [globalStockQuantity, setGlobalStockQuantity] = useState<
    string | undefined
  >("");
  const [editImage, setEditImage] = useState<string[]>([""]);
  const [previewEditVariationsImage, setPreviewEditVariationsImage] = useState<
    string[]
  >([]);
  const [imageAllowed, setImageAllowed] = useState("");
  const [includeSpecification, setIncludeSpecification] = useState(false);
  const [selectedVariationType, setSelectedVariationType] = useState<
    string[] | []
  >([]);
  const [selectedVariationValue, setSelectedVariationValue] = useState<
    string[] | []
  >([]);

  const [customForm, setCustomForm] = useState<ProductVariation2>([
    {
      id: "",
      name: "",
      collections: [],
    },
  ]);

  const [currentVariations, setCurrentVariations] = useState<FinalType[] | []>(
    []
  );

  const [specifications, setSepcifications] = useState<Specification[]>([
    {
      field: "",
      value: "",
    },
  ]);

  const applyGlobalValues = () => {
    setCurrentVariations((prev) =>
      prev.map((item) => ({
        ...item,
        price: globalPrice || item.price,
        sku: globalSku || item.sku,
        stock_quantity: globalStockQuantity || item.stock_quantity,
      }))
    );
    setGlobalPrice("");
    setGlobalStockQuantity("");
    setGlobalSku("");
  };

  const { data: retailVariationTypes, isLoading: retailVariationTypesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get("/retails/retail-variation-types/")
          .json<ProductVariationType[]>();
        return response;
      },
      queryKey: ["retail-variation-types"],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const { data: products, isLoading: productsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/retail-products")
        .json<Product[]>();
      return response;
    },
    queryKey: ["retail-product"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleSubmitVariant = () => {
    const specificationList: SpecificationList = {};

    specifications.map((specification) => {
      specificationList[`${specification.field}`] = specification.value;
    });

    const payload = currentVariations.map((variation) => ({
      product: productId,
      description: description,
      price: variation.price,
      sku: variation.sku,
      stock_quantity: variation.stock_quantity,
      variations_image:
        !!variation.variations_image &&
        !!variation.variations_image.length &&
        variation.variations_image.filter((img) => !!img),
      specifications: specificationList,
      variation: Object.keys(variation)
        .filter((key) => key.endsWith("Id"))
        // @ts-ignore
        .map((key) => variation[key])
        .map((value) => Number(value)),
    }));

    if (is_edit) {
      // @ts-ignore
      handleUpdateProductVariation({
        ...payload[0],
        variations_image: editImage.filter((img) => !!img),
      });
    } else {
      // @ts-ignore
      handleAddProductVariation(payload);
    }
  };

  const {
    mutate: handleAddProductVariation,
    isLoading: handleAddProductVariationLoader,
  } = useMutation({
    mutationFn: async (payload) => {
      const response = await api()
        .post({ products: payload }, "/retails/retail-products-variation/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully edited variation");
      setProductId(undefined);
      setDescription("");
      setGlobalPrice("");
      setGlobalSku("");
      setGlobalStockQuantity("");

      setIncludeSpecification(false);
      setSelectedVariationType([]);

      setSelectedVariationValue([]);
      setCustomForm([
        {
          id: "",
          name: "",
          collections: [],
        },
      ]);
      setCurrentVariations([]);
      setSepcifications([
        {
          field: "",
          value: "",
        },
      ]);
    },
    onError: (error: any) => {
      toast.error("Failed to add variation", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const {
    mutate: handleUpdateProductVariation,
    isLoading: handleUpdateProductVariationLoader,
  } = useMutation({
    mutationFn: async (payload) => {
      const response = await api()
        .patch(
          payload,
          `/retails/retail-products-variation/${defaultValues?.id}/`
        )
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully added variation");
      if (setIsOpen) {
        setIsOpen((prev) => !prev);
      }
      queryClient.invalidateQueries("retail-products-variation");
      setProductId(undefined);
      setDescription("");
      setGlobalPrice("");
      setGlobalSku("");
      setGlobalStockQuantity("");

      setIncludeSpecification(false);
      setSelectedVariationType([]);

      setSelectedVariationValue([]);
      setCustomForm([
        {
          id: "",
          name: "",
          collections: [],
        },
      ]);
      setCurrentVariations([]);
      setSepcifications([
        {
          field: "",
          value: "",
        },
      ]);
    },
    onError: (error: any) => {
      toast.error("Failed to add variation", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });
  useEffect(() => {
    // @ts-ignore
    function generateCombinations(variations) {
      if (variations.length === 0) return [{}];

      const [first, ...rest] = variations;
      // @ts-ignore
      const subCombinations = generateCombinations(rest);

      const result = [];
      for (const collection of first.collections) {
        console.log("Collection", collection);
        console.log(
          "Current Image",
          collection.variations_image,
          collection.name
        );
        // @ts-ignore
        for (const combination of subCombinations) {
          console.log("combination", combination);

          // @ts-ignore
          const newCombination = {
            ...combination,
            [`${first.name.toLowerCase()}Name`]: collection.name,
            [`${first.name.toLowerCase()}Id`]: collection.id,
            sku: combination.sku || `${collection.sku}` || "",
            price: combination.price || `${collection.price}` || "",
            stock_quantity:
              combination.stock_quantity ||
              `${collection.stock_quantity}` ||
              "",
            variations_image:
              combination.variations_image && !!combination.variations_image[0]
                ? combination.variations_image &&
                  !!collection.variations_image[0]
                  ? [
                      ...combination.variations_image,
                      ...collection.variations_image,
                    ]
                  : [...combination.variations_image]
                : collection.variations_image || [],
          };
          console.log("New combination being added:", newCombination);
          result.push(newCombination);
        }
      }
      return result;
    }

    const allCombinations = generateCombinations(customForm);

    setCurrentVariations(allCombinations);
  }, [customForm]);

  const taxCalculator = (final_price: number, tax_rate: number) => {
    const actual_price = (final_price * 100) / (100 + tax_rate);
    const tax_amount = actual_price * (tax_rate / 100);
    return [actual_price.toFixed(2), tax_amount.toFixed(2)];
  };

  useEffect(() => {
    if (!!defaultValues) {
      const reducedVariatoins: VariationCollections[] =
        defaultValues?.variation?.reduce((acc: ProductVariation2, items) => {
          if (
            acc.some(
              (variations) => `${variations.id}` === `${items.variation_type}`
            )
          ) {
            // @ts-ignore
            acc = [
              ...acc.map((accItems) =>
                `${accItems.id}` === `${items.variation_type}`
                  ? {
                      ...accItems,
                      collections: [
                        ...accItems.collections,
                        {
                          id: `${items.id}`,
                          name: items.variation_name,
                          price: `${defaultValues.price}`,
                          sku: `${defaultValues.sku}`,
                          stock_quantity: `${defaultValues.stock_quantity}`,
                          variations_image: [""],
                        },
                      ],
                    }
                  : items
              ),
            ];
            return acc;
          }
          return [
            ...acc,
            {
              id: `${items.variation_type}`,
              name: items.variation_type_name,
              collections: [
                {
                  id: `${items.id}`,
                  name: items.variation_name,
                  price: `${defaultValues.price}`,
                  sku: `${defaultValues.sku}`,
                  stock_quantity: `${defaultValues.stock_quantity}`,
                  variations_image: [""],
                },
              ],
            },
          ];
        }, []);
      setProductId(`${defaultValues.product}`);
      setDescription(defaultValues.description);
      setIncludeSpecification(!!defaultValues.specifications || false);
      if (!!defaultValues.specifications)
        setSepcifications(
          Object.entries(defaultValues.specifications).map(
            ([field, value]) => ({
              field,
              value,
            })
          )
        );
      if (!!reducedVariatoins) setCustomForm(reducedVariatoins);
    }
  }, [defaultValues]);

  return (
    <>
      <div className={is_edit ? "max-h-[35rem] overflow-auto" : ""}>
        <div>
          <div className="flex">
            <div className="p-4 flex flex-col gap-3 border-r-2 border-gray-100 flex-1">
              {productsLoader ? (
                <div>Loading...</div>
              ) : products && products.length ? (
                <div>
                  <Label>Product</Label>
                  <Select
                    onValueChange={(value) => setProductId(value)}
                    defaultValue={productId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem value={`${product.id}`} key={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>No Products available</div>
              )}
              <div>
                <Label>Description</Label>
                <Textarea
                  onChange={(value) => setDescription(value.target.value)}
                  value={description}
                  placeholder="Description of the variation"
                  className="resize-none bg-gray-100 border-none"
                />
              </div>
              <div className="mb-2">
                {is_edit ? null : (
                  <>
                    <div className="flex items-center justify-between my-2">
                      <h6 className="text-2xl font-semibold mb-3">
                        Product Variants
                      </h6>
                      {is_edit ? null : (
                        <Button
                          variant={"subtle"}
                          onClick={() => {
                            setCustomForm([
                              {
                                id: "",
                                collections: [],
                                name: "",
                              },
                            ]);
                          }}
                        >
                          <RotateCw className="w-4 h-4 mr-2" /> reset values
                        </Button>
                      )}
                    </div>
                    {customForm.map((field, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 border border-dashed p-4 rounded-lg"
                      >
                        {retailVariationTypesLoader ? (
                          <div>Loading...</div>
                        ) : retailVariationTypes &&
                          retailVariationTypes.length ? (
                          <VariantFields
                            is_edit={!!is_edit}
                            setImageAllowed={setImageAllowed}
                            imageAllowed={imageAllowed}
                            customForm={customForm}
                            setCustomForm={setCustomForm}
                            setSelectedVariationType={setSelectedVariationType}
                            selectedVariationType={selectedVariationType}
                            setSelectedVariationValue={
                              setSelectedVariationValue
                            }
                            selectedVariationValue={selectedVariationValue}
                            index={index}
                            retailVariationTypes={retailVariationTypes}
                            setCurrentVariations={setCurrentVariations}
                          />
                        ) : (
                          <div>No Variation Types available</div>
                        )}
                        {index !== 0 ? (
                          <Button
                            variant="subtle"
                            type="button"
                            onClick={() =>
                              setCustomForm((prev) => {
                                return prev.filter(
                                  (items, ind) => ind !== index
                                );
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        ) : null}
                      </div>
                    ))}
                    <Button
                      className="mt-2"
                      type="button"
                      onClick={() =>
                        setCustomForm((prev) => [
                          ...prev,
                          {
                            id: "",
                            collections: [],
                            name: "",
                          },
                        ])
                      }
                    >
                      Add Variation
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {is_edit ? (
          <div className="p-3 my-3">
            <h6 className="text-2xl font-semibold mb-3">Variants Image</h6>
            <div className="grid grid-cols-4 gap-6">
              {defaultValues?.variations_image.map(
                (editImage, editImageIndex) => (
                  <div
                    className="h-full w-full relative"
                    key={`editeimage-${editImageIndex}`}
                  >
                    <Image
                      src={editImage.default_image}
                      alt={`variation-image`}
                      height={1000}
                      width={100}
                      className="h-full w-full object-center object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 cursor-pointer rounded-full border p-1 bg-white">
                      <X className="w-4 h-4" />
                    </div>
                  </div>
                )
              )}
              {editImage.map((_, editIndex) => (
                <EditVariationImage
                  key={`editImageContainer-${editIndex}`}
                  editIndex={editIndex}
                  setEditImage={setEditImage}
                  setPreviewEditVariationsImage={setPreviewEditVariationsImage}
                  previewEditVariationsImage={previewEditVariationsImage}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="border rounded-lg p-3 my-3">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <h6 className="text-lg font-semibold mb-2">
              Include product specification
            </h6>
            <Switch
              checked={includeSpecification}
              onCheckedChange={(value) => setIncludeSpecification(value)}
              id="airplane-mode"
            />
          </div>
          <div>
            {includeSpecification ? (
              <div className="p-4">
                <div className="">
                  <Button
                    variant={"outline"}
                    className="w-fit ml-auto my-2"
                    onClick={() =>
                      setSepcifications((prev) => [
                        ...prev,
                        {
                          field: "",
                          value: "",
                        },
                      ])
                    }
                  >
                    <Plus className="h-2 w-2 mr-2" /> Add New
                  </Button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Specification Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Specification Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-400 w-full">
                    {specifications.map((specification, specificationIndex) => (
                      <tr
                        className="bg-white border-b"
                        key={specificationIndex}
                      >
                        <>
                          <td className="px-6 py-4">
                            <Input
                              type="text"
                              placeholder="Field"
                              value={specification.field}
                              onChange={(value) =>
                                setSepcifications((prev) =>
                                  prev.map((items, index) =>
                                    index === specificationIndex
                                      ? { ...items, field: value.target.value }
                                      : items
                                  )
                                )
                              }
                            />
                          </td>

                          <td className="px-6 py-4 ">
                            <Input
                              type="text"
                              placeholder="Value"
                              value={specification.value}
                              onChange={(value) =>
                                setSepcifications((prev) =>
                                  prev.map((items, index) =>
                                    index === specificationIndex
                                      ? { ...items, value: value.target.value }
                                      : items
                                  )
                                )
                              }
                            />
                          </td>

                          <td className="px-6 py-4 ">
                            {specificationIndex === 0 ? null : (
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  setSepcifications((prev) =>
                                    prev.filter(
                                      (_, filterSpecificationIndex) =>
                                        filterSpecificationIndex !==
                                        specificationIndex
                                    )
                                  );
                                }}
                              >
                                <Minus className="w-3 h-4" />
                              </Button>
                            )}
                          </td>
                        </>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-3">
          <h6 className="text-lg font-semibold mb-2">
            Apply Value to all the fields
          </h6>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Price"
              value={globalPrice}
              onChange={(price) => setGlobalPrice(price.target.value)}
            />
            <Input
              placeholder="SKU"
              value={globalSku}
              onChange={(price) => setGlobalSku(price.target.value)}
            />
            <Input
              placeholder="Stock Quantity"
              value={globalStockQuantity}
              onChange={(price) => setGlobalStockQuantity(price.target.value)}
            />
            <Button onClick={applyGlobalValues} className="text-xs">
              Apply all
            </Button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Variations
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Tax (13%)
                </th>
                <th scope="col" className="px-6 py-3">
                  excluding tax
                </th>
              </tr>
            </thead>
            <tbody>
              {currentVariations.map((item, currentRowIndex) => (
                <tr className="bg-white border-b" key={currentRowIndex}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {Object.entries(item).map(([key, value]) =>
                      key.endsWith("Name") ? `${value}  ` : null
                    )}
                  </th>
                  <td className="px-6 py-4">
                    <Input
                      type="text"
                      value={item.price}
                      placeholder="Price"
                      onChange={(value) =>
                        setCurrentVariations((prev) =>
                          prev.map((items, index) =>
                            index === currentRowIndex
                              ? { ...items, price: value.target.value }
                              : items
                          )
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Input
                      type="text"
                      placeholder="SKU"
                      value={item.sku}
                      onChange={(value) =>
                        setCurrentVariations((prev) =>
                          prev.map((items, index) =>
                            index === currentRowIndex
                              ? { ...items, sku: value.target.value }
                              : items
                          )
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Input
                      type="text"
                      value={item.stock_quantity}
                      placeholder="Stock Quantity"
                      onChange={(value) =>
                        setCurrentVariations((prev) =>
                          prev.map((items, index) =>
                            index === currentRowIndex
                              ? { ...items, stock_quantity: value.target.value }
                              : items
                          )
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    {taxCalculator(Number(item.price), 13)[1]}
                  </td>
                  <td className="px-6 py-4">
                    {taxCalculator(Number(item.price), 13)[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="py-3">
        <Button
          type="submit"
          isLoading={
            is_edit
              ? handleUpdateProductVariationLoader
              : handleAddProductVariationLoader
          }
          disabled={
            is_edit
              ? handleUpdateProductVariationLoader
              : handleAddProductVariationLoader
          }
          onClick={handleSubmitVariant}
        >
          {is_edit ? "Save Changes" : "Create"}
        </Button>
      </div>
    </>
  );
};
