"use client";

import useScreenWidth from "@/hooks/useScreenWidth";
import React, { Suspense } from "react";
import MediumDeviceCheckout from "./MediumDeviceCheckout";
import MobileCheckoutContainer from "./mobile/MobileCheckoutContainer";

const CheckoutRender = () => {
  const { isMobileView } = useScreenWidth();

  return isMobileView ? (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="fixed inset-0 z-50 bg-black/50" />
      <div className="slide-in-top fixed top-10 left-0 w-full h-full bg-white z-[500] shadow-[0_-14px_15px_-3px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="relative max-h-52 w-full px-2">
          <MobileCheckoutContainer />
        </div>
      </div>
    </Suspense>
  ) : (
    <MediumDeviceCheckout />
  );
};

export default CheckoutRender;
