import { Button } from "@/components/ui/Button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Product } from "@/lib/validators/fooditems";
import { api } from "@/lib/fetcher";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { EditProduct } from "@/types";
import Image from "next/image";
import EditVariationImage from "./EditVariationImage";
import { queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { toast } from "sonner";

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

const editVariationTypeSchema = z.object({
  product: z.number(),
  sku: z.string(),
  stock_quantity: z.coerce.number(),
  description: z.string(),
  price: z.string(),
});

type VariationType = z.infer<typeof editVariationTypeSchema>;

export const EditVariatoinTypeForm = ({
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
  console.log("This is defaultvalues", defaultValues);
  const [editImage, setEditImage] = useState<string[]>([""]);
  const [previewEditVariationsImage, setPreviewEditVariationsImage] = useState<
    string[]
  >([]);

  const form = useForm<VariationType>({
    resolver: zodResolver(editVariationTypeSchema),
    defaultValues: {
      description: "",
      price: "",
      product: undefined,
      sku: "",
      stock_quantity: undefined,
    },
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

  const handleUpdateProductVariation = (data: VariationType) => {
    const variations_image = editImage.filter((img) => !!img);
    const prev_variations_image = defaultValues?.variations_image
      ? defaultValues?.variations_image.map((img) => `${img.id}`)
      : [];
    handleUpdateProductVariationFn({
      ...data,
      variations_image: [...variations_image, ...prev_variations_image],
    });
  };

  const {
    mutate: handleUpdateProductVariationFn,
    isLoading: handleUpdateProductVariationFnLoader,
  } = useMutation({
    mutationFn: async (payload: any) => {
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
    },
    onError: (error: any) => {
      toast.error("Failed to add variation", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const taxCalculator = (final_price: number, tax_rate: number) => {
    const actual_price = (final_price * 100) / (100 + tax_rate);
    const tax_amount = actual_price * (tax_rate / 100);
    return [actual_price.toFixed(2), tax_amount.toFixed(2)];
  };

  useEffect(() => {
    if (!!defaultValues) {
      form.reset({
        description: defaultValues?.description,
        price: defaultValues?.price,
        product: defaultValues?.product,
        sku: defaultValues?.sku,
        stock_quantity: defaultValues?.stock_quantity,
      });
    }
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          handleUpdateProductVariation(data)
        )}
      >
        <div
          className={
            is_edit
              ? "max-h-[35rem] overflow-auto p-2 space-y-4"
              : "p-2 space-y-4"
          }
        >
          {productsLoader ? (
            <div>Loading...</div>
          ) : products && products.length ? (
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={`${field.value}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div>No products available</div>
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about variation"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
                      src={editImage.default_image || editImage.image}
                      alt={`variation-image`}
                      height={100}
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

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
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
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <FormField
                      control={form.control}
                      name="stock_quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="shadcn"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {taxCalculator(Number(form.watch("price")), 13)[1]}
                  </td>
                  <td className="px-6 py-4">
                    {taxCalculator(Number(form.watch("price")), 13)[0]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Button
          type="submit"
          isLoading={handleUpdateProductVariationFnLoader}
          disabled={handleUpdateProductVariationFnLoader}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
