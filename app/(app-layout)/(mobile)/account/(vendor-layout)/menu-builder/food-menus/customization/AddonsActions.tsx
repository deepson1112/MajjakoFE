import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { EditAddonsModal } from "./EditAddonsModal";
import { cusumizationType } from "./columns";
import { ExtraOptionType } from "@/lib/validators/fooditems";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

interface AddonsActionsProps extends cusumizationType {
  currentOptionState: ExtraOptionType[];
  setCurrentOptionState: Dispatch<SetStateAction<ExtraOptionType[]>>;
}

export function AddonsActions(addon: AddonsActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    mutate: handleDeleteSubCustomizationFn,
    isLoading: handleDeleteSubCustomizationFnLoader,
  } = useMutation({
    mutationFn: async () => {
      const response = axiosInstance.delete(
        `/menu/remove-food-customization/${addon.id}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Sucessfully deleted the customization");
      queryClient.invalidateQueries("food-addon-categories");
      setIsMenuOpen(false);
      addon.setCurrentOptionState((prev) =>
        prev.filter((item) => item.id !== addon.id)
      );
    },
    onError: () => {
      toast.error("Unable to delete the customization", {
        description: "Please try again",
      });
    },
  });

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          {/* <MoreHorizontal className="h-4 w-4" /> */}
          <EllipsisVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-16">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button
          variant={"ghost"}
          className="w-full mr-auto"
          onClick={() => handleDeleteSubCustomizationFn()}
          isLoading={handleDeleteSubCustomizationFnLoader}
          disabled={handleDeleteSubCustomizationFnLoader}
        >
          Delete
        </Button>
        <EditAddonsModal
          {...addon}
          setCurrentOptionState={addon.setCurrentOptionState}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
