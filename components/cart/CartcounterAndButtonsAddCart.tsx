"use client";

import * as z from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
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

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import MultipleSelectionItemQuantity from "./MultipleSelectionItemQuantity";
import useUser from "@/lib/useUser";
import { useRouter } from "next/navigation";
import Price from "../Price";
import { toast } from "sonner";

export interface CustomizationItem {
  id: number;
  title: string;
  price: number;
  maximum_number: number;
  description: string | null;
  image: string | null;
  multiple_selection: boolean;
  secondary_customization: boolean;
  customization_order: number;
  customization_title: number;
  created_by: number | null;
  customization: Customization | null;
}

export interface Customization {
  id: number;
  customization_set: CustomizationItem[];
  minimum_quantity: number;
  maximum_quantity: number;
  description: string | null;
  add_on_category: string;
  select_type: string;
  created_by: number;
}

export interface CustomizationSetResponse {
  id: number;
  customization_set: CustomizationItem[];
  minimum_quantity: number;
  maximum_quantity: number;
  description: string | null;
  add_on_category: string;
  select_type: string;
  created_by: number;
}

type FormValues = {
  receiver_name?: string;
  special_request?: string;
  cart_addons?: { quantity: number; customization: number; groupId?: number }[];
};
const CartAddonsSchema = z.object({
  quantity: z.number(),
  customization: z.number(),
  groupId: z.number().optional(),
});

const FormSchema = z.object({
  receiver_name: z.string().optional(),
  special_request: z.string().optional(),
  cart_addons: z.array(CartAddonsSchema).optional(),
});

export type formSchemaType = z.infer<typeof FormSchema>;

const CartCounterAndButtonsAddCart = ({
  addons,
  foodTitle,
  fooditem,
  setOpenGlobal,
}: {
  addons: CustomizationSetResponse[];
  foodTitle: string;
  fooditem: number;
  setOpenGlobal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      receiver_name: undefined,
      special_request: undefined,
      cart_addons: [],
    },
  });

  const { mutate, isLoading } = useMutation<
    unknown,
    AxiosError,
    formSchemaType
  >(
    async (data: formSchemaType) => {
      if (!user || !user.email) {
        router.push("/sign-in");
        return;
      }
      const response = await api()
        .url("/marketplace/cart/")
        .post({
          ...data,
          fooditem,
          receiver_name: data?.receiver_name || user?.first_name,
        })
        .json();
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Successfully added to cart");
        queryClient.invalidateQueries(`food-cart-items-${fooditem}`);
        queryClient.invalidateQueries("user-cart");
        queryClient.invalidateQueries("user-sidecart-data");
        queryClient.invalidateQueries(`food-cart-quantity-${fooditem}`);
        queryClient.invalidateQueries(`food-cart-quantity`);
        setOpen(false);
        setOpenGlobal(false);
      },
      onError: (error: any) => {
        toast.error("Failed to add to cart", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    }
  );

  const handleCheckboxChange = (
    field: ControllerRenderProps<FormValues, "cart_addons">,
    checked: boolean,
    item: CustomizationItem,
    addon: CustomizationSetResponse
  ) => {
    const currentSelections = field?.value?.filter(
      (val) => val?.groupId === addon.id
    ).length;
    if (checked) {
      if (currentSelections && currentSelections < addon.maximum_quantity) {
        field.onChange([
          ...(field.value || []),
          { customization: item.id, quantity: 1, groupId: addon.id },
        ]);
      }
    } else {
      field.onChange(
        field.value?.filter((val) => `${val?.customization}` !== `${item.id}`)
      );
    }
  };

  const isCheckboxDisabled = (
    field: ControllerRenderProps<FormValues, "cart_addons">,
    addon: CustomizationSetResponse,
    item: CustomizationItem
  ) => {
    const currentSelections = field.value?.filter(
      (val) => val.groupId === addon.id
    ).length;
    return (
      !field.value?.some((val) => val.customization === item.id) &&
      currentSelections &&
      currentSelections >= addon.maximum_quantity
    );
  };

  const validateMinimumQuantity = () => {
    for (const addon of addons) {
      const selectedItems = form
        .getValues("cart_addons")
        ?.filter((val) => val.groupId === addon.id).length;
      if (
        addon.minimum_quantity &&
        selectedItems &&
        selectedItems < addon.minimum_quantity
      ) {
        return false;
      }
    }
    return true;
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (validateMinimumQuantity()) {
      mutate(data);
    } else {
      toast.error("Minimum requirement not met", {
        description:
          "Please ensure you have selected the minimum required items.",
      });
    }
  };

  const isMinimumRequirementMet = (addon: CustomizationSetResponse) => {
    const selectedItems = form
      .getValues("cart_addons")
      ?.filter((val) => val.groupId === addon.id).length;
    return (
      addon.minimum_quantity &&
      selectedItems &&
      selectedItems >= addon.minimum_quantity
    );
  };

  return (
    <>
      <DialogContent
        className="sm:max-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Addons/Modifier</DialogTitle>
          <DialogDescription>{foodTitle}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ul className="flex flex-col gap-4 divide-y divide-gray-300 max-h-72 overflow-y-auto p-2 bg-gray-100 rounded-lg">
              {addons?.map((addon) =>
                addon.customization_set?.length ? (
                  addon.select_type === "SINGLE" ? (
                    <li className="p-2" key={addon.id}>
                      <FormField
                        control={form.control}
                        name="cart_addons"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div className="flex items-center justify-between mb-4">
                              <FormLabel className="font-bold">
                                {addon.add_on_category}
                              </FormLabel>
                              {isMinimumRequirementMet(addon) ? (
                                <span className="text-green-200 bg-green-500 px-2 rounded-xl text-xs font-semibold flex items-center">
                                  <Check className="w-3 h-3" />
                                  Required
                                </span>
                              ) : (
                                addon.minimum_quantity && (
                                  <span className="text-brand bg-red-200 px-2 rounded-xl text-xs font-semibold">
                                    {addon.minimum_quantity} Required
                                  </span>
                                )
                              )}
                            </div>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange([
                                    ...(field.value?.filter(
                                      (val) => val.groupId !== addon.id
                                    ) || []),
                                    {
                                      customization: value,
                                      quantity: 1,
                                      groupId: addon.id,
                                    },
                                  ]);
                                }}
                                className="flex flex-col space-y-1"
                              >
                                {addon.customization_set.map((item) => (
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
                                        value={item.id.toString()}
                                        checked={
                                          !!field.value?.some(
                                            (value) =>
                                              value.customization === item.id
                                          )
                                        }
                                      />
                                    </FormControl>
                                  </FormItem>
                                ))}
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
                        control={form.control}
                        name="cart_addons"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between mb-4">
                              <FormLabel className="font-semibold text-lg">
                                {addon.add_on_category}
                              </FormLabel>
                              {isMinimumRequirementMet(addon) ? (
                                <span className="text-green-200 bg-green-500 px-2 rounded-xl text-xs font-semibold flex items-center">
                                  <Check className="w-3 h-3" />
                                  Required
                                </span>
                              ) : (
                                addon.minimum_quantity && (
                                  <span className="text-brand bg-red-200 px-2 rounded-xl text-xs font-semibold">
                                    {addon.minimum_quantity} Required
                                  </span>
                                )
                              )}
                            </div>
                            {addon.customization_set.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="cart_addons"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col items-stretch">
                                    <div className="w-full flex items-center justify-between px-1">
                                      <div className="flex flex-row items-start space-x-3 space-y-0">
                                        <div className="flex flex-col">
                                          <FormLabel className="text-sm font-medium">
                                            {item.title}
                                          </FormLabel>
                                          <span className="text-xs">
                                            <Price amount={item.price} />
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {item.multiple_selection ? (
                                          <MultipleSelectionItemQuantity
                                            form={form}
                                            customization={item.id}
                                          />
                                        ) : (
                                          <FormControl>
                                            <Checkbox
                                              className="h-4 w-4"
                                              checked={
                                                !!field?.value?.some(
                                                  (value) =>
                                                    value.customization ===
                                                    item.id
                                                )
                                              }
                                              onCheckedChange={(checked) =>
                                                handleCheckboxChange(
                                                  field,
                                                  !!checked,
                                                  item,
                                                  addon
                                                )
                                              }
                                              disabled={
                                                !!isCheckboxDisabled(
                                                  field,
                                                  addon,
                                                  item
                                                )
                                              }
                                            />
                                          </FormControl>
                                        )}
                                      </div>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </li>
                  )
                ) : null
              )}
            </ul>
            <FormField
              control={form.control}
              name="special_request"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Request</FormLabel>
                  <FormControl>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient name (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Receiver's Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                className="mt-2 text-xs md:text-sm"
              >
                Add to cart
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};

export default CartCounterAndButtonsAddCart;
