import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { WishlistItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Price from "../Price";
import { Badge } from "../ui/Badge";
import { X } from "lucide-react";
import { MobileWishlistContainerQtyCounter } from "./MobileWishlistContainerQtyCounter";
import ListLoader from "../loaders/ListLoader";
import { ScrollArea } from "../ui/scroll-area";
import { MobileShareWishlistsModal } from "./MobileShareWishlistsModal";
import { DeleteConfirmation } from "../DeleteConfirmation";
import { Button } from "../ui/Button";
import { AnimatedTabs } from "../ui/AnimatedTabs";
import { bazarWishlistsNavigation } from "@/lib/Constants";

const MobileShareWishlists = () => {
  const [wishlistPrice, setWishlistPrice] = useState(0);
  const [items, setItems] = useState<number[]>([]);

  const handleCheckboxChange = (wishlistId: number, checked: boolean) => {
    if (checked) {
      setItems((prevItems) => [...prevItems, wishlistId]);
    } else {
      setItems((prevItems) =>
        prevItems.filter((itemId) => itemId !== wishlistId)
      );
    }
  };
  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-wishlist/retail-wishlist/")
        .json<WishlistItem[]>();
      return response;
    },
    onSuccess: (data) => {
      if (!!data.length) {
        const totalAmount = data.reduce((acc, wishlist) => {
          acc +=
            Number(wishlist.retail_product_variation_details.price) *
            Number(wishlist.quantity);
          return acc;
        }, 0);
        setWishlistPrice(totalAmount);
      }
    },
    queryKey: ["retail-wishlists"],
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: handleUpdateWishlistQuantity } = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      id: number;
      payload: { quantity: number };
    }) => {
      const response = await api()
        .patch(payload, `/retail-wishlist/retail-wishlist/${id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("retail-wishlists");
    },
  });

  return (
    <div className="space-y-2">
      <h4 className="text-center text-xl font-semibold">My Wishlists</h4>
      <AnimatedTabs sticky={false} tabs={bazarWishlistsNavigation} />
      <ScrollArea className="h-[calc(100vh-2.5rem-90px-150px)] px-2">
        <div className="flex flex-col space-y-2 divide-y-2 divide-gray-50 ">
          {wishlistsLoader ? (
            <ListLoader />
          ) : wishlists && wishlists.length ? (
            wishlists.map((wishlist) => (
              <div key={`mobile-share-wishlist-${wishlist.id}`}>
                <div
                  className={cn(
                    items.includes(wishlist.id)
                      ? "bg-brand/5 rounded-lg"
                      : "bg-white",
                    "flex items-center gap-3 p-1"
                  )}
                  key={`mobile-wishlist-${wishlist.id}`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      id={`wishlist-${wishlist.id}`}
                      type="checkbox"
                      className="w-[14px] h-[14px] text-brand bg-gray-100 border-gray-300 rounded focus:ring-brand dark:focus:ring-brand dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-brand"
                      onChange={(e) =>
                        handleCheckboxChange(wishlist.id, e.target.checked)
                      }
                      checked={items.includes(wishlist.id)}
                    />
                    <label
                      htmlFor={`wishlist-${wishlist.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex items-start gap-3">
                      <Image
                        src={
                          wishlist.retail_product_variation_details
                            .variations_image[0].default_image ||
                          wishlist.retail_product_variation_details
                            .variations_image[0].image
                        }
                        alt="product-image"
                        width={1000}
                        height={100}
                        className="w-20 md:w-28 aspect-[1/1] object-cover object-center rounded-lg"
                      />
                      <div className="flex flex-col space-y-1">
                        <Link
                          href={`?is_product=true&product__id=${wishlist.retail_product_variation_details.product_detail.id}&sub__category=${wishlist.retail_product_variation_details.product_detail.sub_category}`}
                          className="cursor-pointer"
                          scroll={false}
                        >
                          <h6 className="text-sm font-semibold line-clamp-2">
                            {wishlist.product_name}{" "}
                          </h6>
                        </Link>
                        <span className="text-sm text-brand font-medium inline-block md:hidden">
                          <Price
                            amount={
                              wishlist.retail_product_variation_details.price
                            }
                          />
                        </span>
                        {!!wishlist.retail_product_variation_details
                          .stock_quantity ? null : (
                          <Badge
                            className="text-xs max-w-fit font-medium"
                            variant={"destructive"}
                          >
                            {" "}
                            Out of stock
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between space-y-6">
                      <DeleteConfirmation
                        deleteTitle={wishlist.product_name}
                        id={wishlist.id}
                        tag="retail-wishlists"
                        url="/retail-wishlist/retail-wishlist/"
                      >
                        <button className="cursor-pointer">
                          <X className="text-gray-500 w-5 h-5 mb-auto" />
                        </button>
                      </DeleteConfirmation>
                      <MobileWishlistContainerQtyCounter
                        wishlist={wishlist}
                        handleUpdateWishlistQuantity={
                          handleUpdateWishlistQuantity
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-56">
              <h6 className="text-gray-600 text-center">No Wishlists Items</h6>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex flex-col items-stretch space-y-2 py-2">
        <div className="flex items-center justify-between">
          <p className="font-medium">Subtotal:</p>
          <span className="font-semibold text-brand">
            <Price amount={wishlistPrice} />
          </span>
        </div>
        <MobileShareWishlistsModal
          items={items}
          // setIsWishlistDrawerOpen={setIsWishlistDrawerOpen}
        />
      </div>
    </div>
  );
};

export default MobileShareWishlists;
