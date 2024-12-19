"use client";
import * as z from "zod";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import {
  AddonsResponse,
  CartCounterAndButtonsProps,
  FoodAddon,
  userCart,
  userCart as userCartType,
} from "@/types";

import DecreaseCartItem from "@/components/cart/DecreaseCartItem";

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

const DecreaseCartModal = ({
  addons,
  foodTitle,
  fooditem,
}: {
  addons: FoodAddon[];
  foodTitle: string;
  fooditem: number;
}) => {
  const [open, setOpen] = useState(false);

  const {
    data: foodCartItems,
    isLoading: foodCartItemsLoader,
    refetch: refetchFoodCartItems,
  } = useQuery<userCartType[]>({
    queryFn: async () => {
      const response = await api()
        .get(`/marketplace/cart/?fooditem=${fooditem}`)
        .json<userCartType[]>();

      return response;
    },
    enabled: false,
    queryKey: [`food-cart-items-${fooditem}`],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      console.log("Tis is to be deac3a", data);
    },
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

  useEffect(() => {
    if (open) {
      refetchFoodCartItems();
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-gray-300 rounded-full">
            <Minus width={24} height={24} />
          </button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[600px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Which Item you want to remove?</DialogTitle>
            <DialogDescription>{foodTitle}</DialogDescription>
          </DialogHeader>
          <section className="space-y-3">
            {!!foodCartItems && !!foodCartItems?.length ? (
              <>
                {foodCartItems.map(
                  (cartItem) =>
                    !!cartItem.cart_addons &&
                    !!cartItem.cart_addons.length && (
                      <DecreaseCartItem
                        cartItem={cartItem}
                        foodItem={fooditem}
                        key={cartItem.id}
                        handleUpdateCartQuantity={handleUpdateCartQuantity}
                      />
                    )
                )}
              </>
            ) : (
              <h6>You have not added the items to the cart.</h6>
            )}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DecreaseCartModal;
