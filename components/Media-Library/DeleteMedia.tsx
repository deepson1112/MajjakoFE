import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/Alert-dialog";
import { Button } from "../ui/Button";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";

const DeleteMedia = ({ id }: { id: number }) => {
  const { mutate: handleDeleteMedia, isLoading: handleDeleteMediaLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api()
          .delete(`/retails/variations-image/${id}/`)
          .json();
        return response;
      },
      onSuccess: () => {
        toast.error("Successfully deleted the media");
      },
      onError: (error: any) => {
        toast.error("Unable to Deleted the media", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="absolute hidden group-hover:flex rounded-full -top-2 -right-2 h-7 w-7 bg-brand text-white items-center justify-center"
          type="button"
          onClick={(e) => {}}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            media.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            isLoading={handleDeleteMediaLoader}
            disabled={handleDeleteMediaLoader}
            onClick={() => handleDeleteMedia()}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMedia;
