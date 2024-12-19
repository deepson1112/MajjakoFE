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
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export function DeleteVendorTimeline({
  id,
  deleteTitle,
  url,
  tag,
}: {
  id: string | number;
  url: string;
  deleteTitle: string;
  tag: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: handleDeleteAddon, isLoading: addonLoader } = useMutation({
    mutationFn: async () => {
      //   const data = await api()
      //     .delete(`/menu/add-food-addon-categories/${id}`)
      //     .json();
      const { data } = await axiosInstance.delete(
        `${url}${id}`
        // `/menu/add-food-addon-categories/${id}/`
      );
      return data;
    },
    onSuccess: () => {
      toast.success(`Sucessfully deleted the ${deleteTitle}`);
      setOpen(false);
      queryClient.invalidateQueries(`${tag}`);
    },
    onError: (error: any) => {
      toast.error(`Unable to delete the ${deleteTitle}`, {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the addon
            and remove your data from our servers.
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
