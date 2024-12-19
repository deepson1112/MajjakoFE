"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
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
import { OpeningHrType } from "@/lib/validators/openinghrs";

interface HoursScheduleProps {
  availableHours: string[];
  form: UseFormReturn<OpeningHrType>;
}

export function OpeningHoursSchedule({
  availableHours,
  form,
}: HoursScheduleProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name={"from_hour"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Opening Time</FormLabel>
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
                      ? availableHours.find((time) => time === field.value)
                      : "Select Available Time..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
                  <CommandInput placeholder="Search For Available..." />
                  <CommandEmpty>No Available Time found.</CommandEmpty>
                  <CommandGroup className="h-52 overflow-y-auto">
                    <CommandList>
                      {availableHours.map((time, index) => (
                        <CommandItem
                          value={time}
                          key={index}
                          onSelect={() => {
                            form.setValue("from_hour", time as any);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              time === field.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {time}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>Select Restaurant Opening Hour</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function ClosingHoursSchedule({
  availableHours,
  form,
}: HoursScheduleProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name={"to_hour"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Closing Time</FormLabel>
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
                      ? availableHours.find((time) => time === field.value)
                      : "Select Available Time..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
                  <CommandInput placeholder="Search For Available..." />
                  <CommandEmpty>No Available Time found.</CommandEmpty>
                  <CommandGroup className="h-52 overflow-y-auto">
                    <CommandList>
                      {availableHours.map((time, index) => (
                        <CommandItem
                          value={time}
                          key={index}
                          onSelect={() => {
                            form.setValue("to_hour", time as any);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              time === field.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {time}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>Select Restaurant Closing Time</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
