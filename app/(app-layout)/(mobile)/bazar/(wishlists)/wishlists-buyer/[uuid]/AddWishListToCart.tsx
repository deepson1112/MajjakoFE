import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axiosInstance";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { Check } from "lucide-react";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface AddWishListToCartProps {
  retail_product: number;
  retail_product_variation: number;
  shared_wishlist: number;
  isAccepted: boolean;
  isBought: boolean;
}

const AddWishListToCart = ({
  retail_product,
  retail_product_variation,
  shared_wishlist,
  isAccepted,
  isBought,
}: AddWishListToCartProps) => {
  const {
    mutate: handleAddToCartWishlistFn,
    isLoading: handleAddToCartWishlistFnLoader,
  } = useMutation({
    mutationFn: async (data: {
      retail_product: number;
      retail_product_variation: number;
      shared_wishlist: number;
      quantity: number;
      special_request: null | string;
      receiver_name: null | string;
    }) => {
      const response = await axiosInstance.post(
        "/retail-marketplace/retail-cart/",
        data
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("Added to the cart");
      queryClient.invalidateQueries("wishlists-cart");
      // setIsAccepted(true);
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Something went wrong");
    },
  });

  const handleAddToCartWishlist = () => {
    handleAddToCartWishlistFn({
      retail_product,
      retail_product_variation,
      shared_wishlist,
      quantity: 1,
      special_request: null,
      receiver_name: null,
    });
  };

  return (
    <div>
      <Button
        variant={isAccepted ? "default" : "subtle"}
        onClick={handleAddToCartWishlist}
        isLoading={handleAddToCartWishlistFnLoader}
        disabled={handleAddToCartWishlistFnLoader || isBought}
      >
        {isAccepted ? (
          <>
            <Check className="mr-1 w-4 h-4" /> Accepted
          </>
        ) : isBought ? (
          <>
            <Check className="mr-1 w-4 h-4" />
            Bought
          </>
        ) : (
          <>Accept Request</>
        )}
      </Button>
    </div>
  );
};

export default AddWishListToCart;
