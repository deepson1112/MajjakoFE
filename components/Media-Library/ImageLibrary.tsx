"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/Button";
import { Plus, Trash2, Upload } from "lucide-react";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Skeleton } from "../ui/Skeleton";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { cn } from "@/lib/utils";
import UploadToMediaLibrary from "./UploadToMediaLibrary";
import DeleteMedia from "./DeleteMedia";

interface ImageLibraryProps {
  setImage: UseFormReturn<any>;
  field: string;
  setIsMediaLibraryOpen: Dispatch<SetStateAction<boolean>>;
}

interface RetailVariatoinImage {
  id: number;
  image: string;
  created_date: string;
  disabled: boolean;
}

const MediaLibraryImageSchema = z.object({
  img: z.string().min(1, "Select any image from media library."),
});

type MediaLibraryImageType = z.infer<typeof MediaLibraryImageSchema>;

const ImageLibrary = ({
  setImage,
  field,
  setIsMediaLibraryOpen,
}: ImageLibraryProps) => {
  const form = useForm<MediaLibraryImageType>({
    resolver: zodResolver(MediaLibraryImageSchema),
    defaultValues: {
      img: "",
    },
  });

  const { data: retailImages, isLoading: retailImagesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retails/variations-image/")
        .json<RetailVariatoinImage[]>();
      return response;
    },
    queryKey: ["retail-variations-image"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSelecImage = (media: MediaLibraryImageType) => {
    setImage.setValue(`${field}`, media.img);
    setIsMediaLibraryOpen((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col">
      <UploadToMediaLibrary />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleSelecImage(data))}
          className="space-y-8"
          id="media-library"
        >
          <div className="my-4">
            {retailImagesLoader ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton
                    key={`variation-image-${index}`}
                    className="h-40 rounded-lg"
                  />
                ))}
              </div>
            ) : !!retailImages?.length ? (
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem className="space-y-3 p-2">
                    {/* <FormLabel>Notify me about...</FormLabel> */}
                    <div className="max-h-96 overflow-y-auto my-4 px-6 py-2">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={`${field.value}`}
                          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
                        >
                          {retailImages.map((img) => (
                            <FormItem
                              className="h-40 w-full"
                              key={`retail-image-form-item-${img.id}`}
                            >
                              <FormControl
                                className="sr-only"
                                aria-label="media library image"
                              >
                                <RadioGroupItem value={`${img.image}`} />
                              </FormControl>
                              <FormLabel
                                className={cn(
                                  `${field.value}` === `${img.image}`
                                    ? "outline outline-2 outline-brand outline-offset-2"
                                    : "",
                                  "group relative block h-full w-full font-normal cursor-pointer hover:outline hover:outline-brand hover:outline-offset-2 rounded-lg  border border-gray-200"
                                )}
                              >
                                <Image
                                  alt={`variation-image-id-${img.id}`}
                                  src={img.image}
                                  width={100}
                                  height={100}
                                  className="h-full w-full object-center object-cover"
                                />
                                <DeleteMedia id={img.id} />
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="my-24 text-center text-gray-400 col-span-full">
                <h6 className="font-semibold">
                  No Image in your Media Library.
                </h6>
              </div>
            )}
          </div>

          <Button
            type="button"
            className="max-w-fit"
            form="media-library"
            onClick={form.handleSubmit((data) => handleSelecImage(data))}
          >
            Select
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ImageLibrary;
