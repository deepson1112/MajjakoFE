import RetailAddLocation from "@/app/(app-layout)/(mobile)/bazar/checkout/RetailAddLocation";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Plus } from "lucide-react";

const AddAdress = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={"sm"}
          className="border border-dashed border-brand bg-white text-brand hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[650px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>

          <RetailAddLocation />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdress;
