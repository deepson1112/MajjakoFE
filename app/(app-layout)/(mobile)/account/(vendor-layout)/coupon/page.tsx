"use client";
import React from "react";
import CouponHeaders from "./CouponHeaders";
import CouponsContainer from "./CouponsContainer";
import useUser from "@/lib/useUser";
import { notFound } from "next/navigation";
import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";

const CouponPage = () => {
  const { user, isLoading } = useUser();
  if (user?.role !== 1 || user?.vendor_type !== 1) return notFound();
  if (isLoading) return <SettingsPageLoader />;
  console.log("THis si", user.role);
  return (
    <>
      <CouponHeaders />
      <CouponsContainer />
    </>
  );
};

export default CouponPage;
