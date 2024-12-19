"use client";
import React from "react";
import CompletedWishlists from "./CompletedWishlists";
import useScreenWidth from "@/hooks/useScreenWidth";
import MobileCompletedWishlists from "@/components/Mobile-Wishlist/MobileCompletedWishlists";

const CompletedWishlistsPage = () => {
  const { isMobileView } = useScreenWidth();
  return isMobileView ? <MobileCompletedWishlists /> : <CompletedWishlists />;
};

export default CompletedWishlistsPage;
