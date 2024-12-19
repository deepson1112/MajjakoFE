import { MediaLibrary } from "@/components/Media-Library/MediaLibrary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/validators/fooditems";
import { Plus, X } from "lucide-react";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

interface VariatioImageProps {
  form: UseFormReturn<Product>;
  typeIndex: number;
  variationIndex: number;
}

const VariationImage = ({
  form,
  typeIndex,
  variationIndex,
}: VariatioImageProps) => {
  const { control } = form;
  const {
    fields: variationImage,
    append: appendvariationImage,
    remove: removevariationImage,
  } = useFieldArray({
    name: `variations.${variationIndex}.variation.${typeIndex}.variations_image`,
    control,
    keyName: "variationImagekey",
  });

  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-4 gap-2">
        {!!variationImage.length &&
          variationImage.map((_, imgIndex) => (
            <MediaLibrary
              form={form}
              field={`variations.${variationIndex}.variation.${typeIndex}.variations_image.${imgIndex}`}
              key={`variation-image-media-library-${imgIndex}`}
            >
              <Avatar className="relative w-full rounded-lg overflow-visible">
                <AvatarImage
                  src={
                    form.watch(
                      `variations.${variationIndex}.variation.${typeIndex}.variations_image.${imgIndex}`
                    ) || ""
                  }
                  className="object-center object-cover"
                />
                <AvatarFallback className="rounded-lg bg-white max-w-[50px]">
                  <div className="w-full h-full relative border-2 border-gray-300 border-dashed rounded-lg p-2 px-4 cursor-pointer">
                    <div className="w-full h-full flex gap-2 items-center text-gray-500 text-center">
                      <Plus className="w-5 h-5 -left-4" />
                    </div>
                  </div>
                </AvatarFallback>

                {form.watch(
                  `variations.${variationIndex}.variation.${typeIndex}.variations_image.${imgIndex}`
                ).length > 1 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removevariationImage(imgIndex);
                    }}
                    className={cn(
                      !variationImage.length ? "col-span-full" : "",
                      "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand text-white flex items-center justify-center my-auto order-last"
                    )}
                  >
                    <X />
                  </button>
                ) : null}
              </Avatar>
            </MediaLibrary>
          ))}

        {variationImage.length < 4 ? (
          <button
            type="button"
            onClick={() => appendvariationImage(" ")}
            className={cn(
              !variationImage.length ? "col-span-full" : "",
              "h-7 w-7 rounded-md bg-brand text-white flex items-center justify-center my-auto order-last"
            )}
          >
            <Plus />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default VariationImage;
