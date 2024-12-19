import React from "react";
import ListLoader from "@/components/loaders/ListLoader";
import { WishlistItems } from "@/types";
import { toast } from "sonner";
import { NoWishlist, Share } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";
import { Badge } from "@/components/ui/Badge";
import { capitalizeWord, cn } from "@/lib/utils";

interface ShowWishlistsProps {
  wishlistsLoader: boolean;
  wishlists: WishlistItems[] | undefined;
  completed?: boolean;
}

const ShowWishlists = ({
  wishlistsLoader,
  wishlists,
  completed,
}: ShowWishlistsProps) => {
  return wishlistsLoader ? (
    <ListLoader />
  ) : !!wishlists?.length ? (
    <div>
      <div className="flex items-center justify-between my-3">
        <h3 className="font-semibold text-xl md:text-2xl mb-4">
          {completed ? "Previous" : "Active"} Wishlists
        </h3>
      </div>

      <ul className="flex flex-col space-y-12">
        {wishlists?.map((wishlist) => (
          <>
            <div
              className={cn(
                completed ? "border-green-500" : "border-brand/50",
                "border rounded-lg overflow-hidden"
              )}
            >
              <table className="w-full table-fixed max-h-[70vh] overflow-x-auto  ">
                <thead>
                  <tr className={cn(completed ? "bg-green-100" : "bg-brand/5")}>
                    <th className="w-full md:w-2/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase min-w-[100px]">
                      Product
                    </th>

                    <th className="md:table-cell hidden w-1/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase">
                      Price
                    </th>

                    <th className="md:table-cell hidden w-1/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase">
                      Quantity
                    </th>
                    <th className="md:table-cell hidden w-1/4 py-4 px-6 text-left text-gray-600 font-medium uppercase">
                      <div className="flex items-center gap-4">
                        <button
                          className="flex items-center gap-1 bg-gray-50 px-2 py-1 border rounded-lg text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigator.clipboard.writeText(
                              `https://majjakodeals.com/bazar/wishlists-buyer/${wishlist.uuid}`
                            );
                            toast.info(
                              "Link has been copied to your clipboard"
                            );
                          }}
                        >
                          Re-share
                          <span className="w-3 h-3 -mt-1 ml-1">{Share}</span>
                        </button>
                        {!completed ? <button>Delete</button> : null}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y-2 divide-gray-100">
                  {wishlist.wishlist_details.map((wishlist_item) => (
                    <tr key={`wishlist-item-buyer-${wishlist_item.id}`}>
                      <td className="py-4 px-6  flex items-start gap-6">
                        <Image
                          src={
                            wishlist_item.retail_product_variation_details
                              .variations_image[0].default_image ||
                            wishlist_item.retail_product_variation_details
                              .variations_image[0].image
                          }
                          alt="product-image"
                          width={1000}
                          height={100}
                          className="w-14 md:w-28 aspect-[1/1] object-cover object-center rounded-lg"
                        />
                        <div className="flex flex-col gap-4">
                          <h6 className="text-sm font-semibold">
                            <Link
                              className="hover:underline"
                              href={`products/${wishlist_item.retail_product_variation_details.product_detail.sub_category}/${wishlist_item.retail_product_variation_details.product_detail.id}/`}
                            >
                              {wishlist_item.product_name}
                            </Link>
                            <span className="text-xs text-brand inline-block md:hidden">
                              (
                              <Price
                                amount={
                                  wishlist_item.retail_product_variation_details
                                    .price
                                }
                              />
                              )
                            </span>
                          </h6>
                          {!!wishlist_item.retail_product_variation_details
                            .stock_quantity ? null : (
                            <Badge
                              className="text-xs max-w-fit font-medium"
                              variant={"destructive"}
                            >
                              {" "}
                              Out of stock
                            </Badge>
                          )}

                          <p className="-mt-3 text-xs text-gray-500 line-clamp-2 md:line-clamp-3">
                            {wishlist_item.retail_product_variation_details
                              .product_detail.description || ""}
                          </p>
                        </div>
                      </td>

                      <td className="md:table-cell hidden py-4 px-6  truncate">
                        <Price
                          amount={
                            wishlist_item.retail_product_variation_details.price
                          }
                        />
                      </td>

                      <td className="md:table-cell hidden py-4 px-6 ">
                        {wishlist_item.quantity}
                      </td>

                      <td className=" py-4 px-6 ">
                        {!!wishlist_item.buyer ? (
                          <Badge className="bg-green-500">
                            <p className="line-clamp-1">
                              {capitalizeWord(
                                wishlist_item.buyer.user_first_name
                              )}{" "}
                              {capitalizeWord(
                                wishlist_item.buyer.user_last_name
                              )}
                            </p>
                          </Badge>
                        ) : (
                          <Badge variant={"destructive"}>Pending</Badge>
                        )}

                        {/* <span className="inline-block md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-16">
                        <DropdownMenuLabel className="text-center">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link
                          href={`products/${wishlist.retail_product_variation_details.product_detail.sub_category}/${wishlist.retail_product_variation_details.product_detail.id}/`}
                          className={cn(buttonVariants({ variant: "ghost" }))}
                        >
                          View Details
                        </Link>
                        <DropdownMenuSeparator />
                        <DeleteConfirmation
                          deleteTitle={wishlist.product_name}
                          id={wishlist.id}
                          tag="retail-wishlists"
                          url="/retail-wishlist/retail-wishlist/"
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span> */}
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* <li
                  key={`wishlist-active-${wishlist.id}`}
                  className="shadow rounded-md p-2"
                >
                  <ViewActiveWishlist
                    wishlist={wishlist}
                    handleDeleteWishlist={handleDeleteWishlist}
                    handleDeleteWishlistLoader={handleDeleteWishlistLoader}
                  />
                </li> */}
              </table>
            </div>
          </>
        ))}
      </ul>
    </div>
  ) : (
    <div className="py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-28 h-28">{NoWishlist}</div>
        <h5 className="text-center font-semibold text-brand">
          No Active Wishlists
        </h5>
      </div>
    </div>
  );
};

export default ShowWishlists;
