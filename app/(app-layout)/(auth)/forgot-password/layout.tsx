import FullScreenLoader from "@/components/FullScreenLoader";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MajjakoDeals | Forgot Password",
  description: "Best Retail Online Shop",
};

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
};

export default ForgotPasswordLayout;
