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
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus } from "lucide-react";
import { ProductComboboxForm } from "./ProductComboBox";
import { RetailItems } from "@/types/retail";
import { BuyOneGetOneRetail } from "../..";
import { useEffect, useState } from "react";
import { ToUtc } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

interface EditRetailBuyOneGetOneProps {
  offer_id: string | number;
  items: BuyOneGetOneRetail;
}

export function EditRetailBuyOneGetOne({
  offer_id,
  items,
}: EditRetailBuyOneGetOneProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<BuyOneGetOneType>({
    resolver: zodResolver(BuyOneGetOneSchema),
    defaultValues: {
      item: [],
      audience: "All Customer",
      end_date: addDays(new Date(), 7),
      start_date: new Date(),
      offer_name: "",
      type: "selection",
      image: "",
    },
  });

  console.log("Items, audience, enddata, startdate");

  const { control } = form;

  const {
    fields: discountedItems,
    append,
    remove,
  } = useFieldArray({
    name: "item",
    control,
  });

  const { data: retailItems, isLoading: retailItemsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/product/")
        .json<{ results: RetailItems[] }>();
      return response;
    },
    queryKey: ["retail-items"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: handleUpateBuyOneGetOneOfferFn,
    isLoading: handleUpateBuyOneGetOneOfferFnLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.patch(
        `/retail-offers/retail-get-one-free-offer/${offer_id}/`,
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
      toast.success("Sucessfully edited the offer");
      queryClient.invalidateQueries("retail-buy-one-get-one");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error("Unable to edit the offer", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleBuyOneOffer = (data: BuyOneGetOneType) => {
    console.log("Cliced");
    const formData = new FormData();
    formData.append("audience", data.audience);
    data.item.map((product) => {
      formData.append("retail_products", `${product}`);
    });

    formData.append("offer_name", data.offer_name);
    formData.append("start_date", `${ToUtc(`${data.start_date}`)}`);
    formData.append("end_date", `${ToUtc(`${data.end_date}`)}`);
    if (data.image instanceof File) {
      formData.append("discount_banner", data.image);
    }
    handleUpateBuyOneGetOneOfferFn(formData);
  };

  useEffect(() => {
    const products = items.retail_products.map(
      (retail_product) => retail_product.product_id
    );

    form.reset({
      item: products,
      audience: items.audience,
      start_date: items.start_date,
      end_date: items.end_date,
      offer_name: items.offer_name,
      type: "selection",
    });
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[1100px]"
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
          className="w-full"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleBuyOneOffer)}
              className="space-y-3"
            >
              <div className="max-h-[35rem] overflow-y-auto">
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
                                    {retailItemsLoader ? (
                                      <Skeleton className="w-full h-6" />
                                    ) : (
                                      !!retailItems?.results && (
                                        <ProductComboboxForm
                                          data={retailItems.results}
                                          form={form}
                                          index={index}
                                        />
                                      )
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
              </div>

              <DialogFooter>
                <Button
                  isLoading={handleUpateBuyOneGetOneOfferFnLoader}
                  disabled={handleUpateBuyOneGetOneOfferFnLoader}
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
