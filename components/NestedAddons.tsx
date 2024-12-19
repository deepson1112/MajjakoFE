import { Minus, Plus } from "lucide-react";
import React from "react";
import {
  Control,
  FieldValues,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

interface NestedAddonsProps {
  nestIndex: number;
  control: Control;
  register: UseFormRegister<FieldValues>;
}

const NestedAddons = ({ nestIndex, control, register }: NestedAddonsProps) => {
  const {
    fields: addonsFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `foodaddonscategory_set[${nestIndex}].foodaddons_set`,
    rules: { minLength: 1 },
  });

  return (
    <div>
      <div>
        {addonsFields.map((field, indexAddon) => {
          return (
            <div key={indexAddon} className="mt-4">
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>

                    <input
                      type="text"
                      placeholder="Title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(
                        `foodaddonscategory_set.${nestIndex}.foodaddons_set.${indexAddon}.title`
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      placeholder="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(
                        `foodaddonscategory_set.${nestIndex}.foodaddons_set.${indexAddon}.price`
                      )}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => append({ addonsFields })}
                  className="focus:outline-none text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm mr-2 mb-2 p-2"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    remove(indexAddon);
                  }}
                  className="focus:outline-none text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm mr-2 mb-2 p-2"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default NestedAddons;
