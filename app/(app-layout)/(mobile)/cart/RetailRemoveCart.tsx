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
import { Item, userCart } from "@/types";
import { Trash2, X } from "lucide-react";
import CartImage from "./CartImage";
import { useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";

interface RemoveCartItemProps {
  cart_item: Item;
  isMobile?: boolean;
}

const RetailRemoveCartItem = ({ cart_item, isMobile }: RemoveCartItemProps) => {
  const [isCartDeleteOpen, setIsCartDeleteOpen] = useState(false);

  const {
    mutate: handleDeleteCartItem,
    isLoading: handleDeleteCartItemLoader,
  } = useMutation({
    mutationFn: async () => {
      const response = axiosInstance.delete(
        `/retail-marketplace/retail-cart/${cart_item.id}/`
      );
      return response;
    },
    onSuccess: () => {
      setIsCartDeleteOpen(false);
      queryClient.invalidateQueries("retail-cart-data");
    },
  });

  return (
    <>
      <AlertDialog open={isCartDeleteOpen} onOpenChange={setIsCartDeleteOpen}>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant={isMobile ? "ghost" : "subtle"}
            className={
              isMobile ? "" : "font-semibold text-gray-600 rounded-full"
            }
          >
            {isMobile ? (
              <X className="w-4 h-4" />
            ) : (
              <Trash2 className="w-4 h-4 mr-0.5" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You sure want to delete{" "}
              {cart_item.retail_product_variation.product[0].product_name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4">
            <CartImage
              discount={
                cart_item.retail_product_variation?.discount
                  ?.discount_percentages
              }
              img={
                cart_item.retail_product_variation.variations_image[0]
                  .default_image ||
                cart_item.retail_product_variation.variations_image[0].image
              }
            />
            <div>
              <h5 className="text-base font-semibold">
                {cart_item.retail_product_variation.product[0].product_name}
              </h5>
              <p>
                {cart_item.retail_product_variation.variation
                  .map(
                    (item: any) =>
                      ` ${item.variation_type_name}: ${item.variation_name} `
                  )
                  .join(",")}
              </p>
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

export default RetailRemoveCartItem;
