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
import {
  SaveOnMenuItemSchema,
  SaveOnMenuItemType,
} from "@/lib/validators/offers";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useQuery } from "react-query";
import { addDays } from "date-fns";
import { api } from "@/lib/fetcher";
import { CategoryComboBox } from "@/components/menu/category/CategoryComboBox";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus } from "lucide-react";
import { FoodComboboxForm } from "./FoodComboBox";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Category, foodItemResponse } from "@/lib/validators/fooditems";

interface EditBuyOneGetOneProps {
  offer_id: string | number;
  url: string;
}

export function EditSaveOnMenuItem({ offer_id, url }: EditBuyOneGetOneProps) {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/menu/add-food-items")
        .json<foodItemResponse[]>();
      return response;
    },
    queryKey: ["food-items-list"],
    onSuccess: (data) => {},
    onError: (error) => {
      console.log("error", error);
    },
  });

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

  const { data: categoiresList, isLoading: cateogryLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/menu/vendor-category/")
        .json<Category[]>();
      return response;
    },
    queryKey: ["vendor-category"],
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: offerValue, isLoading: offerLoader } = useQuery({
    queryFn: async () => {
      const response: SaveOnMenuItemType = await api()
        .get(`${url}${offer_id}`)
        .json();
      return response;
    },
    onSuccess: (data: SaveOnMenuItemType) => {
      console.log("onsucess data", data);
      const {
        offer_items,
        audience,
        end_date,
        type,
        entireCustomization,
        selectionCustomization,
        offer_name,
        start_date,
      } = data;
      let payload = null;
      if (offer_items?.length) {
        if (!!offer_items[0].item) {
          payload = {
            audience,
            start_date,
            end_date,
            selectionCustomization: offer_items,
            offer_name,
            type: "selection",
          };
        }
        if (!!offer_items[0].category) {
          payload = {
            audience,
            start_date,
            end_date,
            entireCustomization: offer_items,
            offer_name,
            type: "entire",
          };
        }
      }
      console.log("Form reset halleo", payload);
      // @ts-ignore
      form.reset(payload);
    },
    onError: (error) => {
      console.log(error);
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[750px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Save on Menu Items</DialogTitle>
          <DialogDescription>
            Set a save on offer selection items or a menu category
          </DialogDescription>
        </DialogHeader>
        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className="w-full max-h-[35rem] overflow-y-auto"
        >
          <Form {...form}>
            <form className="space-y-3">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h6>Offer</h6>
                  <p className="text-xs">
                    Select savings for particular items or an entire category
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
                                  {cart_addons_fields.map((items, index) => (
                                    <div className="p-3" key={index}>
                                      <div className="border rounded-lg">
                                        <div className="flex flex-col md:flex-row">
                                          <div className="flex-1 flex flex-col">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Item
                                            </h6>
                                            <div className="p-2">
                                              {data?.length && (
                                                <FoodComboboxForm
                                                  data={data}
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
                                          <div className="flex-1 flex flex-col">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Price
                                            </h6>
                                            <span className="p-5">
                                              {!!currentOfferItem &&
                                              !!currentOfferItem[index] &&
                                              !!currentOfferItem[index]
                                                .discount_percentages &&
                                              !!currentOfferItem[index].item
                                                ? `$${
                                                    (currentOfferItem[index]
                                                      ?.item ??
                                                      0 *
                                                        Number(
                                                          currentOfferItem[
                                                            index
                                                          ].discount_percentages
                                                        )) / 100
                                                  }`
                                                : "--"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      append({
                                        item: undefined,
                                        discount_percentages: "30",
                                      })
                                    }
                                    variant={"subtle"}
                                  >
                                    <Plus className="h-3 w-3" /> Add New Item
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
                                            {categoiresList && (
                                              <CategoryComboBox
                                                form={form}
                                                data={categoiresList}
                                              />
                                            )}
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
                                                  onValueChange={field.onChange}
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
              {/* <AccordionItem value="item-4">
                <AccordionTrigger>
                  <h6>Weekly spend</h6>
                  <p className="text-xs">Set an optional maximum spend</p>
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="weekly_spend"
                    render={({ field }) => (
                      <FormItem className="space-y-2 rounded-md border p-4">
                        <div className="flex flex-row items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Weekly Spend</FormLabel>
                            <FormDescription>
                              Set an optional maximum weekly spend
                            </FormDescription>
                          </div>
                        </div>
                        {weeklySpend ? (
                          <FormField
                            control={form.control}
                            name="maximum_redeem_value"
                            render={({ field }) => {
                              return (
                                <FormItem className="px-3">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter weekly budget"
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
                        ) : null}
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem> */}
              <DialogFooter>
                <Button
                  //   isLoading={saveOnMenuLoader}
                  //   disabled={saveOnMenuLoader}
                  type="submit"
                >
                  Create Offer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
