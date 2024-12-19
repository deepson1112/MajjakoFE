import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { WishlistItems } from "@/types";
import { Check, Forward, Trash } from "lucide-react";
import Image from "next/image";
import { UseMutateFunction } from "react-query";
import { toast } from "sonner";

interface ViewActiveWishlistProps {
  wishlist: WishlistItems;
  completed?: boolean;
  handleDeleteWishlist?: UseMutateFunction<unknown, unknown, number, unknown>;
  handleDeleteWishlistLoader?: boolean;
}

export function ViewActiveWishlist({
  wishlist,
  completed,
  handleDeleteWishlist,
  handleDeleteWishlistLoader,
}: ViewActiveWishlistProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={`wishlist-item-${wishlist.id}`}
    >
      <AccordionItem value={`wishlist-item-${wishlist.id}`}>
        <AccordionTrigger>
          <div className="flex items-center justify-between px-2">
            <h6>{wishlist.uuid}</h6>
            <div className="flex item-center gap-3">
              {/* <Button
                variant={"subtle"}
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (handleDeleteWishlist) {
                    handleDeleteWishlist(wishlist.id);
                  }
                }}
                disabled={handleDeleteWishlistLoader}
              >
                Remove Wishlist <Trash className="ml-2 w-4 h-4 text-gray-500" />
              </Button> */}

              {!completed ? (
                <Button
                  variant={"subtle"}
                  size={"sm"}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.clipboard.writeText(
                      `https://majjakodeals.com/bazar/wishlists-buyer/${wishlist.uuid}`
                    );
                    toast.info("Link has been copied to your clipboard");
                  }}
                >
                  Share Wishlist <Forward className="ml-2 w-4 h-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {wishlist.wishlist_details.map((wishlist_item) => (
              <div
                key={`view-wishlist-${wishlist_item.id}`}
                className="flex items-center justify-between pr-6"
              >
                <div className="py-4 px-6 border-b border-gray-200 flex items-center gap-6">
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
                    className="w-28 aspect-[1/1] object-cover object-center rounded-lg"
                  />
                  <div className="flex flex-col gap-4">
                    <h6>{wishlist_item.product_name}</h6>
                    <p className="-mt-3 text-sm text-gray-500 line-clamp-2">
                      {wishlist_item.retail_product_variation_details.variation
                        .map(
                          (item) =>
                            ` ${item.variation_type_name}: ${item.variation_name} `
                        )
                        .join(",")}
                    </p>
                  </div>
                </div>
                {!!wishlist_item.buyer ? (
                  <div className="bg-green-500 flex flex-items rounded-full px-2 text-white">
                    <Check className="w-4 h-4" />{" "}
                    <span className="text-sm">
                      {wishlist_item.buyer.user_first_name}{" "}
                      {wishlist_item.buyer.user_last_name}
                    </span>
                  </div>
                ) : (
                  <div className="bg-red-500 flex flex-items rounded-full px-2 text-white">
                    <Check className="w-4 h-4" />{" "}
                    <span className="text-sm">Pending</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
