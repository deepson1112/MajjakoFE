import { queryClient } from "@/lib/queryClient";
import { WishlistItem } from "@/types";
import debounce from "lodash.debounce";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { UseMutateFunction } from "react-query";

export const MobileWishlistContainerQtyCounter = ({
  wishlist,
  handleUpdateWishlistQuantity,
}: {
  wishlist: WishlistItem;
  handleUpdateWishlistQuantity: UseMutateFunction<
    unknown,
    unknown,
    {
      id: number;
      payload: {
        quantity: number;
      };
    },
    unknown
  >;
}) => {
  const [quantity, setQuantity] = useState<number>(wishlist.quantity || 1);

  const debouncedMutationFn = useCallback(
    debounce((id: number, payload: { quantity: number }) => {
      handleUpdateWishlistQuantity(
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
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      debouncedMutationFn(wishlist.id, { quantity: newQuantity });
    }
  };

  return (
    <div className="max-w-fit">
      <div className="mt-auto mx-auto flex h-8 items-center text-gray-800 bg-gray-100 rounded-full px-1">
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
          className={
            "h-6 w-6 flex items-center justify-center bg-brand transition hover:bg-brand_hover hover:text-white rounded-full"
          }
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="text-white" />
        </button>
      </div>
    </div>
  );
};
