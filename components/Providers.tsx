"use client";

import React, { Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/queryClient";
import { IntlProvider } from "react-intl";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    // <IntlProvider locale={navigator.language}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    // </IntlProvider>
    // </Suspense>
  );
};

export default Providers;
