"use client";

import { api } from "@/lib/fetcher";
import { CartQuantityType } from "@/types";
import { Loader2 } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";

interface CartQuantityProps {
  foodItem: number;
  cartQty: CartQuantityType[] | undefined;
}

const CartQuantity = ({ foodItem, cartQty }: CartQuantityProps) => {
  const item = cartQty?.find((cart) => cart.fooditem === foodItem);

  return <span className="text-black">{!!item ? item.total_quantity : 0}</span>;
};

export default CartQuantity;
