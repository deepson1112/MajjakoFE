import React, { Suspense } from "react";
import OrderChanger from "./orderchanger";

type Props = {};

export default function ChangeOrderpage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderChanger />
    </Suspense>
  );
}
