"use client";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import ListLoader from "@/components/loaders/ListLoader";
import { api } from "@/lib/fetcher";
import { WishlistItems } from "@/types";
import Image from "next/image";
import { useQuery } from "react-query";
import AddWishListToCart from "./AddWishListToCart";
import WishlistBody from "./WishlistBody";
import { WishlistCart } from "./WishlistsCart";

interface WishlistsProps {
  uuid: string;
}

const Wishlists = ({ uuid }: WishlistsProps) => {
  const { data: wishlists, isLoading: wishlistsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retail-wishlist/share-retail-wishlist/?uuid=${uuid}`)
        .json<WishlistItems[]>();
      return response;
    },
    queryKey: ["retail-wishlists"],
  });

  const { data: wishlistCartItems, isLoading: wishlistCartItemsLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get(
            `/retail-marketplace/retail-sub-total-calculations/?shared_wishlist=${uuid}`
          )
          .json<WishlistCart>();
        return response;
      },
      queryKey: ["wishlists-cart"],
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  return wishlistsLoader && wishlistCartItemsLoader ? (
    <ListLoader />
  ) : (
    <div className="shadow-lg rounded-lg max-h-[70vh] overflow-y-auto">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Product
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Price
            </th>
            {/* <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Stock
            </th> */}
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {wishlists &&
            wishlists.map((wishlistDetail) =>
              wishlistDetail.wishlist_details.map((wishlist) => (
                <WishlistBody
                  key={`wishlist-body-${wishlist.id}`}
                  wishlist={wishlist}
                  id={wishlistDetail.id}
                  isAccepted={
                    !!wishlistCartItems?.vendors.find((items) =>
                      items.items.find(
                        (item) =>
                          item.retail_product_variation.id ===
                          wishlist.retail_product_variation_details.id
                      )
                    )
                  }
                />
              ))
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlists;
