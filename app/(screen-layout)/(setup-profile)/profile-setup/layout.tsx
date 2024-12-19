import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MajjakoDeals | Vendor Profile Setup",
  description: "Best Retail Online Shop",
};

const ProfileSetupLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

export default ProfileSetupLayout;
