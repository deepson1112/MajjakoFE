import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { bazarDeliveredNavigation } from "@/lib/Constants";
import React from "react";

const DeliveredLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AnimatedTabs sticky={false} tabs={bazarDeliveredNavigation} />
      {children}
    </div>
  );
};

export default DeliveredLayout;
