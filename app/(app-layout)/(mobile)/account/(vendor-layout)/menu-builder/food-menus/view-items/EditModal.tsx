import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";

import {
  Category,
  FoodItem,
  addFoodItemSchema,
  foodItemResponse,
} from "@/lib/validators/fooditems";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import useUser from "@/lib/useUser";
import ComboboxForm from "@/components/menu/category/CategoriesComboBox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { api } from "@/lib/fetcher";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getImageData } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import AddonsForm from "../add-items/AddonsForm";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";
import { queryClient } from "@/lib/queryClient";
import { HoursSchedule } from "@/components/HoursSchedule";
import { VendorTimelineType } from "@/types";
import { toast } from "sonner";

interface ViewModalProps {
  items: foodItemResponse;
}

export function EditModal({ items }: ViewModalProps) {
  const { user } = useUser();
  const [preview, setPreview] = useState(items.image);
  const [currentAddons, setCurrentAddons] = useState<number[]>(
    items.food_addons?.length ? items.food_addons.map((addon) => addon.id!) : []
  );

  const [selected, setSelected] = useState<Category[]>([]);

  const { data, isLoading: categoryLoder } = useQuery({
    queryFn: async () => {
      const response: Category[] = await api()
        .get(`/menu/vendor-category/?vendor=${user?.vendor_id!}`)
        .json();
      return response;
    },
    queryKey: ["vendor-category"],
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      setSelected(() =>
        data.filter(
          (category) => `${category.id}` === `${items.vendor_categories}`
        )
      );
      // router.refresh();
    },
  });

  const form = useForm<FoodItem>({
    mode: "onSubmit",
    resolver: zodResolver(addFoodItemSchema),
    defaultValues: {
      ...items,
      image: "",
    },
  });

  const { mutate: updateFoodFn, isLoading: updateFoodFnLoader } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.patch(
        `/menu/add-food-items/${items.id}/`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const data = api().patch(payload, `/menu/add-food-items/${items.id}/`, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      return data;
    },
    onError: (err) => {
      console.error(err);

      toast.error("Cannot Update Food Item", {
        description: "Please Try Again",
      });
    },
    onSuccess: (data) => {
      toast.success("Sucessfully Updated Food Item");
      queryClient.invalidateQueries("food-items-list");
    },
  });

  const { data: timelines, isLoading: timelinesLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get("/vendor/vendor-timelines").json();
      return response as VendorTimelineType[];
    },
    queryKey: ["vendor-timelines"],
  });

  // const {
  //   fields: extraMenuFields,
  //   append,
  //   remove,
  // } = useFieldArray({
  //   name: "foodaddonscategory_set",
  //   form,
  // });

  // const handleUpdateFood = (data: FoodItem) => {
  //   console.log("This is it ahahah,", data);
  //   console.log("Cusomization", currentAddons);
  // };

  const handleUpdateFood = (data: FoodItem) => {
    const formData = new FormData();

    formData.append("food_title", data.food_title);
    // formData.append("price", data.price);
    formData.append("price", `${data.price}`);
    formData.append("description", data?.description || "");
    const { image } = data;
    if (image instanceof File) {
      formData.append("image", image);
    }
    if (currentAddons.length) {
      currentAddons.map((id, index) => {
        // formData.append(`customization_titles[${index}]`, `${id}`);
        formData.append(`customization_titles`, `${id}`);
      });
    }
    // Yet to be implemented
    // if (selected.length) {
    //   selected.map((category, index) => {
    //     formData.append(`vendor_categories[${index}]`, `${category.id}`);
    //   });
    // }
    formData.append(`vendor_categories`, `${selected[0].id}`);
    // console.log(formData);
    updateFoodFn(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] p-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateFood)}>
            <div className="flex lg:flex-row flex-col relative max-h-[600px] overflow-x-hidden">
              <div className="flex flex-col gap-4 p-4 border-r-2 border-gray-100 max-h-[600px] overflow-y-auto flex-1">
                <h4 className="text-lg font-semibold">Add Food</h4>
                {/* <label htmlFor="category" className="form-label">
                Category
                          </label>
                          <select
                className="bg-gray-100  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                aria-label="category"
                {...register("vendor_categories")}
                          >
                {data &&
                  data.data.map((data: Category) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.category_name[0].toUpperCase() +
                          data.category_name.substring(1)}
                      </option>
                    );
                  })}

                          </select> */}
                <div className="h-10 relative">
                  {categoryLoder ? (
                    <Skeleton className="h-10 w-full" />
                  ) : data && data.length ? (
                    <ComboboxForm
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
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              placeholder="Menu Title"
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
                                src={preview ? preview : "/pattern.jpg"}
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
                                const { files, displayUrl } =
                                  getImageData(event);
                                setPreview(displayUrl);
                                onChange(
                                  event.target.files
                                    ? event.target.files[0]
                                    : null
                                );
                              }}
                            />
                          </FormControl>
                        </div>
                        <div>
                          <FormDescription className="mb-4">
                            Uploading food images can increase the chance of
                            cutomer ordering the item. It also helps customer to
                            identify the food and chance of increasing the item.
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
                          <FormLabel>Menu Price</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              placeholder="Menu Price"
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
                              placeholder="Food description..."
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
              </div>
              <div className="h-full p-4 w-full lg:w-72">
                <AddonsForm
                  currentAddons={currentAddons}
                  setCurrentAddons={setCurrentAddons}
                />
                <div className="mt-auto w-full">
                  <h6 className="font-semibold text-slate-700">
                    Change Order Of Customization
                  </h6>
                  {/* <CustomizationOrder items={items} /> */}
                </div>
              </div>
            </div>

            <Button
              // onClick={handleSubmit}
              isLoading={updateFoodFnLoader}
              disabled={updateFoodFnLoader}
              type="submit"
              className="my-2 self-start focus:outline-none text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
