import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { Heart, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { UserWishlistsType } from "./ProductDetail";
import { axiosInstance } from "@/lib/axiosInstance";
import debounce from "lodash.debounce";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProductWishlistProps {
  currentVariation: number;
  userWishlists: UserWishlistsType;
  isMobile?: boolean;
}

export interface AddWishList {
  special_request: string | null;
  receiver_name: string | null;
  active: boolean;
  retail_product_variation: number | null;
}

const ProductWishlist = ({
  currentVariation,
  userWishlists,
  isMobile,
}: ProductWishlistProps) => {
  const handleAddProductWishlist = () => {
    const payload = {
      special_request: null,
      receiver_name: null,
      active: true,
      retail_product_variation: currentVariation,
    };
    mutateAddProductWishlist(payload);
  };

  const {
    mutate: handleRemoveProductWishlist,
    isLoading: handleRemoveProductWishlistLoader,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `retail-wishlist/delete_product_wislist/${currentVariation}/`
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Added to whislist");
      queryClient.invalidateQueries("retail-wishlists");
      queryClient.invalidateQueries("user-wishlist");
    },
    onError: (error: any) => {
      toast.error("Unable to add to whilslist", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const {
    mutate: mutateAddProductWishlist,
    isLoading: mutateAddProductWishlistLoader,
  } = useMutation({
    mutationFn: async (payload: AddWishList) => {
      const response = await api()
        .post(payload, `/retail-wishlist/retail-wishlist/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Added to whislist");
      queryClient.invalidateQueries("retail-wishlists");
      queryClient.invalidateQueries("user-wishlist");
    },
    onError: (error: any) => {
      toast.error("Unable to add to whilslist", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleAddFavouriteFn = () => {
    handleAddProductWishlist();
  };

  const handleRemoveFavouriteFn = () => {
    handleRemoveProductWishlist();
  };

  const debouncedAddFavourite = debounce(handleAddFavouriteFn, 400);
  const debouncedRemoveFavourite = debounce(handleRemoveFavouriteFn, 400);

  const _debouncedAddFavourite = useCallback(debouncedAddFavourite, []);
  const _debouncedRemoveFavourite = useCallback(debouncedRemoveFavourite, []);

  return userWishlists?.product_variation.includes(currentVariation) ? (
    <Button
      className={cn(
        isMobile ? "" : "flex-1 flex items-center gap-1 text-xs md:text-sm"
      )}
      onClick={_debouncedRemoveFavourite}
      variant={isMobile ? "ghost" : "outline"}
      isLoading={handleRemoveProductWishlistLoader}
    >
      {isMobile ? (
        handleRemoveProductWishlistLoader ? null : (
          <Heart fill={"#ff4500"} stroke="" />
        )
      ) : (
        <>
          <Heart fill={"#ff4500"} stroke="" className="hidden lg:block" />
          Remove From Wishlist
        </>
      )}
    </Button>
  ) : (
    <Button
      className={cn(
        isMobile
          ? ""
          : "flex-1 flex items-center gap-1  bg-white text-xs md:text-sm"
      )}
      onClick={_debouncedAddFavourite}
      variant={isMobile ? "ghost" : "outline"}
      isLoading={mutateAddProductWishlistLoader}
    >
      {isMobile ? (
        mutateAddProductWishlistLoader ? null : (
          <Heart />
        )
      ) : (
        <>
          <Heart fill={"#999999"} stroke="" className="hidden lg:block" />
          Add To Wishlist
        </>
      )}
    </Button>
  );
};

export default ProductWishlist;
