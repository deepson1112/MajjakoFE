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
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

export function DeleteConfirmationModalClose({
  id,
  deleteTitle,
  url,
  tag,
  setIsModalOpen,
  children,
}: {
  id: string | number;
  url: string;
  deleteTitle: string;
  tag: string;

  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const { mutate: handleDeleteAddon, isLoading: addonLoader } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `${url}${id}/`
        // `/menu/add-food-addon-categories/${id}/`
      );
      return data;
    },
    onSuccess: () => {
      toast.success(`Sucessfully deleted the ${deleteTitle}`);
      setOpen(false);
      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
      queryClient.invalidateQueries(`${tag}`);
    },
    onError: (error: any) => {
      toast.error("Unable to delete the location", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(data) => {
        setTimeout(() => (document.body.style.pointerEvents = ""), 100);
        setOpen(data);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          className="w-full md:w-fit"
          variant={children ? "ghost" : "subtle"}
        >
          {" "}
          {children ? children : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {deleteTitle} and remove your data from our servers.
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
