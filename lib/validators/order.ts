import { z } from "zod";

export const orderVendor = z.object({
  id: z.number().optional(),
  amount: z.number(),
  price: z.number(),
  quantity: z.number(),
});

export const OrderSchema = z.object({
  id: z.number().optional(),
  order_vendor: z.array(orderVendor),
  order_number: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  address: z.string(),
  state: z.string(),
  pin_code: z.string(),
  total: z.number(),
  total_tax: z.number(),
  status: z.string(),
  delivery_charge: z.number(),
  delivery_date: z.string(),
  created_at: z.string(),
  tip: z.number(),
  payment: z.string().nullable(),
  discount_amount: z.number().default(0),
  phone: z.string(),
  city: z.string(),
});

export type OrderType = z.infer<typeof OrderSchema>;
