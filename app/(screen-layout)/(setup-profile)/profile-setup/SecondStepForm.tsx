"use client";
import { useStepper } from "@/components/stepper";
import { Form } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/Input";
import AutoPlaceHandler from "./autoPlaceHandler";
import { StepperFormActions } from "./StepForm";
import { ProfileSchema } from "@/lib/validators/profilesteps";

const SecondFormSchema = z.object({
  vendor_location_latitude: z.string().min(1, "Invalid Location"),
  vendor_location_longitude: z.string().min(1, "Invalid Location"),
  vendor_city: z.string().min(1, "City is missing"),
  vendor_pin_code: z.string().optional(),
  vendor_location: z
    .string()
    .min(1, { message: "Vendor Location is required" }),
  place_id: z.string().min(1, "Invalid Location"),
});
export type SecondStepForm = z.infer<typeof SecondFormSchema>;

interface SecondStepFormProps {
  vendorProfile: ProfileSchema;
  setVendorProfile: Dispatch<SetStateAction<ProfileSchema>>;
}

export function SecondStepForm({
  setVendorProfile,
  vendorProfile,
}: SecondStepFormProps) {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof SecondFormSchema>>({
    reValidateMode: "onChange",
    resolver: zodResolver(SecondFormSchema),
    defaultValues: {
      vendor_city: vendorProfile.vendor_city,
      vendor_location: vendorProfile.vendor_location,
      vendor_location_latitude: vendorProfile.vendor_location_latitude,
      vendor_location_longitude: vendorProfile.vendor_location_longitude,
      vendor_pin_code: vendorProfile.vendor_pin_code,
      place_id: vendorProfile.place_id,
    },
  });

  console.log("Place ID", form.formState.errors);

  function onSubmit(_data: z.infer<typeof SecondFormSchema>) {
    setVendorProfile({
      ...vendorProfile,
      vendor_city: _data.vendor_city,
      vendor_location: _data.vendor_location,
      vendor_pin_code: _data.vendor_pin_code,
      vendor_location_latitude: _data.vendor_location_latitude,
      vendor_location_longitude: _data.vendor_location_longitude,
      place_id: _data.place_id,
    });
    console.log(vendorProfile);
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <AutoPlaceHandler form={form} />

          <FormField
            control={form.control}
            name={"vendor_city"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>City</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="bg-gray-100 border-none"
                      placeholder="Vendor City.."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name={"vendor_pin_code"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="bg-gray-100 border-none"
                      placeholder="Postal Code.."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {!form.watch("place_id").length ? (
          <div className="bg-red-100 px-3 py-2 rounded-lg">
            <p className="text-destructive text-sm flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-triangle-alert"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              <span className="font-medium">Invalid Address:</span> Please
              select location from the provided google location
            </p>
          </div>
        ) : null}

        <StepperFormActions />
      </form>
    </Form>
  );
}
