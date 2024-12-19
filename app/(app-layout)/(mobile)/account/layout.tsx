"use client";
import UserProfileSection from "@/components/user/UserProfileSection";
import { usePathname, useRouter } from "next/navigation";
import AccountOption from "./AccountOption";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import useUser from "@/lib/useUser";
import AccountPageLoader from "@/components/loaders/AccountPageLoader";
import { Suspense } from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) return <AccountPageLoader />;

  if (!user) return router.push(`/sign-in?redirect=${pathname}`);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="relative">
        <UserProfileSection {...user} />
        <MaxWidthWrapper>
          <div className="relative min-h-screen">
            <AccountOption>{children}</AccountOption>
          </div>
        </MaxWidthWrapper>
      </div>
    </Suspense>
  );
};

export default AccountLayout;
