"use client";

import { UseFormReturn } from "react-hook-form";
import { SaveOnMenuItemRetailType } from "@/lib/validators/offers";
import { RetailSubCategory } from "../../../inventory/products/add-products-new/AddProduct";
import { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Category, foodItemResponse } from "@/lib/validators/fooditems";

export interface ComboboxFormProps {
  age_restriction: boolean;
  department_name: string;
  department_slug: string;
  hours_schedule?: string;
  id: number;
  tax_exempt: boolean;
  tax_rate: number;
}

type Item = {
  id: number;
  category_name: string;
};

interface ProductComboboxFormProps {
  data: RetailSubCategory[];
  form: UseFormReturn<SaveOnMenuItemRetailType>;
}

export function SubCategoryComboBox({ data, form }: ProductComboboxFormProps) {
  const [selected, setSelected] = useState<Item | null>(null);
  const [query, setQuery] = useState<string>("");
  const comboBtn = useRef<HTMLButtonElement | null>(null);

  const handleInputFocus = () => comboBtn.current?.click();

  const handleSelectionChange = (selected: RetailSubCategory | null) => {
    if (selected) {
      console.log("Selected", selected);
      form.setValue("sub_category.0.id", selected.id);
      setSelected(selected);
    }
  };

  const filteredCategory =
    query === ""
      ? data
      : data.filter((item) =>
          item.category_name
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
              displayValue={(item: Item | null) => item?.category_name || ""}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Select Category"
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
              {filteredCategory.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No category found.
                </div>
              ) : (
                filteredCategory.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    disabled={
                      !!form
                        .watch("offer_category")
                        ?.find((cat) => Number(cat.id) === Number(item.id))
                    }
                    className={({ active }) =>
                      `relative select-none py-2 pl-10 pr-4 hover:bg-gray-50 cursor-pointer ${
                        active ? "" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.category_name}
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
