"use client";

import { Button } from "@/components/ui/Button";
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
import { ChevronLeft, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import OrderLocationAutoComplete from "../checkout/OrderLocation/OrderLocationAutoComplete";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useRouter } from "next/navigation";
import { AddressReturnValue, LocationPayload } from "@/types";
import { toast } from "sonner";

export default function DeliveryAddressPage() {
  const router = useRouter();

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
    <MaxWidthWrapper>
      <Button variant={"ghost"} onClick={() => router.back()}>
        {" "}
        <ChevronLeft /> Back
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            handleNewOrderAddressFn({ ...data, address: data.address })
          )}
          autoComplete="one-time-code"
        >
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
                        required
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
            <div>
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
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
