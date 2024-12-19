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
import {
  ProductVariation,
  ProductVariation2,
} from "@/lib/validators/fooditems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { getImageData } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";

interface VariationTypeProps {
  value: number;
  index: number;
  retailVariationTypes: ProductVariationType[];
  setCustomForm: Dispatch<SetStateAction<ProductVariation2>>;
  customForm: ProductVariation2;
  collectionIndex: number;
  isImageAllowed: boolean;
}

const TestVariationType = ({
  index,
  setCustomForm,
  collectionIndex,
  customForm,
  retailVariationTypes,
  value,
  isImageAllowed,
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

        // Add an empty string for the next image input
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
      <div className="flex items-center gap-6 border-gray-100 p-3 rounded-lg">
        <Select
          onValueChange={(value) => {
            const [id, name] = value.split("-");
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
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a variation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Variation Types</SelectLabel>
              {options.variation.map((option) => (
                <SelectItem
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
                <label htmlFor={`collection-${collectionIndex}-${imageIndex}`}>
                  <Avatar className="w-full rounded-lg">
                    <AvatarImage
                      src={previewVariationsImage[imageIndex]}
                      className="object-center object-cover"
                    />
                    <AvatarFallback className="rounded-lg bg-white">
                      <div
                        className="w-full h-full relative border-2 border-gray-300 border-dashed rounded-lg p-2 cursor-pointer"
                        id="dropzone"
                      >
                        <div className="w-full h-full flex gap-2 items-center text-center">
                          <Plus />
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

                    setPreviewVariationsImage((prev) => [...prev, displayUrl]);
                  }}
                />
              </div>
            )
          )}
      </div>
    )
  );
};

export default TestVariationType;
