import React from "react";

const TabsHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b py-2">
      <div className="max-w-[500px] mx-auto">
        <div className="flex items-center gap-1 relative">{children}</div>
      </div>
    </div>
  );
};

export default TabsHeader;
