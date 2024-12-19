"use client";

import React, { Suspense } from "react";
import CheckOutItems from "./CheckOutIems";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";

const CheckoutPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return router.push("/sign-in");
  return (
    <div>
      <Suspense fallback={<p>Loading...n</p>}>
        <CheckOutItems />
      </Suspense>
    </div>
  );
};

export default CheckoutPage;
