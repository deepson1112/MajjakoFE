import React, { Suspense } from "react";

const FaqLayout = ({ children }: { children: React.ReactNode }) => {
  //   return <Suspense fallback={<div>Loadingss...</div>}>{children}</Suspense>;
  return <div>{children}</div>;
};

export default FaqLayout;
