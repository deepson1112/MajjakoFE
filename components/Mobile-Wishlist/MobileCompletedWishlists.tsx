"use client";
import { api } from "@/lib/fetcher";
import { WishlistItems } from "@/types";
import React from "react";
import { useQuery } from "react-query";
import ListLoader from "../loaders/ListLoader";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/Button";
import { Share } from "../Icons";
import Image from "next/image";
import Link from "next/link";
import Price from "../Price";
import { Badge } from "../ui/Badge";
import { toast } from "sonner";
import { capitalizeWord, cn } from "@/lib/utils";
import { bazarWishlistsNavigation } from "@/lib/Constants";
import { AnimatedTabs } from "../ui/AnimatedTabs";

const MobileCompletedWishlists = () => {
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
    <div className="space-y-2">
      <h4 className="text-center text-xl font-semibold">Completed Wishlists</h4>
      <AnimatedTabs sticky={false} tabs={bazarWishlistsNavigation} />
      <ScrollArea className="h-[calc(100vh-2.5rem-90px-150px)] px-2">
        {wishlistsLoader ? (
          <ListLoader />
        ) : !!wishlists?.length ? (
          <div className="flex flex-col space-y-3">
            {wishlists &&
              wishlists.map((wishlistDetails) => (
                <div
                  key={`mobile-active-wishlist-${wishlistDetails.id}`}
                  className="border border-green-500 rounded-lg overflow-hidden"
                >
                  <div className="p-2 border flex items-center justify-between bg-green-100">
                    <Button
                      size={"xs"}
                      className="text-xs whitespace-nowrap bg-white"
                      variant={"outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        navigator.clipboard.writeText(
                          `https://majjakodeals.com/bazar/wishlists-buyer/${wishlistDetails.uuid}`
                        );
                        toast.info("Link has been copied to your clipboard");
                      }}
                    >
                      Re-share
                      <span className="w-3 h-3 -mt-1 ml-1">{Share}</span>
                    </Button>
                  </div>
                  <div className="divide-y-2 divide-gray-100">
                    {wishlistDetails.wishlist_details.map((wishlist) => (
                      <div
                        className={cn("flex items-center bg-white gap-3 p-2")}
                        key={`mobile-wishlist-${wishlist.id}`}
                      >
                        <div className="flex items-start justify-between flex-1 ">
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
                                    wishlist.retail_product_variation_details
                                      .price
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
                            <p className="font-medium text-xs flex items-center gap-1 text-brand">
                              Qty: <span>{wishlist.quantity}</span>
                            </p>
                            <Badge className="bg-green-500 text-xs whitespace-nowrap max-w-[10rem]">
                              {capitalizeWord(
                                wishlist.buyer?.user_first_name || ""
                              )}{" "}
                              {capitalizeWord(
                                wishlist.buyer?.user_last_name || ""
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="py-56">
            <h6 className="text-gray-600 text-center">No Wishlists Items</h6>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MobileCompletedWishlists;
