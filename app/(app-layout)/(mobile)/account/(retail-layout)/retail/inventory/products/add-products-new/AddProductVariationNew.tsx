import { Button } from "@/components/ui/Button";
import { Product } from "@/lib/validators/fooditems";
import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ProductVariationType } from "@/lib/validators/fooditems";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import ProductVariationNew from "./ProductVariationNew";
import { Trash2 } from "lucide-react";
import ProductDetails from "./ProductDetails";

interface AddProductVariationNewProps {
  form: UseFormReturn<Product>;
}

const AddProductVariationNew = ({ form }: AddProductVariationNewProps) => {
  const [includeImage, setIncludeImage] = useState(false);
  const { control } = form;

  const {
    fields: productVariations,
    append: appendProductVariations,
    remove: removeProductVariations,
  } = useFieldArray({
    name: "variations",
    control,
    keyName: "variationKey",
  });

  const { data: retailVariationTypes, isLoading: retailVariationTypesLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get("/retails/retail-variation-types/")
          .json<ProductVariationType[]>();
        return response;
      },
      queryKey: ["retail-variation-types"],
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  return (
    <>
      <div className="my-3 py-2 space-y-2">
        <h6 className="text-2xl font-semibold mb-3">Product Variants</h6>
        <div className="space-y-3">
          {retailVariationTypesLoader ? (
            <Skeleton className="w-full h-8 rounded-lg" />
          ) : !!retailVariationTypes?.length ? (
            productVariations.map((field, index) => (
              <div className="relative" key={field.variationKey}>
                <ProductVariationNew
                  form={form}
                  index={index}
                  // @ts-ignore
                  retailVariationTypes={retailVariationTypes}
                  includeImage={includeImage}
                  setIncludeImage={setIncludeImage}
                />
                <button
                  className="absolute rounded-full -top-2 -right-2 h-7 w-7 bg-brand text-white flex items-center justify-center"
                  type="button"
                  onClick={() => removeProductVariations(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div>No Variations found</div>
          )}
        </div>
        <Button
          type="button"
          onClick={() => appendProductVariations({ id: "", variation: [] })}
        >
          Add Variation
        </Button>
      </div>
      <ProductDetails form={form} />
    </>
  );
};

export default AddProductVariationNew;
