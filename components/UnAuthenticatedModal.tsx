"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/Dialog";
import UnAuthenticatedForm from "./UnAuthenticatedForm";
import Image from "next/image";
import { useState } from "react";

export function UnAuthenticatedModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUnAuthModalOpen, setIsUnAuthModalOpen] = useState(false);

  return (
    <Dialog open={isUnAuthModalOpen} onOpenChange={setIsUnAuthModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="z-[550]" />
      <DialogContent
        className="sm:max-w-[450px] z-[551]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center space-y-3">
          <Image
            src={"/final.svg"}
            alt="majjakodeals-logo"
            width={100}
            height={100}
          />
          <DialogTitle className="text-gray-600">
            Please <span className="text-brand">Log In</span> to use this
            feature
          </DialogTitle>
        </DialogHeader>
        <div>
          <UnAuthenticatedForm toggleModalOpen={setIsUnAuthModalOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
