"use client";
import React, { Suspense } from "react";

import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { retailoffersTabsNavigation } from "@/lib/Constants";
import useUser from "@/lib/useUser";
import { notFound } from "next/navigation";
import SettingsPageLoader from "@/components/loaders/SettingsPageLoader";
import { SaveOnMenuItem } from "./SaveOnMenu";
import { PercentOff } from "./PercentOff";
import { BuyOneGetOne } from "./BuyOneGetOne";

const OfferLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  if (isLoading) return <SettingsPageLoader />;
  if (user?.role !== 1 || user?.vendor_type !== 2) return notFound();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="p-4">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Offers</h2>
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <PercentOff />
          <BuyOneGetOne />
          <SaveOnMenuItem />
        </section>
        <div className="p-4">
          <AnimatedTabs tabs={retailoffersTabsNavigation} />
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default OfferLayout;
