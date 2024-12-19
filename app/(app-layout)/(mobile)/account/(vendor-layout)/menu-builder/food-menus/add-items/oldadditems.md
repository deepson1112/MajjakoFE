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
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axiosInstance";
import {
Category,
FoodItem,
addFoodItemSchema,
} from "@/lib/validators/fooditems";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/fetcher";
import { getImageData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AddonsForm from "./AddonsForm";
import Image from "next/image";
import { VendorTimelineType } from "@/types";
import { HoursSchedule } from "@/components/HoursSchedule";
import SubCategoriesComboBox from "@/components/menu/category/SubCategoriesComboBox";
import CategoriesComboBox from "@/components/menu/category/CategoriesComboBox";
import {
DepartmentComboBox,
DepartmentComboboxFormProps,
} from "../../categories/add-category/DepartmentComboBox";

interface AddItemsProps {
vendor_id: string;
is_retail?: boolean;
}

const AddItems = ({ is_retail, vendor_id }: AddItemsProps) => {
const [preview, setPreview] = useState("");
const [currentAddons, setCurrentAddons] = useState<number[]>([]);

const [selected, setSelected] = useState<Category[]>([]);
const [selectedCategories, setSelectedCategories] = useState<
DepartmentComboboxFormProps[]

> ([]);

const { data, isLoading: categoryLoder } = useQuery({
queryFn: async () => {
const response: Category[] = await api()
.get(`/menu/vendor-category/?vendor=${vendor_id}`)
.json();
return response;
},
queryKey: ["vendor-category"],
onError: (error) => {
toast({
title: "Issue while fetching Departmets",
description: "Please Try Again",
variant: "destructive",
});
},
});

const { data: department, isLoading: departmentLoader } = useQuery({
queryFn: async () => {
const response = await api()
.get(`/menu/vendor-category/?vendor=${vendor_id}`)
.json<DepartmentComboboxFormProps[]>();
return response;
},
queryKey: ["vendor-category"],
onError: (error) => {
toast({
title: "Issue while fetching Departmets",
description: "Please Try Again",
variant: "destructive",
});
},
});

const form = useForm<FoodItem>({
mode: "onSubmit",
resolver: zodResolver(addFoodItemSchema),
defaultValues: {
image: undefined,
description: "",
food_title: "",
price: undefined,
},
});

const { data: timelines, isLoading: timelinesLoader } = useQuery({
queryFn: async () => {
const response = await api().get("/vendor/vendor-timelines").json();
return response as VendorTimelineType[];
},
queryKey: ["vendor-timelines"],
});

const { mutate: addFoodMutationFn, isLoading: addFoodMutationFnLoader } =
useMutation({
mutationFn: async (payload: FormData) => {
const { data } = await axiosInstance.post(
"/menu/add-food-items/",
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

        toast({
          title: "Cannot Log In",
          description: "Please Try Again",
          variant: "destructive",
        });
      },
      onSuccess: (data) => {
        toast({
          title: "Sucessfully Added Menu",
          variant: "default",
        });
        form.reset();
        setCurrentAddons([]);
        setSelected([]);
      },
    });

const handleAddFood = (data: FoodItem) => {
const formData = new FormData();
formData.append("food_title", data.food_title);
formData.append("price", `${data.price}`);
formData.append("description", data?.description || "");
const { image } = data;
if (image instanceof File) {
formData.append("image", image);
}
if (currentAddons.length) {
currentAddons.map((id, index) => {
formData.append(`customization_titles`, `${id}`);
});
}
if (!!data.hours_schedule) {
formData.append("hours_schedule", `${data.hours_schedule}`);
}
formData.append(`vendor_categories`, `${selected[0].id}`);
console.log("Submiteddd items");

    console.log(formData);
    addFoodMutation(formData);

};

const addFoodMutation = (formData: FormData) => {
addFoodMutationFn(formData);
};

return (
<>
<Form {...form}>
<form
          className="flex flex-col lg:flex-row"
          onSubmit={form.handleSubmit(handleAddFood)}
        >
<div className="flex flex-col gap-4 p-4 border-r-2 border-gray-100 flex-1">
<h4 className="text-lg font-semibold">
{is_retail ? "Add Product" : "Add Food"}
</h4>

            {/* categoires */}

            <div className="h-10 relative mb-5">
              <FormLabel className="mb-3">Categories</FormLabel>

              {departmentLoader ? (
                <Skeleton className="h-10 w-full" />
              ) : department && department.length ? (
                <DepartmentComboBox
                  data={department}
                  // @ts-ignore
                  form={form}
                />
              ) : (
                <div>No Categories Available</div>
              )}
            </div>

            {/* sub categoires */}
            <div className="h-10 relative mb-5">
              <FormLabel className="mb-3">Sub-Categories</FormLabel>

              {categoryLoder ? (
                <Skeleton className="h-10 w-full" />
              ) : data && data.length ? (
                <SubCategoriesComboBox
                  data={data}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : (
                <div>No Categories Available</div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="food_title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder={`${is_retail ? "Product" : "Menu"} Name`}
                          className="bg-gray-100 border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
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
                                    <span className="text-brand">
                                      {" "}
                                      or browse
                                    </span>
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
                        increase the chance of cutomer ordering the item. It
                        also helps customer to identify the{" "}
                        {is_retail ? "Product" : "Menu"} and chance of
                        increasing the item.
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
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        {is_retail ? "Product" : "Menu"} Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder={`${
                            is_retail ? "Product" : "Menu"
                          } Price`}
                          className="bg-gray-100 border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={`${
                            is_retail ? "Product" : "Food"
                          } description...`}
                          className="bg-gray-100 border-none resize-none"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {timelinesLoader ? (
                <Skeleton className="h-8 w-full rounded-md" />
              ) : timelines?.length ? (
                <HoursSchedule form={form} timelines={timelines} />
              ) : null}
            </div>

            <Button
              // onClick={handleSubmit}
              isLoading={addFoodMutationFnLoader}
              disabled={addFoodMutationFnLoader}
              type="submit"
              className="self-start focus:outline-none text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Create
            </Button>
          </div>

          <div className="h-full p-4 w-full lg:w-72">
            <AddonsForm
              is_retail={is_retail}
              currentAddons={currentAddons}
              setCurrentAddons={setCurrentAddons}
            />
          </div>
        </form>
      </Form>
    </>

);
};

export default AddItems;
