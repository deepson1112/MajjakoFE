import { Skeleton } from "@/components/ui/Skeleton";

const ProductSkeleton = () => {
  return (
    <div className="relative">
      <div className="aspect-square w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
