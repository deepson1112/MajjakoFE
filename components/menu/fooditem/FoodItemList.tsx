import React, { useState } from "react";
import { Button, buttonVariants } from "../../ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/Alert-dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

interface FoodItemListProps {
  food_title: string;
  price: number;
  vendor_categories: number;
  id: string;
  department: string;
}
const FoodItemList = ({
  food_title,
  price,
  vendor_categories,
  id,
  department,
}: FoodItemListProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  const { mutate: handleDeleteFoodItems, isLoading: deleteButtonLoader } =
    useMutation<Response, AxiosError, unknown>({
      mutationFn: async () => {
        const { data } = await axiosInstance.delete(`/menu/food/${id}/`);
        return data;
      },
      onSuccess: () => {
        toast.error("Sucessfully Deleted");
        queryClient.invalidateQueries("food-items");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to delete", {
          description: "Please try again later",
        });
      },
    });

  return (
    <>
      <li className="p-3 flex items-center justify-between border-2 rounded-md border-gray-100 cursor-pointer hover:border-gray-200">
        <h4>{food_title}</h4>
        <div className="flex items-center gap-2">
          <Button
            className=" bg-red-200 rounded-sm hover:bg-red-300"
            onClick={() => setOpenAlert(true)}
          >
            <Trash2 className="text-red-500 w-4 h-4" />
          </Button>
          <Link
            href={`/account/menu-builder/edit-food/${id}/${department}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              " bg-blue-200 rounded-sm hover:bg-blue-300"
            )}
          >
            <Pencil className="text-blue-500 w-4 h-4" />
          </Link>
        </div>
      </li>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              <span className="text-brand"> Food item</span> form the
              sub-category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFoodItems}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FoodItemList;
