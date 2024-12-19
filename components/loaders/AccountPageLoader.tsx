import React from "react";
import { Skeleton } from "../ui/Skeleton";
import MaxWidthWrapper from "../MaxWidthWrapper";

const AccountPageLoader = () => {
  return (
    <MaxWidthWrapper className="flex flex-col gap-6 min-h-screen">
      <Skeleton className="w-full h-64 rounded-lg" />
      <div className="flex items-center gap-6">
        <Skeleton className="w-72 h-48 rounded-lg" />
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>
    </MaxWidthWrapper>
  );
};

export default AccountPageLoader;
