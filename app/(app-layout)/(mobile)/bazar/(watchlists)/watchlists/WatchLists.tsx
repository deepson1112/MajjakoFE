"use client";
import { api } from "@/lib/fetcher";
import React from "react";
import { useQuery } from "react-query";
import { UserWatchList } from "../../(products)/products/[subCategoryId]/[productId]/ProductDetail";
import ListLoader from "@/components/loaders/ListLoader";
import { DataTable } from "./watchlists-table/data-table";
import { columns } from "./watchlists-table/columns";

const WatchLists = () => {
  const { data: userWatchLists, isLoading: userWatchListsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/watchlist/user-watchlist/`)
        .json<UserWatchList[]>();
      return response;
    },
    queryKey: [`user-watchlists`],
    onSuccess: (data) => {
      // setCurrentProduct(data);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return userWatchListsLoader ? (
    <ListLoader />
  ) : !!userWatchLists?.length ? (
    <DataTable columns={columns} data={userWatchLists} />
  ) : (
    <div>No Watchlists</div>
  );
};

export default WatchLists;
