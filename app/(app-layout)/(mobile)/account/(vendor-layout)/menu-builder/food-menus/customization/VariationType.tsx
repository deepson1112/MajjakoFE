import { Dispatch, SetStateAction, useState } from "react";
import { ProductVariationType } from "./TabsContent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ProductVariation2 } from "@/lib/validators/fooditems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { getImageData } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { Button } from "@/components/ui/Button";
import AddVariation from "@/app/(app-layout)/(mobile)/account/(retail-layout)/retail/inventory/variations/AddVariation";

interface VariationTypeProps {
  value: number;
  index: number;
  retailVariationTypes: ProductVariationType[];
  setCustomForm: Dispatch<SetStateAction<ProductVariation2>>;
  customForm: ProductVariation2;
  collectionIndex: number;
  isImageAllowed: boolean;
  setSelectedVariationValue: Dispatch<SetStateAction<string[]>>;
  selectedVariationValue: string[];
}

const VariationType = ({
  index,
  setCustomForm,
  collectionIndex,
  customForm,
  retailVariationTypes,
  value,
  isImageAllowed,
  selectedVariationValue,
  setSelectedVariationValue,
}: VariationTypeProps) => {
  const options = retailVariationTypes.find(
    (retailVariationType) => `${retailVariationType.id}` === `${value}`
  );
  const [previewVariationsImage, setPreviewVariationsImage] = useState<
    string[]
  >([]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await axiosInstance.post(
        `/retails/variations-image/`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data as { id: string };
    },
  });

  const handleImageFn = (file: File, fileIndex: number) => {
    const formData = new FormData();
    formData.append(`image`, file);

    return mutate(formData, {
      onSuccess: (data) => {
        setCustomForm((prev) =>
          prev.map((items, indx) =>
            indx === index
              ? {
                  ...items,
                  collections: items.collections.map((collection, colIndex) =>
                    colIndex === collectionIndex
                      ? {
                          ...collection,
                          variations_image: collection.variations_image.map(
                            (img, imgIndex) =>
                              imgIndex === fileIndex ? data.id : img
                          ),
                        }
                      : collection
                  ),
                }
              : items
          )
        );

        setCustomForm((prev) =>
          prev.map((items, indx) =>
            indx === index
              ? {
                  ...items,
                  collections: items.collections.map((collection, colIndex) =>
                    colIndex === collectionIndex
                      ? {
                          ...collection,
                          variations_image: [
                            ...collection.variations_image,
                            "",
                          ],
                        }
                      : collection
                  ),
                }
              : items
          )
        );
      },
    });
  };

  return (
    options && (
      <div className="w-full flex items-center justify-between border border-gray-100 py-1 px-2 rounded-lg">
        <div className="bg-[repeating-linear-gradient(0deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px),repeating-linear-gradient(90deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px),repeating-linear-gradient(180deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px),repeating-linear-gradient(270deg,#ff4500,#ff4500_9px,transparent_9px,transparent_18px,#ff4500_18px)] bg-[length:1px_100%,100%_1px,1px_100%,100%_1px] bg-[position:0_0,0_0,100%_0,0_100%] bg-no-repeat flex items-center gap-6  p-3 rounded-lg">
          <Select
            onValueChange={(value) => {
              const [id, name] = value.split("-");

              setSelectedVariationValue((prevState) => {
                const newArray = [...prevState];

                newArray[collectionIndex] = `${id}`;

                return newArray;
              });

              setCustomForm((prev) =>
                prev.map((item, indx) =>
                  indx === index
                    ? {
                        ...item,
                        collections: item.collections.map((col, ind) =>
                          ind === collectionIndex ? { ...col, id, name } : col
                        ),
                      }
                    : item
                )
              );
            }}
            value={`${customForm[index].collections[collectionIndex].id}-${
              customForm[index].collections[collectionIndex].name || null
            }`}
          >
            <SelectTrigger className="w-[300px] bg-white shadow-lg outline outline-gray-100">
              <SelectValue placeholder="Select a variation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Variation Types</SelectLabel>
                <AddVariation isAdd id={value} />
                {options.variation.map((option) => (
                  <SelectItem
                    disabled={selectedVariationValue.includes(`${option.id}`)}
                    value={`${option.id}-${option.name}`}
                    key={option.id}
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {isImageAllowed &&
            customForm[index].collections[collectionIndex].variations_image.map(
              (image, imageIndex) => (
                <div key={imageIndex}>
                  <label
                    htmlFor={`collection-${collectionIndex}-${imageIndex}`}
                  >
                    <Avatar className="w-full rounded-lg">
                      <AvatarImage
                        src={previewVariationsImage[imageIndex]}
                        className="object-center object-cover"
                      />
                      <AvatarFallback className="rounded-lg bg-white">
                        <div
                          className="w-full h-full relative border-2 border-gray-300 border-dashed rounded-lg p-2 px-4 cursor-pointer"
                          id="dropzone"
                        >
                          <div className="w-full h-full flex gap-2 items-center text-gray-500 text-center">
                            Add Photo
                            <Plus className="w-5 h-5 -left-4" />
                          </div>
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  </label>

                  <Input
                    type="file"
                    name={`collection-${collectionIndex}-${imageIndex}`}
                    id={`collection-${collectionIndex}-${imageIndex}`}
                    className="sr-only"
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      handleImageFn(files[0], imageIndex);

                      setPreviewVariationsImage((prev) => [
                        ...prev,
                        displayUrl,
                      ]);
                    }}
                  />
                </div>
              )
            )}
        </div>

        {collectionIndex !== 0 ? (
          <Button
            type="button"
            variant={"subtle"}
            onClick={() => {
              setCustomForm((prev) =>
                prev.map((item, indx) =>
                  indx === index
                    ? {
                        id: item.id,
                        name: item.name,
                        collections: item.collections.filter(
                          (_, colIndex) => colIndex !== collectionIndex
                        ),
                      }
                    : item
                )
              );
            }}
          >
            <Minus className="w-3  h-3" />
          </Button>
        ) : null}
      </div>
    )
  );
};

export default VariationType;
