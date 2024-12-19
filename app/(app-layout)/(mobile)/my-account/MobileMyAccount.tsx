"use client";
import { navigation, retailnavigation, userNavigation } from "@/lib/Constants";
import useUser from "@/lib/useUser";
import React, { useState } from "react";
import AccountNavigations from "./AccountNavigations";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserProfileSection from "@/components/user/UserProfileSection";
import { LogOut } from "lucide-react";
import { SignOutModal } from "@/components/SignOutModal";

const MobileMyAccount = () => {
  const { user, isLoading } = useUser();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <>
      {user && <UserProfileSection {...user} />}

      <MaxWidthWrapper>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <>
            {user?.role === 2
              ? userNavigation.map((link) =>
                  link.role.includes(user?.role!) ? (
                    <AccountNavigations {...link} key={link.title} />
                  ) : null
                )
              : user?.vendor_type === 2
              ? retailnavigation.map((link) =>
                  link.role.includes(user?.role!) ? (
                    <AccountNavigations {...link} key={link.title} />
                  ) : null
                )
              : navigation.map((link) =>
                  link.role.includes(user?.role!) ? (
                    <AccountNavigations {...link} key={link.title} />
                  ) : null
                )}
            <li
              className={
                "flex items-center gap-2 bg-white py-4 px-2 rounded-lg border"
              }
              onClick={() => setIsSignOutModalOpen((prev) => !prev)}
            >
              <LogOut />
              Sign Out
            </li>
          </>
        </div>
      </MaxWidthWrapper>
      <SignOutModal
        isSignOutModalOpen={isSignOutModalOpen}
        setIsSignOutModalOpen={setIsSignOutModalOpen}
        contents="You Sure want to sign out from the application?"
      />
    </>
  );
};

export default MobileMyAccount;
