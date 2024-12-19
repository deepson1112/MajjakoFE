"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { Category, Product, productSchema } from "@/lib/validators/fooditems";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { DepartmentComboboxFormProps } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/add-category/DepartmentComboBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Plus, X } from "lucide-react";
import { MediaLibrary } from "@/components/Media-Library/MediaLibrary";
import AddProductVariationNew from "./AddProductVariationNew";
import { ProductDisplay } from "../view-products-new/[id]/ViewProductNewEdit";
import RouterBack from "@/app/(app-layout)/(mobile)/account/orders/retail-orders/[order_id]/RouterBack";
import SingleProductField from "./SingleProductField";
import ProductSpecification from "./ProductSpecification";
import RetailFormToolTip from "./RetailFormToolTip";
import UploadProductCsv from "./UploadProductCsv";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { Label } from "@/components/ui/Label";

interface Variation {
  id: string;
  variations_image: string[];
}

interface VariationObject {
  id: string;
  variation: Variation[];
}

interface CombinationResult {
  variation: string[];
  variations_image: string[];
  sku: string;
  stock_quantity: number;
  price: number;
}

interface AddItemsProps {
  vendor_id: string;
  is_retail?: boolean;
  defaultValues?: ProductDisplay;
  is_edit?: boolean;
  setIsEditModalOpen?: Dispatch<SetStateAction<boolean>>;
}

interface RefundPolicies {
  id: number;
  policy: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ProductImage {
  id: number;
  url: string;
}

type RetailProduct = {
  id: number;
  name: string;
  description: string;
  default_image: string | null;
  image_1: string | null;
  price: string | null;
  sub_category: number;
  category: number;
};

export type RetailSubCategory = {
  id: number;
  retail_products: RetailProduct[];
  category_name: string;
  category_slug: string;
  category_description: string;
  tax_rate: number;
  tax_exempt: boolean;
  age_restriction: boolean;
  active: boolean;
  categories_order: number;
  image: string;
};

const AddProduct = ({
  is_retail,
  is_edit,
  vendor_id,
  defaultValues,
  setIsEditModalOpen,
}: AddItemsProps) => {
  console.log("Top LEvel", defaultValues);
  const defaultImageRef = useRef<HTMLDivElement | null>(null);

  const isArrayEqual = (arr: string[], target: string[]) =>
    target.every((v) => arr.includes(v));

  const [productImages, setProductImages] = useState<ProductImage[] | null>(
    null
  );

  const [isRetailForm, setIsRetailForm] = useState(true);

  const form = useForm<Product>({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
    defaultValues: {
      age_restriction: false,
      category: `${defaultValues?.category.id}` || "",
      description: "",
      discountable: false,
      sub_category: "",
      name: "",
      refund: true,
      refund_policies: [],
      isProductVariation: false,
      isProductSpecification: false,
      variations: [{ id: "", variation: [] }],
      tax_rate: null,
      includesTax: !!defaultValues?.tax_rate ? true : false,
      delivery_time: "same day delivery",
    },
  });

  const isIncludeTax = form.watch("includesTax");
  const categoryValue = form.watch("category");
  const isVariation = form.watch("isProductVariation");
  const isRefundable = form.watch("refund");
  const isProductSpecification = form.watch("isProductSpecification");

  const {
    data: retailSubCategories,
    refetch: refetchRetailSubCategories,
    isFetching: retailSubCategoriesLoader,
  } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/sub-category/?department=${categoryValue}`)
        .json<RetailSubCategory[]>();
      return response;
    },
    queryKey: ["retail-sub-category"],
    onError: (error) => {
      toast.error("Issue while fetching Departmets", {
        description: "Please Try Again",
      });
    },
    enabled: false,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: categories, isLoading: categoriesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        // .get(`/menu/vendor-department/?vendor=${vendor_id}`)
        // .get(`/retails/retail-categories/`)
        // .get(`/retails/category/?vendor=${vendor_id}`)
        .get(`/retails/category/`)
        .json<DepartmentComboboxFormProps[]>();
      return response;
    },
    queryKey: [`vendor-department-${vendor_id}`, vendor_id],
    onError: (error) => {
      toast.error("Issue while fetching category", {
        description: "Please Try Again",
      });
    },
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: refundPolicies, isLoading: refundPoliciesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/refund-policy/`)
        .json<RefundPolicies[]>();
      return response;
    },
    queryKey: ["retail-refund-policy"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: addSingleProduct, isLoading: addSingleProductLoader } =
    useMutation({
      mutationFn: async (payload: any) => {
        const response = await api().post(payload, "/retails/product/").json();
        return response;
      },
      onSuccess: () => {
        toast.success("Added successfully");
        queryClient.invalidateQueries("retail-nested-products-completed");
        queryClient.invalidateQueries("retail-nested-products-incomplete");

        if (!isRetailForm) {
          form.reset({
            age_restriction: false,
            category: "",
            description: "",
            discountable: false,
            sub_category: "",
            name: "",
            refund: false,
            refund_policies: [],
            isProductVariation: false,
            isProductSpecification: false,
            variations: [{ id: "", variation: [] }],
          });
        }
      },
      onError: (error: any) => {
        toast.error("Unable to add product", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const { mutate: handleUpdateProduct, isLoading: handleUpdateProductLoader } =
    useMutation({
      mutationFn: async (payload: any) => {
        const response = await api()
          .patch(payload, `/retails/product/${defaultValues?.id}/`)
          .json();
        return response;
      },
      onSuccess: () => {
        toast.success("Updated Product successfully");
        queryClient.invalidateQueries("retail-nested-products-completed");
        queryClient.invalidateQueries("retail-nested-products-incomplete");
      },
      onError: (error: any) => {
        toast.error("Unable to update product", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const handleRemoveFn = (index: number) => {
    form.setValue(
      `image_${index}` as "image_1" | "image_2" | "image_3" | "image_4",
      ""
    );

    setProductImages(
      (prev) => prev && prev?.filter((item) => item.id !== index)
    );
  };

  const handleAddProduct = (data: Product) => {
    const {
      age_restriction,
      category,
      description,
      discountable,
      name,
      refund,
      refund_policies,
      sub_category,
      price,
      sku,
      stock_quantity,
      default_image,
      image_1,
      image_2,
      image_3,
      image_4,
      products_variations,
      tax_rate,
      includesTax,
      isProductSpecification,
      specifications,
      delivery_time,
    } = data;

    let payload = {};

    if (isVariation && products_variations) {
      payload = {
        age_restriction,
        category,
        description,
        discountable,
        name,
        [default_image ? "default_image_url" : ""]: default_image || "",
        refund,
        refund_policies,
        sub_category,
        [includesTax ? "tax_rate" : ""]: includesTax ? tax_rate : "",
        [image_1 ? "image_1_url" : ""]: image_1 || "",
        [image_2 ? "image_2_url" : ""]: image_2 || "",
        [image_3 ? "image_3_url" : ""]: image_3 || "",
        [image_4 ? "image_4_url" : ""]: image_4 || "",
        // specifications: isProductSpecification ? specifications : null,
        products_variations: products_variations.map((variation) => ({
          ...variation,
          specifications: isProductSpecification ? specifications : null,
        })),
        delivery_time,
      };
    } else {
      payload = {
        age_restriction,
        category,
        description,
        discountable,
        name,
        [default_image ? "default_image_url" : ""]: default_image || "",

        [includesTax ? "tax_rate" : ""]: includesTax ? tax_rate : "",
        refund,
        refund_policies,
        sub_category,
        [image_1 ? "image_1_url" : ""]: image_1 || "",
        [image_2 ? "image_2_url" : ""]: image_2 || "",
        [image_3 ? "image_3_url" : ""]: image_3 || "",
        [image_4 ? "image_4_url" : ""]: image_4 || "",
        delivery_time,
        products_variations: [
          {
            price,
            sku,
            stock_quantity,
            specifications: isProductSpecification ? specifications : null,
            variation: [],
            variations_image: [],
          },
        ],
      };
    }

    if (is_edit) {
      handleUpdateProduct(payload);
    } else {
      addSingleProduct(payload);
    }

    // console.log("Submiteed", payload);
  };

  // function generateCombinations(
  //   variationArray: VariationObject[]
  // ): CombinationResult[] {
  //   const combine = (
  //     index: number,
  //     currentVariation: string[],
  //     currentImages: string[]
  //   ): void => {
  //     if (index === variationArray.length) {
  //       if(defaultValues){

  //       }
  //       result.push({
  //         variation: currentVariation,
  //         variations_image: currentImages,
  //         sku: "",
  //         stock_quantity: 0,
  //         price: 0,
  //       });
  //       return;
  //     }
  //     variationArray[index].variation.forEach((item) => {
  //       if (item.id.trim() !== "") {
  //         const newImages =
  //           item?.variations_image?.length > 0
  //             ? [...currentImages, ...item.variations_image]
  //             : currentImages;
  //         combine(index + 1, [...currentVariation, item.id], newImages);
  //       }
  //     });
  //   };

  //   const result: CombinationResult[] = [];
  //   combine(0, [], []);
  //   return result;
  // }

  function generateCombinations(
    variationArray: VariationObject[]
  ): CombinationResult[] {
    if (!!defaultValues) {
      const combine = (
        index: number,
        currentVariation: string[],
        currentImages: string[]
      ): void => {
        if (index === variationArray.length) {
          let reducedVariation: Array<{
            price: number;
            sku: string;
            stock_quantity: number;
            variation: string[];
            variations_image: string[];
          }> = [];

          if (variationArray) {
          }

          if (defaultValues) {
            reducedVariation = defaultValues.products_variations.reduce<
              Array<{
                price: number;
                sku: string;
                stock_quantity: number;
                variation: string[];
                variations_image: string[];
              }>
            >((acc, item) => {
              const variationCombine = item.variation.map((v) => `${v.id}`);
              acc.push({
                price: Number(item.price),
                sku: item.sku,
                stock_quantity: item.stock_quantity,
                variation: variationCombine,
                variations_image: [],
              });
              return acc;
            }, []);
          }

          if (
            reducedVariation.find((item) =>
              isArrayEqual(item.variation, currentVariation)
            )
          ) {
            result.push({
              variation: currentVariation,
              variations_image: currentImages,
              sku:
                reducedVariation.find((item) =>
                  isArrayEqual(item.variation, currentVariation)
                )?.sku || "",
              stock_quantity:
                reducedVariation.find((item) =>
                  isArrayEqual(item.variation, currentVariation)
                )?.stock_quantity || 0,
              price:
                reducedVariation.find((item) =>
                  isArrayEqual(item.variation, currentVariation)
                )?.price || 0,
            });
          } else {
            result.push({
              variation: currentVariation,
              variations_image: currentImages,
              sku: "",
              stock_quantity: 0,
              price: 0,
            });
          }

          return;
        }

        variationArray[index].variation.forEach((item) => {
          if (item.id.trim() !== "") {
            const newImages =
              item?.variations_image?.length > 0
                ? [...currentImages, ...item.variations_image]
                : currentImages;

            combine(index + 1, [...currentVariation, item.id], newImages);
          }
        });
      };

      const result: CombinationResult[] = [];
      combine(0, [], []);

      return result;
    } else {
      const combine = (
        index: number,
        currentVariation: string[],
        currentImages: string[]
      ): void => {
        if (index === variationArray.length) {
          result.push({
            variation: currentVariation,
            variations_image: currentImages,
            sku: "",
            stock_quantity: 0,
            price: 0,
          });
          return;
        }
        variationArray[index].variation.forEach((item) => {
          if (item.id.trim() !== "") {
            const newImages =
              item?.variations_image?.length > 0
                ? [...currentImages, ...item.variations_image]
                : currentImages;
            combine(index + 1, [...currentVariation, item.id], newImages);
          }
        });
      };

      const result: CombinationResult[] = [];
      combine(0, [], []);
      return result;
    }
  }

  const productVariations = useWatch({
    control: form.control,
    name: "variations",
  });

  useEffect(() => {
    if (defaultValues) {
      const variations = defaultValues.variations_data.map((vD) => ({
        id: `${vD.id}`,
        variation: vD.available_variations.map((aV) => ({
          id: `${aV.id}`,
          variations_image: [],
        })),
      }));

      const refundPolicies = defaultValues?.refund_policies?.map(
        (policy) => policy.id
      );

      let setImage = [];

      for (let i = 0; i <= 3; i++) {
        if (
          !!defaultValues[
            `image_${i + 1}` as `image_1` | `image_2` | `image_3` | `image_4`
          ]
        )
          setImage.push({
            id: i + 1,
            url:
              defaultValues[
                `image_${i + 1}` as
                  | `image_1`
                  | `image_2`
                  | `image_3`
                  | `image_4`
              ] || "",
          });
      }

      setProductImages(setImage);

      const products_variations = generateCombinations(variations);

      form.reset({
        age_restriction: defaultValues?.age_restriction || false,
        category: `${defaultValues?.category.id}`,
        description: defaultValues?.description || "",
        discountable: defaultValues?.discountable || false,
        sub_category: `${defaultValues?.sub_category.id}` || "",
        default_image: defaultValues.default_image || "",
        image_1: defaultValues.image_1 || "",
        image_2: defaultValues.image_2 || "",
        image_3: defaultValues.image_3 || "",
        image_4: defaultValues.image_4 || "",
        name: defaultValues.name,
        variations,
        delivery_time: defaultValues.delivery_time,
        includesTax: !!defaultValues.tax_rate ? true : false,
        tax_rate: defaultValues.tax_rate ? defaultValues.tax_rate : null,
        isProductVariation: !!defaultValues.variations_data.length,
        refund: true,
        refund_policies: refundPolicies || [],
        price: !defaultValues.variations_data.length
          ? defaultValues.products_variations[0]?.price
          : "",
        sku: !defaultValues.variations_data.length
          ? defaultValues.products_variations[0]?.sku
          : "",
        stock_quantity: !defaultValues.variations_data.length
          ? `${defaultValues?.products_variations[0]?.stock_quantity || ""}`
          : "",
        // products_variations,
      });
    }
  }, [defaultValues]);

  useEffect(() => {
    if (categoryValue && categoryValue !== "undefined") {
      refetchRetailSubCategories();
    }
  }, [categoryValue]);

  useEffect(() => {
    if (productVariations && !productVariations[0]?.id) return;
    const products_variations = generateCombinations(productVariations);
    console.log("Hello Products-variation", products_variations);
    form.setValue("products_variations", products_variations);
  }, [productVariations]);

  useEffect(() => {
    if (form.formState.errors) {
      form.setFocus("category");
      const { default_image, ...rest } = form.formState.errors;
      console.log("Has error", rest);
      if (Object.keys(rest).length === 0 && default_image) {
        defaultImageRef.current?.scrollIntoView();
        console.log("Triggered");
      }
    }
  }, [form.formState.errors]);

  return (
    <>
      {is_edit ? (
        <RouterBack>
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1">Back</span>
        </RouterBack>
      ) : null}

      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              id={`retain-form-value`}
              checked={isRetailForm}
              onCheckedChange={(value) => setIsRetailForm(!!value)}
            />
            <label
              htmlFor={`retain-form-value`}
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span>Retain Form Value</span> <RetailFormToolTip />
            </label>
          </div>

          <UploadProductCsv vendor_id={vendor_id} />
        </div>

        <Form {...form}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={form.handleSubmit(handleAddProduct)}
            id="add-product"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center"
              ref={defaultImageRef}
            >
              {categoriesLoader ? (
                <div>Loading...</div>
              ) : categories && categories.length ? (
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Cateogry for the Product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              value={`${category.id}`}
                              key={category.id}
                            >
                              {category.department_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select Category for the product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div>No Categoires available</div>
              )}

              {retailSubCategoriesLoader ? (
                <div>Loading...</div>
              ) : retailSubCategories && retailSubCategories.length ? (
                <FormField
                  control={form.control}
                  name="sub_category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Sub-Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Sub-Cateogry for the Product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {retailSubCategories.map((subCategory) => (
                            <SelectItem
                              value={`${subCategory.id!}`}
                              key={subCategory.id}
                            >
                              {subCategory.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select Sub-Category for the product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div>
                  <span className="text-xs">
                    No Sub-Categoires available or Select Category First
                  </span>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem className="w-full h-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description of the product"
                        className="resize-none bg-gray-100 border-none h-full "
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-5 gap-6 my-4">
                <div className="space-y-2">
                  <MediaLibrary form={form} field="default_image">
                    <Avatar className="relative w-full h-[180px] rounded-lg overflow-visible">
                      <AvatarImage
                        src={form.watch("default_image") || ""}
                        className="object-center object-cover"
                      />
                      <AvatarFallback className="h-full w-full rounded-lg bg-white">
                        <div
                          className="h-full w-full border-2 border-gray-300 border-dashed rounded-lg p-6 flex items-center justify-center"
                          id="dropzone"
                        >
                          <div className="text-center">
                            <Image
                              className="mx-auto h-12 w-12"
                              src="https://www.svgrepo.com/show/357902/image-upload.svg"
                              width={1000}
                              height={1000}
                              alt="lorem"
                            />

                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF{" "}
                              <span className="text-brand">up to 10MB</span>
                            </p>
                          </div>
                        </div>
                      </AvatarFallback>

                      {!!form.watch(`default_image`) ? (
                        <span
                          className="absolute border rounded-full p-1 -top-3 -right-3 bg-white z-10 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            form.setValue(`default_image`, "");
                          }}
                        >
                          <X className="w-5 h-5" />
                        </span>
                      ) : null}
                    </Avatar>
                  </MediaLibrary>
                  <p className="text-sm font-medium text-destructive">
                    {!!form.formState.errors.default_image
                      ? form.formState.errors.default_image.message
                      : null}
                  </p>
                </div>

                {Array.from({
                  length: productImages ? productImages?.length : 0,
                }).map((_, index) => (
                  <MediaLibrary
                    form={form}
                    field={`image_${index + 1}`}
                    key={`media-library-avatar-${index + 1}`}
                  >
                    <Avatar className="relative w-full h-[180px] rounded-lg overflow-visible">
                      <AvatarImage
                        src={
                          form.watch(
                            `image_${index + 1}` as
                              | `image_1`
                              | `image_2`
                              | `image_3`
                              | `image_4`
                          ) || ""
                        }
                        className="object-center object-cover"
                      />
                      <AvatarFallback className="rounded-lg bg-white">
                        <div
                          className="h-full w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6 flex items-center justify-center"
                          id="dropzone"
                        >
                          <div className="text-center">
                            <Image
                              className="mx-auto h-12 w-12"
                              src="https://www.svgrepo.com/show/357902/image-upload.svg"
                              width={1000}
                              height={1000}
                              alt="lorem"
                            />

                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF{" "}
                              <span className="text-brand">up to 10MB</span>
                            </p>
                          </div>
                        </div>
                      </AvatarFallback>

                      {!!form.watch(
                        `image_${index + 1}` as
                          | `image_1`
                          | `image_2`
                          | `image_3`
                          | `image_4`
                      ) ? (
                        <span
                          className="absolute border rounded-full p-1 -top-3 -right-3 bg-white z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            handleRemoveFn(index + 1);
                          }}
                        >
                          <X className="w-5 h-5" />
                        </span>
                      ) : null}
                    </Avatar>
                  </MediaLibrary>
                ))}

                {(!!productImages ? productImages?.length : 0) < 4 ? (
                  <div className="flex items-center justify-center">
                    <Button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        setProductImages((prev) =>
                          !!prev?.length
                            ? [...prev, { id: prev.length + 1, url: "" }]
                            : [
                                {
                                  id: !!prev?.length ? prev?.length : 0 + 1,
                                  url: "",
                                },
                              ]
                        );
                      }}
                    >
                      <Plus className="text-black" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>

            <FormField
              control={form.control}
              name="delivery_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand">Delivery Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="same day">
                        Same day delivery
                      </SelectItem>
                      <SelectItem value="1-2 days">1-2 days</SelectItem>
                      <SelectItem value="3-5 days">3-5 days</SelectItem>
                      <SelectItem value="5-7 days">5-7 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select how long the product might take to deliver.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age_restriction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Age Restriction</FormLabel>
                    <FormDescription>
                      Does the product have age restriction for certain age
                      group?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Discountable</FormLabel>
                    <FormDescription>
                      Does the product have discount?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="refund"
              render={({ field }) => (
                // <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm hidden">
                <FormItem className="flex-row items-center justify-between rounded-lg border p-3 shadow-sm hidden">
                  <div className="space-y-0.5">
                    <FormLabel>Refundable</FormLabel>
                    <FormDescription>
                      Is this the product refundable?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isRefundable ? (
              <div>
                {refundPoliciesLoader ? (
                  <div>loading...</div>
                ) : !!refundPolicies ? (
                  <FormField
                    control={form.control}
                    name="refund_policies"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Refund Policies
                          </FormLabel>
                          <FormDescription>
                            Select the the refund policies you want to apply in
                            this product.
                          </FormDescription>
                        </div>
                        {refundPolicies.map((policy) => (
                          <FormField
                            key={policy.id}
                            control={form.control}
                            name="refund_policies"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={policy.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(policy.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value ?? []),
                                              policy.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== policy.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {policy.policy}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div>No refund polices</div>
                )}
              </div>
            ) : null}

            <div className="flex sm:flex-row flex-col items-stretch sm:items-end gap-6">
              <FormField
                control={form.control}
                name="includesTax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tax Rate (Does the category includes tax?)
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e === "1" ? true : false);
                        e === "0" && form.setValue("tax_rate", null);
                      }}
                      defaultValue={field.value ? "1" : "0"}
                    >
                      <FormControl className="bg-gray-100 border-none">
                        <SelectTrigger>
                          <SelectValue placeholder="Does the category includes tax?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax_rate"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Tax percentage"
                          type="text"
                          {...field}
                          value={field.value || ""}
                          disabled={!isIncludeTax}
                          className="bg-gray-100 border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="isProductVariation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Product Variations</FormLabel>
                    <FormDescription>
                      Does this product inlucdes variation?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        form.setValue("price", undefined);
                        form.setValue("stock_quantity", undefined);
                        form.setValue("sku", undefined);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isVariation ? (
              <AddProductVariationNew form={form} />
            ) : (
              <Fragment>
                <div>
                  <SingleProductField form={form} />
                </div>
              </Fragment>
            )}

            <div>
              <div className="border rounded-lg p-3 my-3">
                <FormField
                  control={form.control}
                  name="isProductSpecification"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Product Specification</FormLabel>
                        <FormDescription>
                          Does the product this product specificatoin?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                {isProductSpecification ? (
                  <ProductSpecification form={form} />
                ) : null}
              </div>
            </div>

            <div>
              {!!Object.keys(form.formState.errors).length ? (
                <p className="text-sm font-medium text-destructive mb-2">
                  Please fill all the required fields.
                </p>
              ) : null}

              <Button
                type="submit"
                className="w-fit"
                isLoading={addSingleProductLoader || handleUpdateProductLoader}
                disabled={addSingleProductLoader || handleUpdateProductLoader}
                form="add-product"
              >
                {is_edit ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
