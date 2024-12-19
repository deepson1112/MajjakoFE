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
import { Category } from "@/lib/validators/fooditems";

export interface DepartmentComboboxFormProps {
  age_restriction: boolean;
  department_name: string;
  department_slug: string;
  hours_schedule?: string;
  id: number;
  tax_exempt: boolean;
  tax_rate: number;
}

interface PageProps {
  data: DepartmentComboboxFormProps[];
  form: UseFormReturn<Category>;
}

export function DepartmentComboBox({ data, form }: PageProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Department</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find(
                          (department) =>
                            `${department.id}` === `${field.value}`
                        )?.department_name
                      : "Select Department"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search department..."
                    className="h-9"
                  />
                  <CommandEmpty>No department found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {!!data.length &&
                        data.map((department) => (
                          <CommandItem
                            value={department.department_name}
                            key={department.id}
                            onSelect={() => {
                              form.setValue("department", `${department.id}`);
                            }}
                          >
                            {department.department_name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                `${department.id}` === field.value
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
              A Department must be selected before creating a Category.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
