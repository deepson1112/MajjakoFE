import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CategoryPageLoader = () => {
  return (
    <div className="min-h-full flex items-center">
      <Skeleton className="flex-1 h-full" />
      <Skeleton className="flex-1 h-full" />
    </div>
  );
};

export default CategoryPageLoader;
