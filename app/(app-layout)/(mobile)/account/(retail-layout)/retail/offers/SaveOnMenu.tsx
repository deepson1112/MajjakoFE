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
  SaveOnMenuItemRetailSchema,
  SaveOnMenuItemRetailType,
} from "@/lib/validators/offers";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { addDays } from "date-fns";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { getImageData, ToUtc } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RetailItems } from "@/types/retail";
import { ProductComboBoxSaveOnMenu } from "./(save-on-products)/save-on-products/ProductComboBoxSaveOnMenu";
import { VariationComboBox } from "./(save-on-products)/save-on-products/VariationComboBox";
import { SubCategoryComboBox } from "./(save-on-products)/save-on-products/SubCategoryComboBox";
import { OfferCategory } from "../inventory/categories/add-product-offer-category/AddProductOfferCategory";
import { OfferCategoryComboBox } from "./(save-on-products)/save-on-products/OfferCategoryComboBox";
import { toast } from "sonner";
import { RetailSubCategory } from "../inventory/products/add-products-new/AddProduct";
import useUser from "@/lib/useUser";

export type RetailProductVariation = {
  id: number;
  description: string;
  price: string;
  specifications: {
    [key: string]: string;
  };
  stock_quantity: number;
  created_date: string;
  updated_date: string;
  sku: string;
  product: number;
  variation: Variation[];
  variations_image: VariationsImage[];
};

type Variation = {
  id: number;
  variation_type: number;
  variation_name: string;
  variation_type_name: string;
};

type VariationsImage = {
  default_image: string;
  image: string;
};

export function SaveOnMenuItem() {
  const [preview, setPreview] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const form = useForm<SaveOnMenuItemRetailType>({
    resolver: zodResolver(SaveOnMenuItemRetailSchema),
    defaultValues: {
      type: "product",
      retail_product: [{ id: undefined, discount_percentages: 0 }],
      sub_category: [{ id: undefined, discount_percentages: 0 }],
      retail_product_variation: [{ id: undefined, discount_percentages: 0 }],
      offer_category: [{ id: undefined, discount_percentages: 0 }],
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
    name: "retail_product",
    control,
  });

  const {
    fields: product_variation_fields,
    append: appendProductVariation,
    remove: removeProductVariation,
  } = useFieldArray({
    name: "retail_product_variation",
    control,
  });

  const selectionType = form.watch("type");

  const { data: retailItems, isLoading: retailItemsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/product/")
        .json<RetailItems[]>();
      return response;
    },
    queryKey: ["retail-items"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: categoiresList, isLoading: cateogryLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/sub-category/?vendor=${user?.vendor_id}`)
        .json<RetailSubCategory[]>();
      return response;
    },
    queryKey: ["vendor-category"],
    onError: (error) => {
      toast.error("Cannot get categories", {
        description: "Please Try Again",
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: offerCategory, isLoading: offerCategoryLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-offers/vendor/offer_category/")
        .json<OfferCategory[]>();
      return response;
    },
    queryKey: ["offer-cateogry"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: variants, isLoading: variantsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/retail-products-variation/")
        .json<RetailProductVariation[]>();
      return response;
    },
    queryKey: ["product-variants"],
    onError: (error) => {
      toast.error("Cannot get variants", {
        description: "Please Try Again",
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: handleAddSaveOnMenuOfferFn, isLoading: saveOnMenuLoader } =
    useMutation({
      mutationFn: async (payload: FormData) => {
        const { data } = await axiosInstance.post(
          "/retail-offers/retail-save-on-item-offer/",
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
        queryClient.invalidateQueries("retail-save-on-menu");
        toast.success("Sucessfully added Offer!");
        form.reset({
          type: "product",
          retail_product: [{ id: undefined, discount_percentages: 0 }],
          sub_category: [{ id: undefined, discount_percentages: 0 }],
          retail_product_variation: [
            { id: undefined, discount_percentages: 0 },
          ],
          audience: "All Customer",
          end_date: addDays(new Date(), 7),
          start_date: new Date(),
          offer_name: "",
          image: "",
        });
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          "Failed to add offer",
          {
            description: "Please try again",
          }
          // description: capitalizeWord(error.response.data.message[0]),
        );
      },
    });

  const handleSaveOnMenuItemOffer = (data: SaveOnMenuItemRetailType) => {
    const formData = new FormData();
    const {
      audience,
      end_date,
      start_date,
      type,
      retail_product,
      retail_product_variation,
      offer_category,
      sub_category,
      offer_name,
      image,
    } = data;
    let payload = null;
    if (type === "category") {
      payload = {
        audience,
        end_date,
        start_date,
        offer_name,
        offer_items: sub_category,
        image,
      };
    } else if (type === "product") {
      payload = {
        audience,
        end_date,
        start_date,
        offer_name,
        offer_items: retail_product,
        image,
      };
    } else if (type === "variation") {
      payload = {
        audience,
        end_date,
        start_date,
        offer_name,
        offer_items: retail_product_variation,
        image,
      };
    } else if (type === "offer-category") {
      payload = {
        audience,
        end_date,
        start_date,
        offer_name,
        offer_items: offer_category,
        image,
      };
    }

    if (payload) {
      formData.append(`offer_name`, payload.offer_name);
      formData.append(`audience`, `${payload.audience}`);
      formData.append(`start_date`, `${ToUtc(`${payload.start_date}`)}`);
      formData.append(`end_date`, `${ToUtc(`${payload.end_date}`)}`);
      payload.offer_items?.forEach((item, index) => {
        formData.append(
          `offer_items[${index}]${
            type === "variation"
              ? "retail_product_variation"
              : type === "category"
              ? "sub_category"
              : type === "product"
              ? "retail_product"
              : "offer_category"
          }`,
          `${item.id}`
        );
        formData.append(
          `offer_items[${index}]discount_percentages`,
          `${item.discount_percentages}`
        );
      });

      if (data.image instanceof File) {
        formData.append("discount_banner", payload.image);
      }
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    handleAddSaveOnMenuOfferFn(formData);
  };

  const retailProduct = form.watch("retail_product");
  console.log("This is reatilProduc", retailProduct);
  useEffect(() => {
    console.log("This is hell world");
    form.trigger("retail_product");
    console.log("Retails");
  }, [retailProduct, form.trigger]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  className="w-full max-h-[25rem] overflow-y-auto"
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
                                      <RadioGroupItem value="product" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Select Product
                                    </FormLabel>
                                  </FormItem>

                                  {selectionType === "product" ? (
                                    <>
                                      {cart_addons_fields.map(
                                        (items, index) => (
                                          <div className="p-3" key={items.id}>
                                            <div className="border rounded-lg">
                                              <div className="flex flex-col md:flex-row">
                                                <div className="flex-1 flex flex-col">
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Products
                                                  </h6>
                                                  <div className="p-2">
                                                    {retailItemsLoader ? (
                                                      <Skeleton className="w-full h-6" />
                                                    ) : (
                                                      !!retailItems && (
                                                        <ProductComboBoxSaveOnMenu
                                                          data={retailItems}
                                                          // @ts-ignore
                                                          form={form}
                                                          index={index}
                                                        />
                                                      )
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
                                                      name={`retail_product.${index}.discount_percentages`}
                                                      render={({ field }) => {
                                                        return (
                                                          <FormItem className="px-3">
                                                            <FormControl>
                                                              <div className="relative">
                                                                <Input
                                                                  placeholder="Discount Percentages"
                                                                  type="number"
                                                                  onWheel={(
                                                                    e
                                                                  ) =>
                                                                    (
                                                                      e.target as HTMLInputElement
                                                                    ).blur()
                                                                  }
                                                                  {...field}
                                                                  className="bg-gray-100 border-none"
                                                                />
                                                                <div className="absolute top-0 right-0 bg-gray-200 h-full w-8 flex items-center justify-center rounded-r-md">
                                                                  %
                                                                </div>
                                                              </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                          </FormItem>
                                                        );
                                                      }}
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
                                            id: undefined,
                                            discount_percentages: 0,
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
                                      <RadioGroupItem value="offer-category" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Select an Offer Category
                                    </FormLabel>
                                  </FormItem>

                                  {selectionType === "offer-category" ? (
                                    <div className="p-3">
                                      <div className="border rounded-lg">
                                        <div className="flex flex-col md:flex-row">
                                          <div className="flex-1 flex flex-col">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Offer Category
                                            </h6>
                                            {offerCategoryLoader ? (
                                              <Skeleton className="h-16 w-full" />
                                            ) : !!offerCategory ? (
                                              <div className="p-2">
                                                <OfferCategoryComboBox
                                                  form={form}
                                                  data={offerCategory}
                                                />
                                              </div>
                                            ) : (
                                              <div>No Category created</div>
                                            )}
                                          </div>

                                          <div className="flex-1 flex flex-col items-stretch">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Promotion
                                            </h6>

                                            <div className="p-2">
                                              <FormField
                                                control={form.control}
                                                name={`offer_category.0.discount_percentages`}
                                                render={({ field }) => {
                                                  return (
                                                    <FormItem className="px-3">
                                                      <FormControl>
                                                        <div className="relative">
                                                          <Input
                                                            placeholder="Discount Percentages"
                                                            type="number"
                                                            onWheel={(e) =>
                                                              (
                                                                e.target as HTMLInputElement
                                                              ).blur()
                                                            }
                                                            {...field}
                                                            className="bg-gray-100 border-none"
                                                          />
                                                          <div className="absolute top-0 right-0 bg-gray-200 h-full w-8 flex items-center justify-center rounded-r-md">
                                                            %
                                                          </div>
                                                        </div>
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>

                                <div>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="category" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Select an Sub-Category
                                    </FormLabel>
                                  </FormItem>

                                  {selectionType === "category" ? (
                                    <div className="p-3">
                                      <div className="border rounded-lg">
                                        <div className="flex flex-col md:flex-row">
                                          <div className="flex-1 flex flex-col">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Category
                                            </h6>
                                            {cateogryLoader ? (
                                              <Skeleton className="h-16 w-full" />
                                            ) : !!categoiresList ? (
                                              <div className="p-2">
                                                <SubCategoryComboBox
                                                  form={form}
                                                  data={categoiresList}
                                                />
                                              </div>
                                            ) : (
                                              <div>No Category created</div>
                                            )}
                                          </div>

                                          <div className="flex-1 flex flex-col items-stretch">
                                            <h6 className="border-r border-b p-3 font-semibold">
                                              Promotion
                                            </h6>

                                            <div className="p-2">
                                              <FormField
                                                control={form.control}
                                                name={`sub_category.0.discount_percentages`}
                                                render={({ field }) => {
                                                  return (
                                                    <FormItem className="px-3">
                                                      <FormControl>
                                                        <div className="relative">
                                                          <Input
                                                            placeholder="Discount Percentages"
                                                            type="number"
                                                            onWheel={(e) =>
                                                              (
                                                                e.target as HTMLInputElement
                                                              ).blur()
                                                            }
                                                            {...field}
                                                            className="bg-gray-100 border-none"
                                                          />
                                                          <div className="absolute top-0 right-0 bg-gray-200 h-full w-8 flex items-center justify-center rounded-r-md">
                                                            %
                                                          </div>
                                                        </div>
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>

                                <div>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="variation" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Select Variations
                                    </FormLabel>
                                  </FormItem>

                                  {selectionType === "variation" ? (
                                    <div className="p-3">
                                      <div className="flex-1 flex flex-col">
                                        <div>
                                          {product_variation_fields.map(
                                            (items, index) => (
                                              <div
                                                className="p-3"
                                                key={items.id}
                                              >
                                                <div className="border rounded-lg">
                                                  <div className="flex flex-col md:flex-row">
                                                    <div className="flex-1 flex flex-col">
                                                      <h6 className="border-r border-b p-3 font-semibold">
                                                        Variants
                                                      </h6>
                                                      <div className="p-2">
                                                        {variantsLoader ? (
                                                          <Skeleton className="w-full h-6" />
                                                        ) : (
                                                          !!retailItems && (
                                                            <VariationComboBox
                                                              data={
                                                                variants?.length
                                                                  ? variants
                                                                  : []
                                                              }
                                                              // @ts-ignore
                                                              form={form}
                                                              index={index}
                                                            />
                                                          )
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
                                                          name={`retail_product_variation.${index}.discount_percentages`}
                                                          render={({
                                                            field,
                                                          }) => {
                                                            return (
                                                              <FormItem className="px-3">
                                                                <FormControl>
                                                                  <div className="relative">
                                                                    <Input
                                                                      placeholder="Discount Percentages"
                                                                      type="number"
                                                                      onWheel={(
                                                                        e
                                                                      ) =>
                                                                        (
                                                                          e.target as HTMLInputElement
                                                                        ).blur()
                                                                      }
                                                                      {...field}
                                                                      className="bg-gray-100 border-none"
                                                                    />
                                                                    <div className="absolute top-0 right-0 bg-gray-200 h-full w-8 flex items-center justify-center rounded-r-md">
                                                                      %
                                                                    </div>
                                                                  </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                              </FormItem>
                                                            );
                                                          }}
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
                                              appendProductVariation({
                                                id: undefined,

                                                discount_percentages: 0,
                                              })
                                            }
                                            variant={"subtle"}
                                          >
                                            <Plus className="h-3 w-3" /> Add New
                                            Item
                                          </Button>
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
                      <DatePicker<SaveOnMenuItemRetailType> form={form} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <DialogFooter className="py-2">
                  <Button
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
