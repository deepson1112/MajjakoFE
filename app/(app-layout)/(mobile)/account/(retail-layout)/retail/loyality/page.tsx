"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import Points from "../../../(vendor-layout)/loyality/points";
import LoyalityCard from "../../../(vendor-layout)/loyality/loyalityCard";
import RetailLoyalityContainer from "./RetailLoyaltyContainer";

function Page() {
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

      <p className="text-md mb-4 font-semibold">Order History</p>
      <RetailLoyalityContainer />
    </div>
  );
}

export default Page;
