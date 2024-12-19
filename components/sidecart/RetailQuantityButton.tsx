import RetailRemoveCartItem from "@/app/(app-layout)/(mobile)/cart/RetailRemoveCart";
import { queryClient } from "@/lib/queryClient";
import { Item } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { UseMutationResult } from "react-query";
import debounce from "lodash.debounce";
import { cn } from "@/lib/utils";

interface RetailQuantityButtonProps {
  cart_item: Item;
  isMobile?: boolean;
  mutationFn: UseMutationResult<
    any,
    unknown,
    { id: number; payload: { quantity: number } },
    unknown
  >["mutate"];
}

const RetailQuantityButton = ({
  cart_item,
  isMobile,
  mutationFn,
}: RetailQuantityButtonProps) => {
  const [quantity, setQuantity] = useState<number>(cart_item.quantity || 0);

  const debouncedMutationFn = useCallback(
    debounce((id: number, payload: { quantity: number }) => {
      mutationFn(
        { id, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("user-sidecart-data");
          },
        }
      );
    }, 400),
    []
  );

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= cart_item.retail_product_variation.stock_quantity) {
      setQuantity(newQuantity);
      debouncedMutationFn(cart_item.id, { quantity: newQuantity });
    }
  };

  return (
    <div
      className={cn(
        isMobile
          ? "flex items-end justify-between text-sm"
          : "flex flex-1 items-end justify-between text-sm"
      )}
    >
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
            className={cn(
              quantity === cart_item.retail_product_variation.stock_quantity
                ? "pointer-events-none"
                : "",
              "h-6 w-6 flex items-center justify-center bg-brand transition hover:bg-brand_hover hover:text-white rounded-full"
            )}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={
              quantity === cart_item.retail_product_variation.stock_quantity
            }
          >
            <Plus className="text-white" />
          </button>
        </div>
      </div>
      {isMobile ? null : (
        <div className="flex items-center gap-2">
          <RetailRemoveCartItem cart_item={cart_item} />
        </div>
      )}
    </div>
  );
};

export default RetailQuantityButton;
