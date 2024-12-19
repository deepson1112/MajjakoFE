import React from "react";
import SalesProducts from "./SalesProducts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface SalesPageProps {
  params: {
    id: string;
  };
}

const SalePage = ({ params }: SalesPageProps) => {
  const { id } = params;

  return (
    <MaxWidthWrapper className="space-y-2">
      <h2 className="text-xl font-semibold">Offers Items</h2>

      <SalesProducts id={id} />
    </MaxWidthWrapper>
  );
};

export default SalePage;
