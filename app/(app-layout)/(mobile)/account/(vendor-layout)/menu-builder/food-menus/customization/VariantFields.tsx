import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ProductVariation,
  ProductVariation2,
} from "@/lib/validators/fooditems";
import { FinalType, ProductVariationType } from "./TabsContent";
import VariationType from "./VariationType";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import AddVariationType from "@/app/(app-layout)/(mobile)/account/(retail-layout)/retail/inventory/variations/AddVariationType";

interface VariantFieldsProps {
  customForm: ProductVariation2;
  index: number;
  retailVariationTypes: ProductVariationType[];
  setCustomForm: Dispatch<SetStateAction<ProductVariation2>>;
  setSelectedVariationType: Dispatch<SetStateAction<string[]>>;
  selectedVariationType: string[];
  setSelectedVariationValue: Dispatch<SetStateAction<string[]>>;
  selectedVariationValue: string[];
  is_edit: boolean;
  imageAllowed: string;
  setImageAllowed: Dispatch<SetStateAction<string>>;
  setCurrentVariations: Dispatch<SetStateAction<FinalType[]>>;
}

const VariantFields = ({
  index,
  retailVariationTypes,
  customForm,
  setCustomForm,
  setSelectedVariationType,
  selectedVariationType,
  selectedVariationValue,
  setSelectedVariationValue,
  is_edit,
  imageAllowed,
  setImageAllowed,
  setCurrentVariations,
}: VariantFieldsProps) => {
  // const [isImageAllowed, setIsImageAllowed] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {!!customForm[index].id ? (
        <div className="flex items-center mb-4">
          <input
            id={`allow-image-checkbox-${customForm[index].id}`}
            name={`allow-image-checkbox-${customForm[index].id}`}
            type="checkbox"
            value={`${customForm[index].id}`}
            className="w-4 h-4 text-brand bg-gray-100 border-gray-300 rounded focus:ring-brand dark:focus:ring-brand dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => {
              setImageAllowed((prev) =>
                prev === e.target.value ? "" : e.target.value
              );
              setCurrentVariations((prev) =>
                prev.map((items) => ({ ...items, variations_image: [] }))
              );
            }}
            checked={imageAllowed === customForm[index].id}
          />
          <label
            htmlFor={`allow-image-checkbox-${customForm[index].id}`}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Variation Image
          </label>
        </div>
      ) : null}

      <div className="w-full">
        <Select
          onValueChange={(value) => {
            const [id, name] = value.split("-");
            setSelectedVariationType((prevState) => {
              const newArray = [...prevState];

              newArray[index] = `${id}`;

              return newArray;
            });
            setCustomForm((prev) =>
              prev.map((item, i) =>
                i === index
                  ? {
                      collections: [
                        {
                          id: "",
                          name: "",
                          price: "",
                          sku: "",
                          stock_quantity: "",
                          variations_image: [""],
                        },
                      ],
                      id,
                      name,
                    }
                  : item
              )
            );
          }}
          value={
            `${customForm[index].id}-${customForm[index].name}` || undefined
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Variation Type" />
          </SelectTrigger>

          <SelectContent>
            <AddVariationType isAdd />
            {retailVariationTypes.map((type) => (
              <SelectItem
                disabled={selectedVariationType.includes(`${type.id}`)}
                value={`${type.id}-${type.name}`}
                key={`retail-varation-type-option-${type.name}`}
              >
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!!customForm[index].id && !!customForm[index].collections.length ? (
        <div className="relative flex flex-col gap-3">
          <div className="flex flex-col gap-1 items-start">
            {customForm[index].collections.map((_, collectionIndex) => (
              <VariationType
                collectionIndex={collectionIndex}
                selectedVariationValue={selectedVariationValue}
                setSelectedVariationValue={setSelectedVariationValue}
                index={index}
                customForm={customForm}
                setCustomForm={setCustomForm}
                retailVariationTypes={retailVariationTypes}
                value={Number(customForm[index].id)}
                key={`variation-type-custom-field-${customForm[index].id}`}
                isImageAllowed={imageAllowed === customForm[index].id}
              />
            ))}
          </div>
          {is_edit ? null : (
            <button
              type="button"
              className="absolute rounded-full -bottom-2 -left-2 h-7 w-7 bg-brand flex items-center justify-center"
              onClick={() =>
                setCustomForm((prev) =>
                  prev.map((item, indx) =>
                    indx === index
                      ? {
                          id: item.id,
                          name: item.name,
                          collections: [
                            ...item.collections,
                            {
                              id: "",
                              name: "",
                              price: "",
                              sku: "",
                              stock_quantity: "",
                              variations_image: [""],
                            },
                          ],
                        }
                      : item
                  )
                )
              }
            >
              <Plus className="h-5 w-5 text-white" />
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default VariantFields;

interface CheckboxProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  name: string;
  setCustomForm: Dispatch<SetStateAction<ProductVariation2>>;
  index: number;
}

export const Checkbox = ({
  children,
  setValue,
  value,
  name,
  index,
  setCustomForm,
}: CheckboxProps) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="mr-2"
        name={name}
        checked={value}
        onChange={() => {
          // setCustomForm((prev) =>
          //   prev[index].collections[0].variations_image.push("s")
          // );
          setValue(!value);
        }}
      />
      {children}
    </label>
  );
};
