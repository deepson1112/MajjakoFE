"use client";

import MobileMyAccount from "./MobileMyAccount";
import { useRouter } from "next/navigation";
import AccountPageLoader from "@/components/loaders/AccountPageLoader";
import useUser from "@/lib/useUser";

const MyAccount = () => {
  const { user, isLoading } = useUser();

  const router = useRouter();

  if (isLoading) return <AccountPageLoader />;

  if (!user) return router.push("/sign-in");
  return (
    <div>
      <MobileMyAccount />
    </div>
  );
};

export default MyAccount;
