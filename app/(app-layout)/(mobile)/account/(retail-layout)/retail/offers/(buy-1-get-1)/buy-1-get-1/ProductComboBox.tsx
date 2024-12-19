"use client";

import { ChevronsUpDown, Check } from "lucide-react";
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
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { BuyOneGetOneType } from "@/lib/validators/offers";
import { RetailItems } from "@/types/retail";

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
  data: RetailItems[];
  form: UseFormReturn<BuyOneGetOneType>;
  index: number;
}

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export function ProductComboboxForm({ data, form, index }: PageProps) {
  return (
    <>
      <FormField
        control={form.control}
        name={`item.${index}`}
        render={({ field }) => (
          // <FormItem className="flex flex-col">
          //   <Popover modal={true}>
          //     <PopoverTrigger asChild>
          //       <FormControl>
          //         <Button
          //           variant="subtle"
          //           role="combobox"
          //           className={cn(
          //             "w-full justify-between bg-gray-100",
          //             !field.value && "text-muted-foreground"
          //           )}
          //         >
          // {field.value
          //   ? data.find(
          //       (product) => `${product.id}` === `${field.value}`
          //     )?.name
          //   : "Select item..."}
          //           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          //         </Button>
          //       </FormControl>
          //     </PopoverTrigger>
          //     <PopoverPortal>
          //       <PopoverContent
          //         className="w-full p-0 "
          //         style={{ pointerEvents: "auto" }}
          //       >
          //         <Command>
          //           <CommandInput
          //             placeholder="Search item..."
          //             className="h-9"
          //           />
          //           <CommandEmpty>No item found.</CommandEmpty>
          //           <CommandGroup>
          //             <CommandList>
          //               {!!data.length &&
          //                 data.map((product) => (
          //                   <CommandItem
          //                     value={`${product.id}`}
          //                     key={product.id}
          //                     onSelect={() => {
          //                       form.setValue(`item.${index}`, product.id);
          //                     }}
          //                   >
          //                     {product.name}
          //                     <Check
          //                       className={cn(
          //                         "ml-auto h-4 w-4",
          //                         `${product.id}` === `${field.value}`
          //                           ? "opacity-100"
          //                           : "opacity-0"
          //                       )}
          //                     />
          //                   </CommandItem>
          //                 ))}
          //             </CommandList>
          //           </CommandGroup>
          //         </Command>
          //       </PopoverContent>
          //     </PopoverPortal>
          //   </Popover>

          //   <FormMessage />
          // </FormItem>
          <FormField
            control={form.control}
            name={`item.${index}`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
                              (product) => `${product.id}` === `${field.value}`
                            )?.name
                          : "Select item..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {data.map((product) => (
                            <CommandItem
                              value={`${product.id}`}
                              key={`product-item-${product.id}`}
                              onSelect={() => {
                                form.setValue(`item.${index}`, product.id);
                              }}
                            >
                              {product.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  `${product.id}` === `${field.value}`
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
      />
    </>
  );
}
