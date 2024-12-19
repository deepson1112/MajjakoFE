"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import React, { Suspense } from "react";
import useUser from "@/lib/useUser";
import { useRouter } from "next/navigation";
import { CoutDown } from "@/components/CoutDown";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  if (user && !user.guest_user && user.role === 2 && !user.profile_setup) {
    console.log("User not setup");
    return router.replace("/user-profile-setup");
  } else if (
    user &&
    !user.guest_user &&
    user.role === 1 &&
    !user.profile_setup
  ) {
    return router.replace("/profile-setup");
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar />
      <div className="pb-28 md:pb-0">
        {children}
        <Suspense fallback={<div></div>}>
          <CoutDown />

          {/* <FloatingCoutDown /> */}
        </Suspense>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}
