"use client";
import React from "react";
import { useModal } from "./Modal";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  const { modalOpen, toggleModalOpen } = useModal();

  return modalOpen ? (
    <div className="fixed inset-0 z-50 bg-black/80">
      <dialog className="absolute left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        {children}
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={toggleModalOpen}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </dialog>
    </div>
  ) : null;
};

export default ModalBody;
