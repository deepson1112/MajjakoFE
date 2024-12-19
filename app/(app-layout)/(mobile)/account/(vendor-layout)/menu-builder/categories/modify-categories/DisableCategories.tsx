import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

export function DisableCategories({
  id,
  disableTitle,

  tag,
}: {
  id: number;

  disableTitle: string;
  tag: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    mutate: handleDisableCategory,
    isLoading: handleDisableCategoryLoader,
  } = useMutation({
    mutationFn: async () => {
      const response = await api()
        .patch(
          undefined,
          `/menu/vendor-category/${id}/disable_vendor_category/`
        )
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success(`Sucessfully Disabled the ${disableTitle}`);
      setOpen(false);
      queryClient.invalidateQueries(`${tag}`);
    },
    onError: (error: any) => {
      toast.error("Unable to disable the category", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          Disable
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This actoin will disable the {disableTitle} and users wont see the
            category
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            isLoading={handleDisableCategoryLoader}
            disabled={handleDisableCategoryLoader}
            onClick={() => handleDisableCategory()}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
