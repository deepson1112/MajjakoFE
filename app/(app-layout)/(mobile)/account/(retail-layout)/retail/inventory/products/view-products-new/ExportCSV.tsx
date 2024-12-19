import { buttonVariants } from "@/components/ui/Button";
import useUser from "@/lib/useUser";
import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";
import React from "react";

const ExportCSV = () => {
  const { user } = useUser();
  //   const {
  //     mutate: handleExportProductCsv,
  //     isLoading: handleExportProductCsvLoader,
  //   } = useMutation({
  //     mutationFn: async () => {
  //       console.log("This is button");
  //       const response = await api()
  //         .get(`/retails/product-export/?vendor_id=${user?.vendor_id}`)
  //         .json();
  //       return response;
  //     },
  //   });
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/retails/product-export/?vendor_id=${user?.vendor_id}`}
      className={cn(buttonVariants({ variant: "default" }))}
      //   isLoading={handleExportProductCsvLoader}
      //   disabled={handleExportProductCsvLoader}
      download={true}
    >
      <FileUp className="mr-2 w-5 h-5" /> Export csv
    </a>
  );
};

export default ExportCSV;
