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
import { queryClient } from "@/lib/queryClient";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteConfirmation({
  id,
  deleteTitle,
  url,
  tag,
  icon,
  iconJsx,
  btnText,
  children,
  tag2,
}: {
  id: number | string;
  url: string;
  deleteTitle: string;
  tag: string;
  tag2?: string;
  icon?: boolean;
  iconJsx?: React.ReactNode;
  btnText?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: handleDeleteAddon, isLoading: addonLoader } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(`${url}${id}/`);
      return data;
    },
    onSuccess: () => {
      toast.success(`Sucessfully deleted the ${deleteTitle}`);
      setOpen(false);
      queryClient.invalidateQueries(`${tag}`);
      queryClient.invalidateQueries(`${tag2}`);
    },
    onError: (error: any) => {
      toast.error(`Unable to delete ${deleteTitle}`, {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children ? (
          children
        ) : (
          <div className="text-gray-500">
            {icon ? (
              iconJsx ? (
                <button
                  type="button"
                  className="absolute top-1 right-1 border-2 border-gray-300 p-1 rounded-md"
                >
                  {iconJsx}
                </button>
              ) : (
                <Button
                  type="button"
                  variant={"ghost"}
                  className={icon ? "" : "w-full"}
                >
                  <Trash2 className="h-5 w-5 text-gray-500" />
                </Button>
              )
            ) : (
              <Button
                type="button"
                variant={"ghost"}
                className={icon ? "" : "w-full"}
              >
                {btnText ? btnText : "Delete"}
              </Button>
            )}
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {deleteTitle}
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={addonLoader}>Cancel</AlertDialogCancel>
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
