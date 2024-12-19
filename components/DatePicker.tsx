"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

interface DatePickerProps<T extends FieldValues> {
  className?: React.HTMLAttributes<HTMLDivElement>;
  form: UseFormReturn<T>;
}

export function DatePicker<T extends FieldValues>({
  form,
}: DatePickerProps<T>) {
  return (
    <div className="px-3 flex flex-col md:flex-row gap-6">
      <FormField
        control={form.control}
        name={"start_date" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-600">Starting Date</FormLabel>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"subtle"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
                />
              </PopoverContent>
            </Popover>
            <FormDescription>Start Date for the Offer</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"end_date" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-600">Ending Date</FormLabel>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"subtle"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
                />
              </PopoverContent>
            </Popover>
            <FormDescription>End Date for the Offer</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
