"use client";

import { UseFormReturn } from "react-hook-form";
import {
  PlatfromOfferType,
  SaveOnMenuItemRetailType,
} from "@/lib/validators/offers";
import { RetailProductVariation } from "../../SaveOnMenu";

// interface PageProps {
//   data: RetailProductVariation[];
//   form: UseFormReturn<SaveOnMenuItemRetailType | PlatfromOfferType>;
//   index: number;
// }

// export function VariationComboBox({ data, form, index }: PageProps) {
//   return (
//     <>
//       <FormField
//         control={form.control}
//         name={`retail_product_variation.${index}.id`}
//         render={({ field }) => (
//           <FormItem className="flex flex-col">
//             <Popover modal={true}>
//               <PopoverTrigger asChild>
//                 <FormControl>
//                   <Button
//                     variant="subtle"
//                     role="combobox"
//                     className={cn(
//                       "w-full justify-between bg-gray-100 line-clamp-1",
//                       !field.value && "text-muted-foreground"
//                     )}
//                   >
//                     <span className="line-clamp-1">
//                       {field.value
//                         ? data.find(
//                             (product) => `${product.id}` === `${field.value}`
//                           )?.sku
//                         : "Select item..."}
//                     </span>
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                   </Button>
//                 </FormControl>
//               </PopoverTrigger>

//               <PopoverContent className="w-[200px] p-0">
//                 <Command>
//                   <CommandInput placeholder="Search item..." className="h-9" />
//                   <CommandEmpty>No item found.</CommandEmpty>
//                   <CommandGroup>
//                     <CommandList>
//                       {!!data.length &&
//                         data.map((product) => (
//                           <CommandItem
//                             value={`${product.id}`}
//                             key={product.id}
//                             onSelect={() => {
//                               form.setValue(
//                                 `retail_product_variation.${index}.id`,
//                                 product.id
//                               );
//                             }}
//                           >
//                             {product.sku}
//                             <Check
//                               className={cn(
//                                 "ml-auto h-4 w-4",
//                                 `${product.id}` === `${field.value}`
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               )}
//                             />
//                           </CommandItem>
//                         ))}
//                     </CommandList>
//                   </CommandGroup>
//                 </Command>
//               </PopoverContent>
//             </Popover>

//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </>
//   );
// }

import { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Person = {
  id: number;
  name: string;
};

interface ProductComboboxFormProps {
  data: RetailProductVariation[];
  form: UseFormReturn<SaveOnMenuItemRetailType | PlatfromOfferType>;
  index: number;
}

export function VariationComboBox({
  data,
  form,
  index,
}: ProductComboboxFormProps) {
  const [selected, setSelected] = useState<RetailProductVariation | null>(null);
  const [query, setQuery] = useState<string>("");
  const comboBtn = useRef<HTMLButtonElement | null>(null);

  console.log("This is data", data);

  const handleInputFocus = () => comboBtn.current?.click();

  const handleSelectionChange = (selected: RetailProductVariation | null) => {
    if (selected) {
      form.setValue(`retail_product_variation.${index}.id`, selected.id);
      setSelected(selected);
    }
  };

  const filteredVariation =
    query === ""
      ? data
      : data.filter((item) =>
          item.sku
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={handleSelectionChange}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person: RetailProductVariation | null) =>
                person?.sku || ""
              }
              onChange={(event) => {
                setQuery(event.target.value);
                // console.log("hello Event", event.target.value);
                // form.setValue(`item.${index}`, Number(event.target.id));
              }}
              placeholder="Select Product"
              onFocus={handleInputFocus}
            />
            <Combobox.Button
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              as="div"
              ref={comboBtn}
            >
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-[120px] overflow-y-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
              {filteredVariation.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No product found.
                </div>
              ) : (
                filteredVariation.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    // disabled={form.watch("item").includes(person.id)}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-brand text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.sku}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-brand"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
