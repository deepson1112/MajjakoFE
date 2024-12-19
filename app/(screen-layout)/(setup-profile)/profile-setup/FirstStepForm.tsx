"use client";

import parsePhoneNumber from "libphonenumber-js";
import { useStepper } from "@/components/stepper";
import { Form } from "@/components/ui/Form";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validators/user";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { getImageData } from "@/lib/utils";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { StepperFormActions } from "./StepForm";
import { ProfileSchema } from "@/lib/validators/profilesteps";

const FirstFormSchema = z
  .object({
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

    phone: z.string().min(4, "Phone number is required!"),
    description: z.string().optional(),
    vendor_name: z.string().min(1, "Name is required"),
  })
  .superRefine((data, ctx) => {
    const { phone } = data;
    try {
      const phoneNumber = parsePhoneNumber(phone, {
        defaultCountry: "NP",
      });

      if (!phoneNumber?.isValid()) {
        ctx.addIssue({
          path: ["phone"],
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number.",
        });
      }
    } catch (error) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number format.",
      });
    }
  });

interface FirstStepFormProps {
  vendorProfile: ProfileSchema;
  setVendorProfile: Dispatch<SetStateAction<ProfileSchema>>;
}

export function FirstStepForm({
  setVendorProfile,
  vendorProfile,
}: FirstStepFormProps) {
  const [preview, setPreview] = useState(vendorProfile.profile_image_url);
  const [previewCover, setPreviewCover] = useState(
    vendorProfile.cover_image_url
  );

  const { nextStep } = useStepper();

  console.log("vendor Profile", vendorProfile);

  const form = useForm<z.infer<typeof FirstFormSchema>>({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      cover_image: vendorProfile.cover_image,
      description: vendorProfile.description || "",
      phone: vendorProfile.phone,
      profile_image: vendorProfile.profile_image,
      vendor_name: vendorProfile.vendor_name,
    },
  });

  function onSubmit(_data: z.infer<typeof FirstFormSchema>) {
    console.log("First step submitted!", _data);
    setVendorProfile({
      ...vendorProfile,
      vendor_name: _data.vendor_name,
      cover_image: _data.cover_image,
      profile_image: _data.profile_image,
      description: _data.description,
      phone: _data.phone,
      profile_image_url: preview,
      cover_image_url: previewCover,
    });
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <React.Fragment>
          <div className=" mt-10 bg-white shadow-xltext-gray-900 overflow-hidden">
            <div className="rounded-t-lg h-32 overflow-hidden">
              <div className="w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <FormField
                  control={form.control}
                  name="cover_image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <FormItem>
                        <FormLabel className="group relative cursor-pointer ">
                          <Avatar className="w-full h-32 rounded-none">
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
          </div>
          <div className="flex flex-col md:flex-row md:items-stretch items-center w-full gap-4 py-4 ">
            <FormField
              control={form.control}
              name={"vendor_name"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="bg-gray-100 border-none"
                        placeholder="Company Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"phone"}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Contact/Bussiness Contact Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <div className="bg-gray-500 text-white h-10 flex items-center justify-center px-2 rounded-l-lg font-medium">
                          +977
                        </div>
                        <Input
                          {...field}
                          type="text"
                          className="bg-gray-100 border-none rounded-l-none"
                          placeholder="Phone Number"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Business Description{" "}
                    <span className="text-brand">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="About your Business..."
                      className="resize-none bg-gray-100 border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </React.Fragment>
        {!!form.formState.errors.cover_image ||
        !!form.formState.errors.profile_image ? (
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
              <span className="font-medium">Image required:</span>Vendor profile
              image and cover image is required
            </p>
          </div>
        ) : null}

        <StepperFormActions />
      </form>
    </Form>
  );
}
