import React from "react";
import RefundedItemDetails from "./RefundedItemDetails";

interface ViewRefundedPageProps {
  params: {
    id: string;
  };
}

const ViewRefundedPage = ({ params }: ViewRefundedPageProps) => {
  const { id } = params;
  return (
    <div>
      <RefundedItemDetails id={id} />
    </div>
  );
};

export default ViewRefundedPage;
