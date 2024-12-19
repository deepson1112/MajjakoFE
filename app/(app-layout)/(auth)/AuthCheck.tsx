"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useUser from "@/lib/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (!isLoading && user) {
      if (!!redirect?.length) {
        window.location.replace(redirect);
      } else {
        router.replace(`/`);
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <>{!user ? children : null}</>;
};

export default AuthCheck;
