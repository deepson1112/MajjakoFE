import { RetailSubTotalCalculation, userCart as userCartType } from "@/types";
import { Loader2, ShoppingCart } from "lucide-react";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Cart = () => {
  // const [currentCartQuantity, setCurrentCartQuantity] = useState(0);
  const [currentRetailCartQuantity, setRetailCurrentCartQuantity] = useState(0);
  const currentRoute = usePathname();

  const { data: userCartDetails, isLoading: userCartDetailsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/marketplace/cart/")
        .json<userCartType[]>();
      return response;
    },
    queryKey: ["user-cart"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { isLoading: retailCartsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(
          "/retail-marketplace/retail-sub-total-calculations/?vendor_id=&coupon="
        )
        .json<RetailSubTotalCalculation>();
      return response;
    },
    onSuccess: (data) => {
      const count = data?.vendors?.reduce((acc, vendor) => {
        let counter = 0;
        vendor.items.map((v) => (counter += v.quantity));
        acc += counter;
        return acc;
      }, 0);
      setRetailCurrentCartQuantity(count || 0);
    },
    queryKey: ["retail-cart-data"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   if (userCartDetails) {
  //     const cartQuantity = userCartDetails
  //       ? userCartDetails.reduce((acc, data) => {
  //           acc += data.quantity;
  //           return acc;
  //         }, 0)
  //       : 0;
  //     setCurrentCartQuantity(cartQuantity);
  //   }
  //   if (retailCarts) {
  //     const count = retailCarts?.vendors?.reduce((acc, vendor) => {
  //       acc += vendor.items.length;
  //       return acc;
  //     }, 0);
  //     setRetailCurrentCartQuantity(count || 0);
  //   }
  // }, [retailCarts, userCartDetails]);

  return retailCartsLoader || userCartDetailsLoader ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    <div className="relative">
      <ShoppingCart className={currentRoute === "/" ? "text-white" : ""} />
      <span
        className={cn(
          currentRoute === "/"
            ? "h-4 w-4 rounded-full bg-white text-brand absolute -top-1 -right-2 grid place-items-center text-xs"
            : "h-4 w-4 rounded-full md:bg-brand md:text-white bg-white text-brand absolute -top-1 -right-2 grid place-items-center text-xs"
        )}
      >
        {currentRetailCartQuantity}
      </span>
    </div>
  );
};

export default Cart;
