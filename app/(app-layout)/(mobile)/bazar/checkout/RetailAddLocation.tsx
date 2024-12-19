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
import { useForm } from "react-hook-form";
import OrderLocationAutoComplete from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/OrderLocationAutoComplete";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { AddressReturnValue, LocationPayload } from "@/types";
import { VerifyNumberModal } from "@/app/(screen-layout)/(setup-profile)/(user-profile-setup)/verify-phone-number/VerifyNumberModal";
import { Dispatch, SetStateAction, useState } from "react";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function RetailAddLocation({
  setAccordionValue,
  setRecentData,
  setIsAddressModalOpen,
}: {
  setAccordionValue?: Dispatch<SetStateAction<string>>;
  setRecentData?: Dispatch<SetStateAction<string | null>>;
  setIsAddressModalOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [pendingRecentLocation, setPendingRecentLocation] = useState<
    string | null
  >(null);
  const [otpRequiredLocation, setOtpRequiredLocation] = useState<number | null>(
    null
  );

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
      nation: "NP",
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
      const response = await api()
        .post(data, "/user/user-location/")
        .json<{ already_verified: boolean; id: number }>();
      return response;
    },
    onSuccess: (data) => {
      if (!data.already_verified) {
        setIsOtpRequired(true);
        setOtpRequiredLocation(data.id);
        const { already_verified, ...rest } = data;
        setPendingRecentLocation(JSON.stringify(rest));
      } else {
        if (setAccordionValue) {
          setAccordionValue("saved-address");
        }
        if (setRecentData) {
          const { already_verified, ...rest } = data;
          setRecentData(JSON.stringify(rest));
        }
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
          nation: "NP",
        });
        queryClient.invalidateQueries("delivery-address");
      }
    },
    onError: (error: any) => {
      toast.error("Unable to add location", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleNewOrderLocation = (data: DeliveryAddressType) => {
    handleNewOrderAddressFn({ ...data, address: data.address });
  };

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="one-time-code"
          onSubmit={form.handleSubmit(handleNewOrderLocation)}
        >
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-r-none">
                              <SelectValue placeholder="Select nation" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="NP">+977 (NP)</SelectItem>

                            <SelectItem value="US">+1 (US)</SelectItem>
                          </SelectContent>
                        </Select>

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
                <OrderLocationAutoComplete
                  onPlaceSelect={handlePlaceSelect}
                  defaultAddress={""}
                  form={form}
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
                name="country"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter your country"
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
                          placeholder="Enter your city"
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
                          placeholder="Enter your city"
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
                          placeholder="Enter your city"
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

          <Button
            className="w-full"
            type="submit"
            isLoading={handleNewOrderAddressFnLoader}
            disabled={handleNewOrderAddressFnLoader}
          >
            Add Address
          </Button>
        </form>
      </Form>

      <VerifyNumberModal
        isOtpRequired={isOtpRequired}
        setIsOtpRequired={setIsOtpRequired}
        otpRequiredLocation={otpRequiredLocation}
        setOtpRequiredLocation={setOtpRequiredLocation}
        phone_number={form.watch("phone_number")}
        resetForm={form}
        setAccordionValue={setAccordionValue}
        pendingRecentLocation={pendingRecentLocation}
        setRecentData={setRecentData}
      />
    </>
  );
}
