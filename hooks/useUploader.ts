import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";

const useUploadImage = () => {
  return useMutation(
    (formData) =>
      axios.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("images");
      },
    }
  );
};

export default useUploadImage;
