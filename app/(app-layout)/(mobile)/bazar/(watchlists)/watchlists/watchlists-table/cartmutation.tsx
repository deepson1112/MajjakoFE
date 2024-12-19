"use client";
import { api } from "@/lib/fetcher";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { UserWatchList } from "../../../(products)/products/[subCategoryId]/[productId]/ProductDetail";

interface AddProductToCartPayload {
  retail_product: string | number;
  quantity: number;
  retail_product_variation: number | null;
  special_request: string | null;
  receiver_name: string | null;
  buy_now?: boolean;
}

type UserWatchListType = {
  products: UserWatchList;
};
export const CartMutation = ({ products }: UserWatchListType) => {
  const {
    mutate: handleAddProductToCartFn,
    isLoading: handleAddProductToCartLoader,
  } = useMutation({
    mutationFn: async (payload: AddProductToCartPayload) => {
      const response = await api()
        .post(payload, "/retail-marketplace/retail-cart/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Successfully added product to the cart");
      queryClient.invalidateQueries("retail-cart-data");
    },
    onError: (error: any) => {
      toast.error("Unable to add product", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleAddProductToCart = () => {
    handleAddProductToCartFn({
      quantity: 1,
      receiver_name: null,
      retail_product: products.id,
      retail_product_variation: products.product_variation.id || null,
      special_request: null,
    });
  };
  return (
    <section className="h-full">
      {handleAddProductToCartLoader ? (
        <h1>Please wait, loading....</h1>
      ) : (
        <Button
          onClick={handleAddProductToCart}
          isLoading={handleAddProductToCartLoader}
          disabled={handleAddProductToCartLoader}
        >
          Add to cart <ShoppingCart className="ml-2 hidden lg:block" />
        </Button>
      )}
    </section>
  );
};
