import React from "react";

const TabsHeaderItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 text-xl font-semibold after:content-[''] after:block  after:h-1 after:w-full after:absolute after:bottom-0 after:bg-red-500 text-center">
      {children}
    </div>
  );
};

export default TabsHeaderItems;
