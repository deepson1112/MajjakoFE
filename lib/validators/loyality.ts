import { z } from "zod";

export const LoyalitySchema = z.object({
  order: z.number(),
  payment_status: z.string(),
  fullfillment_status: z.string(),
  total_amount: z.number(),
  total_reward: z.number(),
  date: z.date(),
});

export type LoyalityType = z.infer<typeof LoyalitySchema>;
