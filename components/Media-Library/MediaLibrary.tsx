import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import ImageLibrary from "./ImageLibrary";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface MediaLibraryProps {
  children: React.ReactNode;
  form: UseFormReturn<any>;
  field: string;
}

export function MediaLibrary({ children, form, field }: MediaLibraryProps) {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  return (
    <Dialog open={isMediaLibraryOpen} onOpenChange={setIsMediaLibraryOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[750px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>
            Select images from media library or upload images to media library.
          </DialogDescription>
        </DialogHeader>
        <ImageLibrary
          setImage={form}
          field={field}
          setIsMediaLibraryOpen={setIsMediaLibraryOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
