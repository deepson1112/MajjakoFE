import { Skeleton } from "@/components/ui/Skeleton";
import useUser from "@/lib/useUser";
import React, { Dispatch, SetStateAction } from "react";
import {
  checkoutResponse,
  RetailExistingAddress,
} from "./RetailExistingAddress";
import AdminCouponField from "./AdminCoupon";
import RetailLoyaltyContainer from "@/app/(app-layout)/(mobile)/checkout/RetailLoyaltyContainer";
import { Button } from "@/components/ui/Button";
import { PaymentMethods } from "./PaymentMethods";
import { api } from "@/lib/fetcher";
import { UseMutateFunction, useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { CheckoutLocation, RetailSubTotalCalculation } from "@/types";
import { toast } from "sonner";
import { CouponLists } from "./MediumDeviceCheckout";

interface CheckoutInformationProps {
  uuid: string;
  coupons: CouponLists[];
  adminCoupon: string;
  loyalty: string;
  setLocation: Dispatch<SetStateAction<CheckoutLocation | undefined>>;
  location: CheckoutLocation | undefined;
  setAdminCoupon: Dispatch<SetStateAction<string>>;
  setLoyalty: Dispatch<React.SetStateAction<string>>;
  handlePlaceOrder: UseMutateFunction<checkoutResponse, any, string, unknown>;
  handlePlaceOrderLoader: boolean;
  retailCartsLoader: boolean;
  retailCarts: RetailSubTotalCalculation;
  isCodDisabled: boolean;
  isDeliveryAvailable: boolean;
  setIsDeliveryAvailable: Dispatch<SetStateAction<boolean>>;
}

const CheckoutInformation = ({
  uuid,
  adminCoupon,
  coupons,
  location,
  loyalty,
  setLocation,
  setAdminCoupon,
  setLoyalty,
  handlePlaceOrderLoader,
  handlePlaceOrder,
  retailCarts,
  retailCartsLoader,
  isCodDisabled,
  isDeliveryAvailable,
  setIsDeliveryAvailable,
}: CheckoutInformationProps) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const {
    mutate: handleCheckoutWishlist,
    isLoading: handleCheckoutWishlistLoader,
  } = useMutation({
    mutationFn: async () => {
      const params = coupons?.reduce(
        (acc, item, index) => {
          acc.vendor_id =
            acc.vendor_id + `${index === 0 ? "" : ","}${item.vendor}`;
          acc.coupon = acc.coupon + `${index === 0 ? "" : ","}${item.coupon}`;
          return acc;
        },
        { vendor_id: "", coupon: "" }
      );
      const response = await api()
        .get(
          `/retail-marketplace/retail-sub-total-calculations/?coupon=${
            params?.coupon
          }${
            adminCoupon ? `${!!params?.coupon ? "," : ""}${adminCoupon}` : ""
          }&place_order=true&shared_wishlist=${uuid}`
        )
        .json<checkoutResponse>();
      return response;
    },
    onSuccess: (data: checkoutResponse) => {
      toast.success("Sucessfully placed the orders", {
        description: "Please check your orders",
      });
      router.push(
        `/retail-payment/${data.clientSecret}?food_id=${data.order_number}`
      );
    },
    onError: (error: any) => {
      toast.error("Unable to place the order", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <section>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-[50px] w-[300px]" />

          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-28 w-full" />

          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <div className="rounded-lg">
          {uuid ? null : (
            <h2 className="font-semibold text-xl">Your Contact Information</h2>
          )}

          <div className="space-y-4">
            {uuid ? null : isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
            ) : (
              <RetailExistingAddress
                url={"/retail-marketplace/retail-sub-total-calculations/"}
                coupons={coupons}
                adminCoupon={adminCoupon}
                loyalty={loyalty}
                location={location}
                setLocation={setLocation}
              />
            )}

            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <AdminCouponField
                setAdminCoupon={setAdminCoupon}
                retailCartsLoader={retailCartsLoader}
                guest={!!user?.guest_user}
                isAdminCouponActive={
                  !!retailCarts?.coupon_details?.chowchow_coupon?.length
                }
                coupon={
                  retailCarts?.coupon_details?.chowchow_coupon
                    ? retailCarts?.coupon_details?.chowchow_coupon
                    : null
                }
              />
            )}

            <RetailLoyaltyContainer
              loyalty={loyalty}
              setLoyalty={setLoyalty}
              handleCheckoutWishlistLoader={handleCheckoutWishlistLoader}
            />

            <div className="flex flex-col items-stretch py-2">
              <div className="border-t border-b py-2">
                {isDeliveryAvailable ? (
                  <PaymentMethods
                    handlePlaceOrderStripe={handlePlaceOrder}
                    handlePlaceOrderStripeLoader={handlePlaceOrderLoader}
                    isCodDisabled={isCodDisabled}
                  />
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => setIsDeliveryAvailable((prev) => !prev)}
                  >
                    Place Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutInformation;
