import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { axiosInstance } from "@/lib/axiosInstance";
import { getImageData } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";

interface EditVariationImageProps {
  editIndex: number;
  setEditImage: Dispatch<SetStateAction<string[]>>;
  setPreviewEditVariationsImage: Dispatch<SetStateAction<string[]>>;
  previewEditVariationsImage: string[];
}

const EditVariationImage = ({
  editIndex,
  setEditImage,
  previewEditVariationsImage,
  setPreviewEditVariationsImage,
}: EditVariationImageProps) => {
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
    onSuccess: (data) => {
      setEditImage((prev) => [...prev, `${data.id}`]);
    },
  });

  const handleImageFn = (file: File) => {
    const formData = new FormData();
    formData.append(`image`, file);

    return mutate(formData);
  };
  return (
    <div>
      <label htmlFor={`editImage-${editIndex}`}>
        <Avatar className="w-full h-full rounded-lg">
          <AvatarImage
            src={previewEditVariationsImage[editIndex]}
            className="object-center object-cover"
          />
          <AvatarFallback className="w-full h-full rounded-lg bg-white">
            <div
              className="w-full h-full grid place-items-center relative border-2 border-gray-300 border-dashed rounded-lg p-2 cursor-pointer"
              id="dropzone"
            >
              <div className="text-center">
                <Image
                  className="mx-auto h-12 w-12"
                  src="https://www.svgrepo.com/show/357902/image-upload.svg"
                  height={1000}
                  width={1000}
                  alt="adsf"
                />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer"
                  >
                    <span>Drag and drop</span>
                    <span className="text-brand"> or browse</span>
                    <span>to upload</span>
                  </label>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF <span className="text-brand">up to 10MB</span>
                </p>
              </div>
            </div>
          </AvatarFallback>
        </Avatar>
      </label>

      <Input
        type="file"
        name={`editImage-${editIndex}`}
        id={`editImage-${editIndex}`}
        className="sr-only"
        accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event);
          handleImageFn(files[0]);

          setPreviewEditVariationsImage((prev) => [...prev, displayUrl]);
        }}
      />
    </div>
  );
};

export default EditVariationImage;
