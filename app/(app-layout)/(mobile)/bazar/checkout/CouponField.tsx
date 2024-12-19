import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { couponCodeSchema, CouponCodeType } from "@/lib/validators/offers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import CouponAppliedMessage from "./CouponAppliedMessage";

interface CouponFieldProps {
  handleAddRetailCoupon: (data: { coupon: string; vendor: number }) => void;
  handleRemoveCoupon: (vendor: number) => void;
  vendor: number;
  retailCartsLoader: boolean;
  isCouponActive: boolean;
  guest: boolean;
  vendorCoupon: null | {
    coupon_code: string;
    coupon_title: string;
    coupon_type: string;
    discount_amount: number;
    discount_percentages: number;
  };
  vendorTitle: string;
}

const CouponField = ({
  handleAddRetailCoupon,
  vendor,
  retailCartsLoader,
  isCouponActive,
  handleRemoveCoupon,
  vendorCoupon,
  vendorTitle,
  guest,
}: CouponFieldProps) => {
  const form = useForm<CouponCodeType>({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: {
      coupon: (vendorCoupon && vendorCoupon.coupon_code) || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          handleAddRetailCoupon({
            coupon: data.coupon,
            vendor: vendor,
          })
        )}
        className="space-y-3 flex flex-col"
      >
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="coupon"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="bg-gray-100 border-none mt-2 w-full"
                    placeholder={
                      guest
                        ? "Sign up to apply coupon code"
                        : "Enter a valid coupon code"
                    }
                    disabled={isCouponActive || guest}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {isCouponActive ? (
            <Button
              type="button"
              isLoading={retailCartsLoader}
              disabled={retailCartsLoader || guest}
              onClick={() => {
                handleRemoveCoupon(vendor);
                form.reset();
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              type="submit"
              isLoading={retailCartsLoader}
              disabled={retailCartsLoader || guest}
            >
              Apply
            </Button>
          )}
        </div>

        {vendorCoupon ? (
          <CouponAppliedMessage
            discount_amount={vendorCoupon.discount_amount}
            discount_percentages={vendorCoupon.discount_percentages}
            vendorTitle={vendorTitle}
          />
        ) : null}
      </form>
    </Form>
  );
};

export default CouponField;
