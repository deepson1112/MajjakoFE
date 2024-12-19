import { userCart } from "@/types";
import React, { useState } from "react";
import { UseMutationResult } from "react-query";
import CartPrice from "../cart/CartPrice";
import CartImage from "../cart/CartImage";
import { queryClient } from "@/lib/queryClient";
import Price from "@/components/Price";
import { toast } from "sonner";

interface CartListProps {
  mutationFn: UseMutationResult<
    any,
    unknown,
    { id: number; payload: { quantity: number } },
    unknown
  >["mutate"];
  cartdata: userCart;
}

const List = ({ cartdata, mutationFn }: CartListProps) => {
  const [quantity, setQuantity] = useState(
    cartdata.quantity ? cartdata.quantity : 0
  );
  const [currentPrice, setCurrentPrice] = useState(
    quantity * (cartdata.per_item_amount + cartdata.addons_cost)
  );

  const selectedCartAddons = cartdata.cart_addons
    .map((cartAddon) => cartAddon.customization_set.title)
    .join(", ");
  let price = 0;
  const selectedCartAddonsPrice = cartdata.cart_addons.map(
    (cartAddon) => (price += cartAddon.customization_set.price)
  );
  price = price + Number(cartdata.fooditem.price);

  const handleQuantityChange = (newQuantity: number) => {
    // Optimistic UI update
    setQuantity(newQuantity);
    setCurrentPrice(
      newQuantity * (cartdata.per_item_amount + cartdata.addons_cost)
    );

    // API call to update the quantity
    mutationFn(
      {
        id: cartdata.id,
        payload: { quantity: newQuantity },
      },
      {
        onError: (error: any) => {
          // Revert to the previous quantity if the API call fails
          //   setQuantity(cartItem.quantity);
          toast.error("Something went wrong", {
            description: `${JSON.parse(error.message).message}`,
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries("user-sidecart-data");
        },
      }
    );
  };

  return (
    <li className="flex flex-col space-y-3 py-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <CartImage discount={Number(cartdata.discount_percentage)} />

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900">
              {cartdata.fooditem.food_title}{" "}
              {cartdata.per_item_amount ? (
                <span className="text-xs rounded-full px-2 font-light text-gray-400">
                  <Price amount={cartdata.per_item_amount} /> each
                </span>
              ) : null}
              {cartdata.receiver_name ? (
                <span className="text-xs rounded-full px-2 font-light bg-gray-600 text-white">
                  For {cartdata.receiver_name}
                </span>
              ) : null}
            </p>
            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
              {selectedCartAddons}
            </p>
            {cartdata.special_request ? (
              <p className="mx-0 mt-1 mb-0 text-xs text-gray-400">
                Special Request: {cartdata.special_request}
              </p>
            ) : null}
          </div>

          <div className="mt-2 flex items-end justify-between">
            <div className="shrink-0 sm:order-2 sm:text-right flex flex-col">
              <CartPrice
                // addonsPrice={currentPrice}
                actualPrice={cartdata.actual_amount}
                addonsCost={cartdata.addons_cost}
                discountedAmount={cartdata.discounted_amount}
                discount={Number(cartdata.discount_percentage)}
              />
              <span className="text-xs text-semibold text-gray-600">
                +<Price amount={cartdata.tax_amount.toFixed(2)} /> tax
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default List;
