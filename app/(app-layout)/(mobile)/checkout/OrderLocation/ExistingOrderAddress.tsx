"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { OrderAddressType } from "@/lib/validators/user";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { EditOrderAddress } from "./EditOrderAdress";
import { Fragment, useState } from "react";
import DeliverySchedule from "./DeliverySchedule";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeliveryAddressModal from "./addOrderLocation";
import { toast } from "sonner";
import { CouponLists } from "../../bazar/checkout/MediumDeviceCheckout";

export interface checkoutResponse {
  clientSecret: string;
  order_number: string;
  esewa_url: string;
  payload: {
    amount: string;
    failure_url: string;
    product_code: string;
    product_delivery_charge: string;
    product_service_charge: string;
    signature: string;
    signed_field_names: string;
    success_url: string;
    tax_amount: string;
    total_amount: string;
    transaction_uuid: string;
  };
}

export function ExistingOrderAddress({
  url = "/marketplace/sub_total_calculations/",
  adminCoupon,
  coupons,
  loyalty,
}: {
  url?: string;
  coupons?: CouponLists[] | [];
  adminCoupon?: string;
  loyalty?: string;
}) {
  const [currentDeliveryDT, setCurrentDeliveryDT] = useState({
    date: "",
    time: "",
    deliveryTime: "",
  });

  const redirectTo = url.includes("retail") ? "/retail-payment/" : "/payement/";

  const router = useRouter();

  const { register, watch, reset } = useForm({
    defaultValues: {
      defaultLocation: "",
    },
  });

  const selectedValuesString = watch("defaultLocation");

  const { data: deliveryAddressData } = useQuery({
    queryFn: async () => {
      const response = await api().get("/user/user-location/").json();
      return response as OrderAddressType;
    },
    queryKey: ["delivery-address"],
    onSuccess: (data) => {
      reset({
        defaultLocation: JSON.stringify(data.default_address),
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { isLoading } = useUser();

  const { mutate: handlePlaceOrder, isLoading: handlePlaceOrderLoader } =
    useMutation({
      mutationFn: async () => {
        const parsedData = JSON.parse(selectedValuesString);
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
            `${url}?delivery_time=${
              currentDeliveryDT.deliveryTime
            }&place_order=true&address=${parsedData.address}&country=${
              parsedData.address
            }&state=${parsedData.state}&city=${parsedData.city}&pin_code=${
              parsedData.pin_code
            }&coupon=${params?.coupon}${
              adminCoupon ? `${!!params?.coupon ? "," : ""}${adminCoupon}` : ""
            }&loyalty_code=${loyalty}&vendor_id=${params?.vendor_id}`
          )
          .json();
        return response as checkoutResponse;
      },
      onSuccess: (data: checkoutResponse) => {
        toast.success("Sucessfully placed the orders", {
          description: "Please check your orders",
        });
        router.push(
          `${redirectTo}${data.clientSecret}?food_id=${data.order_number}`
        );
      },
      onError: (error: any) => {
        toast.error("Unable to place the order", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  if (isLoading) return <p>Loading....</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-full mt-2">
          Place Order
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-6xl overflow-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Continue to payment</DialogTitle>
          <DialogDescription>
            complete the following steps to continue to the payment.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[66vh]">
          <div className="flex flex-col md:flex-row py-4">
            <form>
              <div className="w-full">
                <div className="px-2">
                  <h6 className="font-semibold mb-1">Saved Addresses</h6>
                  <p className="text-xs mb-3">
                    {" "}
                    You can select any of the address that you have saved
                    previously or add new location.
                  </p>
                </div>
                <div className="max-h-[30rem]  overflow-y-auto scrollBar px-2">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    {!!deliveryAddressData &&
                    !!deliveryAddressData.default_address ? (
                      <Fragment>
                        <label
                          htmlFor={`${deliveryAddressData.default_address.first_name}`}
                          className={`relative block px-6 py-3 bg-white rounded-lg shadow hover:bg-gray-50 ${
                            `${selectedValuesString}` ===
                            `${JSON.stringify(
                              deliveryAddressData.default_address
                            )}`
                              ? "border-2 border-brand"
                              : "border"
                          } space-y-1 h-[130px] truncate cursor-pointer`}
                        >
                          <div className="w-full  flex items-center justify-between p-0">
                            <p>
                              {deliveryAddressData.default_address.first_name
                                .charAt(0)
                                .toUpperCase() +
                                deliveryAddressData.default_address.first_name.slice(
                                  1
                                )}{" "}
                              {deliveryAddressData.default_address.last_name
                                .charAt(0)
                                .toUpperCase() +
                                deliveryAddressData.default_address.last_name.slice(
                                  1
                                )}
                            </p>
                            <EditOrderAddress
                              {...deliveryAddressData.default_address}
                            >
                              <Button
                                type="button"
                                variant={"subtle"}
                                className="text-xs border"
                              >
                                Edit
                              </Button>
                            </EditOrderAddress>
                          </div>
                          {!!deliveryAddressData.default_address
                            ?.phone_number ? (
                            <p className="text-sm">
                              {deliveryAddressData.default_address.phone_number}
                            </p>
                          ) : null}
                          <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
                            {`${
                              !!deliveryAddressData.default_address.state
                                ? deliveryAddressData.default_address.state +
                                  ","
                                : ""
                            }`}
                            {`${
                              !!deliveryAddressData.default_address.city
                                ? deliveryAddressData.default_address.city + ","
                                : ""
                            }`}
                            {`${
                              !!deliveryAddressData.default_address.address
                                ? deliveryAddressData.default_address.address +
                                  ","
                                : ""
                            }`}
                          </p>
                        </label>
                        <input
                          type="radio"
                          className="hidden"
                          id={`${deliveryAddressData.default_address.first_name}`}
                          value={JSON.stringify(
                            deliveryAddressData.default_address
                          )}
                          // value={`${deliveryAddressData.default_address.address}`}
                          {...register("defaultLocation")}
                        />
                      </Fragment>
                    ) : (
                      <div>No Address available</div>
                    )}
                    {!!deliveryAddressData &&
                    deliveryAddressData.billing_address ? (
                      deliveryAddressData.billing_address.map(
                        (deliveryAddress, index) => (
                          <Fragment key={`delivery-address-${index}`}>
                            <label
                              htmlFor={`${deliveryAddress.city}+${deliveryAddress.id}`}
                              key={`existing-order-${index}`}
                              className={`relative block p-6 bg-white rounded-lg shadow hover:bg-gray-50 ${
                                `${selectedValuesString} + ${index}` ===
                                `${JSON.stringify(deliveryAddress)} + ${index}`
                                  ? "border-2 border-brand"
                                  : "border"
                              } px-6 py-3 space-y-1 h-[130px] cursor-pointer`}
                            >
                              <div className="w-full flex items-center justify-between p-0">
                                <p>
                                  {deliveryAddress?.first_name
                                    ?.charAt(0)
                                    ?.toUpperCase() +
                                    deliveryAddress?.first_name?.slice(1)}{" "}
                                  {deliveryAddress?.last_name
                                    ?.charAt(0)
                                    ?.toUpperCase() +
                                    deliveryAddress?.last_name?.slice(1)}
                                </p>

                                <EditOrderAddress {...deliveryAddress}>
                                  <Button
                                    type="button"
                                    variant={"subtle"}
                                    className="text-xs border"
                                  >
                                    Edit
                                  </Button>
                                </EditOrderAddress>
                              </div>
                              {!!deliveryAddress?.phone_number ? (
                                <p className="text-sm">
                                  {deliveryAddress.phone_number}
                                </p>
                              ) : null}
                              <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
                                {`${
                                  !!deliveryAddress.state
                                    ? deliveryAddress.state + ","
                                    : ""
                                }`}
                                {`${
                                  !!deliveryAddress.city
                                    ? deliveryAddress.city + ","
                                    : ""
                                }`}
                                {`${
                                  !!deliveryAddress.address
                                    ? deliveryAddress.address + ","
                                    : ""
                                }`}
                              </p>
                            </label>
                            <input
                              type="radio"
                              className="hidden"
                              value={JSON.stringify(deliveryAddress)}
                              // value={`${deliveryAddress.city}`}
                              id={`${deliveryAddress.city}+${deliveryAddress.id}`}
                              {...register("defaultLocation")}
                            />
                          </Fragment>
                        )
                      )
                    ) : (
                      <div>No Address available</div>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div className="max-w-[35rem] md:w-[35rem] h-full px-3 overflow-scroll ">
              <h6 className="font-semibold mb-1">My Delivery Time</h6>
              <p className="text-xs mb-3"> Enter the delivery time.</p>
              <div className=" h-full w-full flex items-center justify-center">
                <div className="w-full flex flex-col space-y-3">
                  <DeliverySchedule
                    setCurrentDeliveryDT={setCurrentDeliveryDT}
                  />
                  <div className="flex flex-col items-stretch gap-3">
                    <Input
                      className="-z-10"
                      placeholder="Delivery Date"
                      value={currentDeliveryDT.date}
                      disabled
                    />
                    <Input
                      className="-z-10"
                      placeholder="Delivery Time"
                      value={currentDeliveryDT.time}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between">
          <DeliveryAddressModal />
          <Button
            type="button"
            onClick={() => handlePlaceOrder()}
            isLoading={handlePlaceOrderLoader}
            disabled={handlePlaceOrderLoader}
          >
            Continue Delivery
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
