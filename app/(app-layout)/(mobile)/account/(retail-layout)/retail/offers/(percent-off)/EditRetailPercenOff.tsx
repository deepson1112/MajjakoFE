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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PercentOffType, percentOffSchema } from "@/lib/validators/offers";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useMutation } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useState } from "react";
import { getImageData, ToUtc } from "@/lib/utils";
import Image from "next/image";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

interface EditBuyOneGetOneProps {
  offer_id: string | number;
  items: PercentOffType;
}

export function EditRetailPercentOff({
  offer_id,
  items,
}: EditBuyOneGetOneProps) {
  const [preview, setPreview] = useState(items.discount_banner);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Itdms image", items.image);

  const form = useForm<PercentOffType>({
    resolver: zodResolver(percentOffSchema),
    defaultValues: {
      offer_name: items.offer_name,
      discount_percentages: items.discount_percentages,
      minimum_spend_amount: items.minimum_spend_amount,
      maximum_redeem_value: items.maximum_redeem_value,
      audience: items.audience,
      end_date: items.end_date,
      start_date: items.start_date,
      image: "",
    },
  });

  const {
    mutate: handleUpdatePercentOffFn,
    isLoading: handleUpdatePercentOffLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.patch(
        `/retail-offers/retail-store-offer/${offer_id}/`,
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
      toast.success("Sucessfully edited the offer");
      queryClient.invalidateQueries("retail-percent-off");
    },
    onError: (error: any) => {
      toast.error("Unable to edit the offer", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleUpdatePercentOff = (data: PercentOffType) => {
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
    handleUpdatePercentOffFn(formData);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[1100px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Percent Off</DialogTitle>
          <DialogDescription>
            Set a storewide percent off offer
          </DialogDescription>
        </DialogHeader>
        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className="w-full max-h-[35rem] overflow-y-auto"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatePercentOff)}>
              <div className="flex">
                <div className="flex-1">
                  <Accordion
                    type="single"
                    defaultValue="item-1"
                    collapsible
                    className="w-full"
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
                                <FormLabel>Amount</FormLabel>
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
                      isLoading={handleUpdatePercentOffLoader}
                      disabled={handleUpdatePercentOffLoader}
                    >
                      Save
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
                                      alt="adf"
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
                                const { files, displayUrl } =
                                  getImageData(event);
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
                          <div className="flex gap-3">
                            <Button>Add Photo</Button>
                            <Button variant={"subtle"} disabled>
                              Remove Photo
                            </Button>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </figure>
              </div>
            </form>
          </Form>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
