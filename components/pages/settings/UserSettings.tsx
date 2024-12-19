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
import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validators/user";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { UserEntity, UserEntityMe } from "@/types/models";
import { queryClient } from "@/lib/queryClient";
import { getImageData } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { api } from "@/lib/fetcher";
import UserPlaceComponent from "@/components/UsePlaceAutoComplete";
import { toast } from "sonner";
import { UserType } from "@/types";

export const pofileSetupSchema = z.object({
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

const UserSettings = ({
  id,
  cover_photo,
  profile_id,
  profile_picture,
}: UserEntityMe) => {
  const [preview, setPreview] = useState("");
  const [previewCover, setPreviewCover] = useState("");

  const { data: vendor, isLoading: vendorLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get(`/user/user-update/`).json<UserType[]>();

      return response;
    },
    queryKey: ["vendor"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log("User", vendor);

  const { data: user, isLoading: userLoader } = useQuery<UserEntity>({
    queryFn: async () => {
      const response = await api().get(`/user/user-location/${id}`).json();
      if (response) {
        return response as UserEntity;
      }
      return {} as UserEntity;
    },
    queryKey: [`user-details-${id}`, id],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof pofileSetupSchema>>({});

  function handleUpdateProfilesFn(value: z.infer<typeof pofileSetupSchema>) {
    const { cover_image, profile_image } = value;
    const formData = new FormData();
    if (cover_image instanceof File) {
      formData.append("cover_photo", cover_image);
    }
    if (profile_image instanceof File) {
      formData.append("profile_picture", profile_image);
    }
    handleUpdateProfile(formData);
  }
  const { mutate: handleUpdateProfile, isLoading } = useMutation<
    Response,
    AxiosError,
    FormData
  >({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.patch(
        `/user/user-profile/${profile_id}/`,
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
      toast.success("Sucessfully Added Pictures", {
        description: "The photos were sucessfully added to the profile",
      });
      queryClient.invalidateQueries("vendor-department");
    },
    onError: (error) => {
      toast.error("Cannot Upload the Image", {
        description: "Please Try Again",
      });
    },
  });

  useEffect(() => {
    if (cover_photo) {
      setPreviewCover(cover_photo);
      form.setValue("cover_image", cover_photo);
    }
    if (profile_picture) {
      setPreview(profile_picture);
      form.setValue("profile_image", profile_picture);
    }

    return () => {};
  }, [cover_photo, profile_picture, form]);
  return (
    <React.Fragment>
      <h4 className="font-bold text-center my-6">
        Edit <span>{user ? user.first_name + "'s" : "Your"}</span> profile
      </h4>

      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(handleUpdateProfilesFn)}
        >
          <div className="max-w-2xl mx-4 sm:max-w-3xl lg:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 bg-white shadow-xltext-gray-900 overflow-hidden">
            <div className="rounded-t-lg h-32 overflow-hidden">
              <div className="w-full h-64 border-2 border-gray-300 cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="w-full h-32 rounded-none"></div>
              </div>
            </div>

            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
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

            <div className="text-center mt-2">
              <h2 className="font-semibold">Profile Picture</h2>
              <p className="text-gray-500">Edit Profile</p>
            </div>
            <div className="p-4 border-t mx-8 flex justify-end">
              <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                Save Images
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="max-w-2xl mx-4 sm:max-w-3xl lg:max-w-5xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 bg-white shadow-xltext-gray-900 overflow-hidden">
        {!!id ? (
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Suspense fallback={<div>Loagin...</div>}>
                <div className="space-y-1">
                  <UserPlaceComponent
                    user_prev_location={user ? user.address : undefined}
                    user_id={id!.toString()}
                  />
                </div>
              </Suspense>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default UserSettings;
