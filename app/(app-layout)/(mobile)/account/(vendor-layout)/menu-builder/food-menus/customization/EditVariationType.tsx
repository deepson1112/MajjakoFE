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
import { AddCustomizationTabContent } from "./TabsContent";
import { ProductVariation } from "@/lib/validators/fooditems";
import { Suspense, useState } from "react";
import { EditVariatoinTypeForm } from "./EditVariatoinTypeForm";

interface EditVariationType {
  items: ProductVariation;
}

export function EditVariationType({ items }: EditVariationType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[900px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Variations</DialogTitle>
          <DialogDescription>
            Make changes to your product&apos;s Variation
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <EditVariatoinTypeForm
              // @ts-ignore
              defaultValues={items}
              setIsOpen={setIsOpen}
              is_edit
            />
          </div>
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
