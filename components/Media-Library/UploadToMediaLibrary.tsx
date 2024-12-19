import React from "react";
import { Input } from "../ui/Input";
import { cn, getImageData } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import { Loader2, Upload } from "lucide-react";
import { Label } from "../ui/Label";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";

const UploadToMediaLibrary = () => {
  const {
    mutate: handleUploadToMediaLibraryFn,
    isLoading: handleUploadToMediaLibraryLoader,
  } = useMutation({
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
      return data as { id: string; image: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries("retail-variations-image");
    },
  });

  const handleUploadToMediaLibrary = (data: File) => {
    const formData = new FormData();

    if (data instanceof File) {
      formData.append(`image`, data);
    }
    handleUploadToMediaLibraryFn(formData);
  };
  return (
    <Label
      className={cn(
        buttonVariants({ variant: "default" }),
        handleUploadToMediaLibraryLoader
          ? "cursor-not-allowed pointer-events-none"
          : "",
        "max-w-fit ml-auto "
      )}
      htmlFor="upload-to-media-library"
    >
      {handleUploadToMediaLibraryLoader ? (
        <Loader2 className="mr-1 h-5 w-5 animate-spin" />
      ) : (
        <Upload className="w-5 h-5 mr-1" />
      )}{" "}
      Upload
      <Input
        id="upload-to-media-library"
        type="file"
        className="hidden"
        accept=".jpg, .jpeg, .png, .svg, .gif"
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event);

          handleUploadToMediaLibrary(files[0]);
        }}
      />
    </Label>
  );
};

export default UploadToMediaLibrary;
