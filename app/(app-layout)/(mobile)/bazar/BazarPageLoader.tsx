import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

const BazarPageLoader = () => {
  return (
    <MaxWidthWrapper className="space-y-8 mt-4 py-4">
      <div>
        <Skeleton className="text-sm font-semibold text-center h-10 w-full" />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Skeleton className="relative h-8 w-36  rounded-md" />
          <Skeleton className="relative h-8 w-32  rounded-md" />
        </div>
        <div className="flex items-center overflow-hidden gap-3 mt-8">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              className="w-full pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
              key={`retail-category-loader-${index}`}
            >
              <div className="inline-flex flex-col items-center gap-3 cursor-pointer">
                <Skeleton className="relative h-32 w-32 2xl:h-36 2xl:w-36 overflow-hidden rounded-full" />

                <Skeleton className="text-sm font-semibold text-center h-8 w-full max-w-[200px] line-clamp-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="relative h-64 w-full  rounded-lg" />
      </div>

      <div>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={`bazar-loader-categoires-${index}`}
              className="h-48 rounded-xl md:rounded-3xl overflow-hidden "
            />
          ))}
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default BazarPageLoader;
