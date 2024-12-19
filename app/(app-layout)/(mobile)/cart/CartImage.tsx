import Image from "next/image";
import React from "react";

interface CartImageProps {
  discount: number;
  img?: string;
  sm?: boolean;
}

const CartImage = ({ discount, img, sm }: CartImageProps) => {
  if (discount) {
    return (
      <div className="relative">
        <Image
          className="h-[98px] w-[98px] max-w-full object-cover rounded-lg"
          src={
            !!img
              ? img
              : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="food-image"
          height={1080}
          width={1080}
        />
        <span className="absolute bg-brand top-1 right-1 text-white px-2 rounded-full">
          {discount}% off
        </span>
      </div>
    );
  }

  return (
    <div>
      <Image
        className="h-[98px] w-[98px] max-w-full object-cover rounded-lg"
        src={
          !!img
            ? img
            : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="products-image"
        height={1080}
        width={1080}
      />
    </div>
  );
};

export default CartImage;
