import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useForm } from "react-hook-form";
import {
  PaymentMethodSchema,
  PaymentMethodSchemaType,
} from "@/lib/validators/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { UseMutateFunction } from "react-query";
import { checkoutResponse } from "./RetailExistingAddress";

const PaymentMethodsOptions = [
  {
    img: "/payment-methods/cod.png",
    title: "Cash on Delivery",
    value: "Cash On Delivery",
  },
  {
    img: "/payment-methods/esewa.png",
    title: "E-sewa",
    value: "Esewa",
  },
  {
    img: "/payment-methods/master-cards.png",
    title: "Visa / Mastercard",
    value: "Stripe",
  },
];

interface PaymentMethodsProps {
  handlePlaceOrderStripe: UseMutateFunction<
    checkoutResponse,
    any,
    string,
    unknown
  >;
  handlePlaceOrderStripeLoader: boolean;
  isCodDisabled: boolean;
}

export function PaymentMethods({
  handlePlaceOrderStripe,
  handlePlaceOrderStripeLoader,
  isCodDisabled,
}: PaymentMethodsProps) {
  const form = useForm<PaymentMethodSchemaType>({
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: {
      method: "",
    },
  });

  const handleNavigatePaymentMethod = (value: PaymentMethodSchemaType) => {
    handlePlaceOrderStripe(value.method);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-2">Place Order</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[650px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
          <DialogDescription>
            Choose a payment method for completing the order.
          </DialogDescription>
        </DialogHeader>
        <PaymentMethodOptions
          handlePlaceOrderStripe={handlePlaceOrderStripe}
          handlePlaceOrderStripeLoader={handlePlaceOrderStripeLoader}
          isCodDisabled={isCodDisabled}
        />
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from "react";
import axios from "axios";
import PaymentMethodOptions from "./PaymentMethodOptions";

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [productId, setProductId] = useState("");

  const initiatePayment = async () => {
    try {
      // Send payment initiation request to the backend
      const response = await axios.post(
        "http://localhost:8000/initiate-payment/",
        {
          amount,
          productId,
        }
      );

      const { esewa_payment_url, form_data } = response.data;

      // Create and auto-submit the payment form
      const form = document.createElement("form");
      form.action = esewa_payment_url;
      form.method = "POST";

      // Append input fields to the form
      Object.keys(form_data).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = form_data[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit(); // Auto-submit the form
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Initiate Payment</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={initiatePayment}>Pay with eSewa</button>
    </div>
  );
};

export default PaymentPage;
