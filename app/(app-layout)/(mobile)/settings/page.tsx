// "use client";
// import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";
// import Settings from "@/components/pages/settings/Settings";
// import UserSettings from "@/components/pages/settings/UserSettings";
// import useUser from "@/lib/useUser";
// import { useRouter } from "next/navigation";
// import React from "react";

// const SetingsPage = () => {
//   const { user, isLoading } = useUser();
//   const router = useRouter();

//   if (isLoading) return <SettingsPageLoader />;

//   if (!user) return router.push("/sign-in");

//   return user ? (
//     // user.vendor_id ? (a
//     <Settings {...user} />
//   ) : (
//     // ) : (
//     //   <UserSettings {...user} />
//     // )
//     <div></div>
//   );
// };

// export default SetingsPage;
"use client";

import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";
import Settings from "@/components/pages/settings/Settings";
import useUser from "@/lib/useUser";
import { useRouter } from "next/navigation";
import React from "react";

const SetingsPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <SettingsPageLoader />;
  }

  if (!user) {
    return null;
  }

  return user.vendor_id ? <Settings {...user} /> : null;
};

export default SetingsPage;
