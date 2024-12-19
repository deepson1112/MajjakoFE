"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { FoodItem, userCart } from "@/types";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { queryClient } from "@/lib/queryClient";
import SecondaryCustomizationModal from "@/components/cart/SecondaryCustomizationModal";
import MultipleSelectionItemQuantity from "@/components/cart/MultipleSelectionItemQuantity";
import Price from "@/components/Price";
import { toast } from "sonner";

const CartAddonsSchema = z.object({
  quantity: z.number(),
  customization: z.number(),
  id: z.number().optional(),
  active: z.boolean().optional(),
});

const FormSchema = z.object({
  receiver_name: z.string().optional().nullable(),
  special_request: z.string().optional().nullable(),
  cart_addons: z.array(CartAddonsSchema).optional(),
});

interface RemoveCartItemProps {
  cartData: userCart;
}

const EditCartItem = ({ cartData }: RemoveCartItemProps) => {
  const [isEditCartModalOpen, setIsEditCartModalOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cart_addons: [],
      receiver_name: "",
      special_request: "",
    },
  });

  const { data: selectedFoodItem, isLoading: selectedFoodItemLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(`/menu/food/${cartData.fooditem.id}`)
          .json();
        return response as FoodItem;
      },
      queryKey: [`cart-${cartData.fooditem.id}`],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const {
    mutate: handleUpdateCartItemsFn,
    isLoading: handleUpdateCartItemsFnLoader,
  } = useMutation({
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      const response = api()
        .patch(
          { ...payload, fooditem: cartData.fooditem.id },
          `/marketplace/cart/${cartData.id}/`
        )
        .json();
      return response;
    },
    onSuccess: () => {
      setIsEditCartModalOpen(false);
      queryClient.invalidateQueries("user-sidecart-data");
      queryClient.invalidateQueries("user-cart");
    },
    onError: (error: any) => {
      toast.error("Cannot update cart itmes", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  useEffect(() => {
    form.reset({
      receiver_name: cartData?.receiver_name ? cartData?.receiver_name : null,
      special_request: cartData?.special_request
        ? cartData?.special_request
        : null,

      cart_addons: cartData.cart_addons.map((cart_addon) => ({
        quantity: cart_addon.quantity,
        customization: cart_addon.customization as unknown as number,
        id: cart_addon.id,
        active: true,
      })),
    });
  }, []);

  const handleUpdateCartItems = (data: z.infer<typeof FormSchema>) => {
    const { cart_addons, receiver_name, special_request } = data;

    const payloadCartAddons = cart_addons?.filter((value) =>
      Object.hasOwn(value, "active") ? (value.active ? false : true) : true
    );
    handleUpdateCartItemsFn({
      receiver_name,
      special_request,
      cart_addons: payloadCartAddons,
    });
  };

  return (
    <Dialog open={isEditCartModalOpen} onOpenChange={setIsEditCartModalOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"subtle"}
          className="font-semibold text-gray-600 rounded-full"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {selectedFoodItemLoader ? (
        <div className="flex flex-col space-x-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : !!selectedFoodItem ? (
        <DialogContent
          className="sm:max-w-[600px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Addons/Modifier</DialogTitle>
            <DialogDescription>{selectedFoodItem.food_title}</DialogDescription>
          </DialogHeader>
          <section className="space-y-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateCartItems)}>
                <ul className="flex flex-col gap-4 divide-y divide-gray-300 max-h-72 overflow-y-auto p-2 bg-gray-100 rounded-lg">
                  {!!selectedFoodItem.food_addons &&
                    !!selectedFoodItem.food_addons.length &&
                    selectedFoodItem.food_addons.map((addon) => {
                      if (
                        !addon.customization_set &&
                        !addon.customization_set.length
                      )
                        return;

                      return addon.select_type === "SINGLE" ? (
                        <li className="pt-2" key={addon.id}>
                          <FormField
                            key={addon.id}
                            control={form.control}
                            name="cart_addons"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                  <FormLabel className="font-bold">
                                    {addon.add_on_category}
                                  </FormLabel>
                                  <span className="text-brand bg-red-200 px-2 rounded-xl text-xs font-semibold">
                                    {addon.minimum_quantity} Required
                                  </span>
                                </div>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    // defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    {!!addon.customization_set.length &&
                                      addon.customization_set.map(
                                        (item: {
                                          title: string;
                                          id: number;
                                          price: string;
                                        }) => {
                                          return (
                                            <FormItem
                                              key={item.id}
                                              className="flex items-center justify-between"
                                            >
                                              <div className="flex flex-col">
                                                <FormLabel className="text-sm font-medium">
                                                  {item.title}
                                                </FormLabel>
                                                <span className="text-xs">
                                                  <Price amount={item.price} />
                                                </span>
                                              </div>
                                              <FormControl>
                                                <RadioGroupItem
                                                  checked={field.value?.some(
                                                    (value) =>
                                                      value.customization ==
                                                      item.id
                                                  )}
                                                  // @ts-ignore
                                                  value={[
                                                    {
                                                      customization: item.id,
                                                      quantity: 1,
                                                    },
                                                  ]}
                                                />
                                              </FormControl>
                                            </FormItem>
                                          );
                                        }
                                      )}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </li>
                      ) : (
                        <li className="pt-2" key={addon.id}>
                          <FormField
                            key={addon.id}
                            control={form.control}
                            name="cart_addons"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <div className="flex items-center justify-between mb-4">
                                    <FormLabel className="font-semibold text-lg">
                                      {/* @ts-ignore */}
                                      {addon.add_on_category}
                                    </FormLabel>
                                    <span className="text-brand bg-red-200 px-2 rounded-xl text-xs font-semibold">
                                      {/* @ts-ignore */}
                                      {addon.minimum_quantity} Required
                                    </span>
                                  </div>
                                </div>
                                {/* @ts-ignore */}
                                {!!addon.customization_set.length &&
                                  // @ts-ignore
                                  addon.customization_set.map((item) => (
                                    <FormField
                                      key={item.id}
                                      control={form.control}
                                      name="cart_addons"
                                      render={({ field }) => {
                                        return item.secondary_customization ? (
                                          <SecondaryCustomizationModal
                                            // @ts-ignore
                                            items={item}
                                            // @ts-ignore
                                            form={form}
                                          />
                                        ) : (
                                          <FormItem
                                            key={item.id}
                                            className="flex flex-col items-stretch"
                                          >
                                            <div className="w-full flex items-center justify-between px-1">
                                              <div className="flex flex-row items-start space-x-3 space-y-0">
                                                <div className="flex flex-col">
                                                  <FormLabel className="text-sm font-medium">
                                                    {item.title}
                                                  </FormLabel>
                                                  <span className="text-xs">
                                                    <Price
                                                      amount={item.price}
                                                    />
                                                  </span>
                                                </div>
                                              </div>

                                              <div className="flex items-center gap-2">
                                                {item.multiple_selection ? (
                                                  <MultipleSelectionItemQuantity
                                                    // @ts-ignore
                                                    form={form}
                                                    customization={item.id}
                                                  />
                                                ) : (
                                                  <FormControl>
                                                    <Checkbox
                                                      className="h-4 w-4"
                                                      checked={
                                                        !!field.value?.find(
                                                          (value) => {
                                                            console.log(
                                                              "This is the value hahah",
                                                              value
                                                            );
                                                            if (
                                                              value.customization ===
                                                              item.id
                                                            ) {
                                                              if (
                                                                Object.hasOwn(
                                                                  value,
                                                                  "active"
                                                                )
                                                              ) {
                                                                if (
                                                                  value.active
                                                                ) {
                                                                  return true;
                                                                } else {
                                                                  return false;
                                                                }
                                                              }
                                                              return true;
                                                            } else {
                                                              return false;
                                                            }
                                                          }
                                                        )
                                                      }
                                                      onCheckedChange={(
                                                        checked
                                                      ) => {
                                                        return checked
                                                          ? field.onChange(
                                                              field.value?.some(
                                                                (value) =>
                                                                  value.customization ===
                                                                  item.id
                                                              )
                                                                ? field.value.map(
                                                                    (value) => {
                                                                      return value.customization ===
                                                                        item.id
                                                                        ? {
                                                                            customization:
                                                                              item.id,
                                                                            quantity: 1,
                                                                            id: value.id,
                                                                            active:
                                                                              true,
                                                                          }
                                                                        : value;
                                                                    }
                                                                  )
                                                                : // [
                                                                  //     ...field.value!,
                                                                  //     {
                                                                  //       customization:
                                                                  //         item.id,
                                                                  //       quantity: 1,
                                                                  //       id: value.id,
                                                                  //       active:
                                                                  //         true,
                                                                  //     },
                                                                  //   ]
                                                                  [
                                                                    ...field.value!,
                                                                    {
                                                                      customization:
                                                                        item.id,
                                                                      quantity: 1,
                                                                    },
                                                                  ]
                                                            )
                                                          : field.onChange(
                                                              field.value?.some(
                                                                (value) =>
                                                                  value.customization ===
                                                                    item.id &&
                                                                  Object.hasOwn(
                                                                    value,
                                                                    "active"
                                                                  )
                                                              )
                                                                ? field.value.map(
                                                                    (value) => {
                                                                      return value.customization ===
                                                                        item.id
                                                                        ? {
                                                                            customization:
                                                                              item.id,
                                                                            quantity: 1,
                                                                            id: value.id,
                                                                            active:
                                                                              false,
                                                                          }
                                                                        : value;
                                                                    }
                                                                  )
                                                                : field.value?.filter(
                                                                    (value) =>
                                                                      value.customization !==
                                                                      item.id
                                                                  )
                                                            );
                                                      }}
                                                    />
                                                  </FormControl>
                                                )}

                                                {item.secondary_customization ? (
                                                  <SecondaryCustomizationModal
                                                    // @ts-ignore
                                                    items={item}
                                                    // @ts-ignore
                                                    form={form}
                                                  />
                                                ) : null}
                                              </div>
                                            </div>
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  ))}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </li>
                      );
                    })}
                </ul>

                <FormField
                  control={form.control}
                  name="special_request"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Request</FormLabel>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Textarea
                          placeholder="You can include any special request here..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiver_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Recipient name (optional)</FormLabel>
                        <FormControl>
                          {/* @ts-ignore */}
                          <Input
                            type="text"
                            {...field}
                            placeholder="Receiver's Full Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <DialogFooter>
                  <Button
                    isLoading={handleUpdateCartItemsFnLoader}
                    disabled={handleUpdateCartItemsFnLoader}
                    type="submit"
                    className="mt-2"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </section>
        </DialogContent>
      ) : (
        <p>No Addons Available</p>
      )}
    </Dialog>
  );
};

export default EditCartItem;
