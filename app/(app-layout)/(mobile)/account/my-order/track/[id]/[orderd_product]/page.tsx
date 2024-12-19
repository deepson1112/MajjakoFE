import React from "react";
import OrderedProductUser from "./OrderedProductUser";
interface OrderedProductPageProps {
  params: {
    orderd_product: string;
  };
}

const OrderedProductPage = ({ params }: OrderedProductPageProps) => {
  const { orderd_product } = params;

  return (
    <div>
      <OrderedProductUser orderd_product={orderd_product} />
    </div>
  );
};

export default OrderedProductPage;
