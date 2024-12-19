import GlobalMobileSearch from "@/components/ui/GlobalMobileSearch";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalMobileSearch />
      {children}
    </>
  );
};

export default App;
