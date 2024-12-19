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
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuyOneGetOneSchema, BuyOneGetOneType } from "@/lib/validators/offers";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { addDays } from "date-fns";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { Plus } from "lucide-react";
import { FoodComboboxForm } from "./buyonegetone/FoodComboBox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getImageData } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { Category } from "@/lib/validators/fooditems";
import { toast } from "sonner";
import { flattenBy } from "@tanstack/react-table";

export function BuyOneGetOne() {
  const [preview, setPreview] = useState("");

  const form = useForm<BuyOneGetOneType>({
    resolver: zodResolver(BuyOneGetOneSchema),
    defaultValues: {
      type: "selection",
      item: [],
      audience: "All Customer",
      end_date: addDays(new Date(), 7),
      start_date: new Date(),
      image: "",
      offer_name: "",
    },
  });

  const { control } = form;

  const { fields: discountedItems, append } = useFieldArray({
    name: "item",
    control,
  });

  const currentSelectedItem = form.watch("item");

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = axiosInstance.get("/menu/add-food-items");
      return response;
    },
    queryKey: ["food-items-list"],
    onSuccess: (data) => {},
    onError: (error) => {},
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log("Vliadatin chekc", data);

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

  const { mutate: handleBuyOneOfferFn, isLoading: handleBuyOneOfferFnLoader } =
    useMutation({
      mutationFn: async (data: BuyOneGetOneType) => {
        const response = await api()
          .post(data, "/offers/get-one-free-offer/")
          .json();
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("buy-one-get-one");
        toast.success("Sucessfully added Offer!");
      },
      onError: (error: any) => {
        toast.error("Failed to add offer", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const handleBuyOneOffer = (data: BuyOneGetOneType) => {
    handleBuyOneOfferFn(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-2 border-gray-300 bg-[url('/buy-one-get-one.jpg')] bg-center bg-cover rounded-lg overflow-hidden cursor-pointer hover:border-gray-600">
          <div className="w-full h-full px-4 py-8 backdrop-brightness-50">
            <h6 className="text-xl font-bold text-white">Buy 1, Get 1 Free</h6>
            <p className="text-xs text-white">
              Set BOGO discounts on up to 10 items.ss
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[1100px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleBuyOneOffer)}>
            <DialogHeader>
              <DialogTitle>Buy 1, Get 1 Free</DialogTitle>

              <DialogDescription>
                Set BOGO discounts on up to 10 items.
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
                      <h6>Promotion</h6>

                      <p className="text-xs">
                        Choose up to 10 items to include in this campaign
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="space-y-6">
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
                        {discountedItems.map((item, index) => {
                          return (
                            <div className="p-3" key={index}>
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
                                      Price
                                    </h6>
                                    <span className="p-5">--</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="flex flex-col items-start space-y-3">
                          <Label>Add Items to be included in the offer.</Label>
                          <Button
                            type="button"
                            onClick={() => append(0)}
                            variant={"subtle"}
                          >
                            <Plus className="h-3 w-3" /> Add New Item
                          </Button>
                        </div>
                      </div>
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
                      <DatePicker<BuyOneGetOneType> form={form} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <DialogFooter className="py-2">
                  <Button
                    type="submit"
                    isLoading={handleBuyOneOfferFnLoader}
                    disabled={handleBuyOneOfferFnLoader}
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
