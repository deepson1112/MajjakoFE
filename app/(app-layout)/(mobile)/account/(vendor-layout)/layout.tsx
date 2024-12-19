"use client";

import useUser from "@/lib/useUser";
import { notFound, useRouter } from "next/navigation";
import React from "react";

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { user, isLoading } = useUser();

  if (!user) return router.push("/sign-in");
  if (user.role !== 1) return notFound();

  return <div>{children}</div>;
};

export default VendorLayout;
