import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MajjakoDeals | Verify Phone Number",
  description: "Best Retail Online Shop",
};

const VerifyPhoneNumberLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default VerifyPhoneNumberLayout;
