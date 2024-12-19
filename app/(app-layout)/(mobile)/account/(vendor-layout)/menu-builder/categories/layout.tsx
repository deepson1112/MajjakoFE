import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { menuCateogoryTabNavigation } from "@/lib/Constants";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnimatedTabs tabs={menuCateogoryTabNavigation} />
      {children}
    </Suspense>
  );
};

export default layout;
