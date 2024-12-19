import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import useUser from "@/lib/useUser";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserProfileImage from "./UserProfileImage";
import {
  UserProfileSetup,
  userProfileSetupSchema,
} from "@/lib/validators/profile-setup";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderLocationAutoComplete from "@/app/(app-layout)/(mobile)/checkout/OrderLocation/OrderLocationAutoComplete";
import { AddressReturnValue } from "@/types";
import { Button } from "@/components/ui/Button";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ChevronRight } from "lucide-react";
import { api } from "@/lib/fetcher";
import { SignOutModal } from "@/components/SignOutModal";

const UserProfileSetupForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const form = useForm<UserProfileSetup>({
    resolver: zodResolver(userProfileSetupSchema),
    defaultValues: {
      address: "",
      email: "",
      first_name: "",
      last_name: "",
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
    mutate: handleSetUserProfileFn,
    isLoading: handleSetUserProfileLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.patch(
        `/user/user-profile/${user?.profile_id}/`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    onSuccess: (data) => {
      toast.success("Successfully Updated Profile");
      if (!data.already_verified) {
        router.push(`/verify-phone-number/`);
      }
    },
    onError: (error: any) => {
      toast.error("Something went wrong.", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const {} = useMutation({
    mutationFn: async () => {
      const response = await api().post(undefined);
    },
  });

  const handleSetUserProfile = (data: UserProfileSetup) => {
    const formData = new FormData();
    formData.append(`address`, data.address);
    formData.append(`city`, data.city);
    formData.append(`country`, data.country);
    formData.append(`email`, data.email);
    formData.append(`first_name`, data.first_name);
    formData.append(`last_name`, data.last_name);
    formData.append(`latitude`, data.latitude);
    formData.append(`longitude`, data.longitude);
    formData.append(`phone_number`, `${data.phone_number}`);
    formData.append(`pin_code`, data.pin_code);
    formData.append(`state`, data.state);
    if (data.profile_image instanceof File) {
      formData.append(`profile_image`, data.profile_image);
    }
    formData.append(`nation`, data.nation);

    handleSetUserProfileFn(formData);
  };

  useEffect(() => {
    form.reset({
      address: user?.address || "",
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone_number: user?.phone_number || "",
      city: user?.city || "",
      country: user?.country || "",
      latitude: user?.latitude || "",
      longitude: user?.longitude || "",
      pin_code: user?.pin_code || "",
      state: user?.state || "",
      nation: "NP",
    });
  }, [user]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleSetUserProfile(data))}
          className="py-6"
          autoComplete="one-time-code"
        >
          <UserProfileImage form={form} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2 my-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      autoComplete="one-time-code"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="last Name"
                      {...field}
                      autoComplete="one-time-code"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      autoComplete="one-time-code"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              {/* <FormLabel>Address</FormLabel> */}
              <OrderLocationAutoComplete
                onPlaceSelect={handlePlaceSelect}
                defaultAddress={user?.address || ""}
                field="address"
              />
            </div>

            <div className="space-y-2">
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
                          <SelectItem value="NP">Nepal (NP)</SelectItem>

                          <SelectItem value="US">USA (US)</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <span className="h-full w-[5px] bg-gray-900"></span>

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="rounded-l-none border border-l border-gray-600"
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
          </div>
          <div className="flex items-center gap-4 w-full max-w-fit ml-auto ">
            <Button
              type="button"
              variant={"subtle"}
              onClick={(prev) => setIsCancelModalOpen(true)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={handleSetUserProfileLoader}
              disabled={handleSetUserProfileLoader}
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>

      <SignOutModal
        contents={"You sure want to cancel profile setup process."}
        isSignOutModalOpen={isCancelModalOpen}
        setIsSignOutModalOpen={setIsCancelModalOpen}
      />
    </>
  );
};

export default UserProfileSetupForm;
