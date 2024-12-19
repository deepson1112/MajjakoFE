import { z } from "zod";

// export const orderVendor = z.object({
//   id: z.number().optional(),
//   amount: z.number(),
//   price: z.number(),
//   quantity: z.number(),
// });

export const VendorOrderSchema = z.object({
  id: z.number().optional(),
  //   order_vendor: z.array(orderVendor),
  vendor_name: z.string(),
  grand_total: z.number(),
  created_at: z.string(),
});

export type VendorOrderType = z.infer<typeof VendorOrderSchema>;
