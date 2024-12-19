import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MajjakoDeals | User Profile Setup",
  description: "Best Retail Online Shop",
};

const UserProfileSetupLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default UserProfileSetupLayout;
