"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { vendorAddressSchema, VendorAddressType } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { AddressReturnValue } from "@/types";
import { toast } from "sonner";
import OrderLocationAutoComplete from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/OrderLocationAutoComplete";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";

type editAddressProps = VendorAddressType & { children: React.ReactNode };

export function EditVendorAddress(addressDefaultValues: editAddressProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const form = useForm<VendorAddressType>({
    resolver: zodResolver(vendorAddressSchema),
    defaultValues: {
      city: !!addressDefaultValues?.city ? addressDefaultValues.city : "",
      country: !!addressDefaultValues?.country
        ? addressDefaultValues.country
        : "",
      state: !!addressDefaultValues?.state ? addressDefaultValues.state : "",
      latitude: !!addressDefaultValues?.latitude
        ? addressDefaultValues.latitude
        : "",
      longitude: !!addressDefaultValues?.longitude
        ? addressDefaultValues.longitude
        : "",
      pin_code: !!addressDefaultValues?.pin_code
        ? addressDefaultValues.pin_code
        : "",
      address: addressDefaultValues.address,
    },
  });

  const handlePlaceSelect = (locationDetails: AddressReturnValue) => {
    form.setValue("address", locationDetails.address);
    form.setValue("city", locationDetails.city);
    form.setValue("state", locationDetails.state);
    form.setValue("country", locationDetails.country);
    form.setValue("pin_code", locationDetails.pin_code);
    form.setValue("latitude", locationDetails.latitude);
    form.setValue("longitude", locationDetails.longitude);
  };
  function handleUpdateProfilesFn(value: VendorAddressType) {
    const { address, latitude, longitude } = value;
    const formData = new FormData();

    formData.append("user.vendor_location", address ?? "");
    formData.append("user.vendor_location_latitude", latitude ?? "");
    formData.append("user.vendor_location_longitude", longitude ?? "");

    if (addressDefaultValues && addressDefaultValues.id) {
      handleUpdateProfile(formData);
    }
  }
  const { mutate: handleUpdateProfile, isLoading: handleUpdateProfileLoader } =
    useMutation<Response, AxiosError, FormData>({
      mutationFn: async (payload) => {
        const { data } = await axiosInstance.patch(
          `/user/user-update/${
            addressDefaultValues && addressDefaultValues?.id!
          }/`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully edited vendor location");
        setIsAddressModalOpen(false);

        queryClient.invalidateQueries("vendor");
      },
      onError: (error) => {
        toast.error("Unable to edit address", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  return (
    <Dialog
      open={isAddressModalOpen}
      onOpenChange={(data) => {
        setTimeout(() => (document.body.style.pointerEvents = ""), 100);
        setIsAddressModalOpen(data);
      }}
    >
      <DialogTrigger asChild>{addressDefaultValues.children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[50rem]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Vendor Location</DialogTitle>
          <DialogDescription>Edit your store location here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              handleUpdateProfilesFn(data);
            })}
            id="edit-vendor-location-form"
            autoComplete="one-time-code"
          >
            <div className="max-h-[60vh] overflow-y-auto">
              <div>
                <OrderLocationAutoComplete
                  onPlaceSelect={handlePlaceSelect}
                  defaultAddress={addressDefaultValues.address || ""}
                  field="address"
                />
              </div>

              <FormField
                control={form.control}
                name="pin_code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your postal code"
                          className="bg-gray-100 border-none"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your state"
                          className="bg-gray-100 border-none"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your City"
                          className="bg-gray-100 border-none"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your Country"
                          className="bg-gray-100 border-none"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your latitude"
                          className="bg-gray-100 border-none"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your longitude"
                          className="bg-gray-100 border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <DialogFooter className="m-4 flex items-center gap-2">
              {addressDefaultValues.id ? (
                <Button
                  type="submit"
                  isLoading={handleUpdateProfileLoader}
                  disabled={handleUpdateProfileLoader}
                  form="edit-vendor-location-form"
                  className="w-full md:w-fit"
                >
                  Update Location
                </Button>
              ) : null}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
