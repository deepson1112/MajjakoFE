"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Control,
  FormProps,
  FormProviderProps,
  useForm,
  UseFormReturn,
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

import { FoodAddonType } from "../../menu-builder/food-menus/customization/columns";

const FormSchema = z.object({
  department: z.string({
    required_error: "Please select a department.",
  }),
});

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
  data: FoodAddonType[];
  form: UseFormReturn<any>;
  showLabel?: boolean;
}

export function AddonsComboBoxForm({
  data,
  form,
  showLabel = true,
}: PageProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="customization"
        render={({ field }) => (
          <FormItem className="flex flex-col px-3">
            {showLabel && <FormLabel>Secondary Customization</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl className="bg-gray-100 border-none">
                  <Button
                    variant="subtle"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find((addons) => `${addons.id}` === field.value)
                          ?.add_on_category
                      : "Select Item"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search addons..."
                    className="h-9"
                  />
                  <CommandEmpty>No addons found.</CommandEmpty>
                  <CommandGroup className="max-h-40 overflow-y-auto">
                    <CommandList>
                      {!!data.length &&
                        data.map((addons) => (
                          <CommandItem
                            value={`${addons.id}`}
                            key={addons.id}
                            onSelect={(value: string) => {
                              form.setValue("customization", `${addons.id}`);
                              !!value &&
                                form.setValue("secondary_customization", true);
                            }}
                          >
                            {addons.add_on_category}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                `${addons.id}` === field.value
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
            {/* <FormDescription>
              A addons must be selected before creating a Category.
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
