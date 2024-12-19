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

import { OfferCategory } from "../add-product-offer-category/AddProductOfferCategory";
import EditProductOfferCategory from "./EditProductOfferCategory";
import { useState } from "react";

const EditTrigger = ({ items }: { items: OfferCategory }) => {
  const [open, setIsOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] p-8"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Offer Category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click save changes when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <EditProductOfferCategory items={items} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTrigger;
