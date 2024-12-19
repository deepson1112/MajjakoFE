import { z } from "zod";

export const CouponSchema = z.object({
  id: z.number().optional(),
  vendor: z.number().optional(),
  discount_percentages: z.string().optional(),
  coupons_title: z.string().min(1, "Coupon title is required!"),
  coupon_code: z
    .string()
    .min(3, "Coupon Code should be more than 3 characters"),
  coupon_type: z.string().min(1, "Coupon Type is required!"),
  minimum_spend_amount: z.coerce
    .number()
    .nonnegative({ message: "Amount Cannot be in negative" }),
  maximum_redeem_amount: z.coerce
    .number()
    .nonnegative({ message: "Amount Cannot be in negative" })
    .optional(),
  audience: z.string(),
  start_date: z.any(),
  limitation_for_user: z.coerce
    .number()
    .nonnegative({ message: "Limitation for user cannot be negative" }),
  coupon_usage_limitation: z.coerce
    .number()
    .nonnegative({ message: "Coupon usage limitation cannot be negative" }),
  end_date: z.any(),
  discount_amount: z.coerce.number().optional(),
});

export type CouponType = z.infer<typeof CouponSchema>;
