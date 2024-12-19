"use client";
import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";
import useUser from "@/lib/useUser";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

interface MenuBuilderLayoutProps {
  children: React.ReactNode;
}

const MenuBuilderLayout = ({ children }: MenuBuilderLayoutProps) => {
  const { user, isLoading } = useUser();
  if (user?.role !== 1 || user?.vendor_type !== 1) return notFound();
  if (isLoading) return <SettingsPageLoader />;
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

export default MenuBuilderLayout;
