"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { OfferList } from "@/types";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/Form";
import { StepperFormSubmit } from "./StepForm";
import { Skeleton } from "@/components/ui/Skeleton";
import { axiosInstance } from "@/lib/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/validators/profilesteps";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "./multiSelect";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

const FinalFormSchema = z.object({
  offerings: z.string().array().optional(),
  role: z.string().min(1, { message: "Vendor Role is required" }),
  is_retail: z.boolean().default(false),
  is_resuturant: z.boolean().default(true),
});
export type FinalStepForm = z.infer<typeof FinalFormSchema>;

interface FirstStepFormProps {
  vendorProfile: ProfileSchema;
  setVendorProfile: Dispatch<SetStateAction<ProfileSchema>>;
  user: string;
  offersList: OfferList[] | undefined;
  offersListLoader: boolean;
}

export function FinalStepForm({
  setVendorProfile,
  vendorProfile,
  user,
  offersList,
  offersListLoader,
}: FirstStepFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FinalFormSchema>>({
    resolver: zodResolver(FinalFormSchema),
    defaultValues: {
      offerings: vendorProfile.offerings,
      role: vendorProfile.role,
    },
  });

  const watchRole = form.watch("role");
  const watchOffers = form.watch("offerings");

  const { mutate: handleProfileSetup, isLoading: handleProfileSetupLoader } =
    useMutation({
      mutationFn: async (data: FormData) => {
        const response = await axiosInstance.patch(
          `/vendor/vendor/${user}/`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data as { is_approved: boolean };
      },
      onSuccess: (data) => {
        toast.success("Sucessfully Updated Your Profile!!");
        new Promise<void>((resolve) => {
          queryClient.invalidateQueries("user-profile");
          resolve();
        }).then(() => {
          if (!data.is_approved) {
            router.push(`/verify-phone-number/`);
          } else {
            router.push("/account/dashboard");
          }
        });
      },
      onError: (error: any) => {
        console.error(error);
        toast.error("Failed to update vendor profile!!", {
          description: "Please try again later",
        });
      },
    });

  function onSubmit(_data: z.infer<typeof FinalFormSchema>) {
    setVendorProfile({
      ...vendorProfile,
      role: _data.role,
      offerings: _data.offerings,
    });

    const formData = new FormData();
    formData.append("vendor_cover_image", vendorProfile.cover_image);
    formData.append("vendor_profile_image", vendorProfile.profile_image);
    if (!!vendorProfile.description?.length) {
      formData.append("vendor_description", `${vendorProfile.description}`);
    }

    watchOffers?.map((offer, index) => {
      formData.append(`offerings`, `${offer}`);
    });
    console.log("This is offering", vendorProfile.offerings);

    formData.append("vendor_type", form.watch("is_retail") ? "2" : "1");

    formData.append("vendor_phone", vendorProfile.phone);
    formData.append("vendor_location", vendorProfile.vendor_location);
    formData.append("profile_setup", "true");
    formData.append(
      "vendor_location_latitude",
      `${vendorProfile.vendor_location_latitude}`
    );
    formData.append(
      "vendor_location_longitude",
      `${vendorProfile.vendor_location_longitude}`
    );
    formData.append("vendor_name", vendorProfile.vendor_name);
    console.log("THis is form data", formData);
    handleProfileSetup(formData);
  }

  useEffect(() => {
    if (watchRole === "Retail") {
      form.setValue("is_retail", true);
      form.setValue("is_resuturant", false);
    } else {
      form.setValue("is_retail", false);
      form.setValue("is_resuturant", true);
    }
  }, [watchRole]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <Fragment>
          <div
            className={cn(
              "md:grid md:grid-cols-1 gap-8 border p-4 rounded-md relative mb-4"
            )}
          >
            <FormField
              control={form.control}
              name={"role"}
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Select Your Role</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      form.setValue("role", e);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Restaurant" disabled>
                        Restaurant
                      </SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchRole === "Retail" &&
              (offersListLoader ? (
                <Skeleton className="w-full h-16 rounded-sm" />
              ) : (
                <FormField
                  control={form.control}
                  name="offerings"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="-mb-1">Offerings</FormLabel>
                      <MultiSelector
                        options={offersList}
                        onValuesChange={field.onChange}
                        values={field.value ? field.value : [""]}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select Addon Category..." />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {offersList &&
                              !!offersList.length &&
                              offersList.map((offers, index) => (
                                <MultiSelectorItem
                                  key={index}
                                  value={offers.id.toString()}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>{offers.name}</span>
                                  </div>
                                </MultiSelectorItem>
                              ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>
        </Fragment>
        <StepperFormSubmit isLoading={handleProfileSetupLoader} />
      </form>
    </Form>
  );
}
