"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Dispatch, SetStateAction, useState } from "react";
import useScrollBehavior from "@/hooks/useScrollBehavior";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { OrderAddressType } from "@/lib/validators/user";
import { MobileDeliveryAddresses } from "../../../checkout/mobile/MobileDeliveryAddresses";
import { CheckoutLocation } from "@/types";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/Skeleton";
import { capitalizeWord } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import RetailAddLocation from "../../../checkout/RetailAddLocation";
import { Navigation } from "lucide-react";
import { VerifyNumberModal } from "@/app/(screen-layout)/(setup-profile)/(user-profile-setup)/verify-phone-number/VerifyNumberModal";

interface DesktopDeliveryLocationProps {
  location: CheckoutLocation | undefined;
  setLocation: Dispatch<SetStateAction<CheckoutLocation | undefined>>;
  setMobileDeliveryLocation: Dispatch<SetStateAction<boolean>>;
  mobileDeliveryLocation: boolean;
  items: number[];
}

export function DesktopDeliveryLocation({
  location,
  setLocation,
  mobileDeliveryLocation,
  setMobileDeliveryLocation,
  items,
}: DesktopDeliveryLocationProps) {
  const { register, watch, reset } = useForm({
    defaultValues: {
      defaultLocation: "",
    },
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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
        console.log("Fetched default address", default_address);
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

  console.log("THis is user location", deliveryAddressData);

  useScrollBehavior(mobileDeliveryLocation);
  return deliveryAddressDataLoader ? (
    <Skeleton className="w-full rounded-lg h-12" />
  ) : (
    <>
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogTrigger asChild>
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
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[625px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Shipping Information</DialogTitle>
            <DialogDescription>
              Select location where the you want the product to be delivered.
            </DialogDescription>
          </DialogHeader>

          <div>
            <ScrollArea className="overflow-y-auto px-2">
              <div className="flex flex-col space-y-4">
                <MobileDeliveryAddresses
                  // @ts-ignore
                  userLocation={deliveryAddressData}
                  setLocation={setLocation}
                  location={location}
                />

                <div>
                  <h6 className="font-semibold">Recipents Information</h6>
                  <RetailAddLocation />
                </div>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
