import { DialogContent } from "@radix-ui/react-dialog";
import { Skeleton } from "../ui/Skeleton";
import { DialogHeader } from "../ui/Dialog";

const AddCartModalLoaderLoader = () => {
  return (
    <>
      <DialogContent
        className="sm:max-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <Skeleton className="h-6 w-10 rounded-md" />
          <Skeleton className="h-6 w-7 rounded-md" />
        </DialogHeader>
        <div className="w-full flex flex-col gap-3">
          <Skeleton className="h-6 w-10 rounded-md" />
          <Skeleton className="h-6 w-7 rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
        </div>
      </DialogContent>
    </>
  );
};

export default AddCartModalLoaderLoader;
