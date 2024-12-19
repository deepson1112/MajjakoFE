"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { formSchemaType } from "./CartCounterAndButtons";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Checkbox } from "../ui/Checkbox";
import { UseFormReturn } from "react-hook-form";
import {
  CustomizationItem,
  CustomizationSetResponse,
} from "./CartcounterAndButtonsAddCart";
import Price from "../Price";

interface SecondayCustomizationModalProps {
  items: CustomizationItem;
  form: UseFormReturn<formSchemaType>;
}
const SecondaryCustomizationModal = ({
  items,
  form,
}: SecondayCustomizationModalProps) => {
  const { customization, title, id, price } = items;

  // State to track selected items
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (checked: boolean, itemId: number) => {
    setSelectedItems((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
  };

  const handleRadioChange = (itemId: number) => {
    setSelectedItems([itemId]);
  };

  useEffect(() => {
    if (customization)
      if (
        customization.minimum_quantity &&
        selectedItems.length < customization.minimum_quantity
      ) {
        setError(
          `Please select at least ${customization.minimum_quantity} items.`
        );
      } else if (
        customization.maximum_quantity &&
        selectedItems.length > customization.maximum_quantity
      ) {
        setError(
          `You can select up to ${customization.maximum_quantity} items.`
        );
      } else {
        setError(null);
      }
  }, [
    selectedItems,
    customization?.minimum_quantity,
    customization?.maximum_quantity,
  ]);

  if (!customization) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer hover:bg-gray-200 rounded-lg">
          <FormItem key={id} className="flex flex-col items-stretch">
            <div className="w-full flex items-center justify-between px-1">
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <div className="flex flex-col">
                  <FormLabel className="text-sm font-medium">{title}</FormLabel>
                  <span className="text-xs">
                    <Price amount={price} />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox className="h-4 w-4" />
                </FormControl>
                <ChevronRight />
              </div>
            </div>
          </FormItem>
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Secondary Customization</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <div>
          <ul className="flex flex-col gap-4 divide-y divide-gray-300 max-h-72 overflow-y-auto p-2 bg-gray-100 rounded-lg">
            {customization?.select_type === "SINGLE" ? (
              <FormField
                control={form.control}
                name="cart_addons"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <FormLabel className="font-bold">
                        {customization.add_on_category}
                      </FormLabel>
                      {customization.minimum_quantity ? (
                        <span className="text-brand bg-red-200 px-2 rounded-xl text-xs font-semibold">
                          {customization.minimum_quantity} Required
                        </span>
                      ) : null}
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          handleRadioChange(Number(value));
                          field.onChange([
                            {
                              customization: value,
                              quantity: 1,
                              groupId: customization.id,
                            },
                          ]);
                        }}
                        className="flex flex-col space-y-1"
                      >
                        {customization.customization_set.map((item) => (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-x-3"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={item.id.toString()}
                                checked={selectedItems.includes(item.id)}
                                disabled={
                                  !!(
                                    customization.maximum_quantity &&
                                    selectedItems.length >=
                                      customization.maximum_quantity &&
                                    !selectedItems.includes(item.id)
                                  )
                                }
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.title}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="cart_addons"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-4">
                      <FormLabel className="font-bold">
                        {customization.add_on_category}
                      </FormLabel>
                      {customization.minimum_quantity ? (
                        <span className="text-brand bg-red-200 px-2 rounded-xl text-xs font-semibold">
                          {customization.minimum_quantity} Required
                        </span>
                      ) : null}
                    </div>
                    {customization.customization_set.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            className="h-4 w-4"
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => {
                              handleCheckboxChange(!!checked, item.id);
                              checked
                                ? field.onChange([
                                    ...(field?.value || []),
                                    { customization: item.id, quantity: 1 },
                                  ])
                                : field.onChange(
                                    field?.value?.filter(
                                      (value) => value.customization !== item.id
                                    )
                                  );
                            }}
                            disabled={
                              !!(
                                customization.maximum_quantity &&
                                selectedItems.length >=
                                  customization.maximum_quantity &&
                                !selectedItems.includes(item.id)
                              )
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </ul>
        </div>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <DialogFooter>
          <Button
            onClick={() => {
              if (selectedItems.length < customization.minimum_quantity) {
                setError(
                  `Please select at least ${customization.minimum_quantity} items.`
                );
              } else {
                form.trigger("cart_addons");
              }
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SecondaryCustomizationModal;
