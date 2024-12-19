"use client";
import { getIronSessionData } from "@/lib/session/getSession";
import { notFound, redirect, useRouter } from "next/navigation";
import React from "react";
import OrderVendorContainer from "./orderVendorContainer";
import useUser from "@/lib/useUser";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  if (isLoading) return <p>Loading...</p>;
  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return (
    user && (
      <div className="p-4">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Vendor Orders
        </h2>
        <OrderVendorContainer />
      </div>
    )
  );
}

export default Page;
