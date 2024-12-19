import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { Loader2, Upload } from "lucide-react";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const UploadProductCsv = ({ vendor_id }: { vendor_id: string }) => {
  const {
    mutate: handleUploadProductCsv,
    isLoading: handleUploadProductCsvLoader,
  } = useMutation({
    mutationFn: async (payload: FormData) => {
      try {
        const { data } = await axiosInstance.post(
          `/retails/upload-products/`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return data as { id: string; image: string };
      } catch (error: any) {
        if (error.response) {
          throw new Error(error.response.data.message || "Server error");
        }
        throw new Error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("retail-nested-products-completed");
      queryClient.invalidateQueries("retail-nested-products-incomplete");
      toast.success("Successfully uploaded csv");
    },
    onError: (error: any) => {
      toast.error("Failed to looged in as guest", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const handleCsv = (file: File) => {
    const formData = new FormData();
    formData.append(`file`, file);
    formData.append(`vendor_id`, `${vendor_id}`);

    handleUploadProductCsv(formData);
  };

  return (
    <Label
      className={cn(
        buttonVariants({ variant: "default" }),
        handleUploadProductCsvLoader
          ? "cursor-not-allowed pointer-events-none"
          : "",
        "max-w-fit ml-auto "
      )}
      htmlFor="upload-product-csv"
    >
      {handleUploadProductCsvLoader ? (
        <Loader2 className="mr-1 h-5 w-5 animate-spin" />
      ) : (
        <Upload className="w-5 h-5 mr-1" />
      )}{" "}
      Upload CSV
      <Input
        id="upload-product-csv"
        type="file"
        className="hidden"
        accept=".csv"
        onChange={(event) => {
          console.log(event);
          if (event.target.files) {
            handleCsv(event.target.files[0]);
          }
        }}
      />
    </Label>
  );
};

export default UploadProductCsv;
