import {
  PaymentMethodSchema,
  PaymentMethodSchemaType,
} from "@/lib/validators/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { checkoutResponse } from "./RetailExistingAddress";
import { UseMutateFunction } from "react-query";
import { Button } from "@/components/ui/Button";

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

interface PaymentMethodOptionsProps {
  handlePlaceOrderStripe?: UseMutateFunction<
    checkoutResponse,
    any,
    string,
    unknown
  >;
  handlePlaceOrderStripeLoader?: boolean;
  isCodDisabled: boolean;
  isMobile?: boolean;
  handleChangeMethod?: (data: string) => void;
}

const PaymentMethodOptions = ({
  handlePlaceOrderStripe,
  handlePlaceOrderStripeLoader,
  isCodDisabled,
  isMobile,
  handleChangeMethod,
}: PaymentMethodOptionsProps) => {
  const form = useForm<PaymentMethodSchemaType>({
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: {
      method: "",
    },
  });

  const handleNavigatePaymentMethod = (value: PaymentMethodSchemaType) => {
    if (handlePlaceOrderStripe) {
      handlePlaceOrderStripe(value.method);
    }
    if (handleChangeMethod) {
      handleChangeMethod(value.method);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        id="payment-method-form"
        onSubmit={form.handleSubmit(handleNavigatePaymentMethod)}
      >
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose any one.</FormLabel>
              {isMobile && !isCodDisabled ? (
                <p className="text-xs md:text-[11px] text-red-500 font-normal">
                  {" "}
                  Cash on Delivery not available for amount more than 20,000.
                </p>
              ) : null}
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    if (handleChangeMethod) {
                      handleChangeMethod(value);
                    }
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  className=""
                >
                  <div className="grid grid-cols-3 gap-5 md:gap-8 p-4">
                    {PaymentMethodsOptions.map((option) => (
                      <FormItem key={`payment-method-${option.title}-formitem`}>
                        <FormControl>
                          <RadioGroupItem
                            className="hidden"
                            value={option.value}
                            disabled={
                              option.title === "Cash on Delivery" &&
                              !isCodDisabled
                            }
                          />
                        </FormControl>
                        <FormLabel
                          className={cn(
                            field.value === option.value
                              ? "outline outline-brand outline-offset-2"
                              : "hover:outline hover:outline-gray-400 hover:outline-offset-2",
                            option.title === "Cash on Delivery" &&
                              !isCodDisabled
                              ? "cursor-not-allowed hover:outline-0"
                              : "cursor-pointer",
                            "rounded-xl font-normal block h-full w-full"
                          )}
                        >
                          <div className="h-full w-full relative border rounded-xl shadow flex items-center justify-center p-2">
                            <picture className="">
                              <Image
                                src={option.img}
                                width={2000}
                                height={2000}
                                alt="cash-on-delivery"
                                className="object-center object-cover"
                              />

                              {option.title === "Cash on Delivery" &&
                              !isMobile &&
                              !isCodDisabled ? (
                                <span className="text-xs md:text-[11px] text-red-500 font-normal">
                                  Cash on Delivery not available for amount more
                                  than 20,000.
                                </span>
                              ) : null}
                            </picture>
                          </div>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isMobile ? null : (
          <div>
            <Button
              type="submit"
              form="payment-method-form"
              isLoading={handlePlaceOrderStripeLoader}
              disabled={handlePlaceOrderStripeLoader}
            >
              Proceed
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default PaymentMethodOptions;
