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
import { Product, ProductVariation } from "@/lib/validators/fooditems";
import AddItems from "../../add-items/AddItems";
import useUser from "@/lib/useUser";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface EditModalType {
  items: Product;
}

export function EditProductModal({ items }: EditModalType) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, isLoading } = useUser();
  return isLoading ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-600" />
  ) : (
    user && (
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[900px] overflow-auto"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Edit Variation</DialogTitle>
            <DialogDescription>
              Make changes to your product&apos;s Variation
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[50rem] overflow-auto">
            <AddItems
              vendor_id={user.vendor_id!}
              defaultValues={items}
              is_edit
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  );
}
