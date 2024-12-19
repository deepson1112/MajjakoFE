"use client";

import { Button } from "@/components/ui/Button";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PercentOffType, percentOffSchema } from "@/lib/validators/offers";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { addDays } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getImageData, ToUtc } from "@/lib/utils";
import { useState } from "react";
import { queryClient } from "@/lib/queryClient";
import Image from "next/image";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";

export function PercentOff() {
  const [preview, setPreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<PercentOffType>({
    resolver: zodResolver(percentOffSchema),
    defaultValues: {
      offer_name: "",
      discount_percentages: 30,
      minimum_spend_amount: 15,
      maximum_redeem_value: undefined,
      audience: "All Customer",
      end_date: addDays(new Date(), 7),
      start_date: new Date(),
      image: "",
    },
  });

  console.log("From Data", form.watch("image"));

  const { mutate: handleNewOfferFn, isLoading: addPercentOfferLoader } =
    useMutation<unknown, AxiosError, FormData>({
      mutationFn: async (payload) => {
        const { data } = await axiosInstance.post(
          "/retail-offers/retail-store-offer/",
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
        queryClient.invalidateQueries("percent-off");
        toast.success("Sucessfully added Offer!");
        form.reset({
          offer_name: "",
          discount_percentages: 30,
          minimum_spend_amount: 15,
          maximum_redeem_value: undefined,
          audience: "All Customer",
          end_date: addDays(new Date(), 7),
          start_date: new Date(),
          image: "",
        });
      },
      onError: (error: any) => {
        toast.error("Failed to add offer", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const handleNewOffer = (data: PercentOffType) => {
    const formData = new FormData();
    formData.append("audience", data.audience);
    formData.append("discount_percentages", `${data.discount_percentages}`);
    formData.append("maximum_redeem_value", `${data.maximum_redeem_value}`);
    formData.append("minimum_spend_amount", `${data.minimum_spend_amount}`);
    formData.append("offer_name", data.offer_name);
    formData.append("start_date", `${ToUtc(`${data.start_date}`)}`);
    formData.append("end_date", `${ToUtc(`${data.end_date}`)}`);
    if (data.image instanceof File) {
      formData.append("discount_banner", data.image);
    }
    handleNewOfferFn(formData);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div className="border-2 border-gray-300 bg-[url('/percent-off.jpg')] bg-center bg-cover rounded-lg overflow-hidden cursor-pointer hover:border-gray-600">
          <div className="w-full h-full px-4 py-8 backdrop-brightness-50">
            <h6 className="text-xl font-bold text-white">Percent Off</h6>
            <p className="text-xs text-white">
              Set a storewide percent off offer.
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[1100px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNewOffer)}>
            <DialogHeader>
              <DialogTitle>Percent Off</DialogTitle>
              <DialogDescription>
                Set a storewide percent off offer
              </DialogDescription>
            </DialogHeader>
            <div className="flex">
              <div className="flex-1">
                <Accordion
                  type="single"
                  defaultValue="item-1"
                  collapsible
                  className="w-full max-h-[35rem] overflow-y-auto"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <h6>Offer</h6>
                      <p className="text-xs">
                        Set the offer amount and requirements
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="offer_name"
                          render={({ field }) => {
                            return (
                              <FormItem className="px-3">
                                <FormLabel>Offer name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Title of the offer"
                                    type="text"
                                    {...field}
                                    className="bg-gray-100 border-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="discount_percentages"
                          render={({ field }) => (
                            <FormItem className="px-3">
                              <FormLabel>Discount Percentage</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={`${field.value}`}
                              >
                                <FormControl className="bg-gray-100 border-none">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose amount the user can select the addon" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={"20"}>20%</SelectItem>
                                  <SelectItem value={"30"}>
                                    30%{" "}
                                    <span className="ml-2 text-xs font-medium text-green-500 border border-green-500 px-2 rounded-full">
                                      Recommended
                                    </span>{" "}
                                  </SelectItem>
                                  <SelectItem value={"40"}>40%</SelectItem>
                                  <SelectItem value={"50"}>50%</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="minimum_spend_amount"
                          render={({ field }) => (
                            <FormItem className="px-3">
                              <FormLabel>Minimum Spend</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={`${field.value}`}
                              >
                                <FormControl className="bg-gray-100 border-none">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose amount the user can select the addon" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={"10"}>10%</SelectItem>
                                  <SelectItem value={"15"}>
                                    15%{" "}
                                    <span className="ml-2 font-medium text-xs text-green-500 border border-green-500 px-2 rounded-full">
                                      Recommended
                                    </span>{" "}
                                  </SelectItem>
                                  <SelectItem value={"20"}>20%</SelectItem>
                                  <SelectItem value={"25"}>25%</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="maximum_redeem_value"
                          render={({ field }) => {
                            return (
                              <FormItem className="px-3">
                                <FormLabel>
                                  Maximum redeem value (optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Redeem Value"
                                    type="text"
                                    {...field}
                                    className="bg-gray-100 border-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <h6>Audience</h6>
                      <p className="text-xs">
                        Select which customers will see your offer
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="audience"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="All Customer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    All customers
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="All Active Customer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    All Active customers
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="New Customer" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    New customers only
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <h6>Dates</h6>
                      <p className="text-xs">
                        Select the dates your off will run for.
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <DatePicker<PercentOffType> form={form} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <DialogFooter className="py-2">
                  <Button
                    type="submit"
                    isLoading={addPercentOfferLoader}
                    disabled={addPercentOfferLoader}
                  >
                    Create Offer
                  </Button>
                </DialogFooter>
              </div>
              <figure className="hidden max-w-sm w-full bg-gray-100 rounded-lg mx-2 md:grid place-items-center">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="flex flex-col">
                      <div>
                        <FormLabel>
                          <Avatar className="min-w-[270px] w-full h-[167px] rounded-lg">
                            <AvatarImage
                              src={preview}
                              className="object-center object-cover"
                            />
                            <AvatarFallback className="rounded-lg bg-gray-100">
                              <div
                                className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                                id="dropzone"
                              >
                                <div className="text-center">
                                  <Image
                                    className="mx-auto h-12 w-12"
                                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                    height={1000}
                                    width={1000}
                                    alt="adsf"
                                  />
                                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer"
                                    >
                                      <span>Drag and drop</span>
                                      <span className="text-brand">
                                        {" "}
                                        or browse
                                      </span>
                                      <span>to upload</span>
                                    </label>
                                  </h3>
                                  <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG, GIF{" "}
                                    <span className="text-brand">
                                      up to 10MB
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </AvatarFallback>
                          </Avatar>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="sr-only"
                            {...rest}
                            accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreview(displayUrl);
                              onChange(
                                event.target.files
                                  ? event.target.files[0]
                                  : null
                              );
                            }}
                          />
                        </FormControl>
                      </div>

                      <div>
                        <FormDescription className="mb-4 max-w-xs">
                          Uploading offer images shows the user know about the
                          offer in details
                        </FormDescription>
                        {/* <div className="flex gap-3">
                          <Button>Add Photo</Button>
                          <Button variant={"subtle"} disabled>
                            Remove Photo
                          </Button>
                        </div> */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </figure>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
