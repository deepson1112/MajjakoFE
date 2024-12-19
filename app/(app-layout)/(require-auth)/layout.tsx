"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/sign-in?redirect=${pathname}`);
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <>{user ? children : null}</>;
};

export default AuthenticatedLayout;
