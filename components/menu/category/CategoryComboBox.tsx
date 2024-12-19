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
import { SaveOnMenuItemType } from "@/lib/validators/offers";
import { Category } from "@/lib/validators/fooditems";

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
  data: Category[];
  form: UseFormReturn<SaveOnMenuItemType>;
}

export function CategoryComboBox({ data, form }: PageProps) {
  console.log("This is the cart data", data);

  return (
    <>
      <FormField
        control={form.control}
        name="entireCustomization.0.category"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="subtle"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find(
                          (department) =>
                            `${department.id}` === `${field.value}`
                        )?.category_name
                      : "Select Sub-Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                  />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {data &&
                        !!data.length &&
                        data.map((department) => (
                          <CommandItem
                            value={department.id as unknown as string}
                            key={department.id}
                            onSelect={() => {
                              form.setValue(
                                "entireCustomization.0.category",
                                department.id
                              );
                            }}
                          >
                            {department.category_name}
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
            <FormDescription>
              The offer will be applied to all the foods under the category.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
