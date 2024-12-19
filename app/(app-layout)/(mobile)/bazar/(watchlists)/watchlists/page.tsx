import React from "react";
import WatchLists from "./WatchLists";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const WatchlistsPage = () => {
  return (
    <MaxWidthWrapper>
      <h2 className="text-3xl font-bold tracking-tight">My Watchlists</h2>
      <WatchLists />
    </MaxWidthWrapper>
  );
};

export default WatchlistsPage;
