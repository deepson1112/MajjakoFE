"use client";
import { Button, buttonVariants } from "@/components/ui/Button";
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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AddressReturnValue, LocationPayload } from "@/types";
import { toast } from "sonner";

export function OrderAddress() {
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
    <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
      <DialogTrigger asChild>
        <Link
          className={cn(buttonVariants({ variant: "subtle" }))}
          href={"/delivery-address"}
        >
          <Plus className="w-4 h-4" /> Add new delivery location{" "}
        </Link>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[64rem]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Order Address</DialogTitle>
          <DialogDescription>
            Enter your delivery location to delivered.
          </DialogDescription>
        </DialogHeader>
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
              <div>
                <FormLabel>Address</FormLabel>
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
            <DialogFooter>
              <Button
                type="submit"
                isLoading={handleNewOrderAddressFnLoader}
                disabled={handleNewOrderAddressFnLoader}
              >
                Add Address
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
