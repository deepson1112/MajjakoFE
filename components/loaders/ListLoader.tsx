import { Skeleton } from "../ui/Skeleton";

const ListLoader = () => {
  return (
    <div className="flex flex-col items-stretch gap-3 py-6">
      <Skeleton className="w-full h-[50px] rounded-md" />
      <Skeleton className="w-full h-[50px] rounded-md" />
      <Skeleton className="w-full h-[50px] rounded-md" />
      <Skeleton className="w-full h-[50px] rounded-md" />
    </div>
  );
};

export default ListLoader;
