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
import { api } from "@/lib/fetcher";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

interface ClearCartProps {
  url: string;
}

export function ClearCart({ url }: ClearCartProps) {
  const [clearCartOpen, setClearCartOpen] = useState(false);

  const { mutate: handleClearCart, isLoading: handleClearCartLoader } =
    useMutation({
      mutationFn: async () => {
        const response = await api().post(undefined, url).json();
        return response;
      },
      onSuccess: () => {
        setClearCartOpen(false);
        queryClient.invalidateQueries("user-sidecart-data");
        queryClient.invalidateQueries("user-cart");
        queryClient.invalidateQueries("food-cart-quantity");
        queryClient.invalidateQueries("retail-cart-data");
      },
      onError: (error: any) => {
        toast.error("Unable to clear the cart", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  return (
    <AlertDialog open={clearCartOpen} onOpenChange={setClearCartOpen}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full" variant={"subtle"}>
          Clear <Trash2 className="w-5 h-5 ml-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => handleClearCart()}
            isLoading={handleClearCartLoader}
            disabled={handleClearCartLoader}
          >
            Clear
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
