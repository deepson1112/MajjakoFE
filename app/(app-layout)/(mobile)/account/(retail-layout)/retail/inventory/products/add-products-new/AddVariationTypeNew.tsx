import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import VariationImage from "./VariationImage";
import { Product } from "@/lib/validators/fooditems";

interface AddVariationTypeNewProps {
  form: UseFormReturn<Product>;
  index: number;
  selectedVariationType:
    | Array<{ id: number; name: string; variation_type: number }>
    | [];
  includeImage: boolean;
}

const AddVariationTypeNew = ({
  form,
  index,
  selectedVariationType,
  includeImage,
}: AddVariationTypeNewProps) => {
  const { control } = form;
  const {
    fields: productVariationsType,
    append: appendProductVariationsType,
    remove: removeProductVariationsType,
  } = useFieldArray({
    name: `variations.${index}.variation`,
    control,
    keyName: "variationTypekey",
  });

  console.log("This productVariaiotnstype", productVariationsType);
  console.log("Form Watch", form.watch());

  return (
    <div className="relative flex flex-col space-y-4 my-2">
      {!!productVariationsType.length
        ? productVariationsType.map((field, typeIndex) => (
            <div
              // key={`form-field-add-variation-type-${typeIndex + 1}`}
              key={field.variationTypekey}
              className="w-full flex items-center justify-between border border-gray-100 py-1 px-2 rounded-lg"
            >
              <div className="bg-[repeating-linear-gradient(0deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px),repeating-linear-gradient(90deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px),repeating-linear-gradient(180deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px),repeating-linear-gradient(270deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px)] bg-[length:1px_100%,100%_1px,1px_100%,100%_1px] bg-[position:0_0,0_0,100%_0,0_100%] bg-no-repeat flex items-center gap-6  p-3 rounded-lg">
                <FormField
                  control={form.control}
                  name={`variations.${index}.variation.${typeIndex}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[300px] bg-white shadow-lg outline outline-gray-100">
                            <SelectValue placeholder="Select a variation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {!!selectedVariationType.length &&
                            selectedVariationType.map((type) => (
                              <SelectItem
                                disabled={
                                  !!form
                                    .watch(`variations.${index}.variation`)
                                    .find(
                                      (item) => `${item.id}` === `${type.id}`
                                    )
                                }
                                value={`${type.id}`}
                                key={`retail-varation-type-option-${type.name}`}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {includeImage ? (
                  <div>
                    <VariationImage
                      form={form}
                      typeIndex={typeIndex}
                      variationIndex={index}
                    />
                  </div>
                ) : null}
              </div>
              <div className="px-4">
                <button
                  className="rounded-full -top-2 -right-2 h-7 w-7 bg-red-500 text-white flex items-center justify-center"
                  type="button"
                  onClick={() => removeProductVariationsType(typeIndex)}
                >
                  <Minus />
                </button>
              </div>
            </div>
          ))
        : null}
      <button
        className="absolute rounded-full -bottom-2 -left-2 h-7 w-7 bg-brand text-white flex items-center justify-center"
        type="button"
        onClick={() =>
          appendProductVariationsType({ id: "", variations_image: [] })
        }
      >
        <Plus />
      </button>
    </div>
  );
};

export default AddVariationTypeNew;
