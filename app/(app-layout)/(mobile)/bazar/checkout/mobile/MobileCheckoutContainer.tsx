"use client";

import { Button } from "@/components/ui/Button";

import { api } from "@/lib/fetcher";
import { CheckoutLocation, RetailSubTotalCalculation } from "@/types";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { checkoutResponse } from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/ExistingOrderAddress";
import { useRouter, useSearchParams } from "next/navigation";
import { add } from "date-fns";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

import Price from "@/components/Price";
import { Pen, Ticket, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import AdminCouponField from "../AdminCoupon";
import useUser from "@/lib/useUser";
import RetailLoyaltyContainer from "../../../checkout/RetailLoyaltyContainer";
import PaymentMethodOptions from "../PaymentMethodOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import CouponField from "../CouponField";
import { Skeleton } from "@/components/ui/Skeleton";
import CartImage from "../../../cart/CartImage";
import { MobileDeliveryLocation } from "./MobileDeliveryLocation";
import { NoDelivery } from "../NoDelivery";
import { CouponLists } from "../MediumDeviceCheckout";
import RouterBack from "../../../account/orders/retail-orders/[order_id]/RouterBack";
import RetailQuantityButton from "@/components/sidecart/RetailQuantityButton";
import { SpecialRequest } from "../../(products)/products/[subCategoryId]/[productId]/SpecialRequest";
import { Badge } from "@/components/ui/Badge";

const MobileCheckoutContainer = () => {
  const [currentRetailCartQuantity, setRetailCurrentCartQuantity] = useState(0);
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [coupons, setCoupons] = useState<CouponLists[] | []>([]);
  const [adminCoupon, setAdminCoupon] = useState<string>("");
  const [loyalty, setLoyalty] = useState<string>("");
  const [location, setLocation] = useState<CheckoutLocation>();
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileDevliveryLocation, setMobileDeliveryLocation] = useState(false);
  const [isSpecialRequestModalOpen, setIsSpecialRequestModalOpen] =
    useState(false);
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

  const { isFetching: retailCartsLoader, isLoading: retailCartsLoader2 } =
    useQuery({
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
                  adminCoupon
                    ? `${!!params.coupon ? "," : ""}${adminCoupon}`
                    : ""
                }&loyalty_code=${loyalty}`
              : buyNow === "true"
              ? `/retail-marketplace/retail-sub-total-calculations/?buy_now=true&vendor_id=${
                  params.vendor_id
                }&coupon=${params.coupon}${
                  adminCoupon
                    ? `${!!params.coupon ? "," : ""}${adminCoupon}`
                    : ""
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
                  adminCoupon
                    ? `${!!params.coupon ? "," : ""}${adminCoupon}`
                    : ""
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
          const count = data?.vendors?.reduce((acc, vendor) => {
            let counter = 0;
            vendor.items.map((v) => (counter += v.quantity));
            acc += counter;
            return acc;
          }, 0);
          setRetailCurrentCartQuantity(count || 0);
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
        { coupons, adminCoupon, loyalty, location },
      ],
      retry: false,
      refetchOnWindowFocus: false,
    });

  const handleChangeMethod = (data: string) => {
    setPaymentMethod(data);
  };

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

  const { mutate: handleUpdateCartQuantity } = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      id: number;
      payload: { quantity: number };
    }) => {
      const response = await api()
        .patch(payload, `/retail-marketplace/retail-cart/${id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("retail-cart-data");
    },
  });

  return (
    <>
      <div className="top-0 w-full sticky z-50 bg-white rounded-t-2xl">
        <div>
          <RouterBack subtle>
            <X className="w-8 h-8 text-gray-500" />
          </RouterBack>
        </div>
        {/* <div className="px-2 py-3">
          <button className="rounded-full z-50 top-4 left-4">
            <ArrowLeft className="w-8 h-8 text-gray-500" />
          </button>
        </div> */}

        <div className="px-0 mx-0 text-center">
          <h3 className="mb-1 text-center">Checkout</h3>
          <p className="w-full bg-gray-100 py-1 text-center">
            <span className="text-brand">{currentRetailCartQuantity}</span>{" "}
            Items
          </p>
        </div>
      </div>

      <>
        <ScrollArea className="h-[calc(100vh-2.5rem-170px-150px)] space-y-2">
          <MobileDeliveryLocation
            location={location}
            setLocation={setLocation}
            mobileDeliveryLocation={mobileDevliveryLocation}
            setMobileDeliveryLocation={setMobileDeliveryLocation}
          />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Promotion or discount</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                <AdminCouponField
                  coupon={
                    retailCarts?.coupon_details?.chowchow_coupon
                      ? retailCarts?.coupon_details?.chowchow_coupon
                      : null
                  }
                  setAdminCoupon={setAdminCoupon}
                  guest={!!user?.guest_user}
                  isAdminCouponActive={
                    !!retailCarts?.coupon_details?.chowchow_coupon?.length
                  }
                  retailCartsLoader={retailCartsLoader}
                />

                <RetailLoyaltyContainer
                  loyalty={loyalty}
                  setLoyalty={setLoyalty}
                  handleCheckoutWishlistLoader={handleCheckoutWishlistLoader}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="py-2">
            <h6 className="font-semibold">Select Payment Method</h6>

            <PaymentMethodOptions
              isMobile
              isCodDisabled={retailCarts?.COD!}
              handleChangeMethod={handleChangeMethod}
            />
          </div>

          <div className="py-2">
            <h6 className="font-semibold">Cart Items</h6>
            <ul className="px-2 divide-y border rounded-lg mt-2">
              <div className="md:max-h-[25rem] md:overflow-y-auto md:scrollBar px-4">
                {retailCarts?.vendors.map((vendor) => (
                  <Accordion
                    key={`cart-items-chekcout-${vendor.vendor_id}`}
                    type="multiple"
                    className="w-full"
                    defaultValue={retailCarts?.vendors.map(
                      (vendor) => `${vendor.vendor_id}`
                    )}
                  >
                    <AccordionItem
                      value={`${vendor.vendor_id}`}
                      key={`retail-cart-${vendor.vendor_id}`}
                    >
                      <AccordionTrigger>{vendor.vendor_name}</AccordionTrigger>
                      <AccordionContent className="divide-y-2 md:divide-y-0">
                        {vendor.items.map((cart_item) => (
                          <li key={`vendor-cart-list-${cart_item.id}`}>
                            <div className="flex flex-row  md:flex-col space-x-3 md:space-y-3 py-3 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                              <CartImage
                                discount={Number(
                                  `${cart_item.retail_product_variation?.discount?.discount_percentages}`
                                )}
                                img={
                                  cart_item.retail_product_variation
                                    .variations_image[0].default_image ||
                                  cart_item.retail_product_variation
                                    .variations_image[0].image
                                }
                              />
                              <div className="relative flex flex-1 flex-col justify-between">
                                <div>
                                  <div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between items-start">
                                      <div className="flex items-center justify-between gap-4 w-full">
                                        <p className="text-base font-semibold text-gray-900">
                                          {
                                            cart_item.retail_product_variation
                                              .product[0].product_name
                                          }
                                        </p>
                                        <RetailQuantityButton
                                          cart_item={cart_item}
                                          mutationFn={handleUpdateCartQuantity}
                                          isMobile
                                        />
                                      </div>

                                      <SpecialRequest
                                        defaultRequest={
                                          cart_item?.special_request
                                        }
                                        id={cart_item.id}
                                        isSpecialRequestModalOpen={
                                          isSpecialRequestModalOpen
                                        }
                                        setIsSpecialRequestModalOpen={
                                          setIsSpecialRequestModalOpen
                                        }
                                      >
                                        <Badge className="bg-brand py-0 px-1.5">
                                          Special Request
                                          <Pen className="w-3 h-3 ml-1" />
                                        </Badge>
                                      </SpecialRequest>
                                    </div>
                                    <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                      {cart_item.retail_product_variation.variation
                                        .map(
                                          (item) =>
                                            ` ${item.variation_type_name}: ${item.variation_name} `
                                        )
                                        .join(",")}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-end justify-between">
                                    <div className="sm:text-right flex flex-col">
                                      <span className="text-xs text-semibold text-gray-600 font-semibold flex items-center gap-1">
                                        {cart_item.retail_product_variation
                                          .discounted_amount ? (
                                          <span className="flex items-center gap-1">
                                            <span className="line-through font-thin">
                                              <Price
                                                amount={
                                                  cart_item
                                                    .retail_product_variation
                                                    .price
                                                }
                                              />
                                            </span>
                                            <span className="text-sm">
                                              <Price
                                                amount={
                                                  cart_item
                                                    .retail_product_variation
                                                    .discounted_amount
                                                }
                                              />
                                            </span>
                                          </span>
                                        ) : (
                                          <Price
                                            amount={
                                              cart_item.retail_product_variation
                                                .price
                                            }
                                          />
                                        )}{" "}
                                        <span className="font-light">
                                          (
                                          {
                                            cart_item.retail_product_variation
                                              .tax_exclusive_price
                                          }{" "}
                                          +{" "}
                                          {
                                            cart_item.retail_product_variation
                                              .tax_amount
                                          }{" "}
                                          tax)
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                        <Accordion
                          type="single"
                          collapsible
                          className="w-full border-none"
                          defaultValue={
                            vendor?.vendor_coupon_details?.coupon_code ||
                            "none-1"
                          }
                        >
                          <AccordionItem
                            value={
                              vendor?.vendor_coupon_details?.coupon_code ||
                              `none`
                            }
                            className="border-none"
                          >
                            <AccordionTrigger className="bg-white border p-2">
                              <div className="flex items-center gap-2">
                                <Ticket /> Apply Product Coupon Code
                              </div>
                            </AccordionTrigger>
                            {isLoading ? (
                              <div className="space-y-2">
                                <Skeleton className="h-6 w-14" />
                                <Skeleton className="h-8 w-full" />
                              </div>
                            ) : (
                              <AccordionContent>
                                <CouponField
                                  vendor={vendor.vendor_id}
                                  vendorTitle={vendor.vendor_name}
                                  handleAddRetailCoupon={handleAddRetailCoupon}
                                  retailCartsLoader={retailCartsLoader}
                                  isCouponActive={
                                    !!vendor.vendor_coupon_details
                                  }
                                  handleRemoveCoupon={handleRemoveCoupon}
                                  vendorCoupon={vendor.vendor_coupon_details}
                                  guest={!!user?.guest_user}
                                />
                              </AccordionContent>
                            )}
                          </AccordionItem>
                        </Accordion>
                        <div className="flex flex-col items-stretch gap-2 py-2">
                          <span className="text-gray-600 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Subtotal for {vendor.vendor_name}:
                            </span>{" "}
                            <Price amount={vendor.subtotal} />
                          </span>
                          <span className="text-gray-600 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Delivery Charge for {vendor.vendor_name}:
                            </span>{" "}
                            <Price amount={vendor.vendor_delivery_charge} />
                          </span>

                          {!!vendor["coupon-discount"] ? (
                            <span className="text-gray-600 flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Coupon Discount:
                              </span>{" "}
                              <Price amount={vendor["coupon-discount"]} />
                            </span>
                          ) : null}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </ul>
          </div>
        </ScrollArea>

        <div className=" bg-white w-full">
          <div className="flex flex-col items-stretch rounded-t-xl border-t border-b py-4 px-2 space-y-1">
            <div className="py-2 md:py-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Subtotal</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price amount={retailCarts?.subtotal} />
                </p>
              </div>

              {!!retailCarts?.discount ? (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">Discount</p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-red-500">-</span>
                    <Price amount={retailCarts?.discount} />
                  </p>
                </div>
              ) : null}

              {!!retailCarts?.["coupon-discount"] ? (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">Coupon Discount</p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-red-500">-</span>
                    <Price amount={retailCarts["coupon-discount"]} />
                  </p>
                </div>
              ) : null}

              {!!retailCarts?.["loyalty-discount-amount"] ? (
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-700">
                    Loyalty Discount
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-red-500">-</span>
                    <Price amount={retailCarts?.["loyalty-discount-amount"]} />
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Delivery Charge</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price amount={retailCarts?.delivery_charge} />
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">Totals</p>
                <p className="text-sm font-semibold text-gray-900">
                  <Price amount={retailCarts?.total.toFixed(2)} />
                </p>
              </div>
            </div>
          </div>

          <div>
            {retailCarts?.delivery_available ? (
              <Button
                className="w-full"
                isLoading={handlePlaceOrderLoader}
                disabled={handlePlaceOrderLoader || !paymentMethod.length}
                onClick={() => handlePlaceOrder(paymentMethod)}
              >
                {!paymentMethod.length
                  ? "Chose a payment method"
                  : "Place Order"}
              </Button>
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
      </>

      <NoDelivery
        setMobileDeliveryLocation={setMobileDeliveryLocation}
        mobileDeliveryLocation={mobileDevliveryLocation}
        isDeliveryAvailable={isDeliveryAvailable}
        setIsDeliveryAvailable={setIsDeliveryAvailable}
      />
    </>
  );
};

export default MobileCheckoutContainer;
