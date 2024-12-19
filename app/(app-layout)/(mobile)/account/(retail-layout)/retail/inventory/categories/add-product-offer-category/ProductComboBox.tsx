"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Control,
  FormProps,
  FormProviderProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";
import { foodItemResponse } from "@/lib/validators/fooditems";
import { BuyOneGetOneType } from "@/lib/validators/offers";

export interface ComboboxFormProps {
  age_restriction: boolean;
  department_name: string;
  department_slug: string;
  hours_schedule?: string;
  id: number;
  tax_exempt: boolean;
  tax_rate: number;
}

interface PageProps {
  data: foodItemResponse[];
  form: UseFormReturn<BuyOneGetOneType>;
  index: number;
}

export function ProductComboBox({ data, form, index }: PageProps) {
  return (
    <>
      <FormField
        control={form.control}
        name={`item.${index}`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="subtle"
                    role="combobox"
                    className={cn(
                      "w-full justify-between bg-gray-100",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find(
                          (department) =>
                            `${department.id}` === `${field.value}`
                        )?.food_title
                      : "Select item..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search item..." className="h-9" />
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {!!data.length &&
                        data.map((department) => (
                          <CommandItem
                            value={`${department.id}`}
                            key={department.id}
                            onSelect={() => {
                              form.setValue(`item.${index}`, department.id);
                            }}
                          >
                            {department.food_title}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                `${department.id}` === `${field.value}`
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}