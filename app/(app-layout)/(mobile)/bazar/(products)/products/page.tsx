export const dynamic = "force-dynamic";

import { getBazarPageContents } from "@/app/(app-layout)/(mobile)/api/apiFetchServices";
import { Section } from "@/components/mainlanding/BazarSection";
import React, { Suspense } from "react";
import BazarOffers from "../../BazarOffers";
import Products from "./Products";

const ProductsPage = async () => {
  const bazarPageContents = (await getBazarPageContents()) as Section[];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {bazarPageContents &&
      !!bazarPageContents.find((item) => item.section_code === "001") ? (
        <div className="px-3 my-2">
          <BazarOffers
            contents={bazarPageContents.find(
              (item) => item.section_code === "001"
            )}
          />
        </div>
      ) : null}
      <div className="py-4">
        <Products />
      </div>
    </Suspense>
  );
};

export default ProductsPage;
