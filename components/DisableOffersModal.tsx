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
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

export function DisableOffersModal({
  id,
  disableTitle,
  url,
  tag,
}: {
  id: string | number;
  url: string;
  disableTitle: string;
  tag: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: handleDeleteAddon, isLoading: addonLoader } = useMutation({
    mutationFn: async () => {
      //   const data = await api()
      //     .delete(`/menu/add-food-addon-categories/${id}`)
      //     .json();
      const { data } = await axiosInstance.patch(
        `${url}${id}/`
        // `/menu/add-food-addon-categories/${id}/`
      );
      return data;
    },
    onSuccess: () => {
      toast.success(`Sucessfully disabled the ${disableTitle}`);
      setOpen(false);
      queryClient.invalidateQueries(`${tag}`);
    },
    onError: (error: any) => {
      toast.error("Unable to disable the offer", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Disable Offer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will disable the offer and wont be available for the users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            isLoading={addonLoader}
            disabled={addonLoader}
            onClick={() => handleDeleteAddon()}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
