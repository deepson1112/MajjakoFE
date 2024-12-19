"use client";

import { api } from "@/lib/fetcher";
import { WishlistItems } from "@/types";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance";
import ShowWishlists from "../ShowWishlists";

const ActiveWishLists = () => {
  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-wishlist/share-retail-wishlist/?buyer=False`)
        .json<WishlistItems[]>();
      return response;
    },
    queryKey: ["retail-shared-wishlists-pending"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    mutate: handleDeleteWishlist,
    isLoading: handleDeleteWishlistLoader,
  } = useMutation({
    mutationFn: async (id: number) => {
      // const response = await api()
      //   .delete(`/retail-wishlist/share-retail-wishlist/${id}/`)
      //   .json();

      // return response;
      try {
        const { data, status } = await axiosInstance.delete(
          `/retail-wishlist/share-retail-wishlist/${id}/`
        );
        console.log("Status", status);
        return data;
      } catch (error) {
        throw new Error("Something went wrng");
      }
    },
    onSuccess: () => {
      toast.success("Sucessfully Deleted Wishlist");
      queryClient.invalidateQueries("retail-shared-wishlists-pending");
    },
    onError: (error: any) => {
      toast.error("Unable to delete wishlist", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <ShowWishlists wishlists={wishlists} wishlistsLoader={wishlistsLoader} />
  );
};

export default ActiveWishLists;
