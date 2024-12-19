"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
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
import { VendorTimelineType } from "@/types";
import { DepartmentType } from "@/lib/validators/fooditems";

interface HoursScheduleProps<T extends FieldValues> {
  timelines: VendorTimelineType[];
  form: UseFormReturn<T>;
}

export function HoursSchedule<T extends FieldValues>({
  timelines,
  form,
}: HoursScheduleProps<T>) {
  return (
    <div>
      <FormField
        control={form.control}
        name={"hours_schedule" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Timelines</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? timelines.find(
                          (timeline) => timeline.id === field.value
                        )?.hour_name
                      : "Select timeline"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
                  <CommandInput placeholder="Search timeline..." />
                  <CommandEmpty>No timeline found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {timelines.map((timeline) => (
                        <CommandItem
                          value={timeline.hour_name}
                          key={timeline.id}
                          onSelect={() => {
                            form.setValue(
                              "hours_schedule" as Path<T>,

                              timeline.id as any
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              timeline.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {timeline.hour_name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              This is selection will enable your item availability
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
