import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PaymentError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <figure className="flex flex-col items-center">
        <h6 className="text-xl">
          Something wen wrong during payment proccess.
        </h6>
        <Image
          src={"/payment-error.svg"}
          alt="payment-error-image"
          height={500}
          width={500}
        />
        <Link
          href={"/bazar/checkout"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Back to Checkout
        </Link>
      </figure>
    </div>
  );
};

export default PaymentError;
