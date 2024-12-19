import { api } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { WishlistItem } from "@/types";
import { Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

const NavbarWishlist = ({
  activeLandingPage,
}: {
  activeLandingPage: boolean;
}) => {
  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-wishlist/retail-wishlist/")
        .json<WishlistItem[]>();
      return response;
    },
    queryKey: ["retail-wishlists"],
    retry: false,

    refetchOnWindowFocus: false,
  });
  return wishlistsLoader ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    <Link href={"/bazar/wishlists"} className="relative">
      <Heart className={activeLandingPage ? "text-white" : ""} />
      <span
        className={cn(
          activeLandingPage ? "bg-white text-brand" : "bg-brand text-white",
          "h-4 w-4 rounded-full  absolute -top-1 -right-2 grid place-items-center text-xs"
        )}
      >
        {(wishlists && wishlists?.length) || "0"}
      </span>
    </Link>
  );
};

export default NavbarWishlist;
