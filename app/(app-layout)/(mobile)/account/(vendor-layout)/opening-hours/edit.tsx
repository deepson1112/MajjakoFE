"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  ClosingHoursSchedule,
  OpeningHoursSchedule,
} from "@/components/openingHrTime";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { WEEK_DAYS } from "@/configs/constants";
import { axiosInstance } from "@/lib/axiosInstance";
import { Skeleton } from "@/components/ui/Skeleton";
import { availableTimeEnum } from "@/lib/Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpeningHrSchema, OpeningHrType } from "@/lib/validators/openinghrs";
import { toast } from "sonner";
/**
 *
 * @param -No Params Required
 * @returns -JSX Component to Add Opening Hour of restaurnt
 */
export function EditOpeningHour({
  title,
  day,
  vendor,
  from_hour,
  id,
  to_hour,
  is_closed,
}: OpeningHrType) {
  const form = useForm<OpeningHrType>({
    resolver: zodResolver(OpeningHrSchema),
    defaultValues: {
      day: day!,
      from_hour: from_hour,
      to_hour: to_hour,
      is_closed: is_closed,
      vendor: vendor,
    },
  });
  const { mutate: handleAddOpeningHr, isLoading } = useMutation<
    Response,
    AxiosError,
    OpeningHrType
  >({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(
        `/vendor/opening-hours/${id}/`,
        {
          vendor: data.vendor,
          from_hour: data.from_hour,
          to_hour: data.to_hour,
          day: parseInt(data.day!),
          is_closed: data.is_closed,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Opening Hour has been Updated Sucessfully");
    },
    onError: (error) => {
      toast.error("Failed to Updated Opening Hour!!", {
        description: "Please try again later",
      });
    },
  });
  const handleOpeningHrMutation = (data: OpeningHrType) => {
    handleAddOpeningHr({ ...data });
    console.log("Data Items", data);
  };
  return (
    <Dialog>
      <DialogTrigger className={"cursor-pointer"} asChild>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {!closed && (
            <p className="text-gray-700">
              {from_hour} - {to_hour}
            </p>
          )}
          {is_closed && <p className="text-gray-700">Closed</p>}
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[750px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            Edit Your Restaurant Opening & Closing for {title}
          </DialogTitle>
          <DialogDescription>
            Set a opening & closing hour of your restaurant for {title}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOpeningHrMutation)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-2">
              <div className="space-y-4 px-4 mb-6">
                {!availableTimeEnum ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : availableTimeEnum?.length ? (
                  <OpeningHoursSchedule
                    form={form}
                    availableHours={availableTimeEnum}
                  />
                ) : null}
              </div>
              <div className="space-y-4 px-4 mb-6">
                {!availableTimeEnum ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : availableTimeEnum?.length ? (
                  <ClosingHoursSchedule
                    form={form}
                    availableHours={availableTimeEnum}
                  />
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-2">
              <div className="space-y-4 px-4 mb-6">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel>Opening Day</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          //@ts-ignore
                          form.setValue("day", e);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WEEK_DAYS &&
                            WEEK_DAYS.map((days: String, index: number) => (
                              <SelectItem
                                key={index}
                                value={(index + 1).toString()}
                              >
                                {days}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4 px-4 mb-6">
              <Button type="submit" className="w-32" disabled={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
