"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SaveOnMenuItemSchema,
  SaveOnMenuItemType,
} from "@/lib/validators/offers";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { FoodComboboxForm } from "./(save-on-menu-items)/save-on-menu-items/FoodComboBox";
import { addDays } from "date-fns";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { CategoryComboBox } from "@/components/menu/category/CategoryComboBox";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { getImageData } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useState } from "react";
import Image from "next/image";
import { Category } from "@/lib/validators/fooditems";
import { toast } from "sonner";

export function SaveOnMenuItem() {
  const [preview, setPreview] = useState("");

  const form = useForm<SaveOnMenuItemType>({
    resolver: zodResolver(SaveOnMenuItemSchema),
    defaultValues: {
      type: "selection",
      selectionCustomization: [{ item: undefined, discount_percentages: "30" }],
      entireCustomization: [
        { category: undefined, discount_percentages: "30" },
      ],
      audience: "All Customer",
      end_date: addDays(new Date(), 7),
      start_date: new Date(),
      offer_name: "",
      image: "",
    },
  });

  const { control } = form;

  const {
    fields: cart_addons_fields,
    append,
    remove,
  } = useFieldArray({
    name: "selectionCustomization",
    control,
  });

  const currentOfferItem = form.watch("selectionCustomization");
  const selectionType = form.watch("type");
  // const weeklySpend = form.watch("weekly_spend");

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = axiosInstance.get("/menu/add-food-items");
      return response;
    },
    queryKey: ["food-items-list"],
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const { data: categoiresList, isLoading: cateogryLoader } = useQuery({
    queryFn: async () => {
      const response: Category[] = await api()
        .get("/menu/vendor-category/")
        .json();
      return response;
    },
    queryKey: ["vendor-category"],
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: handleAddSaveOnMenuOfferFn, isLoading: saveOnMenuLoader } =
    useMutation<unknown, AxiosError, SaveOnMenuItemType>({
      mutationFn: async (data) => {
        const response = await api()
          .post(data, "/offers/save-on-items/")
          .json();
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("percent-off");
        toast.success("Sucessfully added Offer!");
      },
      onError: (error) => {
        toast.error("Failed to add offer", {
          description: error.message,
        });
      },
    });

  const handleSaveOnMenuItemOffer = (data: SaveOnMenuItemType) => {
    const {
      audience,
      end_date,
      start_date,
      type,
      entireCustomization,
      selectionCustomization,
      offer_name,
    } = data;
    let payload = null;
    if (type === "entire") {
      payload = {
        audience,
        end_date,
        start_date,
        offer_name,
        offer_items: entireCustomization,
      };
    } else if (type === "selection") {
      payload = {
        audience,
        end_date,
        start_date,
        offer_name,
        offer_items: selectionCustomization,
      };
    }
    // @ts-ignore
    handleAddSaveOnMenuOfferFn(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-2 border-gray-300 bg-[url('/buy-one-get-one.jpg')] bg-center bg-cover rounded-lg overflow-hidden cursor-pointer hover:border-gray-600">
          <div className="border-2 border-gray-300 bg-[url('/save-menu.jpg')] bg-center bg-cover rounded-lg overflow-hidden cursor-pointer hover:border-gray-600">
            <div className="w-full h-full px-4 py-8 backdrop-brightness-50">
              <h6 className="text-xl font-bold text-white">
                Save on Menu Items
              </h6>
              <p className="text-xs text-white">
                Set a percentage off select items or a menu category
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[1100px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveOnMenuItemOffer)}>
            <DialogHeader>
              <DialogTitle>Save on Menu Items</DialogTitle>

              <DialogDescription>
                Set a save on offer selection items or a menu category
              </DialogDescription>
            </DialogHeader>
            <div className="flex">
              <div className="flex-1">
                <Accordion
                  type="single"
                  defaultValue="item-1"
                  collapsible
                  className="w-full max-h-[35rem] overflow-y-auto"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <h6>Offer</h6>

                      <p className="text-xs">
                        Select savings for particular items or an entire
                        category
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <FormField
                        control={form.control}
                        name="offer_name"
                        render={({ field }) => {
                          return (
                            <FormItem className="px-3">
                              <FormLabel>Offer name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Title of the offer"
                                  type="text"
                                  {...field}
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
                        name="type"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="selection" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Select Items
                                    </FormLabel>
                                  </FormItem>
                                  {selectionType === "selection" ? (
                                    <>
                                      {cart_addons_fields.map(
                                        (items, index) => (
                                          <div className="p-3" key={items.id}>
                                            <div className="border rounded-lg">
                                              <div className="flex flex-col md:flex-row">
                                                <div className="flex-1 flex flex-col">
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Item
                                                  </h6>
                                                  <div className="p-2">
                                                    {data?.data.length && (
                                                      <FoodComboboxForm
                                                        data={data.data}
                                                        form={form}
                                                        index={index}
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex-1 flex flex-col">
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Promotion
                                                  </h6>
                                                  <div className="p-2">
                                                    <FormField
                                                      control={form.control}
                                                      name={`selectionCustomization.${index}.discount_percentages`}
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <Select
                                                            onValueChange={
                                                              field.onChange
                                                            }
                                                            defaultValue={
                                                              field.value
                                                            }
                                                          >
                                                            <FormControl className="border-none bg-gray-100">
                                                              <SelectTrigger>
                                                                <SelectValue placeholder="Select a promotion Percent" />
                                                              </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                              <SelectItem value="20">
                                                                20%
                                                              </SelectItem>
                                                              <SelectItem value="30">
                                                                30%
                                                              </SelectItem>
                                                              <SelectItem value="40">
                                                                40%
                                                              </SelectItem>
                                                              <SelectItem value="50">
                                                                50%
                                                              </SelectItem>
                                                              <SelectItem value="75">
                                                                75%
                                                              </SelectItem>
                                                            </SelectContent>
                                                          </Select>

                                                          <FormMessage />
                                                        </FormItem>
                                                      )}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          append({
                                            // @ts-ignore
                                            item: "",
                                            discount_percentages: "30",
                                          })
                                        }
                                        variant={"subtle"}
                                      >
                                        <Plus className="h-3 w-3" /> Add New
                                        Item
                                      </Button>
                                    </>
                                  ) : null}
                                </div>

                                <div>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="entire" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Select an Entire Category
                                    </FormLabel>
                                  </FormItem>

                                  {selectionType === "entire" ? (
                                    <div className="p-3">
                                      <div className="border rounded-lg">
                                        <div className="flex flex-col md:flex-row">
                                          <div className="flex-1 flex flex-col">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Category
                                            </h6>
                                            {cateogryLoader ? (
                                              <Skeleton className="h-16 w-full" />
                                            ) : (
                                              <div className="p-2">
                                                <CategoryComboBox
                                                  form={form}
                                                  // @ts-ignore
                                                  data={categoiresList}
                                                />
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex-1 flex flex-col items-stretch">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Promotion
                                            </h6>
                                            <div className="p-2">
                                              <FormField
                                                control={form.control}
                                                name={`entireCustomization.0.discount_percentages`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <Select
                                                      onValueChange={
                                                        field.onChange
                                                      }
                                                      defaultValue={field.value}
                                                    >
                                                      <FormControl className="border-none bg-gray-100">
                                                        <SelectTrigger>
                                                          <SelectValue placeholder="Select a promotion Percent" />
                                                        </SelectTrigger>
                                                      </FormControl>
                                                      <SelectContent>
                                                        <SelectItem value="20">
                                                          20%
                                                        </SelectItem>
                                                        <SelectItem value="30">
                                                          30%
                                                        </SelectItem>
                                                        <SelectItem value="40">
                                                          40%
                                                        </SelectItem>
                                                        <SelectItem value="50">
                                                          50%
                                                        </SelectItem>
                                                        <SelectItem value="75">
                                                          75%
                                                        </SelectItem>
                                                      </SelectContent>
                                                    </Select>

                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <h6>Audience</h6>
                      <p className="text-xs">
                        Select which customers will see your offer
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="audience"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="All Customer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    All customers
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="All Active Customer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    All Active customers
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="New Customer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    New customers only
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <h6>Dates</h6>
                      <p className="text-xs">
                        Select the dates your off will run for.
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <DatePicker<SaveOnMenuItemType> form={form} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <DialogFooter className="py-2">
                  <Button
                    type="submit"
                    isLoading={saveOnMenuLoader}
                    disabled={saveOnMenuLoader}
                  >
                    Create Offer
                  </Button>
                </DialogFooter>
              </div>
              <figure className="hidden max-w-sm w-full bg-gray-100 rounded-lg mx-2 md:grid place-items-center">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="flex flex-col">
                      <div>
                        <FormLabel>
                          <Avatar className="min-w-[270px] w-full h-[167px] rounded-lg">
                            <AvatarImage
                              src={preview}
                              className="object-center object-cover"
                            />
                            <AvatarFallback className="rounded-lg bg-gray-100">
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
                                    alt="dafd"
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
                              const { files, displayUrl } = getImageData(event);
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
                        <FormDescription className="mb-4 max-w-xs">
                          Uploading offer images shows the user know about the
                          offer in details
                        </FormDescription>
                        {/* <div className="flex gap-3">
                        <Button>Add Photo</Button>
                        <Button variant={"subtle"} disabled>
                          Remove Photo
                        </Button>
                      </div> */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </figure>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
