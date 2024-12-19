"use client";

import { Navigation, Pencil } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/Button";
import RetailAddLocation from "../RetailAddLocation";
import { Dispatch, SetStateAction, useState } from "react";
import useScrollBehavior from "@/hooks/useScrollBehavior";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { OrderAddressType } from "@/lib/validators/user";
import { MobileDeliveryAddresses } from "./MobileDeliveryAddresses";
import { CheckoutLocation } from "@/types";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/Skeleton";
import { capitalizeWord } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileDeliveryLocationProps {
  location: CheckoutLocation | undefined;
  setLocation: Dispatch<SetStateAction<CheckoutLocation | undefined>>;
  setMobileDeliveryLocation: Dispatch<SetStateAction<boolean>>;
  mobileDeliveryLocation: boolean;
}

export function MobileDeliveryLocation({
  location,
  setLocation,
  mobileDeliveryLocation,
  setMobileDeliveryLocation,
}: MobileDeliveryLocationProps) {
  const { register, watch, reset } = useForm({
    defaultValues: {
      defaultLocation: "",
    },
  });

  const { data: deliveryAddressData, isLoading: deliveryAddressDataLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get("/user/user-location/")
          .json<OrderAddressType>();

        const default_address = {
          ...response.default_address,
          id: "default address",
        };
        return { default_address, billing_address: response.billing_address };
      },
      queryKey: ["delivery-address"],
      onSuccess: (data) => {
        // @ts-ignore
        setLocation(data.default_address);
        reset({
          defaultLocation: JSON.stringify(data.default_address),
        });
      },
      retry: false,
      refetchOnWindowFocus: false,
    });

  useScrollBehavior(mobileDeliveryLocation);
  return deliveryAddressDataLoader ? (
    <Skeleton className="w-full rounded-lg h-12" />
  ) : (
    <Drawer
      open={mobileDeliveryLocation}
      onOpenChange={setMobileDeliveryLocation}
    >
      <DrawerTrigger asChild>
        <div className="w-full bg-[#ffedea] rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h6 className="font-semibold">Shipping Information</h6>

              <button className="flex items-center gap-1 rounded-full border border-brand px-2 text-brand hover:bg-brand hover:text-white">
                <span className="text-xs">Change or Add</span>

                <Navigation
                  className="w-3 h-3"
                  fill="#ff4500"
                  stroke="#ff4500"
                />
              </button>
            </div>

            <div>
              <p>
                {capitalizeWord(location?.first_name || "")}{" "}
                {capitalizeWord(location?.last_name || "")}
              </p>

              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#F04923"
                  stroke="#EEEEEE"
                  stroke-width="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs">{location?.address}</span>
              </p>
            </div>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="z-[555]">
        <ScrollArea className="overflow-y-auto px-2">
          <DrawerHeader>
            <DrawerTitle>Shipping Information</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col space-y-4">
            <MobileDeliveryAddresses
              // @ts-ignore
              userLocation={deliveryAddressData}
              setLocation={setLocation}
              location={location}
            />

            <div>
              <h6 className="font-semibold">Recipents Information</h6>
              <RetailAddLocation
              // setMobileDelieryLocation={setMobileDelieryLocation}
              />
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="subtle">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
