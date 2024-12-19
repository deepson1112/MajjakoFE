import React from "react";
import CartAddonsModifierButtons from "./CartAddonsModifierButtons";
import { cartAddonsType, userCart } from "@/types";
import { UseMutationResult } from "react-query";
import DecreaseCartAddonsModifierButtons from "./DecreaseCartAddonsModifierButtons";
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
  const selectedCartAddons = cartItem.cart_addons

    .map((cartAddon) => cartAddon.customization_set.title)
    .join(", ");
  let price = 0;
  const selectedCartAddonsPrice = cartItem.cart_addons.map(
    (cartAddon) => (price += cartAddon.customization_set.price)
  );

  return (
    <ul className="space-y-4 divide-y-2 divide-gray-100">
      <li className="flex items-center justify-between">
        <div className="flex flex-col">
          <h6>{selectedCartAddons}</h6>
          <span className="text-xs">
            <Price amount={Number(selectedCartAddonsPrice)} />
          </span>
        </div>
        <DecreaseCartAddonsModifierButtons
          cartQuantity={cartItem.quantity}
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
