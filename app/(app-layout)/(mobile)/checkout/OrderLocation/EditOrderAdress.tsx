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
import { Label } from "@/components/ui/Label";
import {
  BillingAddressType,
  defaultEditAddressSchema,
  DeliveryAddressType,
} from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OrderLocationAutoComplete from "./OrderLocationAutoComplete";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { DeleteConfirmationModalClose } from "./DeleteOrderLocation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddressReturnValue } from "@/types";
import { toast } from "sonner";

type editAddressProps = BillingAddressType & { children: React.ReactNode };

export function EditOrderAddress(addressDefaultValues: editAddressProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const form = useForm<DeliveryAddressType>({
    resolver: zodResolver(defaultEditAddressSchema),
    defaultValues: {
      city: !!addressDefaultValues?.city ? addressDefaultValues.city : "",
      country: !!addressDefaultValues?.country
        ? addressDefaultValues.country
        : "",
      state: !!addressDefaultValues?.state ? addressDefaultValues.state : "",
      first_name: !!addressDefaultValues?.first_name
        ? addressDefaultValues.first_name
        : "",
      last_name: !!addressDefaultValues?.last_name
        ? addressDefaultValues.last_name
        : "",
      phone_number: !!addressDefaultValues?.phone_number
        ? addressDefaultValues.phone_number
        : "",
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

  const {
    mutate: handleNewOrderAddressFn,
    isLoading: handleNewOrderAddressFnLoader,
  } = useMutation({
    mutationFn: async (data: DeliveryAddressType) => {
      console.log("Mutate", data);
      const response = await api()
        .patch(data, `/user/user-location/${addressDefaultValues.id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully edited location");
      setIsAddressModalOpen(false);

      queryClient.invalidateQueries("delivery-address");
    },
    onError: (error: any) => {
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
        className="sm:max-w-[64rem]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Order Address</DialogTitle>
          <DialogDescription>
            Edit your delivery location to delivered.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              handleNewOrderAddressFn(data);
            })}
            id="edit-location-form"
            autoComplete="one-time-code"
          >
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 py-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Enter your first name"
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
                  name="last_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Enter your last name"
                            className="bg-gray-100 border-none"
                            autoComplete="one-time-code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex items-center">
                    <FormField
                      control={form.control}
                      name="nation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <select
                              id="countries"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              value={field.value} // Controlled by form
                              onChange={field.onChange} // Updates form state
                            >
                              <option value="NP">NP (+977)</option>
                              <option value="US">USA (+1)</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                placeholder="Enter your phone number"
                                className="bg-gray-100 border-none"
                                autoComplete="one-time-code"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                <div>
                  {/* <Label>Address</Label> */}
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
            </div>

            <DialogFooter className="m-4 flex items-center gap-2">
              {addressDefaultValues.id ? (
                <DeleteConfirmationModalClose
                  deleteTitle="Address"
                  id={addressDefaultValues?.id}
                  tag="delivery-address"
                  url="/user/user-location/"
                  setIsModalOpen={setIsAddressModalOpen}
                />
              ) : null}
              {addressDefaultValues.id ? (
                <Button
                  type="submit"
                  isLoading={handleNewOrderAddressFnLoader}
                  disabled={handleNewOrderAddressFnLoader}
                  form="edit-location-form"
                  className="w-full md:w-fit"
                >
                  Save Location
                </Button>
              ) : null}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
