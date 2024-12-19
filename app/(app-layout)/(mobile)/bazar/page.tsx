import React, { Suspense } from "react";

import BazarPageLoader from "./BazarPageLoader";
import BazarSection from "@/components/mainlanding/BazarSection";

const BazarPage = () => {
  return (
    <Suspense fallback={<BazarPageLoader />}>
      <BazarSection />
    </Suspense>
  );
};

export default BazarPage;
