import { CartAddon } from "@/types";
import React from "react";

interface FoodAddonsListContainerProps {
  cartAddons: CartAddon[];
}

const FoodAddonsListContainer = ({
  cartAddons,
}: FoodAddonsListContainerProps) => {
  const selectedCartAddons = cartAddons
    .map((cartAddon) => cartAddon.customization_set.title)
    .join(", ");
  let price = 0;
  const selectedCartAddonsPrice = cartAddons.map(
    (cartAddon) => (price += cartAddon.customization_set.price)
  );
  return (
    <div>
      <p className="hidden text-gray-500 sm:block">{selectedCartAddons}</p>
    </div>
  );
};

export default FoodAddonsListContainer;
