"use client";
import React from "react";
import LoyalityContainer from "./loyalityContainer";
import { notFound, useRouter } from "next/navigation";
import Points from "./points";
import LoyalityCard from "./loyalityCard";
import useUser from "@/lib/useUser";
import { Skeleton } from "@/components/ui/Skeleton";
type Props = {};

function Page({}: Props) {
  const router = useRouter();

  const { isLoading, user } = useUser();

  if (isLoading) return <p>Loading...</p>;

  if (!user) return router.push("/sign-in");
  if (user?.role !== 1 || user?.vendor_type !== 1) return notFound();
  return (
    <div className="p-4">
      <Points />

      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <LoyalityCard />
      </section>

      <p className="uppercase text-md tracking-wider mb-4">Order History</p>
      <LoyalityContainer />
    </div>
  );
}

export default Page;
