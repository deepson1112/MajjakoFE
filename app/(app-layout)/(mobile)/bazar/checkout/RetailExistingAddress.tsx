"use client";

import { OrderAddressType } from "@/lib/validators/user";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { EditOrderAddress } from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/EditOrderAdress";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import useUser from "@/lib/useUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import RetailAddLocation from "./RetailAddLocation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CouponLists } from "./MediumDeviceCheckout";

export interface checkoutResponse {
  clientSecret: string;
  order_number: string;
}

export function RetailExistingAddress({
  url = "/marketplace/sub_total_calculations/",
  adminCoupon,
  coupons,
  loyalty,
  location,
  setLocation,
}: {
  url?: string;
  coupons?: CouponLists[] | [];
  adminCoupon?: string;
  loyalty?: string;
  location: any;
  setLocation: Dispatch<SetStateAction<any>>;
}) {
  const [accordionValue, setAccordionValue] = useState("saved-address");
  const [recentData, setRecentData] = useState<string | null>(null);

  const { register, watch, reset, setValue } = useForm({
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
        defaultLocation:
          recentData ||
          JSON.stringify(data.default_address || data.billing_address[0]),
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { user } = useUser();

  useEffect(() => {
    if (selectedValuesString) {
      setLocation(JSON.parse(selectedValuesString));
    }
  }, [selectedValuesString]);

  return (
    <Fragment>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value="saved-address">
          <AccordionTrigger>Saved Addresses</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[20rem] bg-gray-50 rounded-lg px-2">
              <div className="flex flex-col md:flex-row py-4">
                <form>
                  <div className="w-full">
                    <div className="px-2">
                      <h6 className="font-semibold mb-1">My Address</h6>
                      <p className="text-xs mb-3">
                        {" "}
                        You can select any of the address that you have saved
                        previously or add new location.
                      </p>
                    </div>
                    <div className="scrollBar px-2">
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        {!!deliveryAddressData &&
                        !!deliveryAddressData.default_address &&
                        !user?.guest_user ? (
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
                                <p className="font-semibold">
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
                              </div>
                              {!!deliveryAddressData.default_address
                                ?.phone_number ? (
                                <p className="text-sm">
                                  {
                                    deliveryAddressData.default_address
                                      .phone_number
                                  }
                                </p>
                              ) : null}
                              <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
                                {`${
                                  !!deliveryAddressData.default_address.state
                                    ? deliveryAddressData.default_address
                                        .state + ","
                                    : ""
                                }`}
                                {`${
                                  !!deliveryAddressData.default_address.city
                                    ? deliveryAddressData.default_address.city +
                                      ","
                                    : ""
                                }`}
                                {`${
                                  !!deliveryAddressData.default_address.address
                                    ? deliveryAddressData.default_address
                                        .address + ","
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
                              {...register("defaultLocation")}
                            />
                          </Fragment>
                        ) : user?.guest_user ? null : (
                          <div>No Address available</div>
                        )}
                        {!!deliveryAddressData &&
                        deliveryAddressData.billing_address ? (
                          deliveryAddressData.billing_address.map(
                            (deliveryAddress, index) => (
                              <Fragment key={`existing-order-${index}`}>
                                <label
                                  htmlFor={`${deliveryAddress.city}+${deliveryAddress.id}`}
                                  className={`relative block p-6 bg-white rounded-lg shadow hover:bg-gray-50 ${
                                    `${selectedValuesString} + ${index}` ===
                                    `${JSON.stringify(
                                      deliveryAddress
                                    )} + ${index}`
                                      ? "border-2 border-brand"
                                      : "border"
                                  } px-6 py-3 space-y-1 h-[130px] cursor-pointer`}
                                >
                                  <div className="w-full flex items-center justify-between p-0">
                                    <p className="font-semibold">
                                      {deliveryAddress?.first_name
                                        ?.charAt(0)
                                        ?.toUpperCase() +
                                        deliveryAddress?.first_name?.slice(
                                          1
                                        )}{" "}
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
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="add-address">
          <AccordionTrigger>
            <span className="flex items-center justify-between">
              Add New Contact Information{" "}
              <span className="bg-brand flex items-center rounded-full text-white text-sm px-2 mr-3">
                Add New Address <ChevronRight className="w-4 h-4" />{" "}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <RetailAddLocation
              setAccordionValue={setAccordionValue}
              setRecentData={setRecentData}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
}
