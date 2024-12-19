import React from "react";
import DisplayWishlistsPage from "./DisplayWishlistsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MajjakoDeals | wishlist",
  description: "Best Retail Online Shop",
};

const WishlistsLayout = ({ children }: { children: React.ReactNode }) => {
  return <DisplayWishlistsPage>{children}</DisplayWishlistsPage>;
};

export default WishlistsLayout;
