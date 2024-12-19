"use client";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import ListLoader from "@/components/loaders/ListLoader";
import { api } from "@/lib/fetcher";
import { CheckoutLocation, WishlistItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Price from "@/components/Price";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { NoWishlist } from "@/components/Icons";
import { MobileWishlistContainerQtyCounter } from "@/components/Mobile-Wishlist/MobileWishlistContainerQtyCounter";
import { queryClient } from "@/lib/queryClient";
import { DesktopDeliveryLocation } from "./DesktopDeliveryLocation";
import useUser from "@/lib/useUser";
import { OrderAddressType } from "@/lib/validators/user";
import { toast } from "sonner";

const WishlistsBuyer = () => {
  const [items, setItems] = useState<number[]>([]);
  const [mobileDevliveryLocation, setMobileDeliveryLocation] = useState(false);
  const [location, setLocation] = useState<CheckoutLocation>();
  const { user } = useUser();

  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-wishlist/retail-wishlist/")
        .json<WishlistItem[]>();
      return response;
    },
    queryKey: ["retail-wishlists"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleCheckboxChange = (wishlistId: number, checked: boolean) => {
    if (checked) {
      setItems((prevItems) => [...prevItems, wishlistId]);
    } else {
      setItems((prevItems) =>
        prevItems.filter((itemId) => itemId !== wishlistId)
      );
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && wishlists) {
      const allWishlistIds = wishlists.map((wishlist) => wishlist.id);
      setItems(allWishlistIds);
    } else {
      setItems([]);
    }
  };

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

  const {
    mutate: handleShareWishlistsFn,
    isLoading: handleShareWishlistsFnLoader,
  } = useMutation({
    mutationFn: async (data: OrderAddressType) => {
      console.log("Mutate", data);
      const response = await api()
        .post(data, `/retail-wishlist/share-retail-wishlist/`)
        .json<{ uuid: string }>();
      return response;
    },
    onSuccess: (data: { uuid: string }) => {
      // toast.success("Sucessfully added location");
      navigator.clipboard.writeText(
        `https://majjakodeals.com/bazar/wishlists-buyer/${data.uuid}`
      );
      toast.info("The shared link has been copied to your clipboard");

      queryClient.invalidateQueries("delivery-address");
    },
    onError: (error: any) => {
      toast.error(`Unable to wishlist`, {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleShareWishlist = () => {
    handleShareWishlistsFn({
      ...location,
      // @ts-ignore
      email: user?.email,
      wishlists: items,
    });
  };

  return wishlistsLoader ? (
    <ListLoader />
  ) : !!wishlists?.length ? (
    <div className="relative">
      <div className="flex items-center justify-between my-3">
        <h3 className="font-semibold text-xl md:text-2xl mb-4">My Wishlists</h3>

        {/* <WishlistModal items={items} /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] space-x-6 space-y-4">
        <div className="rounded-lg overflow-y-scroll">
          <table className="w-full table-fixed max-h-[70vh] overflow-x-auto">
            <thead className="rounded-lg">
              <tr className="bg-gray-100 rounded-lg">
                <th className="w-4 py-4 px-6 text-left text-gray-600 font-bold uppercase rounded-s-xl">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={items.length === wishlists?.length}
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>

                <th className="w-full md:w-2/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase min-w-[100px]">
                  Product
                </th>

                <th className="md:table-cell hidden w-1/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase">
                  Price
                </th>

                <th className="md:table-cell hidden w-1/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase">
                  Quantity
                </th>

                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-semibold uppercase rounded-e-xl">
                  <span className="hidden md:inlin-block">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {wishlists &&
                wishlists.map((wishlist) => (
                  <tr key={`wishlist-item-buyer-${wishlist.id}`}>
                    <td className="w-4 p-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <input
                          id={`wishlist-${wishlist.id}`}
                          type="checkbox"
                          className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                    </td>

                    <td className="py-4 px-6 border-b border-gray-200 flex items-start gap-6">
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
                        className="w-14 md:w-28 aspect-[1/1] object-cover object-center rounded-lg"
                      />
                      <div className="flex flex-col gap-4">
                        <h6 className="text-sm font-semibold">
                          <Link
                            className="hover:underline"
                            href={`products/${wishlist.retail_product_variation_details.product_detail.sub_category}/${wishlist.retail_product_variation_details.product_detail.id}/`}
                          >
                            {wishlist.product_name}
                          </Link>
                          <span className="text-xs text-brand inline-block md:hidden">
                            (
                            <Price
                              amount={
                                wishlist.retail_product_variation_details.price
                              }
                            />
                            )
                          </span>
                        </h6>
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

                        <p className="-mt-3 text-xs text-gray-500 line-clamp-2 md:line-clamp-3">
                          {wishlist.retail_product_variation_details
                            .product_detail.description || ""}
                        </p>
                      </div>
                    </td>

                    <td className="md:table-cell hidden py-4 px-6 border-b border-gray-200 truncate">
                      <Price
                        amount={wishlist.retail_product_variation_details.price}
                      />
                    </td>

                    <td className="md:table-cell hidden py-4 px-6 border-b border-gray-200">
                      <MobileWishlistContainerQtyCounter
                        wishlist={wishlist}
                        handleUpdateWishlistQuantity={
                          handleUpdateWishlistQuantity
                        }
                      />
                    </td>

                    <td className=" py-4 px-6 border-b border-gray-200">
                      <span className="hidden text-gray-500 py-1 px-2 rounded-full text-xs md:flex items-center gap-2">
                        <DeleteConfirmation
                          deleteTitle={wishlist.product_name}
                          id={wishlist.id}
                          tag="retail-wishlists"
                          url="/retail-wishlist/retail-wishlist/"
                          icon
                        />
                      </span>

                      <span className="inline-block md:hidden">
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
                              className={cn(
                                buttonVariants({ variant: "ghost" })
                              )}
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
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="sticky top-32 border shadow p-4 rounded-lg max-h-fit space-y-4">
          <h4 className="font-medium text-xl">Summary</h4>
          <div className="flex items-center justify-between">
            <p className="font-medium">Total:</p>
            <span>Rs.0</span>
          </div>

          <DesktopDeliveryLocation
            location={location}
            setLocation={setLocation}
            mobileDeliveryLocation={mobileDevliveryLocation}
            setMobileDeliveryLocation={setMobileDeliveryLocation}
            items={items}
          />
          <Button
            className="w-full"
            type="button"
            disabled={!items.length || handleShareWishlistsFnLoader}
            isLoading={handleShareWishlistsFnLoader}
            onClick={() => {
              if (items.length) handleShareWishlist();
            }}
          >
            {items.length ? "Share Wishlist" : "No Wishlist Items Selected"}
            {items.length ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#FFFFFF"
                className="ml-1"
              >
                <path
                  d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                  stroke="#FFFFFF"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            ) : null}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-28 h-28">{NoWishlist}</div>
        <h5 className="text-center font-semibold text-brand">
          No Wishlists Added.
        </h5>
      </div>
    </div>
  );
};

export default WishlistsBuyer;
