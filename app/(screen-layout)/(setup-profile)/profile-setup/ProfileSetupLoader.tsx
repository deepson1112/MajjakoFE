import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

const ProfileSetupLoader = () => {
  return (
    <MaxWidthWrapper>
      <div>
        <Skeleton className="w-full h-36" />
        <div className="grid grid-cols-2 gap-6 mt-6 ">
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfileSetupLoader;
