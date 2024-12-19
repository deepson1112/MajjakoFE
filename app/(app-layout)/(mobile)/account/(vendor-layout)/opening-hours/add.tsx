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
  FormDescription,
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
import useUser from "@/lib/useUser";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
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
export function AddOpeningHour() {
  const { user } = useUser();
  const form = useForm<OpeningHrType>({
    resolver: zodResolver(OpeningHrSchema),

    defaultValues: {
      day: "1",
      from_hour: "12:00 AM",
      to_hour: "11:30 PM",
      is_closed: false,
      // @ts-ignore
      vendor: user ? parseInt(user.vendor_id) : 0,
    },
  });
  const { mutate: handleAddOpeningHr, isLoading: handleAddOpeningHrLoader } =
    useMutation<Response, AxiosError, OpeningHrType>({
      mutationFn: async (data) => {
        const response = await axiosInstance.post("/vendor/opening-hours/", {
          vendor: data.vendor,
          from_hour: data.from_hour,
          to_hour: data.to_hour,
          day: parseInt(data.day!),
          is_closed: data.is_closed,
        });
        return response.data;
      },
      onSuccess: () => {
        toast.success("Opening Hour has been set Sucessfully");
      },
      onError: (error) => {
        toast.error("Failed to set Opening Hour!!", {
          description: "Please try again later",
        });
      },
    });
  const handleOpeningHrMutation = (data: OpeningHrType) => {
    handleAddOpeningHr({ ...data });
  };
  return (
    <Dialog>
      <DialogTrigger className={"cursor-pointer"} asChild>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white">
          Add Opening Hour
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[750px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Your Restaurant Opening & Closing Time</DialogTitle>
          <DialogDescription>
            Set a opening & closing hour of your restaurant
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
              <div className="space-y-4 px-4 mb-6">
                <FormField
                  control={form.control}
                  name="is_closed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel> Remains Closed Today?</FormLabel>
                        <FormDescription>
                          Does Your Restaurant Remains Closed on Selected Day?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4 px-4 mb-6">
              <Button
                type="submit"
                className="w-32"
                disabled={handleAddOpeningHrLoader}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
