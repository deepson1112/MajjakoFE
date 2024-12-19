"use client";
import React from "react";

import useUser from "@/lib/useUser";
import { notFound } from "next/navigation";
import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";
import CouponHeaders from "../../../(vendor-layout)/coupon/CouponHeaders";
import CouponsContainer from "../../../(vendor-layout)/coupon/CouponsContainer";

const CouponPage = () => {
  const { user, isLoading } = useUser();
  if (user?.role !== 1 && user?.vendor_type !== 2) return notFound();
  if (isLoading) return <SettingsPageLoader />;

  return (
    <>
      <CouponHeaders is_retail={user.role === 1} />
      <CouponsContainer is_retail={user.role === 1} />
    </>
  );
};

export default CouponPage;
