import { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MajjakoDeals | Notifications",
  description: "Best Retail Online Shop",
};

const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default NotificationLayout;
