"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Upload } from "lucide-react";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validators/user";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { getImageData } from "@/lib/utils";
import { OfferList, UserType } from "@/types";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";
import ListLoader from "@/components/loaders/ListLoader";
import { Button } from "@/components/ui/Button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { EditVendorAddress } from "./EditAddress";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/app/(screen-layout)/(setup-profile)/profile-setup/multiSelect";

export const pofileSetupSchema = z.object({
  first_name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  offerings: z.string().array().optional(),
  cover_image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  profile_image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

const MyBusinessContainer = ({ id, user }: UserType) => {
  const [preview, setPreview] = useState("");
  const [previewCover, setPreviewCover] = useState("");
  const { data: offersList, isLoading: offersListLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/vendor/offerings-list/")
        .json<OfferList[]>();
      return response;
    },
    queryKey: ["offerlists"],
    onError: (error: any) => {
      console.error(error);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: vendor, isLoading: vendorLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get(`/user/user-update/`).json<UserType[]>();

      return response;
    },
    onSuccess: (data) => {
      form.reset({
        email: data[0].email,
        first_name: data[0].user.vendor_name,
        phone_number: data[0].user.vendor_phone || "",
        offerings: (user.offerings || []).map(String),
      });
    },
    queryKey: ["vendor"],
    retry: false,
    refetchOnWindowFocus: false,
  });
  const form = useForm<z.infer<typeof pofileSetupSchema>>({});
  const watchOffers = form.watch("offerings");
  function handleUpdateProfilesFn(value: z.infer<typeof pofileSetupSchema>) {
    const { cover_image, profile_image, first_name } = value;
    const formData = new FormData();
    watchOffers?.map((offer, index) => {
      formData.append(`user.offerings`, `${offer}`);
    });
    formData.append("user.vendor_name", first_name);
    if (cover_image instanceof File) {
      formData.append("user.vendor_cover_image", cover_image);
    }
    if (profile_image instanceof File) {
      formData.append("user.vendor_logo", profile_image);
    }
    if (vendor && vendor[0].id) {
      handleUpdateProfile(formData);
    }
  }
  const { mutate: handleUpdateProfile, isLoading: handleUpdateProfileLoader } =
    useMutation<Response, AxiosError, FormData>({
      mutationFn: async (payload) => {
        const { data } = await axiosInstance.patch(
          `/user/user-update/${vendor && vendor[0]?.id!}/`,
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
        toast.success("Sucessfully Updated Profile");
        queryClient.invalidateQueries("vendor");
      },
      onError: (error) => {
        toast.error("Cannot Upload the Image", {
          description: "Please Try Again",
        });
      },
    });

  useEffect(() => {
    if (user.vendor_cover_image) {
      setPreviewCover(user.vendor_cover_image);
      form.setValue("cover_image", user.vendor_cover_image);
    }
    if (user.vendor_logo) {
      setPreview(user.vendor_logo);
      form.setValue("profile_image", user.vendor_logo);
    }

    return () => {};
  }, [user.vendor_cover_image, user.vendor_logo, form]);

  return vendorLoader ? (
    <MaxWidthWrapper>
      <ListLoader />
    </MaxWidthWrapper>
  ) : (
    <MaxWidthWrapper className="space-y-8">
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(handleUpdateProfilesFn)}
          id="vendor-profile-setting-form"
        >
          <div className="mt-10 bg-white shadow-xltext-gray-900 overflow-hidden">
            <div className="rounded-t-lg h-60 overflow-hidden">
              <div className="w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <FormField
                  control={form.control}
                  name="cover_image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <FormItem>
                        <FormLabel className="group relative cursor-pointer ">
                          <Avatar className="w-full h-64 rounded-none">
                            <AvatarImage
                              src={previewCover}
                              className="object-center object-cover"
                            />
                            <AvatarFallback className="bg-gray-100 rounded-none">
                              {<Icons.coverImage className="h-4 w-4 -mt-8" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className="group-hover:opacity-100 opacity-0 absolute w-full h-full bottom-0 bg-white/75 duration-200 text-black flex justify-center items-center">
                            <span className="-mt-8 font-semibold text-gray-900">
                              Upload Cover Image
                            </span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="hidden"
                            {...rest}
                            accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreviewCover(displayUrl);
                              onChange(
                                event.target.files
                                  ? event.target.files[0]
                                  : null
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white outline outline-gray-300 rounded-full overflow-hidden">
              <FormField
                control={form.control}
                name="profile_image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    <FormItem>
                      <FormLabel className="group relative cursor-pointer">
                        <Avatar className="w-full h-32">
                          <AvatarImage
                            src={preview}
                            className="object-center object-cover"
                          />
                          <AvatarFallback className="bg-gray-100">
                            {<Icons.user className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="group-hover:opacity-100 opacity-0 absolute w-full h-full bottom-0 bg-white/75 duration-200 text-black flex justify-center items-center">
                          <Upload />
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="hidden"
                          {...rest}
                          accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                          onChange={(event) => {
                            const { files, displayUrl } = getImageData(event);
                            setPreview(displayUrl);
                            onChange(
                              event.target.files ? event.target.files[0] : null
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Business name..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Phone number..."
                        {...field}
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
                      <Input disabled placeholder="Email..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {offersListLoader ? (
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
            )}
            <Button
              type="submit"
              form="vendor-profile-setting-form"
              isLoading={handleUpdateProfileLoader}
              disabled={handleUpdateProfileLoader}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>

      <div>
        <div className="border-b py-2 flex items-center justify-between">
          <div>
            <h6 className="uppercase font-bold text-xl">
              Edit Vendor Location
            </h6>
            <p className="text-sm text-gray-500">
              Edit the default location or add new delivery addresses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-4">
          {!user ? (
            <ListLoader />
          ) : !!user ? (
            <>
              <div className="border border-brand p-4 rounded-lg flex items-start justify-between">
                <div>
                  <span className="text-brand text-xs">Default Location</span>
                  <h6 className="line-clamp-3 text-wrap break-words max-w-[12rem] md:max-w-[10rem] lg:max-w-[8rem]">
                    {vendor && vendor.length > 0 ? vendor[0].email : ""}
                  </h6>
                  <p className="text-xs text-gray-600">
                    {vendor && vendor.length > 0
                      ? vendor[0].user.vendor_location
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <EditVendorAddress
                    id={id ?? ""}
                    state={""}
                    city={""}
                    address={user.vendor_location}
                    latitude={user.vendor_location_latitude}
                    longitude={user.vendor_location_longitude}
                  >
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="bg-white h-5 font-medium "
                    >
                      Edit
                    </Button>
                  </EditVendorAddress>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h6>No Vendor Address Created</h6>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default MyBusinessContainer;
