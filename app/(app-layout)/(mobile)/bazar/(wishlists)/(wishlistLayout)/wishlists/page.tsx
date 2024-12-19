"use client";
import React from "react";
import WishlistsBuyer from "./WishlistsBuyer";
import useScreenWidth from "@/hooks/useScreenWidth";
import MobileShareWishlists from "@/components/Mobile-Wishlist/MobileShareWishlists";

const WishlistsPage = () => {
  const { isMobileView } = useScreenWidth();
  return isMobileView ? <MobileShareWishlists /> : <WishlistsBuyer />;
};

export default WishlistsPage;
