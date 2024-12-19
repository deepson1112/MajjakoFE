import * as z from "zod";

const variationSchema = z.object({
  product: z.string().min(1, "Product is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().min(1, "SKU is required"),
  stock_quantity: z.string().min(1, "Stock Quantity is required"),
  variations_image: z.array(z.string()).optional(),
  specifications: z.record(z.string().or(z.number())),
  variation: z.array(z.number()).optional(),
});

export const payloadSchema = z.array(variationSchema);
