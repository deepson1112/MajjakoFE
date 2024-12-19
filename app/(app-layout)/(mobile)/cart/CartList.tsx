import { userCart } from "@/types";
import React, { useState } from "react";
import { UseMutationResult } from "react-query";
import CartPrice from "./CartPrice";
import CartImage from "./CartImage";
import { Minus, Plus } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import RemoveCartItem from "./RemoveCartItem";
import EditCartItem from "./EditCartItem";
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

const CartList = ({ cartdata, mutationFn }: CartListProps) => {
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
    setQuantity(newQuantity);
    setCurrentPrice(
      newQuantity * (cartdata.per_item_amount + cartdata.addons_cost)
    );
    mutationFn(
      {
        id: cartdata.id,
        payload: { quantity: newQuantity },
      },
      {
        onError: (error: any) => {
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
    <>
      <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <CartImage discount={cartdata.discount_percentage as number} />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3 className="text-base font-semibold text-gray-900">
                {cartdata.fooditem.food_title}{" "}
                {cartdata.per_item_amount ? (
                  <span className="text-xs rounded-full px-2 font-light text-gray-400">
                    ${cartdata.per_item_amount} each
                  </span>
                ) : null}
              </h3>

              <div className="shrink-0 w-28 sm:order-2 sm:ml-8 sm:text-right flex flex-col">
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
            <p className="-mt-3 text-sm text-gray-500">{selectedCartAddons}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div>
              <div className="mx-auto flex h-8 items-center text-gray-800 bg-gray-100 rounded-full px-1">
                <button
                  className="h-6 w-6 flex items-center justify-center bg-gray-200 transition hover:bg-gray-300 hover:text-white rounded-full"
                  onClick={() => {
                    if (quantity > 1) {
                      handleQuantityChange(quantity - 1);
                    }
                  }}
                >
                  <Minus className="text-gray-600" />
                </button>
                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                  {quantity}
                </div>

                <button
                  className="h-6 w-6 flex items-center justify-center bg-brand transition hover:bg-brand_hover hover:text-white rounded-full"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="text-white" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <EditCartItem cartData={cartdata} />
              <RemoveCartItem cartData={cartdata} />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartList;
