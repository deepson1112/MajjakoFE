"use client";
import React from "react";
import { notFound, useRouter } from "next/navigation";
import TimeLineForm from "./TimeLineForm";
import useUser from "@/lib/useUser";

const VendorTimelinePage = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) return router.push("/sign-in");
  if (!user.vendor_id) return notFound();
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Timelines</h2>
      <TimeLineForm vendor_id={user.vendor_id} />
    </div>
  );
};

export default VendorTimelinePage;
