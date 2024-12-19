"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "../ui/Button";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import SecondaryCustomizationModal from "./SecondaryCustomizationModal";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import axios, { AxiosError } from "axios";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import {
  CartCounterAndButtonsProps,
  userCart,
  userCart as userCartType,
} from "@/types";
import CartAddonsModifierButtons from "./CartAddonsModifierButtons";
import CustomizeCartItems from "./CustomizeCartItems";
import CartCounterAndButtonsAddCart, {
  CustomizationSetResponse,
} from "./CartcounterAndButtonsAddCart";
import { AddCartModal } from "./AddCartModal";

const CartAddonsSchema = z.object({
  quantity: z.number(),
  customization: z.number(),
});

const FormSchema = z.object({
  receiver_name: z.string().optional(),
  special_request: z.string().optional(),
  cart_addons: z.array(CartAddonsSchema).optional(),
});

export type formSchemaType = z.infer<typeof FormSchema>;

const CartCounterAndButtonsAddNew = ({
  addons,
  foodTitle,
  fooditem,
  openGlobal,
  setOpenGlobal,
  variant,
}: {
  addons: CustomizationSetResponse[];
  foodTitle: string;
  fooditem: number;
  openGlobal: boolean;
  setOpenGlobal: Dispatch<SetStateAction<boolean>>;
  variant?: boolean;
}) => {
  const { data: foodCartItems, isLoading: foodCartItemsLoader } = useQuery<
    userCartType[]
  >({
    queryFn: async () => {
      const response = await api()
        .get(`/marketplace/cart/?fooditem=${fooditem}`)
        .json<userCartType[]>();

      return response;
    },
    queryKey: [`food-cart-items-${fooditem}`],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: () => {},
  });

  const { mutate: handleUpdateCartQuantity, isLoading } = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      id: number;
      payload: { quantity: number };
    }) => {
      const response = await api()
        .patch(payload, `/marketplace/update-cart-quantity/${id}/`)
        .json();
      return response;
    },
  });

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
        <section className="space-y-3">
          {!!foodCartItems &&
            foodCartItems.map(
              (cartItem) =>
                !!cartItem.cart_addons &&
                !!cartItem.cart_addons.length && (
                  <CustomizeCartItems
                    cartItem={cartItem}
                    foodItem={fooditem}
                    key={cartItem.id}
                    handleUpdateCartQuantity={handleUpdateCartQuantity}
                  />
                )
            )}
          <div className="flex items-center space-x-3">
            <AddCartModal
              addons={addons}
              foodTitle={foodTitle}
              fooditem={fooditem}
              setOpenGlobal={setOpenGlobal}
            />
            <Button
              variant={"outline"}
              className="flex-1"
              onClick={() => setOpenGlobal(false)}
            >
              Done
            </Button>
          </div>
        </section>
      </DialogContent>
    </>
  );
};

export default CartCounterAndButtonsAddNew;
