"use client";
import { RetailSubTotalCalculation, userCart as userCartType } from "@/types";
import Cart from "../cart/Cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClearCart } from "./ClearCart";
import { api } from "@/lib/fetcher";
import { useQuery } from "react-query";
import { SideCartBazarContainer } from "./SideCartContainer";

export function SideCart() {
  const [currentCartQuantity, setCurrentCartQuantity] = useState(0);
  const [currentRetailCartQuantity, setRetailCurrentCartQuantity] = useState(0);

  const [sideCartOpen, setSideCartOpen] = useState(false);

  const router = useRouter();
  const handleNavigatePage = ({ url }: { url: string }) => {
    setSideCartOpen(false);
    router.push(url);
  };
  const currentRoute = usePathname();

  const { data: userCartDetails, isLoading: userCartDetailsLoader } = useQuery<
    userCartType[]
  >({
    queryFn: async () => {
      const response = await api().get("/marketplace/cart/").json();
      return response as userCartType[];
    },
    queryKey: ["user-cart"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: retailCarts, isLoading: retailCartsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          "/retail-marketplace/retail-sub-total-calculations/?vendor_id=&coupon="
        )
        .json<RetailSubTotalCalculation>();
      return response;
    },
    queryKey: ["retail-cart-data"],
    retry: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });

  useEffect(() => {
    if (userCartDetails) {
      const cartQuantity = userCartDetails
        ? userCartDetails.reduce((acc, data) => {
            acc += data.quantity;
            return acc;
          }, 0)
        : 0;
      setCurrentCartQuantity(cartQuantity);
    }
    if (retailCarts) {
      const count = retailCarts?.vendors?.reduce((acc, vendor) => {
        acc += vendor.items.length;
        return acc;
      }, 0);
      setRetailCurrentCartQuantity(count || 0);
    }
  }, [retailCarts, userCartDetails]);

  return (
    <Sheet open={sideCartOpen} onOpenChange={setSideCartOpen}>
      <SheetTrigger asChild>
        {/* {currentRoute.startsWith("/restaurant") ||
        currentRoute.startsWith("/bazar") ? ( */}
        <div className="cursor-pointer">
          <Cart />
        </div>
        {/*  : null */}
      </SheetTrigger>
      <SheetContent
        className="min-w-[35rem]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="flex flex-row items-center justify-between mb-3">
          <div>
            <SheetTitle>Cart Items</SheetTitle>
            <SheetDescription>
              Make modifications to your cart items or proceed to checkout.
            </SheetDescription>
          </div>
          {currentCartQuantity || currentRetailCartQuantity ? (
            <ClearCart
              url={
                currentRoute.startsWith("/restaurant")
                  ? "/marketplace/clear-cart/"
                  : "/retail-marketplace/clear-retail-cart/"
              }
            />
          ) : null}
        </SheetHeader>

        {/* {currentRoute.startsWith("/restaurant") ? (
          <SideCartResturantContainer handleNavigatePage={handleNavigatePage} />
        ) : (
          <SideCartBazarContainer handleNavigatePage={handleNavigatePage} />
        )} */}

        {/* {currentRoute.startsWith("/bazar") ? ( */}
        <SideCartBazarContainer handleNavigatePage={handleNavigatePage} />
        {/* ) : null} */}
      </SheetContent>
    </Sheet>
  );
}
