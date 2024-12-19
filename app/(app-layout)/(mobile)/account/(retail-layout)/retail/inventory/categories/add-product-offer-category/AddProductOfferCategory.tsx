"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { axiosInstance } from "@/lib/axiosInstance";
import { api } from "@/lib/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/MultipleSelector";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validators/user";
import { queryClient } from "@/lib/queryClient";
import { MediaLibrary } from "@/components/Media-Library/MediaLibrary";
import { toast } from "sonner";
import useUser from "@/lib/useUser";
import { RetailItems } from "@/types/retail";

export const offerCategorySchema = z.object({
  category_name: z.string().min(3, "Category should have more than 3 letters"),
  category_description: z.string(),
  active: z.boolean(),
  products: z
    .array(z.string())
    .min(1, "At least select one product for the offer"),
  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`
    )
    .refine(
      (files) =>
        !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  id: z.number().optional(),
});

export type OfferCategory = z.infer<typeof offerCategorySchema>;

const AddProductOfferCategory = () => {
  const { user } = useUser();
  const form = useForm<OfferCategory>({
    resolver: zodResolver(offerCategorySchema),
    defaultValues: {
      active: true,
      category_description: "",
      category_name: "",
      image: "",
      products: [],
    },
  });

  const { data: productLists, isLoading: productListsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/product/`)
        .json<RetailItems[]>();
      return response;
    },
    queryKey: ["retail-product-display"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    mutate: handleAddOfferCateogryFn,
    isLoading: handleAddOfferCateogryFnLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.post(
        `/retail-offers/vendor/offer_category/`,
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
      toast.success("Sucessfullay added product offer");
      form.reset({
        active: true,
        category_description: "",
        category_name: "",
        image: "",
        products: [],
      });
      queryClient.invalidateQueries("offer-cateogry");
    },
    onError: (error: any) => {
      toast.error("Cannot add the product offer", {
        description: `${JSON.parse(error.message).message}`,
      });
      form.reset({
        active: false,
        category_description: "",
        category_name: "",
        image: "",
        products: [],
      });
    },
  });

  const handleAddSpecialCat = (data: OfferCategory) => {
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("category_description", data.category_description);
    formData.append("active", `${data.active}`);

    data.products &&
      data.products.map((product) => {
        formData.append(`products`, `${product}`);
      });
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    handleAddOfferCateogryFn(formData);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleAddSpecialCat)}
      >
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Cateogry Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cateogry Descirtion</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-gray-100 resize-none"
                  placeholder="Cateogry Descriptoin"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {productListsLoader ? (
          <div>Loading...</div>
        ) : (
          !!productLists && (
            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Products</FormLabel>
                  <MultiSelector
                    options={productLists}
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <MultiSelectorTrigger className="bg-gray-100">
                      <MultiSelectorInput placeholder="Select Products..." />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {productLists &&
                          !!productLists.length &&
                          productLists.map((product, index) => (
                            <MultiSelectorItem
                              key={index}
                              value={`${product.id}`}
                            >
                              <div className="flex items-center space-x-2">
                                <span>{product.name}</span>
                              </div>
                            </MultiSelectorItem>
                          ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}

        <MediaLibrary form={form} field="image">
          <Avatar className="w-full h-[180px] rounded-lg">
            <AvatarImage
              src={form.watch("image") || ""}
              className="object-center object-cover"
            />
            <AvatarFallback className="rounded-lg bg-white">
              <div
                className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6"
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
                    PNG, JPG, GIF <span className="text-brand">up to 10MB</span>
                  </p>
                </div>
              </div>
            </AvatarFallback>
          </Avatar>
        </MediaLibrary>

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Is this special Cateogry Active?
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

        <Button
          isLoading={handleAddOfferCateogryFnLoader}
          disabled={handleAddOfferCateogryFnLoader}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddProductOfferCategory;
