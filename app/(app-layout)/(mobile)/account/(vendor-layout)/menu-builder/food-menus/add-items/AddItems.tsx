"use client";
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
import { axiosInstance } from "@/lib/axiosInstance";
import { Category, Product, productSchema } from "@/lib/validators/fooditems";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/fetcher";
import { getImageData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { DepartmentComboboxFormProps } from "../../categories/add-category/DepartmentComboBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

interface AddItemsProps {
  vendor_id: string;
  is_retail?: boolean;
  defaultValues?: Product;
  is_edit?: boolean;
  setIsEditModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const AddItems = ({
  is_retail,
  is_edit,
  vendor_id,
  defaultValues,
  setIsEditModalOpen,
}: AddItemsProps) => {
  const [preview, setPreview] = useState("");
  const [currentAddons, setCurrentAddons] = useState<number[]>([]);

  const [selectedSubCategoires, setSelectedSubCategories] = useState<
    Category[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    DepartmentComboboxFormProps[]
  >([]);

  const { data: subCategories, isLoading: subCategoriesLoader } = useQuery({
    queryFn: async () => {
      const response: Category[] = await api()
        .get(`/menu/vendor-category/?vendor=${vendor_id}`)
        .json();
      return response;
    },
    queryKey: ["vendor-category"],
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: categories, isLoading: categoriesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/menu/vendor-department/?vendor=${vendor_id}`)
        .json<DepartmentComboboxFormProps[]>();
      return response;
    },
    queryKey: ["vendor-department"],
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<Product>({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
    defaultValues: {
      age_restriction: defaultValues?.age_restriction || false,
      category: `${defaultValues?.category}` || "",
      description: defaultValues?.description || "",
      discountable: defaultValues?.discountable || false,
      sub_category: `${defaultValues?.sub_category}` || "",
      name: defaultValues?.name || "",
    },
  });

  const {
    mutate: addProductMutationFn,
    isLoading: addProductMutationFnLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.post(
        "/retails/retail-products/",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onError: (err) => {
      console.error(err);

      toast.error("Cannot add product", {
        description: "Please Try Again",
      });
    },
    onSuccess: (data) => {
      toast.success("Sucessfully Added Menu");
      form.reset({
        age_restriction: false,
        category: "",
        description: "",
        discountable: false,
        sub_category: "",
        name: "",
      });
      setCurrentAddons([]);
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      setPreview("");
    },
  });

  const {
    mutate: updateProductMutationFn,
    isLoading: updateProductMutationFnLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.patch(
        `/retails/retail-products/${defaultValues?.id}/`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onError: (err) => {
      console.error(err);

      toast.error("Cannot update the product", {
        description: "Please Try Again",
      });
    },
    onSuccess: (data) => {
      toast.success("Sucessfully updated product");
      if (setIsEditModalOpen) {
        setIsEditModalOpen((prev) => !prev);
      }
      queryClient.invalidateQueries("retailer-products");
    },
  });

  const handleAddProduct = (data: Product) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data?.description);
    // @ts-ignore
    const { image } = data;
    if (image instanceof File) {
      formData.append("default_image", image);
    }
    if (data.age_restriction) {
      formData.append(`age_restriction`, "true");
    }
    if (data.discountable) {
      formData.append(`discountable`, "true");
    }

    formData.append("sub_category", data.sub_category);
    formData.append("category", data.category);
    formData.append("vendor", vendor_id);
    console.log("appended");

    addProductMutation(formData);
  };

  const addProductMutation = (formData: FormData) => {
    if (is_edit) {
      return updateProductMutationFn(formData);
    }
    return addProductMutationFn(formData);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col space-y-6 p-6"
          onSubmit={form.handleSubmit(handleAddProduct)}
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Cateogry for the Product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={`${category.id}`} key={category.id}>
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

          {subCategoriesLoader ? (
            <div>Loading...</div>
          ) : subCategories && subCategories.length ? (
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
                      {subCategories.map((subCategory) => (
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
            <div>No Sub-Categoires available</div>
          )}

          <FormField
            control={form.control}
            // @ts-ignore
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem className="flex gap-6">
                <div>
                  <FormLabel>
                    <Avatar className="min-w-[270px] w-full h-[167px] rounded-lg">
                      <AvatarImage
                        src={preview}
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
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer"
                              >
                                <span>Drag and drop</span>
                                <span className="text-brand"> or browse</span>
                                <span>to upload</span>
                              </label>
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF{" "}
                              <span className="text-brand">up to 10MB</span>
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
                        setPreview(displayUrl);
                        onChange(
                          event.target.files ? event.target.files[0] : null
                        );
                      }}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormDescription className="mb-4">
                    Uploading {is_retail ? "Product" : "Menu"} images can
                    increase the chance of cutomer ordering the item. It also
                    helps customer to identify the{" "}
                    {is_retail ? "Product" : "Menu"} and chance of increasing
                    the item.
                  </FormDescription>
                  <div className="flex gap-3">
                    <Button>Add Photo</Button>
                    <Button variant={"subtle"} disabled>
                      Remove Photo
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description of the product"
                      className="resize-none bg-gray-100 border-none"
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="age_restriction"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Age Restriction</FormLabel>
                  <FormDescription>
                    Does the product have age restriction for certain age group?
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

          {/* <div className="h-full p-4 w-full lg:w-72">
            <AddonsForm
              is_retail={is_retail}
              currentAddons={currentAddons}
              setCurrentAddons={setCurrentAddons}
            />
          </div> */}
          <Button
            type="submit"
            isLoading={
              is_edit
                ? updateProductMutationFnLoader
                : addProductMutationFnLoader
            }
            disabled={
              is_edit
                ? updateProductMutationFnLoader
                : addProductMutationFnLoader
            }
          >
            {is_edit ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddItems;
