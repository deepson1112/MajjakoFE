"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import LoyalityCard from "../(vendor-layout)/loyality/loyalityCard";
import Points from "../(vendor-layout)/loyality/points";

import LoyalityContainer from "../(vendor-layout)/loyality/loyalityContainer";
import RetailLoyalityContainer from "../(retail-layout)/retail/loyality/RetailLoyaltyContainer";
type Props = {};

function Page({}: Props) {
  const router = useRouter();

  const { isLoading, user } = useUser();

  if (isLoading) return <p>Loading...</p>;

  if (!user) return router.push("/sign-in");
  return (
    <div className="p-4">
      <Points />

      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <LoyalityCard />
      </section>

      <p className="uppercase text-md tracking-wider mb-4">Order History</p>
      <RetailLoyalityContainer />
    </div>
  );
}

export default Page;
