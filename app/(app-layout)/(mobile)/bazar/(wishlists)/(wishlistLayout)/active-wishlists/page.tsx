"use client";
import React from "react";
import ActiveWishlists from "./ActiveWishLists";
import useScreenWidth from "@/hooks/useScreenWidth";
import MobileActiveWishlist from "@/components/Mobile-Wishlist/MobileActiveWishlist";

const WishlistsActivePage = () => {
  const { isMobileView } = useScreenWidth();

  return isMobileView ? <MobileActiveWishlist /> : <ActiveWishlists />;
};

export default WishlistsActivePage;
