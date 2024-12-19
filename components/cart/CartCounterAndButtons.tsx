"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { userCart as userCartType } from "@/types";
import CartCounterAndButtonsAddNew from "./CartCounterAndButtonsAddNew";
import CartCounterAndButtonsAddCart, {
  CustomizationSetResponse,
} from "./CartcounterAndButtonsAddCart";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { Loader2, Plus } from "lucide-react";
import AddCartModalLoaderLoader from "./AddCartModalLoader";

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

interface CartCounterAndButtonsProps {
  addons: AddonsResponse[];
}

export interface AddonsResponse {
  add_on_category: string;
  created_by: number;
  customization_set: CustomizationSetResponse[];
  description: string;
  id: number;
  maximum_quantity: number;
  minimum_quantity: number;
  multiple_selection: boolean;
  select_type: string;
}

const CartCounterAndButtons = ({
  addons,
  foodTitle,
  fooditem,
}: {
  addons: CustomizationSetResponse[];
  foodTitle: string;
  fooditem: number;
}) => {
  const [openGlobal, setOpenGlobal] = useState(false);

  const {
    data: foodCartItems,
    isLoading: foodCartItemsLoader,
    refetch: reftechFoodCartItems,
  } = useQuery<userCartType[]>({
    queryFn: async () => {
      const response = await api()
        .get(`/marketplace/cart/?fooditem=${fooditem}`)
        .json<userCartType[]>();

      return response;
    },
    queryKey: [`food-cart-items-${fooditem}`],
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (openGlobal) {
      reftechFoodCartItems();
    }
  }, [openGlobal]);

  return (
    <>
      <Dialog open={openGlobal} onOpenChange={setOpenGlobal}>
        <DialogTrigger asChild>
          <button className="bg-gray-900 rounded-full">
            <Plus width={24} height={24} />
          </button>
        </DialogTrigger>
        {foodCartItemsLoader ? null : !!foodCartItems &&
          !!foodCartItems.length &&
          addons.length ? (
          <CartCounterAndButtonsAddNew
            addons={addons}
            foodTitle={foodTitle}
            fooditem={fooditem}
            openGlobal={openGlobal}
            setOpenGlobal={setOpenGlobal}
          />
        ) : (
          <CartCounterAndButtonsAddCart
            addons={addons}
            foodTitle={foodTitle}
            fooditem={fooditem}
            setOpenGlobal={setOpenGlobal}
          />
        )}
      </Dialog>
    </>
  );
};

export default CartCounterAndButtons;
