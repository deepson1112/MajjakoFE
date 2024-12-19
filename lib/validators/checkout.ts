import { z } from "zod";

export const PaymentMethodSchema = z.object({
  method:
    //  z.enum(["Cash On Delivery", "Esewa", "Stripe"], {
    //   required_error: "Payment Method Type is required for payment process.",
    // }),
    z.string().min(1, "Payment Method Type is required for payment process."),
});

export type PaymentMethodSchemaType = z.infer<typeof PaymentMethodSchema>;
