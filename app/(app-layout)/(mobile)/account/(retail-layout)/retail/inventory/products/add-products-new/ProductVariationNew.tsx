import { Checkbox } from "@/components/ui/Checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import AddVariationTypeNew from "./AddVariationTypeNew";
import { UseFormReturn } from "react-hook-form";
import { Product } from "@/lib/validators/fooditems";

interface VariationDetail {
  id: number;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
  variation_type: number;
}

export interface ProductVariationType {
  id: number;
  variation: VariationDetail[];
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
}

interface ProductVariationNewProps {
  form: UseFormReturn<Product>;
  index: number;
  setIncludeImage: Dispatch<SetStateAction<boolean>>;
  includeImage: boolean;
  retailVariationTypes: ProductVariationType[];
}

const ProductVariationNew = ({
  form,
  index,
  retailVariationTypes,
  includeImage,
  setIncludeImage,
}: ProductVariationNewProps) => {
  const [selectedVariation, setSelectedVariation] = useState<
    Array<{ id: number; name: string; variation_type: number }>
  >([]);

  const oneRender = useRef(true);

  useEffect(() => {
    const value = form.watch(`variations.${index}.id`);
    const selectedRetailVariation = retailVariationTypes.find(
      (item) => `${item.id}` === `${value}`
    );

    setSelectedVariation(selectedRetailVariation?.variation || []);
  }, [oneRender]);

  return (
    <div className=" border border-dashed p-4 rounded-lg space-y-4">
      <FormField
        control={form.control}
        name={`variations.${index}.id`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variations</FormLabel>
            <Select
              onValueChange={(id) => {
                const selectedRetailVariation = retailVariationTypes.find(
                  (item) => `${item.id}` === `${id}`
                );

                setSelectedVariation(selectedRetailVariation?.variation || []);

                field.onChange(id);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a variation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {retailVariationTypes.map((type) => (
                  <SelectItem
                    disabled={
                      !!form
                        .watch("variations")
                        .find((item, index) => `${item.id}` === `${type.id}`)
                    }
                    value={`${type.id}`}
                    // value={`${type.id}^${type.name}^${JSON.stringify(
                    //   type.variation
                    // )}`}
                    key={`retail-varation-option-${type.name}`}
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`image-allowed-${index}`}
          checked={includeImage}
          onCheckedChange={(value) => setIncludeImage(!!value)}
        />
        <label
          htmlFor={`image-allowed-${index}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Includes Variation Image
        </label>
      </div>

      <AddVariationTypeNew
        form={form}
        index={index}
        selectedVariationType={selectedVariation}
        includeImage={includeImage}
      />
    </div>
  );
};

export default ProductVariationNew;
