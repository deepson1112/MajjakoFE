import { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { UseFormReturn } from "react-hook-form";
import { RetailItems } from "@/types/retail";
import { BuyOneGetOneType } from "@/lib/validators/offers";

type Person = {
  id: number;
  name: string;
};

interface ProductComboboxFormProps {
  data: RetailItems[];
  form: UseFormReturn<BuyOneGetOneType>;
  index: number;
}

export default function ProductComboboxForm({
  data,
  form,
  index,
}: ProductComboboxFormProps) {
  const [selected, setSelected] = useState<Person | null>(null);
  const [query, setQuery] = useState<string>("");
  const comboBtn = useRef<HTMLButtonElement | null>(null);

  const handleInputFocus = () => comboBtn.current?.click();

  const handleSelectionChange = (selected: RetailItems | null) => {
    if (selected) {
      form.setValue(`item.${index}`, selected.id);
      setSelected(selected);
    }
  };

  const filteredProduct =
    query === ""
      ? data
      : data.filter((item) =>
          item.name
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
              displayValue={(person: Person | null) => person?.name || ""}
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
              {filteredProduct.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No product found.
                </div>
              ) : (
                filteredProduct.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    disabled={form.watch("item").includes(person.id)}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${form
                        .watch("item")
                        .includes(person.id)} ${
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
                          {person.name}
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
