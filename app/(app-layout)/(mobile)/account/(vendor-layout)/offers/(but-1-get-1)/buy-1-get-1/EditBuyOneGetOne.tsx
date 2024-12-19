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
import { useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { addDays } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/fetcher";
import { Plus } from "lucide-react";
import { FoodComboboxForm } from "../../buyonegetone/FoodComboBox";

interface EditBuyOneGetOneProps {
  offer_id: string | number;
}

export function EditBuyOneGetOne({ offer_id }: EditBuyOneGetOneProps) {
  const form = useForm<BuyOneGetOneType>({
    resolver: zodResolver(BuyOneGetOneSchema),
    defaultValues: {
      item: [],
      audience: "All Customer",
      end_date: addDays(new Date(), 7),
      start_date: new Date(),
    },
  });

  const { control } = form;

  const {
    fields: discountedItems,
    append,
    remove,
  } = useFieldArray({
    name: "item",
    control,
  });

  const currentSelectedItem = form.watch("item");
  // console.log("Keep on eye", form.watch());

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

  const { data: offerValue, isLoading: offeLoader } = useQuery({
    queryFn: async () => {
      // const response = await axiosInstance.get(
      //   `/menu/vendor-category?department=${params.department_id}&vendor=${user?.vendor_id}`
      // );
      const response: BuyOneGetOneType = await api()
        .get(`/offers/get-one-free-offer/${offer_id}`)
        .json();
      return response;
    },
    onSuccess: (data: BuyOneGetOneType) => {
      const { audience, end_date, item, start_date } = data;
      // @ts-ignore
      const item_id = item.map((food_id) => food_id.item_id!);
      form.reset({
        audience,
        end_date: new Date(end_date),
        start_date: new Date(start_date),
        item: item_id,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // console.log("Trying to emulate date", offerValue);

  //   const {
  //     mutate: handleUpdateBuyOneGetOneOffer,
  //     isLoading: buyOneGetOneLoader,
  //   } = useMutation<unknown, AxiosError, BuyOneGetOneType>({
  //     mutationFn: async (data) => {
  //       const response = await api()
  //         .patch(data, `/offers/get-one-free-offer/${offer_id}`)
  //         .json();
  //       return response;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("percent-off");
  //       toast({
  //         title: "Sucessfully added Offer!",
  //       });
  //     },
  //     onError: () => {
  //       toast({
  //         title: "Failed to add offer",
  //         description: "Please try again later",
  //         variant: "destructive",
  //       });
  //     },
  //   });

  const handleUpdateBuyOneGetOneOffer = (data: any) => {};

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
          <DialogTitle>Buy 1, Get 1 Free</DialogTitle>
          <DialogDescription>
            Set BOGO discounts on up to 10 items.
          </DialogDescription>
        </DialogHeader>
        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className="w-full max-h-[35rem] overflow-y-auto"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateBuyOneGetOneOffer)}
              className="space-y-3"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h6>Promotion</h6>
                  <p className="text-xs">
                    Choose up to 10 items to include in this campaign
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <>
                    {discountedItems.map((item, index) => {
                      //   console.log("Tjo sos ", item);
                      return (
                        <div className="p-3" key={item.id}>
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
                              {/* <div className="flex-1 flex flex-col">
                              <h6 className="border-r border-b p-3 font-semibold">
                                Categoires
                              </h6>
                              <div className="p-2">
                                
                              </div>
                            </div> */}
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
                    <Button
                      type="button"
                      onClick={() => append(0)}
                      variant={"subtle"}
                    >
                      <Plus className="h-3 w-3" /> Add New Item
                    </Button>
                  </>
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
                  //   isLoading={buyOneGetOneLoader}
                  //   disabled={buyOneGetOneLoader}
                  type="submit"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
