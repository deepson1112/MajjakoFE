"use client";

import PaymentItems from "./PaymentItems";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/stripe/StripeForm";
import useUser from "@/lib/useUser";
import { Suspense, useEffect, useState } from "react";
import { SubTotalcalculationType } from "@/types";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";

interface PaymentPageProps {
  params: {
    clientSecret: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PaymentPage({
  params,
  searchParams,
}: PaymentPageProps) {
  const { clientSecret } = params;
  const queryParams = searchParams ? searchParams : null;
  const foodid = queryParams && queryParams?.food_id;
  const { data: checkoutData, isLoading: checkoutDataLoader } =
    useQuery<SubTotalcalculationType>({
      queryFn: async () => {
        const response = await api()
          .get("/marketplace/sub_total_calculations/")
          .json();
        return response as SubTotalcalculationType;
      },
      queryKey: ["user-checkout-data"],
      onError: (error: any) => {
        toast.error("Unable to get the cart itmes", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const { user, isLoading } = useUser();
  if (isLoading) return <h5>Loading...</h5>;
  if (!user) return redirect("/sign-in");

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
        <h1 className="sr-only">Checkout</h1>

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <PaymentItems
            checkoutData={checkoutData}
            checkoutDataLoader={checkoutDataLoader}
            itemId={foodid}
          />
          <Suspense fallback={<p>Loading...</p>}>
            <CheckoutForm clientSecret={clientSecret} />
          </Suspense>
          <div className="mx-auto w-full max-w-lg"></div>
        </div>
      </main>
    </div>
  );
}
