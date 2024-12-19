"use client";
import React from "react";
import DeliveredItems from "./DeliveredItems";
import useUser from "@/lib/useUser";
import { notFound } from "next/navigation";
import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";

const DeliveredPage = () => {
  const { user, isLoading } = useUser();
  if (user?.role !== 1 && user?.role !== 2 && user?.vendor_type !== 2)
    return notFound();
  if (isLoading) return <SettingsPageLoader />;

  return (
    <div className="p-3">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Delivered Items
      </h2>
      <DeliveredItems />
    </div>
  );
};

export default DeliveredPage;
