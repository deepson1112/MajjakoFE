import { queryClient } from "@/lib/queryClient";
import { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "react-query";
import { toast } from "sonner";

interface CartAddonsModifierButtonsProps {
  cartQuantity: number;
  mutationFn: UseMutationResult<
    any,
    unknown,
    { id: number; payload: { quantity: number } },
    unknown
  >["mutate"];
  foodItem: number;
  cartId: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
}

const CartAddonsModifierButtons = ({
  cartQuantity,
  cartId,
  mutationFn,
  foodItem,
  quantity,
  setQuantity,
}: CartAddonsModifierButtonsProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    // Optimistic UI update
    setQuantity(newQuantity);

    // API call to update the quantity
    mutationFn(
      {
        id: cartId,
        payload: { quantity: newQuantity },
      },
      {
        onError: (error: any) => {
          // Revert to the previous quantity if the API call fails
          setQuantity(cartQuantity);
          toast.error("Something went wrong", {
            description: `${JSON.parse(error.message).message}`,
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries(`food-cart-items-${foodItem}`);
          queryClient.invalidateQueries(`food-cart-quantity-${foodItem}`);
          queryClient.invalidateQueries(`food-cart-quantity`);
        },
      }
    );
  };

  return (
    <div className="sm:order-1">
      <div className="mx-auto flex h-8 items-stretch text-gray-600">
        <button
          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
          onClick={() => {
            if (quantity === 1) return;
            handleQuantityChange(quantity - 1);
          }}
        >
          -
        </button>
        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
          {quantity}
        </div>
        <button
          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartAddonsModifierButtons;
