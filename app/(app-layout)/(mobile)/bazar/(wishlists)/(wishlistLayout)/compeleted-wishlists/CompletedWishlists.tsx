"use client";

import { api } from "@/lib/fetcher";
import { WishlistItems } from "@/types";
import { useQuery } from "react-query";
import ShowWishlists from "../ShowWishlists";

const CompletedWishlists = () => {
  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-wishlist/share-retail-wishlist/?buyer=True`)
        .json<WishlistItems[]>();
      return response;
    },
    queryKey: ["retail-shared-wishlists-completed"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <ShowWishlists
      completed
      wishlists={wishlists}
      wishlistsLoader={wishlistsLoader}
    />
  );
};

export default CompletedWishlists;
