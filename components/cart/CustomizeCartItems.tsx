import React, { useState } from "react";
import CartAddonsModifierButtons from "./CartAddonsModifierButtons";
import { cartAddonsType, userCart } from "@/types";
import { UseMutationResult } from "react-query";
import Price from "../Price";

interface CustomizeCartItemsProps {
  cartItem: userCart;
  handleUpdateCartQuantity: UseMutationResult<
    any,
    unknown,
    { id: number; payload: { quantity: number } },
    unknown
  >["mutate"];
  foodItem: number;
}

const CustomizeCartItems = ({
  cartItem,
  foodItem,
  handleUpdateCartQuantity,
}: CustomizeCartItemsProps) => {
  const [quantity, setQuantity] = useState(
    cartItem.quantity ? cartItem.quantity : 1
  );

  const selectedCartAddons = cartItem.cart_addons
    .map((cartAddon) => cartAddon.customization_set.title)
    .join(", ");

  const addonsTotalPrice = cartItem.cart_addons.reduce((acc, item) => {
    acc += item.customization_set.price;
    return acc;
  }, 0);

  return (
    <ul className="space-y-4 divide-y-2 divide-gray-100">
      <li className="flex items-center justify-between">
        <div className="flex flex-col">
          <h6>{selectedCartAddons}</h6>
          <span className="text-xs">
            <Price amount={addonsTotalPrice * quantity} />
          </span>
        </div>
        <CartAddonsModifierButtons
          cartQuantity={cartItem.quantity}
          quantity={quantity}
          setQuantity={setQuantity}
          key={cartItem.id}
          cartId={cartItem.id}
          mutationFn={handleUpdateCartQuantity}
          foodItem={foodItem}
        />
      </li>
    </ul>
  );
};

export default CustomizeCartItems;
