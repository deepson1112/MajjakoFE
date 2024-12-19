"use client";

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

import { useState } from "react";

import { PlatformOffers } from "./ViewPlatformOffer";
import PlatformOfferForm from "./PlatformOfferForm";

export function PlatformOfferModal(item: PlatformOffers) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size={"xs"}
          className="rounded-lg bg-white text-brand border border-brand hover:text-white"
        >
          Use Offer
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[1100px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Platform Offer</DialogTitle>

          <DialogDescription>
            Set a platofrm offer to product or variations
          </DialogDescription>
        </DialogHeader>
        <PlatformOfferForm {...item} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
