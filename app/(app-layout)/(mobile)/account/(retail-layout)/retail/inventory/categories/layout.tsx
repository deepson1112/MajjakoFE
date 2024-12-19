import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { retailMenuCateogoryTabNavigation } from "@/lib/Constants";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnimatedTabs tabs={retailMenuCateogoryTabNavigation} />
      {children}
    </Suspense>
  );
};

export default layout;
