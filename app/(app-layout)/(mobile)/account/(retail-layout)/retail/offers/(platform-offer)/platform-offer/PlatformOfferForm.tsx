import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { RetailItems } from "@/types/retail";
import { VariationComboBox } from "../../(save-on-products)/save-on-products/VariationComboBox";
import { ProductComboBoxSaveOnMenu } from "../../(save-on-products)/save-on-products/ProductComboBoxSaveOnMenu";
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
  platformOfferSchema,
  PlatfromOfferType,
} from "@/lib/validators/offers";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { getImageData, ToUtc } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/Dialog";

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

type ProductVariation = {
  sku: string;
  price: number;
  discount_percentage: number;
  discounted_amount: number;
};

type RetailProduct = {
  id: number;
  name: string;
  products_variations: ProductVariation[];
};

type RetailProductVariatoin = {
  id: number;
  name: string;
  products_variations: ProductVariation[];
  price?: number;
  product_name?: string;
};

type PlatformOffersResponse = {
  id: number;
  discount_percentages: number;
  platform_offer: number;
  vendor: number;
  retail_product: RetailProduct | null;
  retail_product_variation: RetailProductVariatoin | null;
};

type AccumulatedOffer = {
  id: number;
  discount_percentages: string;
  price: number;
  offerId: number;
  name: string;
};

interface PlatoformOfferProps {
  id: number;
  audience: string;
  offer_name: string;
  start_date: string;
  end_date: string;
  active: boolean;
  discount_banner: string;
  created_date: string;
  created_by: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type ReductedRetailProduct = {
  id: number;
  name: string;
  products_variations: ProductVariation[];
};

type PlatformOffer = {
  id: number;
  retail_product?: RetailProduct;
  discount_percentages: number;
};

const PlatformOfferForm = ({
  offer_name,
  audience,
  id,
  setIsOpen,
}: PlatoformOfferProps) => {
  const [preview, setPreview] = useState("");

  const form = useForm<PlatfromOfferType>({
    resolver: zodResolver(platformOfferSchema),
    defaultValues: {
      offer_name: offer_name,
      type: "product",
      retail_product: [{ id: undefined, discount_percentages: 0 }],

      retail_product_variation: [{ id: undefined, discount_percentages: 0 }],
      image: "",
    },
  });

  const { control } = form;

  const {
    fields: retail_product_fields,
    append,
    remove,
  } = useFieldArray({
    name: "retail_product",
    control,
    keyName: "listId",
  });

  const {
    fields: product_variation_fields,
    append: appendProductVariation,
    remove: removeProductVariation,
  } = useFieldArray({
    name: "retail_product_variation",
    control,
  });

  const [addedProductOffers, setAddedProductOffers] = useState<
    | {
        discount_percentages: string;
        id: number;
        offerId: number;
        price: undefined | number;
        name: string;
      }[]
    | null
  >(null);
  const [addedVariationOffers, setAddedVariationOffers] = useState<
    | {
        discount_percentages: string;
        id: number;
        offerId: number;
        price: undefined | number;
        name: string;
      }[]
    | null
  >(null);

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

  console.log("This si retail products", retailItems);

  const { data: variants, isLoading: variantsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/retail-products-variation/")
        .json<{ results: RetailProductVariation[] }>();
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

  const {
    mutate: handleAddPlatformOfferFn,
    isLoading: handleAddPlatformOfferFnLoader,
  } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api()
        .post(payload, "/retail-offers/vendor/platform_offer/")
        .json();
      return response;
    },
    onSuccess: (data, context) => {
      queryClient.invalidateQueries(`platform-offers-${id}`);
      console.log("Sucess fully refrected");
      toast.success("Sucessfully added Offer!");

      if (context.offers[0]?.retail_product) {
        form.reset({
          offer_name: offer_name,
          type: "product",
          retail_product: [{ id: undefined, discount_percentages: 0 }],

          retail_product_variation: [
            { id: undefined, discount_percentages: 0 },
          ],
          image: "",
        });
      }
      if (context.offers[0].retail_product_variation) {
        form.reset({
          offer_name: offer_name,
          type: "variation",
          retail_product: [{ id: undefined, discount_percentages: 0 }],

          retail_product_variation: [
            { id: undefined, discount_percentages: 0 },
          ],
          image: "",
        });
      }
    },
    onError: (error: any) => {
      toast.error("Failed to add offer", {
        description: "Please try again",
      });
    },
  });

  // console.log("Product", addedProductOffers);
  // console.log("Variations", addedVariationOffers);

  const {
    mutate: handleDeletePlatformOfferFn,
    isLoading: handleDeletePlatformOfferFnLoader,
  } = useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(
        `/retail-offers/vendor/platform_offer/${id}/`
      );
      return response;
    },
    onSuccess: (data, context) => {
      queryClient.invalidateQueries(`platform-offers-${id}`);
      toast.success("Sucessfully added Offer!");
    },
    onError: (error: any) => {
      toast.error("Failed to add offer", {
        description: error.message,
      });
    },
  });

  const {
    mutate: handleUpdatePlatformOfferFn,
    isLoading: handleUpdatePlatformOfferFnLoader,
  } = useMutation({
    mutationFn: async (payload: {
      discount_percentages: string;
      id: number;
      offerId: number;
      type: string;
    }) => {
      const formattedPayload = {
        platform_offer: id,
        discount_percentages: payload.discount_percentages,
        [payload.type === "product"
          ? "retail_product"
          : "retail_product_variation"]: payload.id,
      };

      const response = await api()
        .patch(
          formattedPayload,
          `/retail-offers/vendor/platform_offer/${payload.offerId}/`
        )
        .json();
      return response;
    },
    onSuccess: (data, context) => {
      queryClient.invalidateQueries(`platform-offers-${id}`);
      toast.success("Sucessfully added Offer!");
    },
    onError: (error: any) => {
      toast.error("Failed to add offer", {
        description: error.message,
      });
    },
  });

  const { data: platformOffers, isLoading: platformOffersLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-offers/vendor/platform_offer/?platform_offer=${id}`)
        .json<PlatformOffersResponse[]>();
      return response;
    },
    // onSuccess: (data) => {
    //   if (!!data) {
    //     const retail_product = data
    //       .filter((item) => !!item.retail_product)
    //       .reduce((acc, item) => {
    //         acc = [
    //           // @ts-ignore

    //           ...acc,
    //           // @ts-ignore

    //           {
    //             id: item?.retail_product?.id,
    //             discount_percentages: `${item.discount_percentages}`,
    //             price: item.retail_product?.products_variations[0].price,
    //             offerId: item.id,
    //             name: item.retail_product?.name,
    //           },
    //         ];
    //         return acc;
    //       }, []);

    //     const retail_product_variation = data
    //       .filter((item) => !!item.retail_product_variation)
    //       .reduce((acc, item) => {
    //         acc = [
    //           // @ts-ignore
    //           ...acc,
    //           // @ts-ignore
    //           {
    //             id: item?.retail_product_variation?.id,
    //             discount_percentages: `${item.discount_percentages}`,
    //             // @ts-ignore
    //             price: item?.retail_product_variation.price,
    //             offerId: item.id,
    //             // @ts-ignore
    //             name: item?.retail_product_variation.product_name,
    //           },
    //         ];
    //         return acc;
    //       }, []);

    //     if (!!retail_product?.length) {
    //       setAddedProductOffers(retail_product);
    //     }
    //     if (!!retail_product_variation?.length) {
    //       setAddedVariationOffers(retail_product_variation);
    //     }
    //   }
    // },
    queryKey: [`platform-offers-${id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSaveOnMenuItemOffer = (data: PlatfromOfferType) => {
    const { type, retail_product, retail_product_variation } = data;
    let payload = null;
    if (type === "product") {
      payload = {
        offers: retail_product?.map((item) => ({
          platform_offer: id,
          retail_product: item.id,
          discount_percentages: item.discount_percentages,
        })),
      };
    } else if (type === "variation") {
      payload = {
        offers: retail_product_variation?.map((item) => ({
          platform_offer: id,
          retail_product_variation: item.id,
          discount_percentages: item.discount_percentages,
        })),
      };
    }

    handleAddPlatformOfferFn(payload);
  };
  console.log("This is refetchdon hell", platformOffers?.length);

  // useEffect(() => {
  //   //   if (!!platformOffers) {
  //   //     const retail_product = platformOffers
  //   //       .filter((item) => !!item.retail_product)
  //   //       .reduce((acc, item) => {
  //   //         acc = [
  //   //           // @ts-ignore

  //   //           ...acc,
  //   //           // @ts-ignore

  //   //           {
  //   //             id: item?.retail_product?.id,
  //   //             discount_percentages: `${item.discount_percentages}`,
  //   //             price: item.retail_product?.products_variations[0].price,
  //   //             offerId: item.id,
  //   //           },
  //   //         ];
  //   //         return acc;
  //   //       }, []);

  //   //     const retail_product_variation = platformOffers
  //   //       .filter((item) => !!item.retail_product_variation)
  //   //       .reduce((acc, item) => {
  //   //         acc = [
  //   //           // @ts-ignore
  //   //           ...acc,
  //   //           // @ts-ignore
  //   //           {
  //   //             id: item?.retail_product_variation?.id,
  //   //             discount_percentages: `${item.discount_percentages}`,
  //   //             price: undefined,
  //   //             offerId: item.id,
  //   //           },
  //   //         ];
  //   //         return acc;
  //   //       }, []);

  //   //     if (!!retail_product?.length) {
  //   //       form.reset({
  //   //         retail_product,
  //   //         type: "product",
  //   //         offer_name,
  //   //       });
  //   //     }
  //   //     if (!!retail_product_variation?.length) {
  //   //       form.reset({
  //   //         retail_product_variation,
  //   //         type: "variation",
  //   //         offer_name,
  //   //       });
  //   //     }
  //   //   }

  //   dont comment from this
  //   if (!!platformOffers?.length) {
  //     const retail_product = platformOffers
  //       .filter((item) => !!item.retail_product)
  //       .reduce((acc, item) => {
  //         acc = [
  //           // @ts-ignore

  //           ...acc,
  //           // @ts-ignore

  //           {
  //             id: item?.retail_product?.id,
  //             discount_percentages: `${item.discount_percentages}`,
  //             price: item.retail_product?.products_variations[0].price,
  //             offerId: item.id,
  //             name: item.retail_product?.name,
  //           },
  //         ];
  //         return acc;
  //       }, []);

  //     console.log("This is retail product", retail_product);

  //     const retail_product_variation = platformOffers
  //       .filter((item) => !!item.retail_product_variation)
  //       .reduce((acc, item) => {
  //         acc = [
  //           // @ts-ignore
  //           ...acc,
  //           // @ts-ignore
  //           {
  //             id: item?.retail_product_variation?.id,
  //             discount_percentages: `${item.discount_percentages}`,
  //             // @ts-ignore
  //             price: item?.retail_product_variation.price,
  //             offerId: item.id,
  //             // @ts-ignore
  //             name: item?.retail_product_variation.product_name,
  //           },
  //         ];
  //         return acc;
  //       }, []);

  //     if (!!retail_product?.length) {
  //       console.log("New Retail Product", retail_product);
  //       setAddedProductOffers(retail_product);
  //     }
  //     if (!!retail_product_variation?.length) {
  //       console.log(retail_product_variation);
  //       setAddedVariationOffers(retail_product_variation);
  //     }
  //   }
  // }, [platformOffers?.length]);

  console.log("Thsi is plafrtomOffer", platformOffers);

  return platformOffersLoader ? (
    <div>Loading...</div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSaveOnMenuItemOffer)}>
        <div className="flex">
          <div className="flex-1">
            <Accordion
              type="single"
              defaultValue="item-1"
              collapsible
              className="w-full px-4 max-h-[35rem] overflow-y-auto"
            >
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
                              disabled
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
                                  {!!platformOffers &&
                                    platformOffers
                                      .filter((item) => !!item.retail_product)
                                      .reduce<AccumulatedOffer[]>(
                                        (acc, item) => {
                                          acc = [
                                            ...acc,

                                            {
                                              id: item?.retail_product?.id!,
                                              discount_percentages: `${item.discount_percentages}`,
                                              price:
                                                item.retail_product
                                                  ?.products_variations[0]
                                                  .price!,
                                              offerId: item.id,
                                              name: item.retail_product?.name!,
                                            },
                                          ];
                                          return acc;
                                        },
                                        []
                                      )
                                      ?.map((offer, index) => (
                                        <div className="p-3" key={offer.id}>
                                          <div className="relative border rounded-lg">
                                            <div className="flex flex-col md:flex-row">
                                              <div className="flex-1 flex flex-col">
                                                {!index ? (
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Products
                                                  </h6>
                                                ) : null}
                                                <div className="p-2">
                                                  <div>{offer.name}</div>
                                                </div>
                                              </div>
                                              <div className="flex-1 flex flex-col">
                                                {!index ? (
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Promotion
                                                  </h6>
                                                ) : null}
                                                <div className="p-2">
                                                  <Select
                                                    onValueChange={(value) =>
                                                      //   field.onChange(value)
                                                      handleUpdatePlatformOfferFn(
                                                        {
                                                          discount_percentages:
                                                            value,
                                                          offerId:
                                                            offer.offerId,
                                                          id: offer.id,
                                                          type: "product",
                                                        }
                                                      )
                                                    }
                                                    defaultValue={
                                                      offer.discount_percentages
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
                                                </div>
                                              </div>
                                              <div className="flex-1 flex flex-col">
                                                {!index ? (
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Price
                                                  </h6>
                                                ) : null}
                                                <span className="p-5">
                                                  {offer.price}
                                                </span>
                                              </div>
                                            </div>
                                            {/* {index === 0 ? null : ( */}
                                            <button
                                              onClick={() =>
                                                handleDeletePlatformOfferFn(
                                                  offer.offerId
                                                )
                                              }
                                              type="button"
                                              className="absolute -top-3 -right-3 rounded-full bg-brand text-white p-1"
                                            >
                                              <X className="w-4 h-4" />
                                            </button>
                                            {/* )} */}
                                          </div>
                                        </div>
                                      ))}

                                  {retail_product_fields.map((items, index) => (
                                    <div className="p-3" key={items.id}>
                                      <div className="relative border rounded-lg">
                                        <div className="flex flex-col md:flex-row">
                                          <div className="flex-1 flex flex-col">
                                            {!index ? (
                                              <h6 className="border-r border-b p-3 font-semibold">
                                                Products
                                              </h6>
                                            ) : null}
                                            <div className="p-2">
                                              {retailItemsLoader ? (
                                                <Skeleton className="w-full h-6" />
                                              ) : (
                                                !!retailItems?.length && (
                                                  <ProductComboBoxSaveOnMenu
                                                    data={retailItems}
                                                    form={form}
                                                    index={index}
                                                    handleUpdatePlatformOfferFn={
                                                      undefined
                                                    }
                                                  />
                                                )
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex-1 flex flex-col">
                                            {!index ? (
                                              <h6 className="border-r border-b p-3 font-semibold">
                                                Promotion
                                              </h6>
                                            ) : null}
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
                                        {/* {index === 0 ? null : ( */}
                                        {/* <button
                                          onClick={() =>
                                            handleDeletePlatformOfferFn(
                                              // @ts-ignore
                                              form.getValues(
                                                `retail_product.${index}.offerId`
                                              )
                                            )
                                          }
                                          type="button"
                                          className="absolute -top-3 -right-3 rounded-full bg-brand text-white p-1"
                                        >
                                          <X className="w-4 h-4" />
                                        </button> */}
                                        {/* )} */}
                                      </div>
                                    </div>
                                  ))}
                                  <Button
                                    type="submit"
                                    // onClick={() => {
                                    //   append({
                                    //     id: undefined,
                                    //     price: undefined,
                                    //     discount_percentages: "30",
                                    //   });
                                    // }}
                                    isLoading={handleAddPlatformOfferFnLoader}
                                    disabled={handleAddPlatformOfferFnLoader}
                                  >
                                    <Plus className="h-3 w-3" /> Add New Item
                                  </Button>
                                </>
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
                                <>
                                  {!!platformOffers &&
                                    platformOffers
                                      .filter(
                                        (item) =>
                                          !!item.retail_product_variation
                                      )
                                      .reduce<AccumulatedOffer[]>(
                                        (acc, item) => {
                                          acc = [
                                            ...acc,

                                            {
                                              id: item?.retail_product_variation
                                                ?.id!,
                                              discount_percentages: `${item.discount_percentages}`,

                                              price:
                                                item?.retail_product_variation
                                                  ?.price!,
                                              offerId: item.id,

                                              name:
                                                (item?.retail_product_variation &&
                                                  item?.retail_product_variation
                                                    .product_name) ||
                                                "",
                                            },
                                          ];
                                          return acc;
                                        },
                                        []
                                      )
                                      ?.map((offer, index) => (
                                        <div className="p-3" key={offer.id}>
                                          <div className="relative border rounded-lg">
                                            <div className="flex flex-col md:flex-row">
                                              <div className="flex-1 flex flex-col">
                                                {!index ? (
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Variants
                                                  </h6>
                                                ) : null}
                                                <div className="p-2">
                                                  <div>{offer.name}</div>
                                                </div>
                                              </div>
                                              <div className="flex-1 flex flex-col">
                                                {!index ? (
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Promotion
                                                  </h6>
                                                ) : null}
                                                <div className="p-2">
                                                  <Select
                                                    onValueChange={(value) =>
                                                      //   field.onChange(value)
                                                      handleUpdatePlatformOfferFn(
                                                        {
                                                          discount_percentages:
                                                            value,
                                                          offerId:
                                                            offer.offerId,
                                                          id: offer.id,
                                                          type: "variation",
                                                        }
                                                      )
                                                    }
                                                    defaultValue={
                                                      offer.discount_percentages
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
                                                </div>
                                              </div>
                                              <div className="flex-1 flex flex-col">
                                                {!index ? (
                                                  <h6 className="border-r border-b p-3 font-semibold">
                                                    Price
                                                  </h6>
                                                ) : null}
                                                <span className="p-5">
                                                  {offer.price}
                                                </span>
                                              </div>
                                            </div>
                                            {/* {index === 0 ? null : ( */}
                                            <button
                                              onClick={() =>
                                                handleDeletePlatformOfferFn(
                                                  offer.offerId
                                                )
                                              }
                                              type="button"
                                              className="absolute -top-3 -right-3 rounded-full bg-brand text-white p-1"
                                            >
                                              <X className="w-4 h-4" />
                                            </button>
                                            {/* )} */}
                                          </div>
                                        </div>
                                      ))}

                                  <div className="p-3">
                                    <div className="flex-1 flex flex-col">
                                      <div>
                                        {product_variation_fields.map(
                                          (items, index) => (
                                            <div className="p-3" key={items.id}>
                                              <div className="relative border rounded-lg">
                                                <div className="flex flex-col md:flex-row">
                                                  <div className="flex-1 flex flex-col">
                                                    {!index ? (
                                                      <h6 className="border-r border-b p-3 font-semibold">
                                                        Variants
                                                      </h6>
                                                    ) : null}

                                                    <div className="p-2">
                                                      {variantsLoader ? (
                                                        <Skeleton className="w-full h-6" />
                                                      ) : (
                                                        !!variants?.results && (
                                                          <VariationComboBox
                                                            data={
                                                              variants?.results
                                                                .length
                                                                ? variants.results
                                                                : []
                                                            }
                                                            form={form}
                                                            index={index}
                                                          />
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className="flex-1 flex flex-col">
                                                    {!index ? (
                                                      <h6 className="border-r border-b p-3 font-semibold">
                                                        Promotion
                                                      </h6>
                                                    ) : null}
                                                    <div className="p-2">
                                                      <FormField
                                                        control={form.control}
                                                        name={`retail_product_variation.${index}.discount_percentages`}
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
                                                {/* {index === 0 ? null : ( */}
                                                {/* <button
                                                  onClick={() =>
                                                    removeProductVariation(
                                                      index
                                                    )
                                                  }
                                                  type="button"
                                                  className="absolute -top-3 -right-3 rounded-full bg-brand text-white p-1"
                                                >
                                                  <X className="w-4 h-4" />
                                                </button> */}
                                                {/* )} */}
                                              </div>
                                            </div>
                                          )
                                        )}

                                        <Button
                                          type="submit"
                                          //   onClick={() =>
                                          //     appendProductVariation({
                                          //       id: undefined,
                                          //       price: undefined,
                                          //       discount_percentages: "30",
                                          //     })
                                          //   }
                                          isLoading={
                                            handleAddPlatformOfferFnLoader
                                          }
                                          disabled={
                                            handleAddPlatformOfferFnLoader
                                          }
                                        >
                                          <Plus className="h-3 w-3" /> Add New
                                          Item
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </>
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
            </Accordion>
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
                    <FormDescription className="mb-4 max-w-xs">
                      Uploading offer images shows the user know about the offer
                      in details
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
        <DialogFooter className="py-2">
          <div className="py-2">
            <Button
              isLoading={handleAddPlatformOfferFnLoader}
              disabled={handleAddPlatformOfferFnLoader}
            >
              Create Offer
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PlatformOfferForm;
