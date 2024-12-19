import OrderChanger from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/changeorder/orderchanger";
import React, { Suspense } from "react";

type Props = {};

export default function RetailchangeOrderpage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderChanger is_retail />;
    </Suspense>
  );
}
