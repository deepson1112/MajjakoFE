"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { api } from "@/lib/fetcher";
import { CheckoutLocation, RetailSubTotalCalculation } from "@/types";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { checkoutResponse } from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/ExistingOrderAddress";
import { useRouter, useSearchParams } from "next/navigation";
import { add } from "date-fns";
import Image from "next/image";
import CheckoutCartItems from "./CheckoutCartItems";
import CheckoutInformation from "./CheckoutInformation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/Skeleton";
import ListLoader from "@/components/loaders/ListLoader";
import { NoDelivery } from "./NoDelivery";
import { queryClient } from "@/lib/queryClient";

export interface CouponLists {
  coupon: string;
  vendor: number;
}

const MediumDeviceCheckout = () => {
  const router = useRouter();

  const [coupons, setCoupons] = useState<CouponLists[] | []>([]);
  const [adminCoupon, setAdminCoupon] = useState<string>("");
  const [loyalty, setLoyalty] = useState<string>("");
  const [location, setLocation] = useState<CheckoutLocation>();
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);

  const [retailCarts, setRetailCarts] =
    useState<RetailSubTotalCalculation | null>(null);

  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const buyNow = searchParams.get("buy_now");
  // const redirectTo = url.includes("retail") ? "/retail-payment/" : "/payement/";

  const handleAddRetailCoupon = (data: { coupon: string; vendor: number }) => {
    setCoupons((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.vendor === data.vendor
      );
      if (existingIndex !== -1) {
        const updatedCoupons = [...prev];
        updatedCoupons[existingIndex] = {
          ...updatedCoupons[existingIndex],
          coupon: data.coupon,
        };
        return updatedCoupons;
      } else {
        return [...prev, data];
      }
    });
  };

  const handleRemoveCoupon = (vendor: number) => {
    setCoupons((prev) => prev.filter((item) => item.vendor !== vendor));
  };

  const {
    data: retailCartsData,
    isFetching: retailCartsLoader,
    isLoading: retailCartsLoader2,
  } = useQuery({
    queryFn: async () => {
      const params = coupons.reduce(
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
          uuid
            ? `/retail-marketplace/retail-sub-total-calculations/?shared_wishlist=${uuid}&vendor_id=${
                params.vendor_id
              }&coupon=${params.coupon}${
                adminCoupon ? `${!!params.coupon ? "," : ""}${adminCoupon}` : ""
              }&loyalty_code=${loyalty}`
            : buyNow === "true"
            ? `/retail-marketplace/retail-sub-total-calculations/?buy_now=true&vendor_id=${
                params.vendor_id
              }&coupon=${params.coupon}${
                adminCoupon ? `${!!params.coupon ? "," : ""}${adminCoupon}` : ""
              }&loyalty_code=${loyalty}${
                !!location && location.phone_number
                  ? `&phone=${location.phone_number}`
                  : ""
              }&location=${location?.id ? location?.id : "default address"}${
                !!buyNow?.length ? "&buy_now=true" : ""
              }`
            : `/retail-marketplace/retail-sub-total-calculations/?vendor_id=${
                params.vendor_id
              }&coupon=${params.coupon}${
                adminCoupon ? `${!!params.coupon ? "," : ""}${adminCoupon}` : ""
              }&loyalty_code=${loyalty}${
                !!location && location.phone_number
                  ? `&phone=${location.phone_number}`
                  : ""
              }&location=${location?.id ? location?.id : "default address"}`
        )
        .json<RetailSubTotalCalculation>();
      return response;
    },
    onSuccess: (data) => {
      if (data) {
        setRetailCarts(data);
        setIsDeliveryAvailable(!data.delivery_available);
      }
    },
    onError: (error: any) => {
      toast.error("Something went wrong", {
        description: `${JSON.parse(error.message).message}`,
      });

      if (JSON.parse(error.message).type === "retail") {
        setCoupons((prev) =>
          prev.filter(
            (coupon) => coupon.coupon !== JSON.parse(error.message).coupon
          )
        );
      } else if (JSON.parse(error.message).type === "admin") {
        setAdminCoupon("");
      }
    },
    queryKey: [
      buyNow === "true" ? "buy-now" : "retail-cart-data",
      coupons,
      adminCoupon,
      loyalty,
      location,
    ],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: handlePlaceOrder, isLoading: handlePlaceOrderLoader } =
    useMutation({
      mutationFn: async (method: string) => {
        try {
          const params = coupons?.reduce(
            (acc, item, index) => {
              acc.vendor_id =
                acc.vendor_id + `${index === 0 ? "" : ","}${item.vendor}`;
              acc.coupon =
                acc.coupon + `${index === 0 ? "" : ","}${item.coupon}`;
              return acc;
            },
            { vendor_id: "", coupon: "" }
          );

          const now = new Date();
          const futureDate = add(now, { hours: 24 });
          const year = futureDate.getUTCFullYear();
          const month = String(futureDate.getUTCMonth() + 1).padStart(2, "0");
          const day = String(futureDate.getUTCDate()).padStart(2, "0");
          const hours = String(futureDate.getUTCHours()).padStart(2, "0");
          const minutes = String(futureDate.getUTCMinutes()).padStart(2, "0");
          const seconds = String(futureDate.getUTCSeconds()).padStart(2, "0");
          const microseconds =
            String(futureDate.getUTCMilliseconds()).padStart(3, "0") + "000";
          const formattedNow = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}Z`;

          const response = await api()
            .get(
              uuid
                ? `/retail-marketplace/retail-sub-total-calculations/?place_order=true&shared_wishlist=${uuid}&vendor_id=${
                    params.vendor_id
                  }&coupon=${params.coupon}${
                    adminCoupon
                      ? `${!!params.coupon ? "," : ""}${adminCoupon}`
                      : ""
                  }&loyalty_code=${loyalty}&method=${method}`
                : `/retail-marketplace/retail-sub-total-calculations/?delivery_time=${formattedNow}&place_order=true&location=${
                    location?.id ? location?.id : "default address"
                  }&coupon=${params?.coupon}${
                    adminCoupon
                      ? `${!!params?.coupon ? "," : ""}${adminCoupon}`
                      : ""
                  }&loyalty_code=${loyalty}&vendor_id=${params?.vendor_id}${
                    !!location && location.latitude
                      ? `&latitude=${location.latitude}`
                      : ""
                  }&method=${method}${!!buyNow?.length ? "&buy_now=true" : ""}`
            )
            .json();

          return response as checkoutResponse;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: (data: checkoutResponse, context: string) => {
        toast.success("Sucessfully placed the orders", {
          description: "Please check your orders",
        });

        if (context === "Cash On Delivery") {
          router.push(
            `/retail-order-confirmation?order_number=${data.order_number}`
          );
        }

        if (context === "Stripe") {
          router.push(
            `/retail-payment/${data.clientSecret}?food_id=${data.order_number}`
          );
        }
        if (context === "Esewa") {
          const form = document.createElement("form");

          form.action = data.esewa_url;
          form.method = "POST";

          if (!!buyNow?.length) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "buy_now";
            input.value = `true`;
            form.appendChild(input);
          }

          Object.keys(data.payload).forEach((key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            // @ts-ignore
            input.value = `${data.payload[key]}`;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          console.log(form);
          form.submit();
        }
        queryClient.invalidateQueries("retail-cart-data");
      },
      onError: (error: any) => {
        toast.error("Unable to place the order", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  return (
    <>
      <div>
        <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full mx-auto p-6">
          {!!retailCarts ? (
            !!retailCarts.vendors.length ? (
              <>
                <CheckoutCartItems
                  handleAddRetailCoupon={handleAddRetailCoupon}
                  handleRemoveCoupon={handleRemoveCoupon}
                  retailCarts={retailCarts}
                  retailCartsLoader={retailCartsLoader}
                  retailCartsLoader2={retailCartsLoader2}
                />

                <CheckoutInformation
                  isDeliveryAvailable={retailCarts.delivery_available}
                  setIsDeliveryAvailable={setIsDeliveryAvailable}
                  adminCoupon={adminCoupon}
                  coupons={coupons}
                  handlePlaceOrderLoader={handlePlaceOrderLoader}
                  location={location}
                  loyalty={loyalty}
                  setAdminCoupon={setAdminCoupon}
                  setLocation={setLocation}
                  setLoyalty={setLoyalty}
                  uuid={uuid!}
                  handlePlaceOrder={handlePlaceOrder}
                  retailCarts={retailCarts}
                  retailCartsLoader={retailCartsLoader}
                  isCodDisabled={retailCarts.COD}
                />
              </>
            ) : (
              <div className="col-span-full w-full py-16 flex items-center justify-center">
                <figure className="flex flex-col items-center gap-6">
                  <Image
                    src={"/empty-bag.svg"}
                    alt="No Cart Items"
                    width={200}
                    height={200}
                  />
                  <h6 className="font-semibold text-xl">
                    No Items in the cart.
                  </h6>
                </figure>
              </div>
            )
          ) : (
            <>
              <div className="space-y-4">
                <Skeleton className="h-[50px] w-[200px]" />
                <ListLoader />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-[50px] w-[300px]" />

                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-28 w-full" />

                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-8 w-full" />
              </div>
            </>
          )}
          {/* } */}
        </MaxWidthWrapper>
      </div>
      {!!retailCarts ? (
        <NoDelivery
          isDeliveryAvailable={isDeliveryAvailable}
          setIsDeliveryAvailable={setIsDeliveryAvailable}
        />
      ) : null}
    </>
  );
};

export default MediumDeviceCheckout;
