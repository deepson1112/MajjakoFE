"use client";

import React, { useState } from "react";
import { TimePickerDemo } from "./time-picker";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import * as z from "zod";
import ViewTimeline from "./ViewTimeline";
import { queryClient } from "@/lib/queryClient";
import MultiSelectDropdown from "@/components/MultiSelectDropDown";
import { WEEK_DAYS } from "@/configs/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { timelineSchema } from "@/lib/validators/timeline";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { toast } from "sonner";

interface TimelineType {
  hour_name: string;
  starting_hours: string;
  ending_hours: string;
  week_days: number[];
}

interface TimeLineFormProps {
  vendor_id: string;
}

export const timeExtract: (datetime: Date) => string = (dateTime) => {
  const hours = dateTime.getUTCHours().toString().padStart(2, "0");
  const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getUTCSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const TimeLineForm = ({ vendor_id }: TimeLineFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const form = useForm<z.infer<typeof timelineSchema>>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      hour_name: "",
      starting_hours: "",
      ending_hours: "",
      week_days: [],
    },
  });

  const { mutate: addLocationFn, isLoading: addLocationLoader } = useMutation({
    mutationFn: async (data: TimelineType) => {
      const response = await api()
        .post(data, `/vendor/vendor-timelines/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully addded timeline");
      form.reset();
      setSelectedOptions([]);
      queryClient.invalidateQueries("vendor-timelines");
    },
    onError: (error: any) => {
      toast.error("Unable to add timeline", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const addNewTimeLine = (data: { hour_name: string }) => {
    const payload = {
      hour_name: data.hour_name,
      starting_hours: timeExtract(startDate ? startDate : new Date()),
      ending_hours: timeExtract(endDate ? endDate : new Date()),
      vender: vendor_id,
      week_days: selectedOptions,
    };

    addLocationFn(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addNewTimeLine)}>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <div className="space-y-4 mb-6">
              <h6 className="text-xl font-medium">Timeline Name</h6>
              <FormField
                control={form.control}
                name="hour_name"
                render={() => {
                  return (
                    <FormItem>
                      <Input
                        className="bg-gray-100 border-none max-w-sm"
                        placeholder="Enter the name for the timeline"
                        {...form.register("hour_name")}
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="space-y-4 mb-6">
              <FormField
                control={form.control}
                name="week_days"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <MultiSelectDropdown
                        formFieldName={"weeks"}
                        options={WEEK_DAYS}
                        onChange={field.onChange}
                        prompt="Select the available days"
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="space-y-4 mb-6">
              <h6 className="text-xl font-medium">Starting Hour</h6>
              {/* @ts-ignore */}
              <TimePickerDemo date={startDate} setDate={setStartDate} />
            </div>
            <div className="space-y-4 mb-6">
              <h6 className="text-xl font-medium">Closing Hour</h6>
              {/* @ts-ignore */}
              <TimePickerDemo date={endDate} setDate={setEndDate} />
            </div>
          </div>

          <div className="flex-1 md:border-l px-4">
            <ViewTimeline />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-gray-900 hover:bg-gray-700"
          isLoading={addLocationLoader}
          disabled={addLocationLoader}
        >
          Create Timeline
        </Button>
      </form>
    </Form>
  );
};

export default TimeLineForm;
