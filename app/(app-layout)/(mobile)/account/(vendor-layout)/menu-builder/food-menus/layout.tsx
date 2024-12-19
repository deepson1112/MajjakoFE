import React, { Suspense } from "react";
import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { menuFoodTabNavigation } from "@/lib/Constants";
import { ScrollArea } from "@/components/ui/scroll-area";

const FoodMenuLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ScrollArea className="relative h-screen">
        <AnimatedTabs tabs={menuFoodTabNavigation} />
        {children}
      </ScrollArea>
    </Suspense>
  );
};

export default FoodMenuLayout;
