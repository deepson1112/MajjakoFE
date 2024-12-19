"use client";
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { userCart } from "@/types";
import { Trash2 } from "lucide-react";
import CartImage from "./CartImage";
import { useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";

interface RemoveCartItemProps {
  cartData: userCart;
}

const RemoveCartItem = ({ cartData }: RemoveCartItemProps) => {
  const [isCartDeleteOpen, setIsCartDeleteOpen] = useState(false);
  const selectedCartAddons = cartData.cart_addons
    .map((cartAddon) => cartAddon.customization_set.title)
    .join(", ");

  const {
    mutate: handleDeleteCartItem,
    isLoading: handleDeleteCartItemLoader,
  } = useMutation({
    mutationFn: async () => {
      const response = axiosInstance.delete(`/marketplace/cart/${cartData.id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("user-sidecart-data");
      queryClient.invalidateQueries("user-cart");
      queryClient.invalidateQueries(`food-cart-quantity`);
      queryClient.invalidateQueries(`food-cart-quantity-${cartData.id}`);
      queryClient.invalidateQueries(
        `food-cart-quantity-${cartData.fooditem.id}`
      );

      setIsCartDeleteOpen(false);
    },
  });

  return (
    <>
      <AlertDialog open={isCartDeleteOpen} onOpenChange={setIsCartDeleteOpen}>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant={"subtle"}
            className="font-semibold text-gray-600 rounded-full"
          >
            <Trash2 className="w-4 h-4 mr-0.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You sure want to delete {cartData.fooditem.food_title}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex gap-4">
            <CartImage discount={cartData.discount_percentage as number} />
            <div>
              <h5 className="text-base font-semibold">
                {cartData.fooditem.food_title}
              </h5>
              <p>{selectedCartAddons}</p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => handleDeleteCartItem()}
              isLoading={handleDeleteCartItemLoader}
              disabled={handleDeleteCartItemLoader}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveCartItem;
