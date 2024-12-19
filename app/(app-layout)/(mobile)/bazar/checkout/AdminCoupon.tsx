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
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import CouponAppliedMessage from "./CouponAppliedMessage";

interface AdminCouponFieldProps {
  retailCartsLoader: boolean;
  setAdminCoupon: Dispatch<SetStateAction<string>>;
  isAdminCouponActive: boolean;
  guest: boolean;
  coupon:
    | null
    | {
        coupon_code: string;
        coupon_title: string;
        coupon_type: string;
        discount_amount: number;
        discount_percentages: number;
        vendor_id: number;
        vendor_title: string;
      }[];
}

const AdminCouponField = ({
  setAdminCoupon,
  retailCartsLoader,
  isAdminCouponActive,
  coupon,
  guest,
}: AdminCouponFieldProps) => {
  const form = useForm<CouponCodeType>({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: {
      coupon: "",
    },
  });

  const handleApplyAdminCoupon = (data: CouponCodeType) => {
    setAdminCoupon(data.coupon);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleApplyAdminCoupon)}
        className="gap-2 flex flex-col px-1"
      >
        <div className="gap-2 flex items-end">
          <FormField
            control={form.control}
            name="coupon"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-sm md:text-lg">
                  Apply <span className="text-brand">Majjakodeals Voucher</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100 border-none w-full"
                    placeholder={
                      guest
                        ? `Sign up to apply coupon code`
                        : `Enter a valid coupon code`
                    }
                    {...field}
                    disabled={isAdminCouponActive || guest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isAdminCouponActive ? (
            <Button
              type="button"
              isLoading={retailCartsLoader}
              disabled={retailCartsLoader || guest}
              onClick={() => {
                setAdminCoupon("");
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
        {coupon
          ? coupon.map((value, index) => (
              <CouponAppliedMessage
                key={`coupon-input-value-${index}`}
                discount_amount={value.discount_amount}
                discount_percentages={value.discount_percentages}
                vendorTitle={value.vendor_title}
              />
            ))
          : null}
      </form>
    </Form>
  );
};

export default AdminCouponField;
