import { Button } from "@/components/ui/Button";
import { api } from "@/lib/fetcher";
import React, { useCallback } from "react";
import { useMutation } from "react-query";
import { UserWatchList } from "./ProductDetail";
import debounce from "lodash.debounce";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { BellPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToWatchlistProps {
  currentVariation: number;
  userWatchLists: UserWatchList[] | [];
  isActive: boolean;
  isMobile?: boolean;
}

const AddToWatchlist = ({
  currentVariation,
  userWatchLists,
  isActive,
  isMobile,
}: AddToWatchlistProps) => {
  const { mutate: handleAddWatchList, isLoading: handleAddWatchListLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api()
          .post(
            { product_variation: currentVariation },
            "/watchlist/user-watchlist/"
          )
          .json();
        return response;
      },
      onSuccess: () => {
        toast.success("Sucessfully added to wishlist");
        queryClient.invalidateQueries("user-watchlists");
      },
      onError: (error: any) => {
        toast.error("Unable added to watchlist", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const {
    mutate: handleRemoveWatchList,
    isLoading: handleRemoveWatchListLoader,
  } = useMutation({
    mutationFn: async () => {
      const response = await api()
        .post(
          { product_variation: currentVariation },
          "/watchlist/user-watchlist/"
        )
        .json();
      return response;
    },
    onSuccess: (data) => {
      toast.success("Sucessfully added to watchlist");
      queryClient.invalidateQueries("user-watchlists");
    },
    onError: (error: any) => {
      toast.error("Unable added to watchlist", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleAddWatchListFn = () => {
    handleAddWatchList();
  };

  const handleRemoveWatchListeFn = () => {
    handleRemoveWatchList();
  };

  const debouncedAddWatchlist = debounce(handleAddWatchListFn, 400);
  const debouncedRemoveWatchlist = debounce(handleRemoveWatchListeFn, 400);

  const _debouncedAddFavourite = useCallback(debouncedAddWatchlist, []);
  const _debouncedRemoveFavourite = useCallback(debouncedRemoveWatchlist, []);

  return userWatchLists &&
    !!userWatchLists.find(
      (list) => list.product_variation.id === currentVariation
    ) ? (
    <Button
      className={cn(
        isMobile
          ? ""
          : "flex-1 outline outline-brand text-brand bg-white  text-xs sm:text-sm hover:text-white"
      )}
      onClick={() => _debouncedAddFavourite()}
      isLoading={handleAddWatchListLoader}
      disabled={handleAddWatchListLoader}
    >
      {isMobile ? (
        handleAddWatchListLoader ? null : (
          <BellPlus />
        )
      ) : (
        "Remove from watchlist"
      )}
    </Button>
  ) : (
    <Button
      className={cn(
        isMobile
          ? ""
          : "flex-1 outline outline-brand text-brand bg-white  text-xs sm:text-sm"
      )}
      onClick={() => _debouncedRemoveFavourite()}
      isLoading={handleRemoveWatchListLoader}
      disabled={handleRemoveWatchListLoader || !isActive}
      variant={"ghost"}
    >
      {isMobile ? (
        handleRemoveWatchListLoader ? null : (
          <BellPlus />
        )
      ) : (
        "Add to Watchlists"
      )}
    </Button>
  );
};

export default AddToWatchlist;
