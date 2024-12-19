import {
  AlertDialog,
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

export function EnableCategories({
  id,
  disableTitle,
  url,
  tag,
}: {
  id: number;
  url: string;
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
      const response = await api().patch(undefined, `${url}${id}/`).json();
      return response;
    },
    onSuccess: () => {
      toast.success(`Sucessfully Enabled the ${disableTitle}`);
      setOpen(false);
      queryClient.invalidateQueries(`${tag}`);
    },
    onError: (error: any) => {
      toast.error("Unable to enable the category", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          Enable
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will enable the {disableTitle} and users will be able to
            see the category
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
