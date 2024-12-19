"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import VendorProfileSection from "@/components/vendor/VendorProfileSection";
import useUser from "@/lib/useUser";

interface Props {
  children: React.ReactNode;

  params: {
    restaurant_id: string;
  };
}

const Layout = ({ children, params }: Props) => {
  const { restaurant_id } = params;

  return (
    <>
      <VendorProfileSection id={restaurant_id} />
      <Suspense fallback={<p>Loading...</p>}>
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </Suspense>
    </>
  );
};

export default Layout;
