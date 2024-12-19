"use client";

import { Button } from "@/components/ui/Button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/Form";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/Select";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import {
ExtraOptionType,
Product,
ProductVariation,
productVariationSchema,
} from "@/lib/validators/fooditems";
import DepartmentListLoader from "@/components/loaders/DepartmentListLoader";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { Search, Trash2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Textarea } from "@/components/ui/Textarea";
import VariationType from "./VariationType";
import { getImageData } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { axiosInstance } from "@/lib/axiosInstance";

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

export const AddonOverViewTabContent = ({ is_retail }: overviewprops) => {
const { data, isLoading: foodAddonsLoader } = useQuery({
queryFn: async () => {
const response = await api()
.get(`/retails/retail-products-variation`)
.json<ProductVariation[]>();
return response;
},
queryKey: ["retail-products-variation"],
onError: (error) => {
toast({
title: "Issue while fetching Departmets",
description: "Please Try Again",
variant: "destructive",
});
},
retry: false,
refetchOnWindowFocus: false,
refetchOnMount: false,
});
console.log("Data", data);

return (
<div className="p-4">
<h2 className="text-3xl font-bold tracking-tight mb-4">
{is_retail ? "Product Variations" : "Food Addons"}
</h2>
<>
{foodAddonsLoader ? (
<DepartmentListLoader />
) : data && !!data.length! ? (
<DataTable columns={columns} data={data} />
) : (
<div>No {is_retail ? "Variations" : "Addons"} found</div>
)}
</>
</div>
);
};

type props = {
is_retail?: boolean;
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
export const AddCustomizationTabContent = ({
is_retail,
items,
is_edit,
setIsOpen,
}: {
is_retail?: boolean;
items?: ProductVariation;
is_edit?: boolean;
setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
const [previewVariationsImage, setPreviewVariationsImage] = useState<
string[]

> ([]);
> console.log(items);

const defaultVariation = items?.variation.map((item) => ({
value: `${item.id}`,
variation_type: `${item.variation_type}`,
}));

const defaultImages = items?.variations_image.map((item) => ({
// @ts-ignore
value: item.image,
}));

const form = useForm<ProductVariation>({
resolver: zodResolver(productVariationSchema),
defaultValues: {
product: `${items?.product}` || "",
description: items?.description || "",
sku: items?.sku || "",
stock_quantity: items?.stock_quantity || undefined,
variation: !!defaultVariation?.length ? defaultVariation : [],
variations_image: !!defaultImages?.length
? defaultImages
: [{ value: "" }],
price: items?.price || undefined,
},
});

console.log("This is group images", form.watch("variations_image"));

const { control } = form;

const {
fields: imagesTest,
append: appendImageField,
remove: removeImageField,
} = useFieldArray({
name: "variations_image",
control,
});

const {
fields: product_variations,
append,
remove,
} = useFieldArray({
name: "variation",
control,
});

console.log(form.watch("variations_image"));

const { data: products, isLoading: productsLoader } = useQuery({
queryFn: async () => {
const response = await api()
.get("/retails/retail-products")
.json<Product[]>();
return response;
},
queryKey: ["retail-product"],
});

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

const {
mutate: handleNewProductVariationFn,
isLoading: handleNewProductVariationFnLoader,
} = useMutation({
mutationFn: async (payload: FormData) => {
const data = await axiosInstance.post(
"/retails/retail-products-variation/",
payload,
{
headers: {
"Content-Type": "multipart/form-data",
},
}
);

      return data;
    },
    onSuccess: () => {
      toast({ title: "Successfully Added", variant: "default" });
      queryClient.invalidateQueries("retail-products-variation");
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Failed to add new Addon",
        description: "Please try again later",
        variant: "destructive",
      });
    },

});

const {
mutate: handleUpdateProductVariationFn,
isLoading: handleUpdateProductVariationFnLoader,
} = useMutation({
mutationFn: async (payload: FormData) => {
const data = await axiosInstance.patch(
`/retails/retail-products-variation/${items?.id}/`,
payload,
{
headers: {
"Content-Type": "multipart/form-data",
},
}
);

      return data;
    },
    onSuccess: () => {
      toast({ title: "Successfully Added", variant: "default" });
      queryClient.invalidateQueries("retail-products-variation");
      if (setIsOpen) {
        setIsOpen(false);
      }
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Failed to add new Addon",
        description: "Please try again later",
        variant: "destructive",
      });
    },

});

const handleAddProductVariant = (data: ProductVariation) => {
const variation = form
.watch("variation")
.map((variation) => variation.value);
// @ts-ignore
const formData = new FormData();
formData.append("description", data.description);
formData.append("product", `${data.product}`);
formData.append("price", `${data.price}`);
formData.append("sku", data.sku);
formData.append("stock_quantity", `${data.stock_quantity}`);
variation.map((value) => {
formData.append("variation", value);
});
data.variations_image.map((img, index) => {
if (img.value instanceof File) {
formData.append(`variations_image[${index}]image`, img.value);
}
});
if (is_edit) {
handleUpdateProductVariationFn(formData);
} else {
handleNewProductVariationFn(formData);
}
};

// console.log("image priview", previewVariationsImage);
useEffect(() => {
if (!!items?.variations_image.length) {
const defualtVariationImages = items.variations_image.map(
// @ts-ignore
(img) => img.image
);
setPreviewVariationsImage(defualtVariationImages);
}
return () => {};
}, []);

return (
<Form {...form}>
<form
        id="customization-form"
        onSubmit={form.handleSubmit(handleAddProductVariant)}
      >
<div className="flex">
<div className="p-4 flex flex-col gap-3 border-r-2 border-gray-100 flex-1">
{productsLoader ? (
<div>Loading...</div>
) : products && products.length ? (
<FormField
control={form.control}
name="product"
render={({ field }) => (
<FormItem className="w-full">
<FormLabel>Product</FormLabel>
<Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
<FormControl>
<SelectTrigger>
<SelectValue placeholder="Select a Product" />
</SelectTrigger>
</FormControl>
<SelectContent>
{products.map((product) => (
<SelectItem value={`${product.id}`} key={product.id}>
{product.name}
</SelectItem>
))}
</SelectContent>
</Select>
<FormDescription>
Select a product that you want to add variant
</FormDescription>
<FormMessage />
</FormItem>
)}
/>
) : (
<div>No Products available</div>
)}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description of the variation"
                      className="resize-none bg-gray-100 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="bg-gray-100 border-none"
                      placeholder="Price of the stock"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="bg-gray-100 border-none"
                      placeholder="Numbers of available stocks"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="bg-gray-100 border-none"
                      placeholder="SKU number of the product"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center flex-wrap gap-2 p-2 ">
              {imagesTest.map((fields, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`variations_image.${index}.value`}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="flex gap-6">
                      <div>
                        <FormLabel>
                          <Avatar className="min-w-[230px] w-full h-[147px] rounded-lg">
                            <AvatarImage
                              src={previewVariationsImage[index]}
                              className="object-center object-cover"
                            />
                            <AvatarFallback className="rounded-lg bg-white">
                              <div
                                className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                                id="dropzone"
                              >
                                <div className="text-center">
                                  <Image
                                    className="mx-auto h-9 w-9"
                                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                    width={1000}
                                    height={1000}
                                    alt="lorem"
                                  />
                                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer"
                                    >
                                      <span>Drag and drop</span>
                                      <span className="text-brand">
                                        {" "}
                                        or browse
                                      </span>
                                      <span>to upload</span>
                                    </label>
                                  </h3>
                                  <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG{" "}
                                    <span className="text-brand">
                                      up to 10MB
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </AvatarFallback>
                          </Avatar>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="sr-only"
                            {...rest}
                            accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreviewVariationsImage((prev) => [
                                ...prev,
                                displayUrl,
                              ]);
                              appendImageField({ value: "" });
                              onChange(files[0]);
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* <FormLabel>Variation Options</FormLabel> */}
            {product_variations.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3">
                {retailVariationTypesLoader ? (
                  <div>Loading...</div>
                ) : retailVariationTypes && retailVariationTypes.length ? (
                  <div className="flex flex-col w-full">
                    <FormField
                      control={form.control}
                      name={`variation.${index}.variation_type`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Variation Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={`${field.value}`}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Variation Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {retailVariationTypes.map((type) => (
                                <SelectItem value={`${type.id}`} key={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select a variation type for the product
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <VariationType
                      form={form}
                      value={Number(
                        form.watch("variation")[index].variation_type
                      )}
                      retailVariationTypes={retailVariationTypes}
                      index={index}
                    />
                  </div>
                ) : (
                  <div>No Variation Types available</div>
                )}

                <Button
                  variant="subtle"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            ))}

            {/* @ts-ignore */}
            <Button type="button" onClick={() => append({ value: 0 })}>
              Add Variation
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={
            is_edit
              ? handleUpdateProductVariationFnLoader
              : handleNewProductVariationFnLoader
          }
          disabled={
            is_edit
              ? handleUpdateProductVariationFnLoader
              : handleNewProductVariationFnLoader
          }
          // onClick={handleAddProductVariant}
          // form="customization-form"
        >
          {is_edit ? "Save Changes" : "Create"}
        </Button>
      </form>
    </Form>

);
};
