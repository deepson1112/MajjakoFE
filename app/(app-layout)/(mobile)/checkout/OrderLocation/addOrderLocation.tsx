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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  defaultAddressSchema,
  DeliveryAddressType,
} from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import OrderLocationAutoComplete from "./OrderLocationAutoComplete";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { AddressReturnValue, LocationPayload } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function DeliveryAddressModal() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const form = useForm<DeliveryAddressType>({
    resolver: zodResolver(defaultAddressSchema),
    defaultValues: {
      city: "",
      country: "",
      state: "",
      address: "",
      first_name: "",
      last_name: "",
      location: "",
      phone_number: "",
    },
  });

  console.log("This si from error", form.formState.errors);

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
    mutationFn: async (data: LocationPayload) => {
      const response = await api().post(data, "/user/user-location/").json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully added location");
      setIsAddressModalOpen(false);
      form.reset({
        city: "",
        country: "",
        state: "",
        address: "",
        first_name: "",
        last_name: "",
        location: "",
        phone_number: "",
        latitude: undefined,
        longitude: undefined,
        pin_code: undefined,
      });
      queryClient.invalidateQueries("delivery-address");
    },
    onError: (error: any) => {
      toast.error("Unable to add location", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    // <MaxWidthWrapper>
    //   <Button variant={"ghost"} onClick={() => router.back()}>
    //
    //     <ChevronLeft /> Back
    //   </Button>
    <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={"subtle"} className="text-xs border">
          <Plus className="w-4 h-4" /> Add new delivery location
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[64rem]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Order Address</DialogTitle>
          <DialogDescription>
            Enter your delivery location to delivered.sss
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              handleNewOrderAddressFn({ ...data, address: data.address })
            )}
            autoComplete="one-time-code"
          >
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-2 gap-6 p-4">
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
                            required
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
                            required
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

                <div className="space-y-3">
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
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              className="rounded-l-none border border-l border-gray-600 w-full"
                              placeholder="Phone number"
                              {...field}
                              autoComplete="one-time-code"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  {/* <FormLabel>Address</FormLabel> */}
                  <OrderLocationAutoComplete
                    onPlaceSelect={handlePlaceSelect}
                    defaultAddress={""}
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
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            required
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
                  name="country"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            required
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
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            required
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
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            required
                            placeholder="Enter your longitude"
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

              <Button
                type="submit"
                isLoading={handleNewOrderAddressFnLoader}
                disabled={handleNewOrderAddressFnLoader}
              >
                Add Address
              </Button>
            </ScrollArea>
          </form>
        </Form>
        {/* </MaxWidthWrapper> */}
      </DialogContent>
    </Dialog>
  );
}
